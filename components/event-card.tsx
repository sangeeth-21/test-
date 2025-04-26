"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bookmark, Share2, IndianRupee } from "lucide-react"
import axios from "axios"

interface Organization {
  _id: string
  name: string
}

interface Organizer {
  _id: string
  email: string
}

interface RegisteredUser {
  user: {
    _id: string
    email: string
  }
  registeredAt: string
}

export interface Event {
  _id: string
  name: string
  type: string
  category: string
  description: string
  tags: string[]
  organization: Organization | null
  organizer: Organizer
  status: string
  address: string
  city: string
  state: string
  country?: string
  pincode?: string
  startDate: string
  endDate: string
  googleMapsLink?: string
  minimumAge?: number
  bookmarked?: boolean
  imageUrl?: string
  thumbnail?: string
  poster?: string
  amount: number
  registeredUsers?: RegisteredUser[]
}

interface EventCardProps {
  event: Event
  onBookmarkToggle: (updatedEvent: Event) => void
}

export function EventCard({ event, onBookmarkToggle }: EventCardProps) {
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(event.bookmarked)
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([])

  useEffect(() => {
    const fetchBookmarkedEvents = async () => {
      const token = getAuthToken()
      if (!token) return

      try {
        const response = await axios.get("https://dev.api.prolepses.com/v1/event/bookmarked", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.status === 200 && response.data) {
          const bookmarkedEventIds = response.data.map((event: Event) => event._id)
          setBookmarkedEvents(bookmarkedEventIds)
          setIsBookmarked(bookmarkedEventIds.includes(event._id))
        }
      } catch (error) {
        console.error("Error fetching bookmarked events:", error)
      }
    }

    fetchBookmarkedEvents()
  }, [event._id])

  const getAuthToken = (): string | null => {
    if (typeof document === "undefined") return null
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] || null
  }

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.stopPropagation()

    const token = getAuthToken()
    if (!token) {
      router.push("/login")
      return
    }

    const url = isBookmarked
      ? `https://dev.api.prolepses.com/v1/event/${event._id}/unbookmark`
      : `https://dev.api.prolepses.com/v1/event/${event._id}/bookmark`

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.status === 200) {
        const newBookmarkedStatus = !isBookmarked
        setIsBookmarked(newBookmarkedStatus)
        
        // Update local bookmarked events list
        if (newBookmarkedStatus) {
          setBookmarkedEvents([...bookmarkedEvents, event._id])
        } else {
          setBookmarkedEvents(bookmarkedEvents.filter(id => id !== event._id))
        }
        
        onBookmarkToggle({ ...event, bookmarked: newBookmarkedStatus })
      } else {
        console.error("Failed to toggle bookmark")
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    }
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-full relative"
      onClick={() => router.push(`/event?id=${event._id}`)}
    >
      <CardHeader className="p-0 flex-shrink-0 relative">
        <div className="w-full h-60 bg-gray-100 relative overflow-hidden">
          {event.thumbnail ? (
            <img
              src={event.thumbnail}
              alt={`${event.name} thumbnail`}
              className="w-full h-full object-cover rounded-t-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = "/placeholder-event.jpg"
              }}
            />
          ) : event.poster ? (
            <img
              src={event.poster}
              alt={`${event.name} event poster`}
              className="w-full h-full object-cover rounded-t-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = "/placeholder-event.jpg"
              }}
            />
          ) : event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={`${event.name} event cover`}
              className="w-full h-full object-cover rounded-t-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = "/placeholder-event.jpg"
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-t-lg">
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
            </div>
          )}
          {event.amount > 0 && (
            <div className="absolute bottom-4 right-4 z-10 backdrop-blur-sm bg-white/30 rounded-lg p-2 shadow-sm">
              <div className="flex items-center text-white font-medium">
                <IndianRupee className="w-4 h-4 mr-1" />
                <span>{event.amount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{event.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{event.description}</p>
        <div className="mt-auto">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{new Date(event.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>{event.city}, {event.state}</span>
          </div>
          {event.registeredUsers && event.registeredUsers.length > 0 && (
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <span>{event.registeredUsers.length} registered</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {event.organization?.name ? event.organization.name.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-gray-800 line-clamp-1">
              {event.organization?.name || "Unknown Organization"}
            </p>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="p-2" onClick={handleBookmarkToggle}>
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current text-blue-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}