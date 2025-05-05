"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type TimelineEvent = {
  year: string
  title: string
  description: string
}

type TimelineRequest = {
  name: string
  birthYear: string
  deathYear: string
  lifeEvents: string
}

export async function generateTimeline(request: TimelineRequest): Promise<TimelineEvent[]> {
  try {
    const prompt = `
      Create a chronological timeline of key events in the life of ${request.name} (${request.birthYear} - ${request.deathYear}).
      
      Here are some known life events (not necessarily in order):
      ${request.lifeEvents}
      
      Generate 8-12 significant events for this timeline, including birth and death.
      For each event, provide:
      1. The year it occurred
      2. A short title (3-5 words)
      3. A brief description (1-2 sentences)
      
      Format your response as a JSON array of objects with the following structure:
      [
        {
          "year": "YYYY",
          "title": "Event Title",
          "description": "Brief description of the event."
        }
      ]
      
      Make sure the events are chronologically ordered and historically plausible.
      Include a mix of personal, professional, and family milestones.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    try {
      // Parse the JSON response
      const timelineEvents = JSON.parse(text) as TimelineEvent[]
      return timelineEvents
    } catch (parseError) {
      console.error("Error parsing timeline JSON:", parseError)
      // Fallback with empty timeline
      return []
    }
  } catch (error) {
    console.error("Error generating timeline:", error)
    return []
  }
}
