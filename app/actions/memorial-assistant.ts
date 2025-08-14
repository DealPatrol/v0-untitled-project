"use server"

export async function getMemorialAssistance(formData: FormData) {
  const question = formData.get("question") as string
  const category = (formData.get("category") as string) || "general"

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple keyword-based responses
  const responses = {
    photos:
      "For photos, we recommend uploading high-resolution images (at least 1024x768). You can add unlimited photos to your memorial. Consider including photos from different life stages, family gatherings, hobbies, and special moments.",

    stories:
      "Stories make memorials come alive. Include childhood memories, funny anecdotes, achievements, and moments that capture their personality. Family members can also contribute their own stories and memories.",

    setup:
      "Setting up your memorial is easy! After ordering, you'll receive login credentials to add content. Upload photos, write stories, and customize the design. Your QR plaque will be shipped once your memorial is complete.",

    sharing:
      "Your memorial can be shared via the QR code on the plaque, or by sharing the direct website link with family and friends. The memorial is accessible on all devices - phones, tablets, and computers.",

    editing:
      "You can edit and add to your memorial anytime after it's created. Add new photos, update stories, or include new memories as they come to mind. There's no limit to updates.",

    general:
      "I'm here to help you create a beautiful memorial. You can ask me about adding photos and stories, setting up your memorial, sharing with family, or any other questions about the process.",
  }

  // Simple keyword matching
  let response = responses.general

  if (
    question.toLowerCase().includes("photo") ||
    question.toLowerCase().includes("picture") ||
    question.toLowerCase().includes("image")
  ) {
    response = responses.photos
  } else if (
    question.toLowerCase().includes("story") ||
    question.toLowerCase().includes("memory") ||
    question.toLowerCase().includes("write")
  ) {
    response = responses.stories
  } else if (
    question.toLowerCase().includes("setup") ||
    question.toLowerCase().includes("start") ||
    question.toLowerCase().includes("begin")
  ) {
    response = responses.setup
  } else if (
    question.toLowerCase().includes("share") ||
    question.toLowerCase().includes("family") ||
    question.toLowerCase().includes("access")
  ) {
    response = responses.sharing
  } else if (
    question.toLowerCase().includes("edit") ||
    question.toLowerCase().includes("change") ||
    question.toLowerCase().includes("update")
  ) {
    response = responses.editing
  }

  return {
    success: true,
    response: response,
    suggestions: [
      "How do I add photos to my memorial?",
      "What kind of stories should I include?",
      "How do I share the memorial with family?",
      "Can I edit the memorial after it's created?",
    ],
  }
}
