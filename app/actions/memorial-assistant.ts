"use server"

export interface MemorialAssistantMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export async function getMemorialAssistantResponse(message: string, context?: string) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lowerMessage = message.toLowerCase()

  // Keyword-based responses for common memorial questions
  if (lowerMessage.includes("photo") || lowerMessage.includes("picture") || lowerMessage.includes("image")) {
    return {
      success: true,
      response: `For photos in your memorial, I recommend including:

• A main portrait photo that captures their personality
• Family photos showing relationships and connections  
• Photos from different life stages (childhood, wedding, career, etc.)
• Candid moments that show their character and interests
• Group photos with friends and extended family

Tips for photo selection:
- Choose high-resolution images when possible
- Include photos that tell their life story
- Mix formal and casual photos
- Consider photos that show their hobbies and passions

Would you like specific guidance on organizing or editing your photos?`,
    }
  }

  if (
    lowerMessage.includes("biography") ||
    lowerMessage.includes("life story") ||
    lowerMessage.includes("write about")
  ) {
    return {
      success: true,
      response: `Writing a meaningful biography involves capturing the essence of who they were. Here's a structure to help:

**Early Life & Background:**
- Birth date and place
- Family background and upbringing
- Childhood interests and personality traits

**Education & Career:**
- Schools attended and achievements
- Career path and accomplishments
- Professional relationships and impact

**Personal Life:**
- Marriage and family life
- Hobbies, interests, and passions
- Community involvement and volunteering

**Character & Legacy:**
- Personal qualities and values
- How they influenced others
- What they'll be remembered for

Start with what made them unique and build from there. Would you like help with any specific section?`,
    }
  }

  if (
    lowerMessage.includes("timeline") ||
    lowerMessage.includes("chronology") ||
    lowerMessage.includes("life events")
  ) {
    return {
      success: true,
      response: `Creating a life timeline helps visitors understand their journey. Here's how to organize it:

**Major Milestones to Include:**
- Birth and early childhood
- Education milestones (graduation, degrees)
- Career achievements and job changes
- Marriage and family events
- Major travels or relocations
- Significant accomplishments or awards
- Community involvement
- Health challenges overcome
- Final years and passing

**Organization Tips:**
- Use decades or life phases as sections
- Include both personal and professional events
- Add photos to illustrate key moments
- Keep descriptions concise but meaningful
- Highlight their impact on others

Would you like help organizing specific events or time periods?`,
    }
  }

  if (lowerMessage.includes("family") || lowerMessage.includes("relatives") || lowerMessage.includes("children")) {
    return {
      success: true,
      response: `Including family information creates a complete picture of their relationships:

**Immediate Family:**
- Spouse/partner details and relationship story
- Children with brief descriptions
- Parents and their influence
- Siblings and close relationships

**Extended Family:**
- Grandchildren and their special bonds
- In-laws and chosen family
- Close family friends considered family

**Family Stories:**
- How they met their spouse
- Parenting style and family traditions
- Family vacations and gatherings
- Values they passed down
- Family recipes, sayings, or traditions

**Presentation Ideas:**
- Family tree diagram
- Group photos with captions
- Individual photos with relationship descriptions
- Stories about family traditions

What aspect of their family life would you like to highlight most?`,
    }
  }

  if (lowerMessage.includes("military") || lowerMessage.includes("service") || lowerMessage.includes("veteran")) {
    return {
      success: true,
      response: `Honoring military service is an important part of their memorial:

**Service Details to Include:**
- Branch of service and years served
- Rank achieved and units served with
- Locations of service (bases, deployments)
- Military occupational specialty (MOS)
- Awards, medals, and commendations
- Combat service or special operations

**Personal Military Story:**
- Why they chose to serve
- Memorable experiences and friendships
- How service shaped their character
- Transition to civilian life
- Continued service to veteran community

**Visual Elements:**
- Military photos in uniform
- Award and medal displays
- Unit patches or insignia
- Flag presentation or military honors
- Photos with military friends

**Honor Guard Information:**
- Military funeral honors received
- Flag folding ceremony details
- Veteran organization involvement

Would you like help organizing their specific military history or service records?`,
    }
  }

  if (lowerMessage.includes("qr code") || lowerMessage.includes("qr") || lowerMessage.includes("code")) {
    return {
      success: true,
      response: `QR codes make your memorial easily accessible. Here's what you need to know:

**QR Code Benefits:**
- Instant access to the full memorial from any smartphone
- Can be placed on headstones, funeral programs, or memorial cards
- Links directly to your loved one's memorial page
- Easy for family and friends to share

**Where to Use QR Codes:**
- Engraved on headstones or memorial plaques
- Printed on funeral programs and prayer cards
- Included in obituaries and announcements
- Shared on social media or email

**Technical Details:**
- We generate a unique QR code for each memorial
- The code links to a permanent memorial URL
- Works with any smartphone camera or QR reader app
- Memorial remains accessible as long as you maintain it

**Customization Options:**
- Add a small photo or logo to the QR code
- Include text like "Scan to remember [Name]"
- Choose from different sizes for various applications

Would you like guidance on where to place your QR code or how to share it with others?`,
    }
  }

  if (lowerMessage.includes("help") || lowerMessage.includes("start") || lowerMessage.includes("begin")) {
    return {
      success: true,
      response: `I'm here to help you create a meaningful memorial! Here are the main areas I can assist with:

**Getting Started:**
- Planning your memorial structure
- Gathering photos and information
- Writing biographical content
- Organizing family information

**Content Creation:**
- Biography and life story writing
- Timeline of major life events
- Family tree and relationships
- Military service details (if applicable)

**Technical Assistance:**
- Photo selection and organization
- QR code placement and usage
- Memorial page customization
- Sharing and privacy settings

**Common Questions:**
- "How do I write a biography?"
- "What photos should I include?"
- "How do I organize family information?"
- "Where should I place the QR code?"

What specific aspect of creating the memorial would you like help with first? I'm here to guide you through each step of the process.`,
    }
  }

  // Default response for general questions
  return {
    success: true,
    response: `I understand you're working on creating a memorial. I'm here to help with:

• **Biography writing** - Crafting their life story
• **Photo organization** - Selecting and arranging images  
• **Family information** - Including relatives and relationships
• **Timeline creation** - Organizing life events chronologically
• **Military service** - Honoring veteran status (if applicable)
• **QR code guidance** - Placement and usage tips

Could you tell me more specifically what you'd like help with? For example:
- "Help me write a biography"
- "What photos should I include?"
- "How do I organize family information?"
- "Tell me about QR codes"

I'm here to guide you through creating a beautiful tribute to your loved one.`,
  }
}
