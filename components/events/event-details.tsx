"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Mic2, LayoutGrid, Building, ArrowRight, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/timeline";
import { ImagePreviewModal } from "@/components/image-preview-modal";
import EventInterestAndRating from '@/components/rating-banner';
import { formatDate, formatTimelineDate } from './utils';
import { Event } from './types';

interface EventDetailsProps {
  id: string | null;
  onBack: () => void;
  onRegister: () => void;
}

export default function EventDetails({ id, onBack, onRegister }: EventDetailsProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [eventImage, setEventImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          signin
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventData();
  }, [id, router]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!event) return <div>Event not found.</div>;

  return (
    <>
      <div className="mb-6 sm:mb-12">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
      </div>

      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">{event.type}</Badge>
          <Badge variant="secondary">{event.category}</Badge>
          {event.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-600 mt-2">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span>{formatDate(event.startDate).split(',')[0]}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span>{event.city}, {event.state}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span>{event.registeredUsers?.length || 0} registered</span>
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
                <h3 className="font-semibold" onClick={() => router.push(`/profile/${event.organizer._id}`)}>
                  {event.organization?.name || "Unknown Organization"}
                </h3>
                <p className="text-sm text-gray-600">Event Organizer</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>{event.description}</p>
            {isExpanded && (
              <p>Additional details about the event.</p>
            )}
            <Button 
              variant="link" 
              className="p-0 h-auto text-primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={() => router.push('/admin-dashboard')}>
              Admin Dashboard
            </Button>
            <Button onClick={onRegister}>
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
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
              <ImagePlaceholder />
            )}
          </div>
        </div>
      </div>

      {event.guestSpeakers?.length > 0 && (
        <SpeakersSection speakers={event.guestSpeakers} />
      )}

      {event.eventTimeline?.length > 0 && (
        <ScheduleSection timeline={event.eventTimeline} />
      )}

      <LocationSection 
        address={event.address} 
        city={event.city}
        state={event.state}
        country={event.country}
        googleMapsLink={event.googleMapsLink}
      />

      {event.faqs?.length > 0 && (
        <FAQSection faqs={event.faqs} />
      )}

      {event.ourTeam?.length > 0 && (
        <TeamSection team={event.ourTeam} />
      )}

      <ImagePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageSrc={eventImage || "/placeholder.svg"}
      />
    </>
  );
}

const ImagePlaceholder = () => (
  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);