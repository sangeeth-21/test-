import { Speaker } from '../types/event'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={speaker.avatar} alt={speaker.name} />
          <AvatarFallback>{speaker.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900">{speaker.name}</h3>
          <p className="text-sm text-gray-600">{speaker.role}</p>
          <p className="text-sm text-gray-600">{speaker.company}</p>
        </div>
      </div>
    </div>
  )
}

