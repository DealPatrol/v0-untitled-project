"use server"

export async function generateCondolence(formData: FormData) {
  const relationship = formData.get("relationship") as string
  const tone = (formData.get("tone") as string) || "heartfelt"
  const personName = formData.get("personName") as string

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const templates = {
    family: {
      heartfelt: `My heart goes out to you and your family during this difficult time. ${personName} was truly special, and their memory will live on in the hearts of all who knew them. Please know that you are in my thoughts and prayers.`,
      supportive: `I am so sorry for your loss. ${personName} was a wonderful person who touched many lives. Please don't hesitate to reach out if you need anything during this time. You and your family are in my thoughts.`,
      comforting: `Words cannot express how sorry I am for your loss. ${personName} will be deeply missed but never forgotten. May you find comfort in the beautiful memories you shared together.`,
    },
    friend: {
      heartfelt: `I am deeply saddened by the loss of ${personName}. They were such a special person who brought joy to everyone around them. My thoughts are with you during this difficult time.`,
      supportive: `I'm here for you during this difficult time. ${personName} was an amazing person, and I feel blessed to have known them. Please let me know if there's anything I can do to help.`,
      comforting: `My heart aches for you. ${personName} was truly one of a kind, and their spirit will live on in all the lives they touched. Sending you love and comfort.`,
    },
    colleague: {
      heartfelt: `I was deeply saddened to hear about the passing of ${personName}. They were a valued colleague and friend who will be greatly missed. My thoughts are with you and their family during this time.`,
      supportive: `Please accept my sincere condolences on the loss of ${personName}. They were a wonderful colleague who made a positive impact on everyone they worked with. If there's anything I can do to support you or the team, please let me know.`,
      comforting: `I'm so sorry for your loss. ${personName} was not only a great colleague but also a kind and caring person. Their contributions and friendship will not be forgotten.`,
    },
  }

  const relationshipTemplates = templates[relationship as keyof typeof templates] || templates["friend"]
  const message =
    relationshipTemplates[tone as keyof typeof relationshipTemplates] || relationshipTemplates["heartfelt"]

  return {
    success: true,
    message: message,
  }
}
