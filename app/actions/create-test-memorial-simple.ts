"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"
import { memorialTemplates } from "@/lib/memorial-templates"

type TestMemorialData = {
  name: string
  birth_date: string
  death_date: string
  birth_location: string
  death_location: string
  bio: string
  template_id?: string
}

export async function createTestMemorialSimple(data: TestMemorialData) {
  console.log("Server action called with data:", data)

  try {
    const supabase = createServerSupabaseClient()
    console.log("Supabase client created")

    // Get the current user, but don't fail if not authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    let userId: string

    if (userError || !user) {
      console.log("No authenticated user found, looking for an existing user")

      // Find an existing user in the database
      const { data: existingUsers, error: existingUsersError } = await supabase.from("users").select("id").limit(1)

      if (existingUsersError || !existingUsers || existingUsers.length === 0) {
        console.error("Error finding existing user:", existingUsersError)
        return { error: "Cannot create memorial: No valid user found. Please log in first." }
      }

      userId = existingUsers[0].id
      console.log("Using existing user ID:", userId)
    } else {
      userId = user.id
      console.log("Using authenticated user ID:", userId)
    }

    // Generate a unique ID for the memorial
    const memorialId = uuidv4()
    console.log("Generated memorial ID:", memorialId)

    // Create the memorial record with only the essential fields
    const memorialData = {
      id: memorialId,
      user_id: userId,
      name: data.name,
      bio: data.bio || null,
      is_public: true,
    }

    console.log("Inserting memorial with data:", memorialData)

    const { error: memorialError } = await supabase.from("memorials").insert(memorialData)

    if (memorialError) {
      console.error("Error creating test memorial:", memorialError)
      return { error: "Failed to create memorial: " + memorialError.message }
    }

    console.log("Memorial created successfully with ID:", memorialId)

    // Find the selected template if provided
    const selectedTemplate = data.template_id ? memorialTemplates.find((t) => t.id === data.template_id) : null

    // Add media from the template if available, otherwise use default media
    const mediaToInsert = selectedTemplate
      ? selectedTemplate.data.imageUrls.map((url, index) => ({
          memorial_id: memorialId,
          media_type: "image",
          url,
          caption: `Photo ${index + 1}`,
          display_order: index + 1,
        }))
      : [
          {
            memorial_id: memorialId,
            media_type: "image",
            url: "/images/memorial-1.jpg",
            caption: "Family photo",
            display_order: 1,
          },
          {
            memorial_id: memorialId,
            media_type: "image",
            url: "/images/memorial-2.jpg",
            caption: "Vacation memory",
            display_order: 2,
          },
          {
            memorial_id: memorialId,
            media_type: "image",
            url: "/images/memorial-3.jpg",
            caption: "Special occasion",
            display_order: 3,
          },
        ]

    const { error: mediaError } = await supabase.from("media").insert(mediaToInsert)

    if (mediaError) {
      console.error("Error adding media:", mediaError)
    } else {
      console.log("Media added successfully")
    }

    // Add stories from the template if available, otherwise use default stories
    const storiesToInsert = selectedTemplate
      ? selectedTemplate.data.stories.map((story) => ({
          memorial_id: memorialId,
          author_name: story.author_name,
          content: story.content,
          is_approved: true,
        }))
      : [
          {
            memorial_id: memorialId,
            author_name: "Family Member",
            content:
              "I'll always remember the wonderful times we shared together. Your kindness and wisdom continue to guide me every day.",
            is_approved: true,
          },
          {
            memorial_id: memorialId,
            author_name: "Close Friend",
            content:
              "We had so many adventures together. I'm grateful for every moment and will cherish those memories forever.",
            is_approved: true,
          },
        ]

    const { error: storiesError } = await supabase.from("stories").insert(storiesToInsert)

    if (storiesError) {
      console.error("Error adding stories:", storiesError)
    } else {
      console.log("Stories added successfully")
    }

    // Create a QR code for the memorial
    const uniqueCode = generateUniqueCode()

    const { error: qrError } = await supabase.from("qr_codes").insert({
      memorial_id: memorialId,
      unique_code: uniqueCode,
      design_type: "standard",
    })

    if (qrError) {
      console.error("Error creating QR code:", qrError)
    } else {
      console.log("QR code created successfully with code:", uniqueCode)
    }

    // Add family members from the template if available, otherwise use default family members
    const familyMembersToInsert = selectedTemplate
      ? selectedTemplate.data.familyMembers.map((member) => ({
          memorial_id: memorialId,
          name: member.name,
          relationship: member.relationship,
          birth_date: member.birth_date || null,
        }))
      : [
          {
            memorial_id: memorialId,
            name: "Sarah Doe",
            relationship: "Spouse",
            birth_date: "1948-03-22",
          },
          {
            memorial_id: memorialId,
            name: "Michael Doe",
            relationship: "Son",
            birth_date: "1970-06-15",
          },
          {
            memorial_id: memorialId,
            name: "Jennifer Doe",
            relationship: "Daughter",
            birth_date: "1973-11-08",
          },
        ]

    const { error: familyError } = await supabase.from("family_members").insert(familyMembersToInsert)

    if (familyError) {
      console.error("Error adding family members:", familyError)
    } else {
      console.log("Family members added successfully")
    }

    // Revalidate the memorials page
    revalidatePath("/memorials")
    revalidatePath(`/memorial/${memorialId}`)
    console.log("Paths revalidated")

    // Double-check that the memorial exists before returning
    const { data: checkMemorial, error: checkError } = await supabase
      .from("memorials")
      .select("id, name")
      .eq("id", memorialId)
      .single()

    if (checkError || !checkMemorial) {
      console.error("Error verifying memorial exists:", checkError)
      return { error: "Memorial was created but could not be verified. Please check the memorials list." }
    }

    console.log("Memorial verified to exist:", checkMemorial)

    // Return the memorial ID for redirection
    return { success: true, memorialId }
  } catch (error) {
    console.error("Error in createTestMemorial:", error)
    return { error: "An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)) }
  }
}

// Helper function to generate a unique code for QR codes
function generateUniqueCode(): string {
  // Format: XXXXX-XXXXX-XXXXX (where X is alphanumeric)
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""

  for (let i = 0; i < 15; i++) {
    if (i === 5 || i === 10) {
      result += "-"
    }
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
