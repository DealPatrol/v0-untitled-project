"use server"

import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

type GriefSupportRequest = {
  relationship: string
  timeframe: string
  specificConcerns: string
}

export async function getGriefSupportResources(request: GriefSupportRequest): Promise<string> {
  try {
    const prompt = `
      Provide compassionate grief support resources and coping strategies for someone who:
      - Lost their ${request.relationship}
      - The loss occurred ${request.timeframe}
      - They are specifically concerned about: ${request.specificConcerns}
      
      Include:
      1. 2-3 paragraphs of supportive, empathetic text
      2. 3-5 specific coping strategies
      3. 2-3 recommended support resources (books, websites, or support groups)
      
      Format with clear headings and bullet points where appropriate.
      Be warm, compassionate, and avoid clichés about grief.
    `

    const { text } = await generateText({
      model: xai("grok-1"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return text
  } catch (error) {
    console.error("Error generating grief support:", error)
    return "We apologize, but we were unable to generate personalized grief support resources at this time. Please consider reaching out to a grief counselor or support group in your area."
  }
}
