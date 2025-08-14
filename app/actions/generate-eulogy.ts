"use server"

export async function generateEulogy(formData: FormData) {
  const name = formData.get("name") as string
  const relationship = formData.get("relationship") as string
  const keyMemories = formData.get("keyMemories") as string
  const personalityTraits = formData.get("personalityTraits") as string

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2500))

  const eulogy = `We gather here today to celebrate the life of ${name}, a person who touched our hearts and enriched our lives in countless ways.

${
  relationship === "spouse"
    ? `As ${name}'s beloved spouse, I can tell you that they were not just my partner in life, but my best friend, my confidant, and my greatest love.`
    : relationship === "child"
      ? `${name} was not just our child, but a source of endless joy, pride, and love. They brought light into our lives from the very beginning.`
      : relationship === "parent"
        ? `${name} was more than a parent to us - they were our guide, our supporter, and our hero. They shaped who we are today.`
        : `${name} was a cherished member of our family and community, someone who made the world a better place simply by being in it.`
}

${personalityTraits ? `${name} was known for being ${personalityTraits}. These qualities made them special and drew people to them like a magnet.` : `${name} had a warmth and kindness that made everyone feel welcome and valued.`}

${keyMemories ? `I will always remember ${keyMemories}. These moments capture the essence of who ${name} was and the joy they brought to our lives.` : `The memories we shared with ${name} are treasures that we will carry in our hearts forever.`}

Though we are gathered here in sorrow, we are also here to celebrate a life well-lived. ${name} may no longer be with us in body, but their spirit, their love, and their influence will continue to guide us.

Let us honor ${name}'s memory by living with the same kindness, love, and generosity that they showed us every day. In doing so, we ensure that their legacy lives on through each of us.

Thank you, ${name}, for the gift of knowing you. Rest in peace, knowing that you were deeply loved and will never be forgotten.`

  return {
    success: true,
    eulogy: eulogy,
  }
}
