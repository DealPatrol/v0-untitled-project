"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateTimeline, type TimelineEvent } from "@/app/actions/generate-timeline"
import { Loader2, Plus, Trash2 } from "lucide-react"

export function TimelineGenerator() {
  const [name, setName] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [deathYear, setDeathYear] = useState("")
  const [lifeEvents, setLifeEvents] = useState("")
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customEvents, setCustomEvents] = useState<TimelineEvent[]>([])
  const [newEvent, setNewEvent] = useState<TimelineEvent>({ year: "", title: "", description: "" })

  async function handleGenerate() {
    if (!name || !birthYear || !deathYear) return

    setIsGenerating(true)
    try {
      const events = await generateTimeline({
        name,
        birthYear,
        deathYear,
        lifeEvents,
      })
      setTimelineEvents(events)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleAddCustomEvent() {
    if (newEvent.year && newEvent.title && newEvent.description) {
      setCustomEvents([...customEvents, { ...newEvent }])
      setNewEvent({ year: "", title: "", description: "" })
    }
  }

  function handleRemoveCustomEvent(index: number) {
    setCustomEvents(customEvents.filter((_, i) => i !== index))
  }

  // Combine AI-generated and custom events, then sort by year
  const allEvents = [...timelineEvents, ...customEvents].sort((a, b) => {
    const yearA = Number.parseInt(a.year.split("-")[0]) || 0
    const yearB = Number.parseInt(b.year.split("-")[0]) || 0
    return yearA - yearB
  })

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-xl font-medium">Life Timeline Generator</h3>
        <p className="text-sm text-gray-500">Create a chronological timeline of your loved one's life</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="birthYear">Birth Year</Label>
            <Input id="birthYear" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} placeholder="1950" />
          </div>
          <div>
            <Label htmlFor="deathYear">Death Year</Label>
            <Input id="deathYear" value={deathYear} onChange={(e) => setDeathYear(e.target.value)} placeholder="2022" />
          </div>
        </div>

        <div>
          <Label htmlFor="events">Key Life Events (one per line)</Label>
          <Textarea
            id="events"
            value={lifeEvents}
            onChange={(e) => setLifeEvents(e.target.value)}
            placeholder="Graduated from Harvard University
Married Sarah Johnson
Had three children: Michael, Jennifer, and Robert
Worked as a doctor for 40 years
Moved to Florida after retirement"
            rows={5}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !name || !birthYear || !deathYear}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Timeline...
            </>
          ) : (
            "Generate Timeline"
          )}
        </Button>

        {allEvents.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-medium mb-4">Life Timeline</h4>

            <div className="relative border-l-2 border-gray-200 ml-4 pl-8 pb-8 space-y-8">
              {allEvents.map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                  </div>
                  <div>
                    <h5 className="text-md font-medium flex items-center">
                      <span className="text-rose-600 mr-2">{event.year}</span>
                      {event.title}
                    </h5>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              <h4 className="text-md font-medium mb-4">Add Custom Event</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="eventYear">Year</Label>
                  <Input
                    id="eventYear"
                    value={newEvent.year}
                    onChange={(e) => setNewEvent({ ...newEvent, year: e.target.value })}
                    placeholder="1975"
                  />
                </div>
                <div>
                  <Label htmlFor="eventTitle">Title</Label>
                  <Input
                    id="eventTitle"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Graduated College"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDescription">Description</Label>
                  <Input
                    id="eventDescription"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Received Bachelor's degree in Psychology"
                  />
                </div>
              </div>
              <Button
                onClick={handleAddCustomEvent}
                variant="outline"
                disabled={!newEvent.year || !newEvent.title || !newEvent.description}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>

            {customEvents.length > 0 && (
              <div className="mt-6">
                <h4 className="text-md font-medium mb-2">Custom Events</h4>
                <div className="space-y-2">
                  {customEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <span className="font-medium">{event.year}: </span>
                        <span>{event.title}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveCustomEvent(index)}>
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
