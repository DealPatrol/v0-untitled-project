"use server"

export async function sendChatMessage(formData: FormData) {
  const message = formData.get("message") as string
  const context = (formData.get("context") as string) || "general"

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simple keyword-based chat responses
  const responses = {
    greeting:
      "Hello! I'm here to help you create a beautiful memorial for your loved one. What would you like to know?",
    pricing:
      "Our complete memorial package is $119.99 (regularly $199.99). This includes a weather-resistant QR plaque, custom memorial website, and lifetime hosting with no monthly fees.",
    features:
      "Your memorial includes unlimited photos and stories, a family tree, guest book for condolences, mobile-optimized design, and lifetime hosting. The QR plaque is weather-resistant and laser-engraved.",
    setup:
      "Setting up your memorial is simple! After ordering, you'll get access to add photos, write stories, and customize your memorial. We'll handle the technical setup and ship your QR plaque when ready.",
    support:
      "I'm here to help with any questions about creating your memorial. You can also contact our support team at any time for additional assistance.",
    general:
      "I'd be happy to help you with your memorial. You can ask me about pricing, features, setup process, or anything else related to creating a lasting tribute.",
  }

  let response = responses.general

  // Simple keyword matching
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    response = responses.greeting
  } else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("$")) {
    response = responses.pricing
  } else if (lowerMessage.includes("feature") || lowerMessage.includes("include") || lowerMessage.includes("what")) {
    response = responses.features
  } else if (lowerMessage.includes("setup") || lowerMessage.includes("start") || lowerMessage.includes("how")) {
    response = responses.setup
  } else if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("question")) {
    response = responses.support
  }

  return {
    success: true,
    response: response,
    timestamp: new Date().toISOString(),
  }
}
