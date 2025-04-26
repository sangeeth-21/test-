"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, ThumbsDown } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { formatCommentDate } from './utils';
import { Comment } from './types';

interface EventCommentsProps {
  id: string | null;
}

export default function EventComments({ id }: EventCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [openReplyIds, setOpenReplyIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) return;

        const response = await fetch(`https://dev.api.prolepses.com/v1/support/ticket/${id}/comment/find/all`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error("Failed to fetch comments");
        setComments(await response.json());
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    if (id) fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      signin
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
      const formData = new FormData();
      formData.append('comment', newComment);

      const response = await fetch(`https://dev.api.prolepses.com/v1/support/ticket/${id}/comment/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to post comment");
      
      setComments(prev => [await response.json(), ...prev]);
      setNewComment("");
      toast({
        title: "Success",
        description: "Your comment has been posted.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to post comment",
      });
    } finally {
      setIsCommentLoading(false);
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      signin
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
      const formData = new FormData();
      formData.append('comment', replyContent);

      const response = await fetch(`https://dev.api.prolepses.com/v1/support/ticket/${id}/comment/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to post reply");
      
      setComments(prev => [await response.json(), ...prev]);
      setReplyContent("");
      setOpenReplyIds(prev => prev.filter(id => id !== commentId));
      setReplyingTo(null);
      toast({
        title: "Success",
        description: "Your reply has been posted.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to post reply",
      });
    } finally {
      setIsCommentLoading(false);
    }
  };

  return (
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
  );
}