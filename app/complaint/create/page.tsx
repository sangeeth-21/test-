"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Upload, X, ArrowLeft } from 'lucide-react';

export default function ComplaintPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [eventId, setEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    event: '',
    title: '',
    description: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('eventId') || params.get('id'); // Check for both eventId and id for backward compatibility
      if (id) {
        setEventId(id);
        setFormData(prev => ({ ...prev, event: id }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Don't allow changing the event ID if it was passed in the URL
    if (name === 'event' && eventId) return;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('event', formData.event);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (image) {
        formDataToSend.append('image', image);
      }

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('https://dev.api.prolepses.com/v1/support/ticket/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit complaint');
      }

      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted.",
      });

      setFormData({
        event: eventId || '', // Preserve event ID if it was passed via URL
        title: '',
        description: '',
      });
      setImage(null);

      router.push('/complaint');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-gray-50">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.push('/complaint')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold">Support</h1>
            <p className="text-muted-foreground mt-2">
              Please provide details about your complaint regarding the event
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="event">Event ID</Label>
            {eventId ? (
              <div className="relative">
                <Input
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  This complaint will be associated with the specified event
                </p>
              </div>
            ) : (
              <>
                <Input
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  placeholder="Enter event ID"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  If your complaint is related to a specific event, please enter the event ID
                </p>
              </>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Complaint Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief title of your complaint"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Complaint Details</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your complaint in detail"
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Supporting Image (Optional)</Label>
            {image ? (
              <div className="relative">
                <div className="border rounded-md p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <span className="text-sm">{image.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG (MAX. 5MB)
                    </p>
                  </div>
                  <Input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Label>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Complaint"}
              {!isSubmitting && <AlertCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}