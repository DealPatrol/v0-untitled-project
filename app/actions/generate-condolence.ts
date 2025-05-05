"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

type CondolenceRequest = {
  relationship: string
  tone: string
  personalDetails?: string
}

export async function generateCondolenceMessage(request: CondolenceRequest): Promise<string> {
  try {
    const prompt = `
      Generate a thoughtful condolence message for someone who lost their ${request.relationship}.
      The message should be in a ${request.tone} tone.
      ${request.personalDetails ? `Include these personal details: ${request.personalDetails}` : ""}
      
      The message should be 3-5 sentences long, genuine, and avoid clichés.
      It should offer comfort while acknowledging the pain of loss.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 300,
    })

    return text
  } catch (error) {
    console.error("Error generating condolence message:", error)
    return "We were unable to generate a condolence message at this time. Please try again later."
  }
}
