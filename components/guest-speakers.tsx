import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, User, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface GuestSpeakersProps {
  speakers: { email: string; name: string }[];
  setSpeakers: React.Dispatch<React.SetStateAction<{ email: string; name: string }[]>>;
}

export function GuestSpeakers({ speakers, setSpeakers }: GuestSpeakersProps) {
  const [newSpeakers, setNewSpeakers] = useState<{ name: string; email: string }[]>([{ name: '', email: '' }])

  const addSpeaker = () => {
    const validSpeakers = newSpeakers.filter(speaker => speaker.name && speaker.email)
    if (validSpeakers.length > 0) {
      setSpeakers([...speakers, ...validSpeakers])
      setNewSpeakers([{ name: '', email: '' }])
    }
  }

  const removeSpeaker = (index: number) => {
    setSpeakers(speakers.filter((_, i) => i !== index))
  }

  const handleInputChange = (index: number, field: 'name' | 'email', value: string) => {
    const updatedSpeakers = [...newSpeakers]
    updatedSpeakers[index][field] = value
    setNewSpeakers(updatedSpeakers)

    if (updatedSpeakers[index].name && updatedSpeakers[index].email) {
      addSpeaker()
    }
  }

  return (
    <div className="space-y-4">
      <Label>Guest Speakers</Label>
      <div className="space-y-2">
        {speakers.map((speaker, index) => (
          <div key={index} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${speaker.name}`} />
              <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="font-medium">{speaker.name}</div>
              <div className="text-sm text-gray-500">{speaker.email}</div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeSpeaker(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      {newSpeakers.map((speaker, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-2 mt-2">
          <Input
            placeholder="Name"
            value={speaker.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <Input
            placeholder="Email"
            value={speaker.email}
            onChange={(e) => handleInputChange(index, 'email', e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              const updatedSpeakers = newSpeakers.filter((_, i) => i !== index);
              setNewSpeakers(updatedSpeakers.length ? updatedSpeakers : [{ name: '', email: '' }]);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        onClick={() => setNewSpeakers([...newSpeakers, { name: '', email: '' }])}
        className="w-full mt-2"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Another Speaker Input
      </Button>
    </div>
  )
}

