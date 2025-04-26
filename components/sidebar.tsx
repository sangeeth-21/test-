"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Settings, Building2, MessagesSquare, HelpCircle, History, Star, ChevronDown, TrendingUp, Home, User, AlertCircle } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Bookmark, Calendar, Palette, Bell } from 'lucide-react'
import { Info } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Check, ChevronsUpDown, PlusCircle, Plus } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { MessageSquare } from 'lucide-react'

type Team = {
  label: string
  value: string
}

const teams: Team[] = [
  {
    label: "Events",
    value: "events",
  },
]

function TeamSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(teams[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className="w-[200px] justify-between"
        >
          Tech Events
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.value}
                  onSelect={() => {
                    setSelectedTeam(team)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  {team.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedTeam.value === team.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  window.location.href = '/connect'
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Connect
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  minimized?: boolean;
}

export function Sidebar({ className, minimized }: SidebarProps) {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <div className={cn("h-full flex flex-col pt-16", className)}>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-4 p-4">
          <div>
            <div className="space-y-1">
              <Link href="/">
                <Button
                  variant={isActive("/") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <Home className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Home</span>}
                </Button>
              </Link>
              <Link href="/trending">
                <Button
                  variant={isActive("/trending") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <TrendingUp className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Trending</span>}
                </Button>
              </Link>
              <Separator className="my-2" />
              <Link href="/you">
                <Button
                  variant={isActive("/you") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <User className="h-4 w-4" />
                  {!minimized && <span className="ml-2">You</span>}
                </Button>
              </Link>
              <Link href="/bookmark">
                <Button
                  variant={isActive("/bookmark") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <Bookmark className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Bookmark</span>}
                </Button>
              </Link>
              <Link href="/history">
                <Button
                  variant={isActive("/history") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <History className="h-4 w-4" />
                  {!minimized && <span className="ml-2">History</span>}
                </Button>
              </Link>
              <Link href="/upcoming-events">
                <Button
                  variant={isActive("/upcoming-events") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <Calendar className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Upcoming Events</span>}
                </Button>
              </Link>
              <Separator className="my-2" />
              <Link href="/settings">
                <Button
                  variant={isActive("/settings") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Settings</span>}
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  variant={isActive("/help") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <HelpCircle className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Help</span>}
                </Button>
              </Link>
              <Link href="/send-feedback">
                <Button
                  variant={isActive("/send-feedback") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <MessageSquare className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Send Feedback</span>}
                </Button>
              </Link>
              <Link href="/complaint">
                <Button
                  variant={isActive("/complaint") ? "secondary" : "ghost"}
                  className={cn(
                    "w-full",
                    minimized ? "justify-center px-0" : "justify-start"
                  )}
                >
                  <AlertCircle className="h-4 w-4" />
                  {!minimized && <span className="ml-2">Support</span>}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}