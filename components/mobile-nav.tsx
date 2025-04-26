"use client"

import * as React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, TrendingUp, Settings, User } from 'lucide-react'

export function MobileNav() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <nav 
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 z-50 pb-safe"
      )} 
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="flex justify-around items-center h-14 sm:h-16">
        {[
          { href: "/", icon: Home, label: "Home" },
          { href: "/trending", icon: TrendingUp, label: "Trending" },
          { href: "/you", icon: User, label: "You" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ].map(({ href, icon: Icon, label }) => (
          <React.Fragment key={href}>
            <Link
              href={href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs sm:text-sm",
                pathname === href ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => window.scrollTo(0, 0)}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
              <span>{label}</span>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </nav>
  )
}

