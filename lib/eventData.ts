import { TechEvent, Speaker, EventHighlight, Organizer } from '@/types/event'

const eventTitles = [
  'AI and Machine Learning Conference',
  'Web Development Summit',
  'Cybersecurity Symposium',
  'IoT Innovation Forum',
  'Blockchain and Cryptocurrency Conference',
  'Data Science and Analytics Summit',
  'Cloud Computing Expo',
  'Mobile App Development Workshop',
  'DevOps and Automation Conference',
  'Virtual Reality and Augmented Reality Showcase',
  'Quantum Computing Seminar',
  '5G and Beyond: Telecommunications Forum',
  'Green Tech and Sustainability Conference',
  'Robotics and Automation Expo',
  'Fintech Disruption Summit'
]

const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Washington, D.C.',
  'Chicago, IL',
  'Miami, FL',
  'Seattle, WA',
  'Austin, TX',
  'Los Angeles, CA',
  'Boston, MA',
  'Denver, CO',
  'Atlanta, GA',
  'Dallas, TX',
  'Toronto, Canada',
  'London, UK',
  'Berlin, Germany'
]

// Sample speakers data
const sampleSpeakers: Speaker[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'AI Research Director',
    company: 'TechCorp Inc.',
    avatar: '/api/placeholder/150/150'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Senior Developer Advocate',
    company: 'Cloud Systems',
    avatar: '/api/placeholder/150/150'
  }
]

// Sample highlights data
const sampleHighlights: EventHighlight[] = [
  {
    count: '50+',
    label: 'Speakers',
    icon: 'users'
  },
  {
    count: '3',
    label: 'Days',
    icon: 'calendar'
  },
  {
    count: '20+',
    label: 'Workshops',
    icon: 'presentation'
  }
]

function getRandomAmount(): number {
  const amounts = [99, 149, 199, 249, 299, 349, 399, 449, 499, 549];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

export function getEvents(page: number, pageSize: number): TechEvent[] {
  const startIndex = (page - 1) * pageSize
  return Array.from({ length: pageSize }, (_, index) => {
    const eventIndex = (startIndex + index) % eventTitles.length
    const locationIndex = (startIndex + index) % locations.length
    const date = new Date()
    date.setDate(date.getDate() + startIndex + index)

    const organizer: Organizer = {
      id: `org${startIndex + index + 1}`,
      name: `Organizer ${startIndex + index + 1}`,
      role: 'Event Coordinator',
      avatar: '/api/placeholder/150/150'
    }

    return {
      id: `${startIndex + index + 1}`,
      title: eventTitles[eventIndex],
      description: `Join us for an exciting event focused on ${eventTitles[eventIndex].toLowerCase()}.`,
      extendedDescription: `Join industry experts and thought leaders for an immersive experience in ${eventTitles[eventIndex].toLowerCase()}. This event will feature hands-on workshops, keynote speeches, and networking opportunities.`,
      date: date.toISOString().split('T')[0],
      location: locations[locationIndex],
      amount: getRandomAmount(),
      organizer,
      bookmarked: false,
      imageUrl: `/api/placeholder/800/400`,
      speakers: sampleSpeakers,
      highlights: sampleHighlights
    }
  })
}

export function updateEvent(updatedEvent: TechEvent): void {
  // In a real application, this would update the event in a database
  console.log('Updating event:', updatedEvent)
}