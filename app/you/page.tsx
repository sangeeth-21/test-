"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookmarksContent from '@/app/bookmark/page'
import HistoryContent from '@/app/history/page'
import EventContent from '@/app/upcoming-events/page'
import { LoadingSpinner } from '@/components/loading-spinner'
import axios from 'axios'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

interface UserData {
  _id: string
  email: string
  profilePhoto?: string
  name?: string
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('bookmarks')
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const isMobile = useIsMobile()

  const navigationItems = [
    { id: 'bookmarks', label: "Bookmarks", path: '/bookmark' },
    { id: 'history', label: "History", path: '/history' },
    { id: 'upcoming-events', label: "Upcoming Events", path: '/events' }
  ]

  useEffect(() => {
    const fetchUserData = async () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1]

      if (!token) {
        router.push('/login')
        return
      }

      try {
        const response = await axios.get('https://dev.api.prolepses.com/v1/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        setUserData(response.data)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        setError('Failed to load profile data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleNavigation = (item: { id: string; path: string }) => {
    if (isMobile) {
      router.push(item.path)
    } else {
      setActiveTab(item.id)
    }
  }

  const getInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase()
  }

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-red-600 p-4">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage 
              src={userData.profilePhoto || "/placeholder.svg"} 
              alt="Profile picture" 
            />
            <AvatarFallback>
              {userData.name ? 
                userData.name.split(' ').map(n => n[0]).join('') : 
                getInitials(userData.email)
              }
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">
              {userData.name || userData.email.split('@')[0]}
            </h1>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Your Profile</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Manage your personal information and preferences.
        </p>
        <div className="h-px bg-border mt-6" />
      </div>

      {isMobile ? (
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/80"
            >
              {item.label}
            </button>
          ))}
        </nav>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            {navigationItems.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                onClick={() => handleNavigation(item)}
                className="data-[state=active]:bg-secondary"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="bookmarks">
            <BookmarksContent />
          </TabsContent>
          <TabsContent value="history">
            <HistoryContent />
          </TabsContent>
          <TabsContent value="upcoming-events">
            <EventContent />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}