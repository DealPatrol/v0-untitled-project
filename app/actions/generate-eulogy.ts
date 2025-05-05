"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type EulogyRequest = {
  name: string
  relationship: string
  personalQualities: string
  specialMemories: string
  tone: string
  length: "short" | "medium" | "long"
}

export async function generateEulogy(request: EulogyRequest): Promise<string> {
  try {
    // Determine word count based on requested length
    const wordCount = request.length === "short" ? 300 : request.length === "medium" ? 500 : 800

    const prompt = `
      Write a heartfelt eulogy for ${request.name}, who was my ${request.relationship}.
      
      Personal qualities and characteristics:
      ${request.personalQualities}
      
      Special memories and moments:
      ${request.specialMemories}
      
      The tone should be ${request.tone}.
      
      The eulogy should be approximately ${wordCount} words long, well-structured, and appropriate for delivery at a memorial service.
      Include an introduction, meaningful anecdotes, reflection on their legacy, and a touching conclusion.
      
      Make it personal, authentic, and avoid clichés. The eulogy should honor their memory and provide comfort to those mourning.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 1500,
    })

    return text
  } catch (error) {
    console.error("Error generating eulogy:", error)
    return "We were unable to generate a eulogy at this time. Please try again later or write your own eulogy."
  }
}
