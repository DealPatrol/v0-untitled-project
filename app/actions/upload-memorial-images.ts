"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

const BUCKET_NAME = "memorial-images"

export async function uploadMemorialImages(formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "You must be logged in to upload images" }
    }

    const files = formData.getAll("files") as File[]
    const memorialId = formData.get("memorialId") as string

    if (!memorialId || !files.length) {
      return { error: "Missing memorial ID or files" }
    }

    // Validate that the memorial belongs to the current user
    const { data: memorial, error: memorialError } = await supabase
      .from("memorials")
      .select("id")
      .eq("id", memorialId)
      .eq("user_id", user.id)
      .single()

    if (memorialError || !memorial) {
      console.error("Memorial validation error:", memorialError)
      return { error: "You do not have permission to upload to this memorial" }
    }

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

    const uploadResults = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileExt = file.name.split(".").pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `memorials/${memorialId}/${fileName}`

      // Determine media type
      const mediaType = "image"

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file)

      if (uploadError) {
        console.error("Error uploading file:", uploadError)
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: uploadError.message,
        })
        continue
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath)

      // Insert into media table
      const { data: mediaData, error: mediaError } = await supabase
        .from("media")
        .insert({
          memorial_id: memorialId,
          media_type: mediaType,
          url: publicUrl,
          caption: file.name.replace(/\.[^/.]+$/, ""), // Use filename without extension as caption
          display_order: i + 1,
        })
        .select()

      if (mediaError) {
        console.error("Error inserting media record:", mediaError)
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: mediaError.message,
        })
        continue
      }

      uploadResults.push({
        fileName: file.name,
        success: true,
        url: publicUrl,
        mediaId: mediaData[0].id,
      })
    }

    return { success: true, uploads: uploadResults }
  } catch (error) {
    console.error("Error in uploadMemorialImages:", error)
    return {
      error: "An unexpected error occurred during upload: " + (error instanceof Error ? error.message : String(error)),
    }
  }
}
