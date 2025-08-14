"use server"

export async function generateBiography(formData: FormData) {
  const name = formData.get("name") as string
  const birthDate = formData.get("birthDate") as string
  const deathDate = formData.get("deathDate") as string
  const keyDetails = formData.get("keyDetails") as string

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Generate a template-based biography
  const biography = `${name} was born on ${birthDate} and lived a remarkable life until ${deathDate}. 

${keyDetails ? `${keyDetails}` : `${name} was known for their kindness, dedication to family, and positive impact on everyone they met.`}

Throughout their life, ${name} touched the hearts of many and left behind a legacy of love, wisdom, and cherished memories. Their spirit lives on in the hearts of all who knew and loved them.

${name} will be deeply missed but never forgotten. Their memory serves as a source of comfort and inspiration to family and friends who were blessed to know them.`

  return {
    success: true,
    biography: biography,
  }
}
