"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, HelpCircle, MessageSquare, FileText, BarChart, Users, Briefcase } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MCBSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  minimized?: boolean;
}

export function MCBSidebar({ className, minimized }: MCBSidebarProps) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className={cn("h-full flex flex-col pt-16", className)}>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-4 p-4">
          <div className="space-y-1">
            <Link href="/mcb">
              <Button
                variant={isActive("/mcb") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                {!minimized && <span className="ml-2">MCB Dashboard</span>}
              </Button>
            </Link>
            <Link href="/mcb/analytics">
              <Button
                variant={isActive("/mcb/analytics") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <BarChart className="h-4 w-4" />
                {!minimized && <span className="ml-2">Analytics</span>}
              </Button>
            </Link>
            <Link href="/mcb/clients">
              <Button
                variant={isActive("/mcb/clients") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <Users className="h-4 w-4" />
                {!minimized && <span className="ml-2">Clients</span>}
              </Button>
            </Link>
            <Link href="/mcb/projects">
              <Button
                variant={isActive("/mcb/projects") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <Briefcase className="h-4 w-4" />
                {!minimized && <span className="ml-2">Projects</span>}
              </Button>
            </Link>
            <Link href="/mcb/settings">
              <Button
                variant={isActive("/mcb/settings") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <Settings className="h-4 w-4" />
                {!minimized && <span className="ml-2">Settings</span>}
              </Button>
            </Link>
            <Link href="/mcb/help">
              <Button
                variant={isActive("/mcb/help") ? "secondary" : "ghost"}
                className={cn(
                  "w-full",
                  minimized ? "justify-center px-0" : "justify-start"
                )}
              >
                <HelpCircle className="h-4 w-4" />
                {!minimized && <span className="ml-2">Help</span>}
              </Button>
            </Link>
            <Link href="/mcb/feedback">
              <Button
                variant={isActive("/mcb/feedback") ? "secondary" : "ghost"}
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

