'use client'

import { useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from './loading-spinner'
import axios from 'axios'
import { EventCard } from './event-card'
import { Event } from './event-card'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface EventsGridProps {
  initialEvents?: Event[]
}

const TimeFilter = ({ onFilterChange }: { onFilterChange: (filterId: string) => void }) => {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
  ]

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId)
    onFilterChange(filterId)
  }

  return (
    <div className="relative w-full overflow-x-auto">
      <div className="flex flex-wrap gap-2 mb-6 min-w-full">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeFilter === filter.id 
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function EventsGrid({ initialEvents = [] }: EventsGridProps) {
  const router = useRouter()
  const [allEvents, setAllEvents] = useState<Event[]>(initialEvents)
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeFilter, setTimeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { ref, inView } = useInView()

  const filterEventsByTime = useCallback((events: Event[], filter: string) => {
    const now = new Date()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const endOfToday = new Date(today)
    endOfToday.setHours(23, 59, 59, 999)

    const endOfWeek = new Date()
    endOfWeek.setDate(endOfWeek.getDate() + 7)
    endOfWeek.setHours(23, 59, 59, 999)

    const endOfMonth = new Date()
    endOfMonth.setMonth(endOfMonth.getMonth() + 1)
    endOfMonth.setDate(0)
    endOfMonth.setHours(23, 59, 59, 999)

    return events.filter(event => {
      const startDate = new Date(event.startDate)
      const endDate = new Date(event.endDate)

      // Always ignore completed events
      if (endDate < now) return false

      // Apply search filter if there's a query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          (event.title?.toLowerCase() || '').includes(query) ||
          (event.description?.toLowerCase() || '').includes(query) ||
          (event.location?.toLowerCase() || '').includes(query)
        if (!matchesSearch) return false
      }

      switch (filter) {
        case 'today':
          return startDate <= endOfToday && endDate >= today
        case 'this-week':
          return startDate <= endOfWeek && endDate >= today
        case 'this-month':
          return startDate <= endOfMonth && endDate >= today
        case 'all':
        default:
          return true // Still filtered to only upcoming events in the outer logic
      }
    })
  }, [searchQuery])

  const fetchEvents = useCallback(async () => {
    if (typeof window === 'undefined') return

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
      const response = await axios.post<Event[]>(
        'https://dev.api.prolepses.com/v1/event/find/all',
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const now = new Date()

      const eventsWithIds = response.data
        .map(event => ({
          ...event,
          _id: event._id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }))
        .filter(event => new Date(event.endDate) >= now) // Keep only upcoming events

      setAllEvents(eventsWithIds)
      setFilteredEvents(filterEventsByTime(eventsWithIds, timeFilter))
    } catch (error) {
      console.error('Failed to fetch events:', error)
      setError('Failed to load events. Please try again later.')
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [router, timeFilter, filterEventsByTime])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useEffect(() => {
    setFilteredEvents(filterEventsByTime(allEvents, timeFilter))
  }, [timeFilter, allEvents, filterEventsByTime, searchQuery])

  const handleFilterChange = (filterId: string) => {
    setTimeFilter(filterId)
  }

  const handleEventUpdate = (updatedEvent: Event) => {
    setAllEvents(prevEvents => 
      prevEvents.map(event => 
        event._id === updatedEvent._id ? updatedEvent : event
      )
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilteredEvents(filterEventsByTime(allEvents, timeFilter))
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
        <button
          onClick={fetchEvents}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="relative w-full max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search events by title, description or location..."
            className="pl-10 pr-24 h-10 flex-grow bg-white border-gray-200 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="default"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 text-sm"
            type="submit"
          >
            Search
          </Button>
        </form>
      </div>
      
      <TimeFilter onFilterChange={handleFilterChange} />
      
      {filteredEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event._id}
                event={event}
                onBookmarkToggle={handleEventUpdate}
              />
            ))}
          </div>
          {loading && (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-600 p-4">
          {searchQuery ? 
            'No events found matching your search criteria.' : 
            'No upcoming events found.'}
        </div>
      )}
      <div ref={ref} className="h-10" />
    </div>
  )
}