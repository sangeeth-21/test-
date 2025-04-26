"use client"

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { EventCard } from '@/components/event-card'
import { Event } from '@/components/event-card'
import axios from 'axios'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function BookmarkPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getAuthToken = (): string | null => {
    if (typeof document === 'undefined') return null
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1] || null
  }

  const fetchBookmarkedEvents = async () => {
    const token = getAuthToken()
    if (!token) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get<Event[]>(
        'https://dev.api.prolepses.com/v1/event/bookmarked',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      setEvents(response.data)
    } catch (error) {
      console.error('Failed to fetch bookmarked events:', error)
      setError('Failed to load bookmarked events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookmarkedEvents()
  }, [])

  const handleBookmarkToggle = (updatedEvent: Event) => {
    setEvents(prevEvents => 
      prevEvents.filter(event => event._id !== updatedEvent._id)
    )
  }

  const groupedEvents = useMemo(() => {
    if (!events.length) return {}

    const grouped = events.reduce((acc, event) => {
      const date = new Date(event.startDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(event)
      return acc
    }, {} as Record<string, Event[]>)

    // Sort dates chronologically
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime()
    })

    // If more than 2 date groups, show only first and last
    if (sortedDates.length <= 2) {
      return sortedDates.reduce((acc, date) => {
        acc[date] = grouped[date]
        return acc
      }, {} as Record<string, Event[]>)
    }

    return {
      [sortedDates[0]]: grouped[sortedDates[0]],
      [sortedDates[sortedDates.length - 1]]: grouped[sortedDates[sortedDates.length - 1]]
    }
  }, [events])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Bookmarked Events</h1>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Bookmarked Events</h1>
        <div className="text-center text-red-600 p-4">
          {error}
          <button
            onClick={fetchBookmarkedEvents}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!events.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Bookmarked Events</h1>
        <div className="text-center text-gray-500 p-8">
          You haven't bookmarked any events yet.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bookmarked Events</h1>
      {Object.entries(groupedEvents).map(([date, dateEvents]) => (
        <div key={date} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">{date}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dateEvents.map((event) => (
              <EventCard 
                key={event._id} 
                event={event} 
                onBookmarkToggle={handleBookmarkToggle} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}