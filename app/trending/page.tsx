'use client'

import { useState, useEffect } from 'react'
import { EventsGrid } from '@/components/events-grid'
import { Carousel } from '@/components/carousel'
import { SearchBar } from '@/components/search-bar'
import { Button } from "@/components/ui/button"
import { Laptop, Code, Users, MicIcon as Microphone, Rocket, GraduationCap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { LoadingSpinner } from '@/components/loading-spinner'
import { Event } from '@/components/event-card'
import { EmptyState } from '@/components/empty-state'

const ITEMS_PER_PAGE = 9

const carouselSlides = [
  {
    id: "1",
    title: "AI and Machine Learning Summit",
    description: "Explore the latest advancements in AI and machine learning with industry experts.",
    image: "/placeholder.svg?height=900&width=1600",
    badge: "Featured Event",
    rating: "4.9",
    organizer: {
      name: "TechConf",
      role: "Event Organizer",
      avatar: "/placeholder.svg?height=50&width=50"
    }
  },
  {
    id: "2",
    title: "Blockchain Revolution Conference",
    description: "Discover how blockchain is transforming industries and shaping the future of technology.",
    image: "/placeholder.svg?height=900&width=1600",
    badge: "Hot Topic",
    rating: "4.8",
    organizer: {
      name: "CryptoEvents",
      role: "Blockchain Specialists",
      avatar: "/placeholder.svg?height=50&width=50"
    }
  },
  {
    id: "3",
    title: "Cybersecurity in the Digital Age",
    description: "Learn about the latest threats and defense strategies in the world of cybersecurity.",
    image: "/placeholder.svg?height=900&width=1600",
    badge: "Critical Knowledge",
    rating: "4.7",
    organizer: {
      name: "SecureTech",
      role: "Security Experts",
      avatar: "/placeholder.svg?height=50&width=50"
    }
  }
]

export default function TrendingPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrendingEvents = async () => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1]

    if (!token) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get<Event[]>(
        'https://dev.api.prolepses.com/v1/event/trending',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      setEvents(response.data)
    } catch (error) {
      console.error('Failed to fetch trending events:', error)
      setError('Failed to load trending events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingEvents()
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          <div className="mb-8">
            <SearchBar />
          </div>
          
          {/* Optional Carousel (commented out) */}
          {/* <div className="mb-12">
            <Carousel slides={carouselSlides} />
          </div> */}
          
          {/* Optional Categories (commented out) */}
          {/* <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Webinar', icon: Laptop },
                { name: 'Hackathon', icon: Code },
                { name: 'Networking', icon: Users },
                { name: 'Conference', icon: Microphone },
                { name: 'Startup Pitch', icon: Rocket },
                { name: 'Workshop', icon: GraduationCap },
              ].map((category) => (
                <Button 
                  key={category.name} 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => router.push(`/category/${category.name.toLowerCase()}`)}
                >
                  <category.icon className="h-8 w-8 mb-2" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </div> */}

          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Trending Events</h2>
              {events.length > 0 && (
                <Button 
                  variant="ghost" 
                  onClick={fetchTrendingEvents}
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </Button>
              )}
            </div>

            {loading && events.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load events</h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <Button onClick={fetchTrendingEvents}>Try Again</Button>
                </div>
              </div>
            ) : events.length === 0 ? (
              <EmptyState 
                title="No Trending Events"
                description="There are currently no trending events. Check back later!"
                icon={<Rocket className="h-10 w-10 text-gray-400" />}
              />
            ) : (
              <EventsGrid initialEvents={events} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}