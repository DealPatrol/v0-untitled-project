"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export type MemorialAssistantMessage = {
  role: "user" | "assistant"
  content: string
}

// Define the system prompt that will guide the AI's behavior
const systemPrompt = `
You are a compassionate Virtual Memorial Assistant, specialized in helping people plan and create meaningful memorials for their loved ones.

Your expertise includes:
- Guiding users through the memorial planning process
- Offering suggestions for memorial services and ceremonies
- Providing advice on honoring and celebrating a loved one's life
- Answering questions about Memorial QR's services and features
- Offering gentle support for those who are grieving

Always be respectful, compassionate, and understanding. Remember that users are likely grieving and may need extra patience and kindness.

Avoid:
- Making assumptions about religious or cultural preferences
- Using clichés about death or grief
- Giving medical or legal advice
- Making promises about services that Memorial QR might not offer

If you don't know the answer to a specific question about Memorial QR's services, acknowledge this and suggest the user contact customer support for detailed information.
`

export async function getMemorialAssistantResponse(messages: MemorialAssistantMessage[]): Promise<string> {
  try {
    // Format the messages for the AI
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
    ]

    // Generate a response using the AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: formattedMessages,
      temperature: 0.7,
      maxTokens: 500,
    })

    return text
  } catch (error) {
    console.error("Error generating memorial assistant response:", error)
    return "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team for assistance with your memorial planning needs."
  }
}
