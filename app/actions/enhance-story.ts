"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function enhanceStory(story: string): Promise<string> {
  try {
    const prompt = `
      The following is a memory or story about a loved one who has passed away.
      Please enhance this text by improving the flow, fixing any grammar issues,
      and making it more emotionally resonant while preserving the original meaning
      and personal voice. Do not add new facts or change the essence of the story.
      
      Original story:
      "${story}"
      
      Enhanced version:
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return text
  } catch (error) {
    console.error("Error enhancing story:", error)
    return story
  }
}
