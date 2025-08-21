"use server"

export async function getGriefSupportResources(formData: FormData) {
  const relationship = formData.get("relationship") as string
  const timeframe = formData.get("timeframe") as string

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const resources = {
    spouse: {
      immediate: {
        title: "Support for Losing a Spouse - Recent Loss",
        resources: [
          "Contact your local hospice for grief counseling services",
          "Join a widows/widowers support group in your area",
          "Consider professional grief therapy",
          "Reach out to close friends and family for daily support",
          "Take care of immediate practical needs (legal, financial)",
        ],
        helplines: ["National Suicide Prevention Lifeline: 988", "Crisis Text Line: Text HOME to 741741"],
      },
      months: {
        title: "Support for Losing a Spouse - Several Months",
        resources: [
          "Continue with grief counseling or support groups",
          "Consider joining social activities to combat isolation",
          "Explore new routines and hobbies",
          "Connect with other widows/widowers who understand your journey",
          "Consider volunteer work as a way to find purpose",
        ],
        helplines: ["GriefShare: Find local support groups", "AARP Grief and Loss Support"],
      },
      years: {
        title: "Support for Losing a Spouse - Years Later",
        resources: [
          "Reflect on your healing journey and growth",
          "Consider helping others who are newly grieving",
          "Explore new relationships when you feel ready",
          "Create meaningful ways to honor your spouse's memory",
          "Celebrate the love you shared and carry forward",
        ],
        helplines: ["Continuing bonds support groups", "Memorial planning services"],
      },
    },
    parent: {
      immediate: {
        title: "Support for Losing a Parent - Recent Loss",
        resources: [
          "Allow yourself to grieve - there's no timeline",
          "Lean on siblings and family members for support",
          "Consider professional grief counseling",
          "Take time off work if possible",
          "Handle funeral arrangements with family support",
        ],
        helplines: ["National Suicide Prevention Lifeline: 988", "Crisis Text Line: Text HOME to 741741"],
      },
      months: {
        title: "Support for Losing a Parent - Several Months",
        resources: [
          "Process the change in family dynamics",
          "Share memories with family and friends",
          "Consider therapy to work through complex emotions",
          "Take care of estate and legal matters",
          "Find ways to honor your parent's legacy",
        ],
        helplines: ["Adult Children of Aging Parents support groups", "Local grief counseling centers"],
      },
      years: {
        title: "Support for Losing a Parent - Years Later",
        resources: [
          "Reflect on the lessons your parent taught you",
          "Share stories with your own children",
          "Continue family traditions in their honor",
          "Support other family members in their grief journey",
          "Find peace in the love and memories you carry",
        ],
        helplines: ["Family grief support networks", "Memorial foundation resources"],
      },
    },
    child: {
      immediate: {
        title: "Support for Losing a Child - Recent Loss",
        resources: [
          "Seek immediate professional grief support",
          "Connect with other bereaved parents",
          "Allow yourself to feel all emotions without judgment",
          "Accept help from friends and family",
          "Consider taking extended time off work",
        ],
        helplines: [
          "The Compassionate Friends: 877-969-0010",
          "National Suicide Prevention Lifeline: 988",
          "Crisis Text Line: Text HOME to 741741",
        ],
      },
      months: {
        title: "Support for Losing a Child - Several Months",
        resources: [
          "Continue with specialized grief counseling",
          "Join support groups for bereaved parents",
          "Consider couples counseling if married",
          "Find meaningful ways to honor your child's memory",
          "Be patient with your grief process",
        ],
        helplines: ["The Compassionate Friends local chapters", "Bereaved Parents of the USA"],
      },
      years: {
        title: "Support for Losing a Child - Years Later",
        resources: [
          "Continue honoring your child's memory",
          "Support other bereaved parents",
          "Find ways to create meaning from your loss",
          "Maintain connections with your child's friends",
          "Celebrate your child's life and impact",
        ],
        helplines: ["Long-term grief support groups", "Memorial scholarship foundations"],
      },
    },
    friend: {
      immediate: {
        title: "Support for Losing a Friend - Recent Loss",
        resources: [
          "Acknowledge that friendship grief is real and valid",
          "Reach out to mutual friends for support",
          "Attend the funeral or memorial service",
          "Share memories with their family",
          "Take time to process your emotions",
        ],
        helplines: ["Crisis Text Line: Text HOME to 741741", "Local grief counseling services"],
      },
      months: {
        title: "Support for Losing a Friend - Several Months",
        resources: [
          "Continue to honor the friendship",
          "Stay connected with mutual friends",
          "Consider grief counseling if needed",
          "Create a memorial or tribute",
          "Support their family when appropriate",
        ],
        helplines: ["Friendship grief support groups", "Online grief communities"],
      },
      years: {
        title: "Support for Losing a Friend - Years Later",
        resources: [
          "Cherish the memories and impact of the friendship",
          "Share stories about your friend with others",
          "Continue traditions you shared together",
          "Support their family on anniversaries",
          "Be grateful for the time you had together",
        ],
        helplines: ["Memorial friendship networks", "Continuing bonds support"],
      },
    },
  }

  const selectedResources =
    resources[relationship as keyof typeof resources]?.[
      timeframe as keyof (typeof resources)[keyof typeof resources]
    ] || resources.friend.immediate

  return {
    success: true,
    resources: selectedResources,
  }
}
