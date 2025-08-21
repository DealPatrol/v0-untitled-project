"use server"

export async function generateCondolenceMessage(formData: FormData) {
  const relationship = formData.get("relationship") as string
  const tone = formData.get("tone") as string
  const personName = (formData.get("personName") as string) || "your loved one"

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const messages = {
    spouse: {
      formal: `I am deeply saddened to learn of the passing of ${personName}. Please accept my heartfelt condolences during this difficult time. ${personName} was a remarkable person who touched many lives, and their memory will live on in the hearts of all who knew them. My thoughts and prayers are with you and your family.`,
      warm: `My heart goes out to you during this incredibly difficult time. ${personName} was such a special person, and I feel so fortunate to have known them. The love you shared was beautiful to witness, and I know that bond will never be broken. Please know that I'm here for you, and ${personName}'s memory will always be cherished.`,
      brief: `I'm so sorry for the loss of ${personName}. You and your family are in my thoughts and prayers during this difficult time.`,
    },
    parent: {
      formal: `Please accept my sincere condolences on the passing of ${personName}. Losing a parent is one of life's most profound losses, and my heart goes out to you and your family during this time of grief. May you find comfort in the loving memories you shared and the legacy ${personName} leaves behind.`,
      warm: `I'm so sorry to hear about the loss of ${personName}. I know how much they meant to you and what a wonderful parent they were. The love, wisdom, and values they shared with you will live on forever. Please know that you're in my thoughts, and I'm here if you need anything at all.`,
      brief: `My deepest sympathies on the loss of ${personName}. You and your family are in my thoughts during this difficult time.`,
    },
    child: {
      formal: `I am profoundly sorry for the loss of ${personName}. There are no words that can adequately express the depth of sorrow I feel for you during this unimaginable time. Please know that ${personName}'s life, though far too brief, brought joy and love to all who knew them. You are in my thoughts and prayers.`,
      warm: `My heart is breaking for you. ${personName} was such a bright light, and I can't imagine the pain you're feeling right now. Please know that ${personName} was deeply loved and will never be forgotten. I'm here for you in whatever way you need, now and always.`,
      brief: `I'm so deeply sorry for the loss of ${personName}. My heart goes out to you and your family.`,
    },
    friend: {
      formal: `I was deeply saddened to learn of ${personName}'s passing. They were a wonderful friend and person who will be greatly missed by all who knew them. Please accept my heartfelt condolences, and know that ${personName}'s memory will live on in the hearts of their many friends and loved ones.`,
      warm: `I can't believe ${personName} is gone. They were such an amazing friend and brought so much joy to everyone around them. I'm going to miss them terribly, and I know you will too. Please know that I'm here for you, and we'll keep ${personName}'s memory alive together.`,
      brief: `I'm so sorry to hear about ${personName}. They were a wonderful person and will be deeply missed.`,
    },
  }

  const selectedMessage =
    messages[relationship as keyof typeof messages]?.[tone as keyof (typeof messages)[keyof typeof messages]] ||
    messages.friend.warm

  return {
    success: true,
    message: selectedMessage,
  }
}
