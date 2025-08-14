"use server"

export async function getGriefSupport(formData: FormData) {
  const situation = formData.get("situation") as string
  const relationship = formData.get("relationship") as string

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Provide supportive resources based on situation
  const resources = {
    "recent-loss": {
      title: "Coping with Recent Loss",
      content:
        "The pain of losing someone close to you can feel overwhelming. Remember that grief is a natural process and there's no 'right' way to grieve. Take things one day at a time, and don't hesitate to reach out for support from friends, family, or professional counselors.",
      tips: [
        "Allow yourself to feel your emotions",
        "Maintain routines when possible",
        "Accept help from others",
        "Take care of your physical health",
        "Consider joining a support group",
      ],
    },
    anniversary: {
      title: "Anniversary Grief",
      content:
        "Anniversaries and special dates can bring back intense feelings of loss. This is completely normal. Planning ahead for these difficult days can help you cope and honor your loved one's memory.",
      tips: [
        "Plan a meaningful tribute or ritual",
        "Spend time with supportive people",
        "Share memories and stories",
        "Visit places that were special to them",
        "Create a new tradition in their honor",
      ],
    },
    ongoing: {
      title: "Long-term Grief Support",
      content:
        "Grief doesn't follow a timeline, and it's normal for feelings to come and go even years later. Healing doesn't mean forgetting - it means learning to carry your love for them in a way that allows you to live fully.",
      tips: [
        "Practice self-compassion",
        "Find healthy ways to honor their memory",
        "Stay connected with your support network",
        "Consider professional counseling if needed",
        "Remember that healing is not linear",
      ],
    },
  }

  const selectedResource = resources[situation as keyof typeof resources] || resources["ongoing"]

  return {
    success: true,
    resource: selectedResource,
  }
}
