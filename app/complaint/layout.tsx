'use client'

import { Inter } from 'next/font/google'
import '../globals.css'
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { cn } from '@/lib/utils'
import { TopBar } from '@/components/topbar' // Import TopBar
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarMinimized(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-background')}>
        <div className="flex h-screen overflow-hidden">
          <div className="flex flex-col w-full">
            {/* Use the extracted TopBar component */}
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
                <main className="flex-1 overflow-y-auto relative pb-16 sm:pb-20 bg-gray-50">
                  {pathname === '/create-event' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-4 left-4 z-10"
                      onClick={() => window.history.back()}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  {children}
                </main>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
