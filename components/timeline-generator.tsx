"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateTimeline } from "@/app/actions/generate-timeline"
import { Loader2, Plus, Trash2, Clock, User, Calendar } from "lucide-react"

interface TimelineEvent {
  year: number
  event: string
  description: string
}

export function TimelineGenerator() {
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [deathDate, setDeathDate] = useState("")
  const [majorEvents, setMajorEvents] = useState("")
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customEvents, setCustomEvents] = useState<TimelineEvent[]>([])
  const [newEvent, setNewEvent] = useState<Partial<TimelineEvent>>({ year: undefined, event: "", description: "" })

  async function handleGenerate() {
    if (!name || !birthDate || !deathDate) return

    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("birthDate", birthDate)
      formData.append("deathDate", deathDate)
      formData.append("majorEvents", majorEvents)

      const result = await generateTimeline(formData)
      if (result.success) {
        setTimelineEvents(result.timeline)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleAddCustomEvent() {
    if (newEvent.year && newEvent.event && newEvent.description) {
      setCustomEvents([...customEvents, newEvent as TimelineEvent])
      setNewEvent({ year: undefined, event: "", description: "" })
    }
  }

  function handleRemoveCustomEvent(index: number) {
    setCustomEvents(customEvents.filter((_, i) => i !== index))
  }

  // Combine AI-generated and custom events, then sort by year
  const allEvents = [...timelineEvents, ...customEvents].sort((a, b) => a.year - b.year)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="birthDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Birth Date
            </Label>
            <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deathDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Death Date
            </Label>
            <Input id="deathDate" type="date" value={deathDate} onChange={(e) => setDeathDate(e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="events">Key Life Events (one per line)</Label>
          <Textarea
            id="events"
            value={majorEvents}
            onChange={(e) => setMajorEvents(e.target.value)}
            placeholder="Graduated from Harvard University
Married Sarah Johnson
Had three children: Michael, Jennifer, and Robert
Worked as a doctor for 40 years
Moved to Florida after retirement
Volunteered at local hospital"
            rows={6}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !name || !birthDate || !deathDate}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Timeline...
            </>
          ) : (
            <>
              <Clock className="mr-2 h-4 w-4" />
              Generate Life Timeline
            </>
          )}
        </Button>
      </div>

      {allEvents.length > 0 && (
        <div className="space-y-6 border-t pt-6">
          <h3 className="text-xl font-semibold">Life Timeline for {name}</h3>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            <div className="space-y-6 pl-12">
              {allEvents.map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-14 mt-1.5 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{event.year}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
                    <h4 className="font-semibold text-lg text-blue-600 dark:text-blue-400">{event.event}</h4>
                    <p className="text-muted-foreground mt-1">{event.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">Year: {event.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {timelineEvents.length > 0 && (
        <div className="space-y-4 border-t pt-6">
          <h4 className="text-lg font-semibold">Add Custom Event</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventYear">Year</Label>
              <Input
                id="eventYear"
                type="number"
                value={newEvent.year || ""}
                onChange={(e) => setNewEvent({ ...newEvent, year: Number.parseInt(e.target.value) || undefined })}
                placeholder="1975"
                min="1900"
                max="2030"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input
                id="eventTitle"
                value={newEvent.event || ""}
                onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
                placeholder="Graduated College"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDescription">Description</Label>
              <Input
                id="eventDescription"
                value={newEvent.description || ""}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Received Bachelor's degree"
              />
            </div>
          </div>
          <Button
            onClick={handleAddCustomEvent}
            variant="outline"
            disabled={!newEvent.year || !newEvent.event || !newEvent.description}
            className="w-full bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Event
          </Button>

          {customEvents.length > 0 && (
            <div className="space-y-2">
              <h5 className="font-medium">Custom Events Added:</h5>
              <div className="space-y-2">
                {customEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <span className="font-medium">{event.year}: </span>
                      <span>{event.event}</span>
                      <span className="text-muted-foreground ml-2">- {event.description}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveCustomEvent(index)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
