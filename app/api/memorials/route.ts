import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const dateOfDeath = formData.get("dateOfDeath") as string
    const location = formData.get("location") as string
    const occupation = formData.get("occupation") as string
    const hobbies = formData.get("hobbies") as string
    const achievements = formData.get("achievements") as string
    const favoriteQuote = formData.get("favoriteQuote") as string
    const biography = formData.get("biography") as string
    const personalStory = formData.get("personalStory") as string
    const spouse = formData.get("spouse") as string
    const children = formData.get("children") as string
    const parents = formData.get("parents") as string
    const siblings = formData.get("siblings") as string
    const creatorEmail = formData.get("creatorEmail") as string
    const creatorName = formData.get("creatorName") as string
    const creatorPhone = formData.get("creatorPhone") as string

    // Validate required fields
    if (!firstName || !lastName || !dateOfDeath) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Upload files if present
    let profilePhotoUrl: string | null = null
    const additionalPhotosUrls: string[] = []

    const profilePhoto = formData.get("profilePhoto") as File | null
    if (profilePhoto) {
      const fileName = `${Date.now()}-profile-${profilePhoto.name}`
      const { data, error } = await supabase.storage
        .from("memorial-photos")
        .upload(fileName, profilePhoto)

      if (error) {
        console.error("Photo upload error:", error)
        return NextResponse.json(
          { message: "Failed to upload photos" },
          { status: 500 }
        )
      }

      const { data: publicUrl } = supabase.storage
        .from("memorial-photos")
        .getPublicUrl(fileName)

      profilePhotoUrl = publicUrl.publicUrl
    }

    // Handle additional photos
    const additionalPhotosFiles = formData.getAll("additionalPhotos") as File[]
    for (const photo of additionalPhotosFiles) {
      const fileName = `${Date.now()}-${Math.random()}-${photo.name}`
      const { data, error } = await supabase.storage
        .from("memorial-photos")
        .upload(fileName, photo)

      if (!error) {
        const { data: publicUrl } = supabase.storage
          .from("memorial-photos")
          .getPublicUrl(fileName)
        additionalPhotosUrls.push(publicUrl.publicUrl)
      }
    }

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Create memorial in database
    const { data, error } = await supabase
      .from("memorials")
      .insert({
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth || null,
        date_of_death: dateOfDeath,
        location: location || null,
        occupation: occupation || null,
        hobbies: hobbies || null,
        achievements: achievements || null,
        favorite_quote: favoriteQuote || null,
        biography: biography || null,
        personal_story: personalStory || null,
        spouse: spouse || null,
        children: children || null,
        parents: parents || null,
        siblings: siblings || null,
        profile_photo_url: profilePhotoUrl,
        additional_photos: additionalPhotosUrls,
        status: "draft",
        is_paid: false,
        creator_email: creatorEmail || user?.email || "unknown",
        creator_name: creatorName || null,
        creator_phone: creatorPhone || null,
        user_id: user?.id || null,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { message: "Failed to create memorial" },
        { status: 500 }
      )
    }

    return NextResponse.json({ id: data.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating memorial:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      // Get single memorial
      const { data, error } = await supabase
        .from("memorials")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        return NextResponse.json(
          { message: "Memorial not found" },
          { status: 404 }
        )
      }

      return NextResponse.json(data)
    }

    // Get all active memorials
    const { data, error } = await supabase
      .from("memorials")
      .select("*")
      .eq("status", "active")
      .eq("is_public", true)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json(
        { message: "Failed to fetch memorials" },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching memorials:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
