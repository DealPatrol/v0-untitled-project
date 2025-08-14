"use server"

export async function generateTimeline(formData: FormData) {
  const name = formData.get("name") as string
  const birthDate = formData.get("birthDate") as string
  const deathDate = formData.get("deathDate") as string
  const majorEvents = formData.get("majorEvents") as string

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Parse major events or create template events
  const events = majorEvents ? majorEvents.split("\n").filter((event) => event.trim()) : []

  const timelineEvents = [
    {
      year: new Date(birthDate).getFullYear(),
      event: `${name} was born`,
      description: "The beginning of a beautiful life",
    },
  ]

  // Add provided events or generate template events
  if (events.length > 0) {
    events.forEach((event, index) => {
      const birthYear = new Date(birthDate).getFullYear()
      const deathYear = new Date(deathDate).getFullYear()
      const estimatedYear = birthYear + Math.floor(((deathYear - birthYear) * (index + 1)) / (events.length + 1))

      timelineEvents.push({
        year: estimatedYear,
        event: event.trim(),
        description: "A significant moment in their life",
      })
    })
  } else {
    // Generate template events
    const birthYear = new Date(birthDate).getFullYear()
    const deathYear = new Date(deathDate).getFullYear()

    timelineEvents.push(
      {
        year: birthYear + 18,
        event: "Graduated from high school",
        description: "Achieved an important educational milestone",
      },
      {
        year: birthYear + 25,
        event: "Started their career",
        description: "Began making their mark in the professional world",
      },
      {
        year: birthYear + 30,
        event: "Major life achievement",
        description: "Accomplished something they were truly proud of",
      },
    )
  }

  timelineEvents.push({
    year: new Date(deathDate).getFullYear(),
    event: `${name} passed away peacefully`,
    description: "Leaving behind a legacy of love and cherished memories",
  })

  // Sort events by year
  timelineEvents.sort((a, b) => a.year - b.year)

  return {
    success: true,
    timeline: timelineEvents,
  }
}
