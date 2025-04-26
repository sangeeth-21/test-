import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from 'lucide-react'

interface EventTimelineProps {
  timelineEvents: { date: string; time: string; title: string; type: string; speakerName?: string; speakerEmail?: string }[];
  setTimelineEvents: React.Dispatch<React.SetStateAction<{ date: string; time: string; title: string; type: string; speakerName?: string; speakerEmail?: string }[]>>;
}

export function EventTimeline({ timelineEvents, setTimelineEvents }: EventTimelineProps) {
  return (
    <div className="space-y-4">
      <Label>Event Timeline</Label>
      {timelineEvents.length === 0 ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setTimelineEvents([{ date: new Date().toISOString().split('T')[0], time: '09:00', title: '', type: 'presentation', speakerName: '', speakerEmail: '' }])}
          className="mt-2"
        >
          Add Timeline Event
        </Button>
      ) : (
        <>
          {timelineEvents.map((event, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={event.date}
                  onChange={(e) => {
                    const newEvents = [...timelineEvents];
                    newEvents[index].date = e.target.value;
                    setTimelineEvents(newEvents);
                  }}
                  className="w-40"
                />
                <div className="flex items-center space-x-1">
                  <Select
                    value={event.time.split(':')[0] || ''}
                    onValueChange={(value) => {
                      const newEvents = [...timelineEvents];
                      const [_, minute] = newEvents[index].time.split(':');
                      const newTime = `${value}:${minute || '00'}`;
                      if (newEvents.some((e, i) => i !== index && e.date === event.date && e.time === newTime)) {
                        alert('This time slot is already taken for this date.');
                        return;
                      }
                      newEvents[index].time = newTime;
                      setTimelineEvents(newEvents);
                    }}
                  >
                    <SelectTrigger className="w-[4.5rem]">
                      <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <SelectItem key={hour} value={hour.toString().padStart(2, '0')}>
                          {hour.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span>:</span>
                  <Select
                    value={event.time.split(':')[1] || ''}
                    onValueChange={(value) => {
                      const newEvents = [...timelineEvents];
                      const [hour, _] = newEvents[index].time.split(':');
                      const newTime = `${hour || '00'}:${value}`;
                      if (newEvents.some((e, i) => i !== index && e.date === event.date && e.time === newTime)) {
                        alert('This time slot is already taken for this date.');
                        return;
                      }
                      newEvents[index].time = newTime;
                      setTimelineEvents(newEvents);
                    }}
                  >
                    <SelectTrigger className="w-[4.5rem]">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {['00', '15', '30', '45'].map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={event.type}
                  onValueChange={(value) => {
                    const newEvents = [...timelineEvents];
                    newEvents[index].type = value;
                    setTimelineEvents(newEvents);
                  }}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="break">Break</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Event Title"
                  value={event.title}
                  onChange={(e) => {
                    const newEvents = [...timelineEvents];
                    newEvents[index].title = e.target.value;
                    setTimelineEvents(newEvents);
                  }}
                  className="flex-grow"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Speaker Name (optional)"
                  value={event.speakerName || ''}
                  onChange={(e) => {
                    const newEvents = [...timelineEvents];
                    newEvents[index].speakerName = e.target.value;
                    setTimelineEvents(newEvents);
                  }}
                  className="flex-grow"
                />
                <Input
                  type="email"
                  placeholder="Speaker Email (optional)"
                  value={event.speakerEmail || ''}
                  onChange={(e) => {
                    const newEvents = [...timelineEvents];
                    newEvents[index].speakerEmail = e.target.value;
                    setTimelineEvents(newEvents);
                  }}
                  className="flex-grow"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTimelineEvents(timelineEvents.filter((_, i) => i !== index))}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => setTimelineEvents([...timelineEvents, { date: new Date().toISOString().split('T')[0], time: '09:00', title: '', type: 'presentation', speakerName: '', speakerEmail: '' }])}
            className="mt-2"
          >
            Add Timeline Event
          </Button>
        </>
      )}
    </div>
  )
}

