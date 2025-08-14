"use server"

export async function enhanceStory(formData: FormData) {
  const story = formData.get("story") as string
  const tone = (formData.get("tone") as string) || "heartfelt"

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simple story enhancement based on tone
  let enhancedStory = story

  if (tone === "heartfelt") {
    enhancedStory = `${story}\n\nThis memory holds a special place in our hearts and reminds us of the love and joy they brought to our lives.`
  } else if (tone === "celebratory") {
    enhancedStory = `${story}\n\nWhat a wonderful celebration of a life well-lived! This memory brings smiles and reminds us to cherish every moment.`
  } else if (tone === "peaceful") {
    enhancedStory = `${story}\n\nIn quiet reflection, this memory brings comfort and peace, knowing their spirit lives on in these precious moments we shared.`
  }

  return {
    success: true,
    enhancedStory: enhancedStory,
  }
}
