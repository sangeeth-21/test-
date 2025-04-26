// Speaker interface for event speakers
export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

// EventHighlight interface for event statistics/features
export interface EventHighlight {
  count: string;
  label: string;
  icon: string;
}

// Organizer interface to maintain consistency
export interface Organizer {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

// Main TechEvent interface with all required fields
export interface TechEvent {
  id: string;
  title: string;
  description: string;
  extendedDescription?: string;
  date: string;
  location: string;
  amount: number;
  imageUrl?: string;
  bookmarked?: boolean;
  organizer: Organizer;
  speakers?: Speaker[];
  highlights?: EventHighlight[];
}

// Detailed version of event for event details page
export interface EventDetails extends Omit<TechEvent, 'id' | 'bookmarked'> {
  extendedDescription: string;  // Required in details, optional in TechEvent
  speakers: Speaker[];         // Required in details, optional in TechEvent
  highlights: EventHighlight[]; // Required in details, optional in TechEvent
}

// types/event.ts
export interface Event {
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