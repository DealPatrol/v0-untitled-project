"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"

type TestMemorialData = {
  name: string
  birth_date: string
  death_date: string
  birth_location: string
  death_location: string
  bio: string
}

// Default test user ID to use when no user is authenticated
const TEST_USER_ID = "00000000-0000-0000-0000-000000000000"

export async function createTestMemorial(data: TestMemorialData) {
  console.log("Server action called with data:", data)

  try {
    const supabase = createServerSupabaseClient()
    console.log("Supabase client created")

    // Get the current user, but don't fail if not authenticated
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.log("No authenticated user found, using test user ID")
    }

    // Use the authenticated user's ID if available, otherwise use the test user ID
    const userId = user?.id || TEST_USER_ID

    // Generate a unique ID for the memorial
    const memorialId = uuidv4()
    console.log("Generated memorial ID:", memorialId)

    // First, let's check the schema of the memorials table
    const { data: tableInfo, error: tableError } = await supabase.from("memorials").select("*").limit(1)

    if (tableError) {
      console.error("Error fetching table schema:", tableError)
      return { error: "Failed to fetch table schema: " + tableError.message }
    }

    console.log("Table schema sample:", tableInfo)

    // Create the memorial record with only the fields we know exist
    const memorialData: any = {
      id: memorialId,
      user_id: userId,
      name: data.name,
      bio: data.bio || null,
      is_public: true,
    }

    // Only add these fields if they exist in the schema
    if ("birth_date" in (tableInfo[0] || {})) {
      memorialData.birth_date = data.birth_date || null
    }

    if ("death_date" in (tableInfo[0] || {})) {
      memorialData.death_date = data.death_date || null
    }

    // Check for location fields - they might have different names
    if ("birth_location" in (tableInfo[0] || {})) {
      memorialData.birth_location = data.birth_location || null
    } else if ("place_of_birth" in (tableInfo[0] || {})) {
      memorialData.place_of_birth = data.birth_location || null
    }

    if ("death_location" in (tableInfo[0] || {})) {
      memorialData.death_location = data.death_location || null
    } else if ("place_of_death" in (tableInfo[0] || {})) {
      memorialData.place_of_death = data.death_location || null
    }

    // Add is_test flag if it exists in the schema
    if ("is_test" in (tableInfo[0] || {})) {
      memorialData.is_test = true
    }

    console.log("Inserting memorial with data:", memorialData)

    const { error: memorialError } = await supabase.from("memorials").insert(memorialData)

    if (memorialError) {
      console.error("Error creating test memorial:", memorialError)
      return { error: "Failed to create memorial: " + memorialError.message }
    }

    console.log("Memorial created successfully")

    // Add some sample media
    const sampleMedia = [
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

    const { error: mediaError } = await supabase.from("media").insert(sampleMedia)

    if (mediaError) {
      console.error("Error adding sample media:", mediaError)
    }

    // Add some sample stories
    const sampleStories = [
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

    const { error: storiesError } = await supabase.from("stories").insert(sampleStories)

    if (storiesError) {
      console.error("Error adding sample stories:", storiesError)
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
    }

    // Add some sample family members
    const sampleFamilyMembers = [
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

    const { error: familyError } = await supabase.from("family_members").insert(sampleFamilyMembers)

    if (familyError) {
      console.error("Error adding sample family members:", familyError)
    }

    // Revalidate the memorials page
    revalidatePath("/memorials")
    console.log("Paths revalidated")

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
