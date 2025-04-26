"use client";

import { Suspense, useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Mic2, LayoutGrid, Building, ArrowRight, ArrowLeft, ThumbsUp, MessageSquare, ThumbsDown, Star, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/timeline";
import { ImagePreviewModal } from "@/components/image-preview-modal";
import EventInterestAndRating from '@/components/rating-banner';
import { Modal } from "@/components/ui/model";
import { toast } from "@/components/ui/use-toast";
import { jwtDecode } from 'jwt-decode';
import { LoadingSpinner } from "@/components/loading-spinner";

interface Event {
  _id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  tags: string[];
  organization: { _id: string; name: string } | null;
  organizer: { _id: string; email: string };
  coordinator: Array<{ _id: string; name: string; email: string; phone: string }>;
  status: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  startDate: string;
  endDate: string;
  googleMapsLink?: string;
  minimumAge?: number;
  bookmarked?: boolean;
  imageUrl?: string;
  thumbnail?: string;
  poster: string;
  eventTimeline: Array<{
    time: string;
    type: string;
    title: string;
    _id: string;
  }>;
  guestSpeakers: Array<{
    name: string;
    email: string;
    featured: boolean;
    _id: string;
  }>;
  registeredUsers: Array<{
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    registeredAt: string;
  }>;
  ratings: Array<{ rating: number }>;
  likes: string[];
  dislikes: string[];
  amount: number;
  venue: string;
  faqs: Array<{
    question: string;
    answer: string;
    _id: string;
  }>;
  ourTeam: Array<{
    name: string;
    email: string;
    phone: string;
    _id: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  _id: string;
  ticket: string;
  createdByUser: {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Date not available";
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Date not available";
  }
};

const formatTimelineDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return {
        date: "Date not available",
        time: "Time not available"
      };
    }
    return {
      date: `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`,
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  } catch (error) {
    console.error("Error formatting timeline date:", error);
    return {
      date: "Date not available",
      time: "Time not available"
    };
  }
};

const formatCommentDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Just now";
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  } catch (error) {
    console.error("Error formatting comment date:", error);
    return "Just now";
  }
};

const calculateAverageRating = (ratings: Array<{ rating: number }>) => {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return (sum / ratings.length).toFixed(1);
};

const EventPageContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [openReplyIds, setOpenReplyIds] = useState<string[]>([]);
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userInteraction, setUserInteraction] = useState<"liked" | "disliked" | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isOrganizer, setIsOrganizer] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBackNavigation = useCallback(() => {
    router.push('/');
  }, [router]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getCurrentUserId = () => {
    if (!isClient) return null;
    
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) return null;

    try {
      const decodedToken: { _id: string } = jwtDecode(token);
      return decodedToken._id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchEventData = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`https://dev.api.prolepses.com/v1/event/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event data");
      }

      const data: Event = await response.json();
      setEvent(data);
      setEventImage(data.poster || null);
      setLikes(data.likes || []);
      setDislikes(data.dislikes || []);

      const userId = getCurrentUserId();
      setCurrentUserId(userId);
      
      if (userId) {
        // Check if current user is the organizer
        setIsOrganizer(userId === data.organizer._id);

        if (data.likes?.includes(userId)) {
          setUserInteraction("liked");
        } else if (data.dislikes?.includes(userId)) {
          setUserInteraction("disliked");
        } else {
          setUserInteraction(null);
        }
      }

      const isUserRegistered = data.registeredUsers?.some(user => user.user._id === userId);
      setIsRegistered(isUserRegistered || false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        return;
      }

      const response = await fetch(`https://dev.api.prolepses.com/v1/support/ticket/${id}/comment/find/all`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data: Comment[] = await response.json();
      setComments(data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEventData();
      fetchComments();
    }
  }, [id, router, isClient]);

  const handleSupportClick = () => {
    if (!id) {
      toast({
        title: "Error",
        description: "Event ID is missing.",
      });
      return;
    }
    router.push(`http://localhost:3001/complaint/create?eventId=${id}`);
  };

  const handleLikeEvent = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to like an event.",
      });
      return;
    }

    try {
      const response = await fetch(`https://dev.api.prolepses.com/v1/event/${id}/like`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to like the event");
      }

      if (userInteraction === "disliked") {
        setDislikes(prev => prev.filter(id => id !== userId));
        setLikes(prev => [...prev, userId]);
      } else if (userInteraction === "liked") {
        setLikes(prev => prev.filter(id => id !== userId));
      } else {
        setLikes(prev => [...prev, userId]);
      }

      setUserInteraction(userInteraction === "liked" ? null : "liked");
      toast({
        title: "Success",
        description: userInteraction === "liked" ? "You have unliked the event." : "You have liked the event.",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
        });
      }
    }
  };

  const handleDislikeEvent = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to dislike an event.",
      });
      return;
    }

    try {
      const response = await fetch(`https://dev.api.prolepses.com/v1/event/${id}/dislike`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1]}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to dislike the event");
      }

      if (userInteraction === "liked") {
        setLikes(prev => prev.filter(id => id !== userId));
        setDislikes(prev => [...prev, userId]);
      } else if (userInteraction === "disliked") {
        setDislikes(prev => prev.filter(id => id !== userId));
      } else {
        setDislikes(prev => [...prev, userId]);
      }

      setUserInteraction(userInteraction === "disliked" ? null : "disliked");
      toast({
        title: "Success",
        description: userInteraction === "disliked" ? "You have undisliked the event." : "You have disliked the event.",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
        });
      }
    }
  };

  const handleRegisterEvent = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`https://dev.api.prolepses.com/v1/event/${id}/join`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to register for the event");
      }

      toast({
        title: "Success",
        description: "You have successfully registered for the event.",
      });
      setIsRegisterModalOpen(false);
      setIsRegistered(true);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
        });
      }
    }
  };

  const handleCommentSubmit = async () => {
    const userId = getCurrentUserId();
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to post a comment.",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty.",
      });
      return;
    }

    setIsCommentLoading(true);

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        router.push('/login');
        return;
      }

      const formData = new FormData();
      formData.append('comment', newComment);

      const response = await fetch(`https://dev.api.prolepses.com/v1/support/ticket/${id}/comment/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newCommentData = await response.json();
      setComments(prev => [newCommentData, ...prev]);
      setNewComment("");
      toast({
        title: "Success",
        description: "Your comment has been posted.",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
        });
      }
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    const userId = getCurrentUserId();
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to post a reply.",
      });
      return;
    }

    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Reply cannot be empty.",
      });
      return;
    }

    setIsCommentLoading(true);

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        router.push('/login');
        return;
      }

      const formData = new FormData();
      formData.append('comment', replyContent);

      const response = await fetch(`https://dev.api.prolepses.com/v1/support/ticket/${id}/comment/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to post reply");
      }

      const newReply = await response.json();
      setComments(prev => [newReply, ...prev]);
      setReplyContent("");
      setOpenReplyIds(prev => prev.filter(id => id !== commentId));
      setReplyingTo(null);
      toast({
        title: "Success",
        description: "Your reply has been posted.",
      });
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
        });
      }
    } finally {
      setIsCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 px-4 md:px-6 bg-white flex items-center justify-center h-screen">
        <LoadingSpinner/>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto py-6 px-4 md:px-6 bg-white text-center text-red-600">{error}</div>;
  }

  if (!event) {
    return <div className="container mx-auto py-6 px-4 md:px-6 bg-white text-center">Event not found.</div>;
  }

  const averageRating = calculateAverageRating(event.ratings || []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-16 sm:pb-20 max-w-6xl" key={pathname}>
        <div className="mb-6 sm:mb-12">
        </div>
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="text-xs sm:text-sm">{event.type}</Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">{event.category}</Badge>
            {event.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs sm:text-sm">{tag}</Badge>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-600 mt-2">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">{formatDate(event.startDate).split(',')[0]}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">{event.city}, {event.state}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">{event.registeredUsers?.length || 0} registered</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold cursor-pointer" onClick={() => router.push(`/profile/${event.organizer._id}`)}>
                    {event.organization?.name || "Unknown Organization"}
                  </h3>
                  <p className="text-sm text-gray-600">Event Organizer</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= Number(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({averageRating})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Event Details</h2>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={userInteraction === "liked" ? "default" : "outline"}
                    size="sm"
                    onClick={handleLikeEvent}
                    disabled={!isClient}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {likes.length} Likes
                  </Button>
                  <Button
                    variant={userInteraction === "disliked" ? "default" : "outline"}
                    size="sm"
                    onClick={handleDislikeEvent}
                    disabled={!isClient}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    {dislikes.length} Dislikes
                  </Button>
                </div>
              </div>
              <div className="space-y-4 text-gray-600">
                <p className="text-sm sm:text-base">{event.description}</p>
                {isExpanded && (
                  <p className="text-sm sm:text-base">Additional details about the event.</p>
                )}
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isOrganizer && (
                <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center" onClick={() => router.push('/admin-dashboard')}>
                  Admin Dashboard
                </Button>
              )}
              <Button 
                className="w-full sm:w-auto flex items-center justify-center" 
                onClick={() => setIsRegisterModalOpen(true)}
                disabled={isRegistered || !isClient}
              >
                {isRegistered ? 'Already Registered' : 'Register Now'}
                {!isRegistered && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto flex items-center justify-center"
                onClick={handleSupportClick}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div 
              className="w-full h-48 sm:h-64 md:h-80 lg:h-[28rem] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => setIsPreviewOpen(true)}
            >
              {eventImage ? (
                <img
                  src={eventImage}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="lg:col-span-2">
            <EventInterestAndRating onRate={(rating) => setRating(rating)} />
          </div>
        </div>

        {event.guestSpeakers?.length > 0 && (
          <div className="mt-8 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-8">Featured Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {event.guestSpeakers.map((speaker) => (
                <Card 
                  key={speaker._id} 
                  className="flex flex-row items-center p-3 sm:p-4 space-x-3 sm:space-x-4 cursor-pointer hover:bg-gray-100 transition-colors group"
                  onClick={() => router.push(`/profile/${speaker._id}`)}
                >
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left flex-grow min-w-0">
                    <h3 className="font-semibold text-sm truncate">{speaker.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{speaker.featured ? "Featured Speaker" : "Speaker"}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {event.eventTimeline?.length > 0 && (
          <div className="mt-8 sm:mt-16">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-8">Event Schedule</h2>
            <Timeline 
              sessions={event.eventTimeline.map((item) => ({
                date: formatTimelineDate(item.time).date,
                time: formatTimelineDate(item.time).time,
                type: item.type,
                title: item.title,
                description: item.title,
                speakers: []
              }))} 
            />
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Location</h2>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
            <div className="flex-1 mb-4 lg:mb-0 text-center lg:text-left">
              <div className="flex items-start justify-center lg:justify-start space-x-3">
                <MapPin className="w-8 h-8 text-primary" />
                <span className="text-lg max-w-md">
                  {event.address}, {event.city}, {event.state}, {event.country}
                </span>
              </div>
            </div>
            <div className="flex-1">
              {isClient && event.googleMapsLink && (
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <iframe
                    src={event.googleMapsLink}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>

        {event.faqs?.length > 0 && (
          <div className="mt-8 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-8">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {event.faqs.map((faq, index) => (
                <AccordionItem key={faq._id} value={`item-${index}`}>
                  <AccordionTrigger className="text-left no-underline hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {event.ourTeam?.length > 0 && (
          <div className="mt-16 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our team</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mb-8">
              We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {event.ourTeam.map((member) => (
                <Card 
                  key={member._id} 
                  className="flex flex-row items-center p-3 sm:p-4 space-x-3 sm:space-x-4 cursor-pointer hover:bg-gray-100 transition-colors group"
                  onClick={() => router.push(`/profile/${member._id}`)}
                >
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg" alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left flex-grow min-w-0">
                    <h3 className="font-semibold text-sm truncate">{member.name}</h3>
                    <p className="text-xs text-gray-600 truncate">{member.email}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Comments</h2>
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <textarea
                    className="w-full min-h-[100px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isCommentLoading}
                  />
                  <div className="mt-2 flex justify-end">
                    <Button 
                      onClick={handleCommentSubmit}
                      disabled={isCommentLoading || !newComment.trim()}
                    >
                      {isCommentLoading ? "Posting..." : "Post Comment"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment._id} className="flex space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {comment.createdByUser?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">
                        {comment.createdByUser?.firstName && comment.createdByUser?.lastName 
                          ? `${comment.createdByUser.firstName} ${comment.createdByUser.lastName}`
                          : comment.createdByUser?.email?.split('@')[0] || 'Anonymous'}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatCommentDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600">{comment.comment}</p>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="h-4 w-4" />
                        <span>0 likes</span>
                      </button>
                      <button 
                        className="text-primary hover:text-primary/80"
                        onClick={() => {
                          setReplyingTo(comment._id);
                          setOpenReplyIds(ids => 
                            ids.includes(comment._id) 
                              ? ids.filter(id => id !== comment._id)
                              : [...ids, comment._id]
                          );
                        }}
                      >
                        Reply
                      </button>
                    </div>
                    {openReplyIds.includes(comment._id) && (
                      <div className="mt-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>YA</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <textarea
                              className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              placeholder="Write a reply..."
                              value={replyingTo === comment._id ? replyContent : ""}
                              onChange={(e) => setReplyContent(e.target.value)}
                              disabled={isCommentLoading}
                            />
                            <div className="mt-2 flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setOpenReplyIds(ids => ids.filter(id => id !== comment._id));
                                  setReplyingTo(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleReplySubmit(comment._id)}
                                disabled={isCommentLoading || !replyContent.trim()}
                              >
                                {isCommentLoading ? "Posting..." : "Post Reply"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageSrc={eventImage || "/placeholder.svg"}
      />

      {/* Registration Confirmation Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Confirm Registration"
        description="Are you sure you want to register for this event?"
      >
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setIsRegisterModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleRegisterEvent}>Confirm</Button>
        </div>
      </Modal>
    </main>
  );
};

export default function EventPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-6 px-4 md:px-6 bg-white flex items-center justify-center h-screen">
        <LoadingSpinner/>
      </div>
    }>
      <EventPageContent />
    </Suspense>
  );
}