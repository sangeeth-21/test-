import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Presentation, Users, Coffee } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

interface TimelineSession {
  date: string
  time: string
  title: string
  type: "presentation" | "workshop" | "break"
  description?: string
  speakers?: Array<{
    name: string
    role: string
    company: string
    avatar?: string
  }>
  image?: string
}

interface TimelineProps {
  sessions: TimelineSession[]
}

export function Timeline({ sessions }: TimelineProps) {
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({})

  const toggleSession = (time: string) => {
    setExpandedSessions(prev => ({
      ...prev,
      [time]: !prev[time]
    }))
  }

  const getSessionIcon = (type: TimelineSession["type"]) => {
    switch (type) {
      case "presentation":
        return <Presentation className="w-5 h-5" />
      case "workshop":
        return <Users className="w-5 h-5" />
      case "break":
        return <Coffee className="w-5 h-5" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy")
  }

  return (
    <div className="space-y-4 relative">
      {sessions.map((session, index) => (
        <div key={session.time} className="flex flex-col sm:flex-row gap-4 relative">
          <div className="flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0 w-full sm:w-32 pt-4 text-sm text-gray-500 relative flex-shrink-0">
            <div className="font-medium text-primary">{formatDate(session.date)}</div>
            <div className="bg-primary text-white px-2 py-1 rounded-full text-xs">{session.time}</div>
          </div>
          <div className="w-full">
            <Card className="flex-1 p-4 hover:shadow-md transition-shadow duration-200">
              <Button
                variant="ghost"
                className="w-full flex flex-col sm:flex-row items-start justify-between p-0 h-auto hover:bg-transparent"
                onClick={() => toggleSession(session.time)}
              >
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full items-start sm:items-center">
                  <div className="mr-2 text-primary bg-primary/10 p-2 rounded-full">
                    {getSessionIcon(session.type)}
                  </div>
                  <div className="text-left w-full">
                    <h3 className="font-semibold text-lg">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">{session.type.charAt(0).toUpperCase() + session.type.slice(1)}</p>
                  </div>
                </div>
                <div className="text-primary mt-2 sm:mt-0">
                  {expandedSessions[session.time] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </Button>
              {expandedSessions[session.time] && (
                <div className="mt-4 space-y-4">
                  {session.image && (
                    <div className="mb-4">
                      <img src={session.image} alt={session.title} className="w-full h-48 sm:h-64 object-cover rounded-md" />
                    </div>
                  )}
                  {session.description && (
                    <p className="text-sm text-gray-600">{session.description}</p>
                  )}
                  {session.speakers && session.speakers.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-600">Speakers</h4>
                      <div className="flex flex-wrap gap-4">
                        {session.speakers.map((speaker, index) => (
                          <div key={index} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={speaker.avatar} alt={speaker.name} />
                              <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{speaker.name}</p>
                              <p className="text-xs text-gray-500">{speaker.role}, {speaker.company}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}

