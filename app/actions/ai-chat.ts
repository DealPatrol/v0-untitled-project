"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define the types for our chat messages
export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

// Define the system prompt that will guide the AI's behavior
const systemPrompt = `
You are a helpful assistant for Memorial QR, a service that creates QR codes for memorials.

About Memorial QR:
- We offer QR codes that can be placed on headstones, urns, or memorial plaques
- We have three plans: Essential ($99), Premium ($199), and Legacy ($299)
- The QR codes link to digital memorial pages with photos, stories, and family information
- Our QR codes are weather-resistant and designed to last for decades
- Customers can create memorial pages through our step-by-step process
- Family and friends can contribute stories and photos to memorials

Please be compassionate and understanding as many users may be grieving.
Keep responses concise but helpful, and always offer to connect them with a human if their question is complex.
`

// Predefined responses for common questions when API key is not available
const fallbackResponses: Record<string, string> = {
  default:
    "Thank you for your question. Our Memorial QR codes create lasting digital memorials accessible via QR codes placed on headstones or memorial items. Would you like to know more about our plans or how to create a memorial?",
  pricing:
    "We offer three plans: Essential ($99), Premium ($199), and Legacy ($299). Each plan includes different features such as number of photos, videos, and family members you can add. Would you like more details about a specific plan?",
  howItWorks:
    "Memorial QR works by creating a unique QR code that links to a digital memorial page. You can place this code on a headstone, urn, or memorial item. When scanned, it opens a webpage with photos, stories, and memories of your loved one.",
  creation:
    "Creating a memorial is easy with our step-by-step process. You'll provide basic information, upload photos, write a life story, and add family members. The whole process takes about 15-20 minutes to complete.",
  contact:
    "You can contact our support team at support@memorialqr.com or call us at (555) 123-4567. We're available Monday through Friday, 9am to 5pm EST.",
  durability:
    "Our QR codes are designed to be weather-resistant and durable. They're made with high-quality materials that can withstand outdoor conditions for decades.",
}

// Function to get a fallback response based on the user's message
function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
    return fallbackResponses.pricing
  } else if (lowerMessage.includes("how") && (lowerMessage.includes("work") || lowerMessage.includes("function"))) {
    return fallbackResponses.howItWorks
  } else if (lowerMessage.includes("create") || lowerMessage.includes("make") || lowerMessage.includes("start")) {
    return fallbackResponses.creation
  } else if (lowerMessage.includes("contact") || lowerMessage.includes("support") || lowerMessage.includes("help")) {
    return fallbackResponses.contact
  } else if (lowerMessage.includes("last") || lowerMessage.includes("durable") || lowerMessage.includes("weather")) {
    return fallbackResponses.durability
  }

  return fallbackResponses.default
}

export async function getChatResponse(messages: ChatMessage[]): Promise<string> {
  // Get the last user message
  const lastUserMessage = messages.filter((msg) => msg.role === "user").pop()?.content || ""

  try {
    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.log("OpenAI API key not found, using fallback responses")
      return getFallbackResponse(lastUserMessage)
    }

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
    console.error("Error generating AI response:", error)

    // If there's an API key error, use fallback responses
    if (error instanceof Error && error.message.includes("API key")) {
      return getFallbackResponse(lastUserMessage)
    }

    return "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team at support@memorialqr.com."
  }
}
