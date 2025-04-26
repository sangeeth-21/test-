'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils' // Import the `cn` utility function

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "min-h-screen bg-gray-50 flex flex-col overflow-x-hidden")}>
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
      </body>
    </html>
  )
}
