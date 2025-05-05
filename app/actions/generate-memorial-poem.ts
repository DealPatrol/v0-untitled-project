"use server"

import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

type PoemRequest = {
  name: string
  personalTraits: string
  style: string
  theme: string
}

export async function generateMemorialPoem(request: PoemRequest): Promise<string> {
  try {
    const prompt = `
      Write a beautiful memorial poem for ${request.name}.
      
      Personal traits and characteristics to include:
      ${request.personalTraits}
      
      The poem should be in the style of ${request.style} poetry.
      
      The theme of the poem should focus on ${request.theme}.
      
      The poem should be 12-20 lines long, emotionally resonant, and appropriate for a memorial service.
      It should honor their memory in a way that feels personal and authentic.
    `

    const { text } = await generateText({
      model: xai("grok-1"),
      prompt,
      temperature: 0.8,
      maxTokens: 600,
    })

    return text
  } catch (error) {
    console.error("Error generating memorial poem:", error)
    return "We were unable to generate a memorial poem at this time. Please try again later."
  }
}
