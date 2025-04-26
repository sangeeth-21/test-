"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Users, Settings, HelpCircle, MessageSquare, FileText, UserPlus, UserCheck, UserX } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface PeopleSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  minimized?: boolean;
}

export function PeopleSidebar({ className, minimized }: PeopleSidebarProps) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className={cn("h-full flex flex-col pt-16", className)}>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-4 p-4">
          <div className="space-y-1">
            <Link href="/people">
              <Button
                variant={isActive("/people") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <Users className="h-4 w-4" />
                {!minimized && <span className="ml-2">People Dashboard</span>}
              </Button>
            </Link>
            <Link href="/people/connections">
              <Button
                variant={isActive("/people/connections") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <UserCheck className="h-4 w-4" />
                {!minimized && <span className="ml-2">Connections</span>}
              </Button>
            </Link>
            <Link href="/people/invitations">
              <Button
                variant={isActive("/people/invitations") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <UserPlus className="h-4 w-4" />
                {!minimized && <span className="ml-2">Invitations</span>}
              </Button>
            </Link>
            <Link href="/people/blocked">
              <Button
                variant={isActive("/people/blocked") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <UserX className="h-4 w-4" />
                {!minimized && <span className="ml-2">Blocked Users</span>}
              </Button>
            </Link>
            <Link href="/people/settings">
              <Button
                variant={isActive("/people/settings") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <Settings className="h-4 w-4" />
                {!minimized && <span className="ml-2">Settings</span>}
              </Button>
            </Link>
            <Link href="/people/help">
              <Button
                variant={isActive("/people/help") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <HelpCircle className="h-4 w-4" />
                {!minimized && <span className="ml-2">Help</span>}
              </Button>
            </Link>
            <Link href="/people/feedback">
              <Button
                variant={isActive("/people/feedback") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <MessageSquare className="h-4 w-4" />
                {!minimized && <span className="ml-2">Send Feedback</span>}
              </Button>
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

