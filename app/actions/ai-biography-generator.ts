"use server"

import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function generateBiography(
  name: string,
  birthDate: string,
  deathDate: string,
  keyFacts: string[],
): Promise<string> {
  try {
    const prompt = `
      Create a compassionate and respectful biography for ${name} (${birthDate} - ${deathDate}).
      Include these key facts about their life:
      ${keyFacts.map((fact) => `- ${fact}`).join("\n")}
      
      Write approximately 300 words that honor their memory and highlight their life journey.
      Use a warm, respectful tone appropriate for a memorial.
    `

    const { text } = await generateText({
      model: xai("grok-1"),
      prompt,
      temperature: 0.7,
      maxTokens: 800,
    })

    return text
  } catch (error) {
    console.error("Error generating biography:", error)
    return "We were unable to generate a biography at this time. Please try again later or write your own biography."
  }
}
