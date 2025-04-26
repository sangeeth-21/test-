import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus, User, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EventOrganizersProps {
  organizers: { email: string; level: string; name: string }[];
  setOrganizers: React.Dispatch<React.SetStateAction<{ email: string; level: string; name: string }[]>>;
}

export function EventOrganizers({ organizers, setOrganizers }: EventOrganizersProps) {
  const [newOrganizers, setNewOrganizers] = useState<{ email: string; level: string; name: string }[]>([{ email: '', level: 'member', name: '' }])

  const addOrganizer = () => {
    const validOrganizers = newOrganizers.filter(organizer => organizer.name && organizer.email)
    if (validOrganizers.length > 0) {
      setOrganizers([...organizers, ...validOrganizers])
      setNewOrganizers([{ email: '', level: 'member', name: '' }])
    }
  }

  const handleInputChange = (index: number, field: 'name' | 'email' | 'level', value: string) => {
    const updatedOrganizers = [...newOrganizers]
    updatedOrganizers[index][field] = value
    setNewOrganizers(updatedOrganizers)

    if (updatedOrganizers[index].name && updatedOrganizers[index].email) {
      addOrganizer()
    }
  }

  const removeOrganizer = (index: number) => {
    const updatedOrganizers = newOrganizers.filter((_, i) => i !== index);
    setNewOrganizers(updatedOrganizers.length ? updatedOrganizers : [{ email: '', level: 'member', name: '' }]);
  }


  return (
    <div className="space-y-4">
      <Label>Event Organizers</Label>
      <div className="space-y-2">
        {newOrganizers.map((organizer, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto,auto] gap-2 mt-2">
            <Input
              placeholder="Name"
              value={organizer.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
            <Input
              placeholder="Email"
              value={organizer.email}
              onChange={(e) => handleInputChange(index, 'email', e.target.value)}
            />
            <Select
              value={organizer.level}
              onValueChange={(value) => handleInputChange(index, 'level', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organizer">Organizer</SelectItem>
                <SelectItem value="coordinator">Coordinator</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                const updatedOrganizers = newOrganizers.filter((_, i) => i !== index);
                setNewOrganizers(updatedOrganizers.length ? updatedOrganizers : [{ email: '', level: 'member', name: '' }]);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setNewOrganizers([...newOrganizers, { email: '', level: 'member', name: '' }])}
        className="w-full mt-2"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Another Organizer Input
      </Button>
    </div>
  )
}

