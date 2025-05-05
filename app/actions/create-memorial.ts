"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"

const BUCKET_NAME = "memorial-images"

export async function createMemorial(formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Check if the bucket exists and create it if it doesn't
    const { data: buckets } = await supabase.storage.listBuckets()
    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME)

    if (!bucketExists) {
      console.log(`Bucket "${BUCKET_NAME}" not found. Creating it...`)
      const { error: createBucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // Make the bucket public so files can be accessed without authentication
      })

      if (createBucketError) {
        console.error("Error creating bucket:", createBucketError)
        return { error: `Failed to create storage bucket: ${createBucketError.message}` }
      }
      console.log(`Bucket "${BUCKET_NAME}" created successfully`)
    }

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "You must be logged in to create a memorial" }
    }

    // Extract form data
    const name = formData.get("name") as string
    const birthDate = formData.get("birth_date") as string
    const deathDate = formData.get("death_date") as string
    const birthLocation = formData.get("birth_location") as string
    const deathLocation = formData.get("death_location") as string
    const bio = formData.get("bio") as string
    const coverImage = formData.get("cover_image") as File
    const profileImage = formData.get("profile_image") as File

    // Generate a unique ID for the memorial
    const memorialId = uuidv4()

    // Create the memorial record
    const { data: memorial, error: memorialError } = await supabase
      .from("memorials")
      .insert({
        id: memorialId,
        user_id: user.id,
        name,
        birth_date: birthDate || null,
        death_date: deathDate || null,
        birth_location: birthLocation || null,
        death_location: deathLocation || null,
        bio: bio || null,
        is_public: true,
      })
      .select()
      .single()

    if (memorialError) {
      console.error("Error creating memorial:", memorialError)
      return { error: "Failed to create memorial" }
    }

    // Upload cover image if provided
    if (coverImage && coverImage.size > 0) {
      const coverImageExt = coverImage.name.split(".").pop()
      const coverImagePath = `memorials/${memorialId}/cover.${coverImageExt}`

      const { error: coverUploadError } = await supabase.storage.from(BUCKET_NAME).upload(coverImagePath, coverImage)

      if (coverUploadError) {
        console.error("Error uploading cover image:", coverUploadError)
      } else {
        // Get the public URL
        const { data: coverImageUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(coverImagePath)

        // Update the memorial with the cover image URL
        await supabase.from("memorials").update({ cover_image_url: coverImageUrl.publicUrl }).eq("id", memorialId)
      }
    }

    // Upload profile image if provided
    if (profileImage && profileImage.size > 0) {
      const profileImageExt = profileImage.name.split(".").pop()
      const profileImagePath = `memorials/${memorialId}/profile.${profileImageExt}`

      const { error: profileUploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(profileImagePath, profileImage)

      if (profileUploadError) {
        console.error("Error uploading profile image:", profileUploadError)
      } else {
        // Get the public URL
        const { data: profileImageUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(profileImagePath)

        // Update the memorial with the profile image URL
        await supabase.from("memorials").update({ profile_image_url: profileImageUrl.publicUrl }).eq("id", memorialId)
      }
    }

    // Process additional photos
    const additionalPhotosKeys = Array.from(formData.keys()).filter((key) => key.startsWith("additional_photos_"))

    for (const key of additionalPhotosKeys) {
      const photo = formData.get(key) as File

      if (photo && photo.size > 0) {
        const photoExt = photo.name.split(".").pop()
        const photoPath = `memorials/${memorialId}/photos/${uuidv4()}.${photoExt}`

        const { error: photoUploadError } = await supabase.storage.from(BUCKET_NAME).upload(photoPath, photo)

        if (photoUploadError) {
          console.error(`Error uploading photo ${key}:`, photoUploadError)
          continue
        }

        // Get the public URL
        const { data: photoUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(photoPath)

        // Add to media table
        await supabase.from("media").insert({
          memorial_id: memorialId,
          media_type: "image",
          url: photoUrl.publicUrl,
          caption: `Photo ${Number.parseInt(key.split("_").pop() || "0") + 1}`,
          display_order: Number.parseInt(key.split("_").pop() || "0") + 1,
        })
      }
    }

    // Process videos
    const videoKeys = Array.from(formData.keys()).filter((key) => key.startsWith("videos_"))

    for (const key of videoKeys) {
      const video = formData.get(key) as File

      if (video && video.size > 0) {
        const videoExt = video.name.split(".").pop()
        const videoPath = `memorials/${memorialId}/videos/${uuidv4()}.${videoExt}`

        const { error: videoUploadError } = await supabase.storage.from(BUCKET_NAME).upload(videoPath, video)

        if (videoUploadError) {
          console.error(`Error uploading video ${key}:`, videoUploadError)
          continue
        }

        // Get the public URL
        const { data: videoUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(videoPath)

        // Add to media table
        await supabase.from("media").insert({
          memorial_id: memorialId,
          media_type: "video",
          url: videoUrl.publicUrl,
          caption: `Video ${Number.parseInt(key.split("_").pop() || "0") + 1}`,
          display_order: 1000 + Number.parseInt(key.split("_").pop() || "0"), // Put videos after images
        })
      }
    }

    // Process family members
    const familyMembersJson = formData.get("family_members") as string

    if (familyMembersJson) {
      try {
        const familyMembers = JSON.parse(familyMembersJson)

        for (const member of familyMembers) {
          // Create family member record
          const { data: familyMember, error: familyMemberError } = await supabase
            .from("family_members")
            .insert({
              memorial_id: memorialId,
              name: member.name,
              relationship: member.relationship,
              birth_date: member.birth_date || null,
              death_date: member.death_date || null,
            })
            .select()
            .single()

          if (familyMemberError) {
            console.error("Error creating family member:", familyMemberError)
            continue
          }

          // Upload family member photo if provided
          if (member.photo) {
            const photoFile = formData.get(`family_photo_${member.id}`) as File

            if (photoFile && photoFile.size > 0) {
              const photoExt = photoFile.name.split(".").pop()
              const photoPath = `memorials/${memorialId}/family/${familyMember.id}.${photoExt}`

              const { error: photoUploadError } = await supabase.storage.from(BUCKET_NAME).upload(photoPath, photoFile)

              if (photoUploadError) {
                console.error(`Error uploading family member photo:`, photoUploadError)
                continue
              }

              // Get the public URL
              const { data: photoUrl } = supabase.storage.from(BUCKET_NAME).getPublicUrl(photoPath)

              // Update family member with photo URL
              await supabase.from("family_members").update({ photo_url: photoUrl.publicUrl }).eq("id", familyMember.id)
            }
          }
        }
      } catch (error) {
        console.error("Error processing family members:", error)
      }
    }

    // Create a QR code for the memorial
    const uniqueCode = generateUniqueCode()

    await supabase.from("qr_codes").insert({
      memorial_id: memorialId,
      unique_code: uniqueCode,
      is_active: true,
    })

    // Revalidate the memorials page
    revalidatePath("/memorials")

    return { success: true, memorialId }
  } catch (error) {
    console.error("Error in createMemorial:", error)
    return { error: "An unexpected error occurred" }
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
