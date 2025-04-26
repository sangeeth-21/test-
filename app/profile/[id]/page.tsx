"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Mail, LinkIcon, ArrowLeft, Github, Twitter, Linkedin, Instagram, Facebook, Music, Globe, Star } from 'lucide-react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { EventCard } from '@/components/event-card'
import { Badge } from "@/components/ui/badge"

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  bio: string;
  email: string;
  website: string;
  location: string;
  joinDate: string;
  completedSessions: number;
  yearsExperience: string;
}

type Tab = 'home' | 'upcoming' | 'about'

export default function SpeakerProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [speaker, setSpeaker] = useState<Speaker | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('home')

  useEffect(() => {
    const speakerId = params.id as string
    // In a real application, you would fetch the speaker data from an API
    // For now, we'll use mock data
    const mockSpeakers: Record<string, Speaker> = {
      'jane-smith': {
        id: 'jane-smith',
        name: "Jane Smith",
        role: "AI Research Lead",
        company: "TechCorp",
        avatar: '/placeholder.svg',
        bio: "Jane Smith is a leading expert in artificial intelligence, with over 15 years of experience in the field.",
        email: "jane.smith@techcorp.com",
        website: "https://janesmith.com",
        location: "San Francisco, CA",
        joinDate: "Joined April 2021",
        completedSessions: 351,
        yearsExperience: "15+",
      },
      'john-doe': {
        id: 'john-doe',
        name: "John Doe",
        role: "CTO",
        company: "InnovateTech",
        avatar: '/placeholder.svg',
        bio: "John Doe is a visionary CTO with a passion for cutting-edge technology and innovation.",
        email: "john.doe@innovatetech.com",
        website: "https://johndoe.tech",
        location: "New York, NY",
        joinDate: "Joined January 2020",
        completedSessions: 287,
        yearsExperience: "20+",
      },
      'alice-johnson': {
        id: 'alice-johnson',
        name: "Alice Johnson",
        role: "Data Science Director",
        company: "DataCo",
        avatar: '/placeholder.svg',
        bio: "Alice Johnson is a data science expert, specializing in big data analytics and machine learning.",
        email: "alice.johnson@dataco.com",
        website: "https://alicejohnson.io",
        location: "Boston, MA",
        joinDate: "Joined August 2022",
        completedSessions: 193,
        yearsExperience: "10+",
      }
    }
    setSpeaker(mockSpeakers[speakerId] || null)
  }, [params.id])

  if (!speaker) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Speaker Not Found</h1>
        <p>Sorry, we couldn't find the speaker you're looking for.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    )
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'upcoming', label: 'Upcoming Events' },
    { id: 'about', label: 'About' },
  ]

  const renderSocialLinks = () => (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Links</h3>
      <div className="space-y-3">
        <a
          href={speaker.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary"
        >
          <Globe className="w-6 h-6 text-gray-600" />
          <span className="truncate">{speaker.website}</span>
        </a>
      </div>
    </Card>
  )

  const renderCertifications = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      <Badge variant="secondary">AI Specialist</Badge>
      <Badge variant="secondary">Machine Learning Expert</Badge>
      <Badge variant="secondary">Data Science Professional</Badge>
    </div>
  )

  const renderContent = () => {
    if (activeTab === 'about') {
      return (
        <div className="space-y-6">
          {renderSocialLinks()}
          {renderCertifications()}
        </div>
      )
    }

    const events = [
      { id: 'event1', name: 'AI Summit 2024', date: '2024-03-15' },
      { id: 'event2', name: 'Machine Learning Conference', date: '2024-04-22' },
    ]
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={{
              id: event.id,
              title: event.name,
              description: "Event description placeholder",
              date: event.date,
              location: speaker.location,
              organizer: {
                id: speaker.id,
                name: speaker.name,
                role: speaker.role,
              }
            }}
            onUpdate={() => {}}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 flex items-center"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-4">
            <AvatarImage src={speaker.avatar} alt={speaker.name} />
            <AvatarFallback>{speaker.name[0]}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{speaker.name}</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">{speaker.role} at {speaker.company}</p>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{speaker.location}</span>
            <span className="mx-2">•</span>
            <span>{speaker.joinDate}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto w-full">
            <Card className="p-4">
              <div className="text-2xl font-bold text-primary">{speaker.completedSessions}</div>
              <div className="text-sm text-muted-foreground">Completed Sessions</div>
            </Card>
            <Card className="p-4">
              <div className="text-2xl font-bold text-primary">{speaker.yearsExperience}</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap space-x-4 sm:space-x-8" aria-label="Events">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "border-b-2 py-3 sm:py-4 px-1 text-sm sm:text-base font-medium",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

