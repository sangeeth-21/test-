'use client'

import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { UserProfile } from '@/components/user-profile'
import { EventsGrid } from '@/components/events-grid'
import { getEvents } from '@/lib/eventData'
import { useRouter } from 'next/navigation'
import { TopBar } from '@/components/topbar' // Import the new TopBar component

const inter = Inter({ subsets: ['latin'] })
const ITEMS_PER_PAGE = 9

export default function HomePage() {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [filter, setFilter] = useState('today')
  const [events, setEvents] = useState(getEvents(1, ITEMS_PER_PAGE))
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarMinimized(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    setEvents(getEvents(1, ITEMS_PER_PAGE)) // Adjust this according to filtering logic
  }

  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-background')}>
        <div className="flex h-screen overflow-hidden">
          <div className="flex flex-col w-full">
            <TopBar isSidebarMinimized={isSidebarMinimized} setIsSidebarMinimized={setIsSidebarMinimized} />
            <div className="flex flex-1 overflow-hidden">
              <div
                className={cn(
                  'hidden md:flex md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ease-in-out',
                  isSidebarMinimized ? 'md:w-16' : 'lg:w-64 md:w-16'
                )}
              >
                <Sidebar minimized={isSidebarMinimized} />
              </div>
              <div
                className={cn(
                  'flex flex-col flex-1 transition-all duration-300 ease-in-out',
                  isSidebarMinimized ? 'md:ml-16' : 'lg:ml-64 md:ml-16'
                )}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4 md:hidden">
                  <div className="flex items-center">
                    <MobileNav />
                    <div className="w-8 h-8 bg-primary rounded-full mr-2" />
                    <h1 className="text-lg font-semibold">Tech Events</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <UserProfile name="Loading..." role="User" image="/placeholder.svg" />
                  </div>
                </div>
                <main className="flex-1 overflow-y-auto relative pb-16 sm:pb-20">
                  <div className="min-h-screen bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="py-8 sm:py-12">
                        <div className="mb-8">
                          <EventsGrid initialEvents={events} />
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
