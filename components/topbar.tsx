'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/components/user-profile'
import { MenuIcon } from 'lucide-react'

interface TopBarProps {
  isSidebarMinimized: boolean
  setIsSidebarMinimized: (value: boolean) => void
}

export function TopBar({ isSidebarMinimized, setIsSidebarMinimized }: TopBarProps) {
  const [user, setUser] = useState<{ firstName: string; lastName: string; profilePhoto: string } | null>(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='))
      const token = tokenCookie ? tokenCookie.split('=')[1] : null

      if (!token) return

      const response = await fetch('https://dev.api.prolepses.com/v1/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data)
      } else {
        console.error('Failed to fetch user details')
      }
    }

    fetchUserDetails()
  }, [])

  const handleNewEventClick = () => {
    window.open('https://dev.admin.prolepses.com/create-event', '_blank') // Opens Google in a new tab
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20 hidden md:block w-full">
      <div className="w-full px-6 py-4 min-h-[4rem]">
        <div className="flex items-center">
          {/* Sidebar Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
            className="mr-2"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>

          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-primary rounded-full mr-2" />
          <h1 className="text-lg font-semibold">Tech Events</h1>

          <div className="flex-grow" />

          {/* "+ New Event" Button with white background, black text, and outline */}
          <Button
            className="border border-black text-black bg-white hover:bg-gray-100 mr-4"
            onClick={handleNewEventClick}
          >
            + New Event
          </Button>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserProfile
                name={`${user.firstName} ${user.lastName}`}
                role="User"
                image={user.profilePhoto}
              />
            ) : (
              <UserProfile name="Loading..." role="User" image="/placeholder.svg" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
