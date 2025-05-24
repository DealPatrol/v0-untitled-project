import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const mediaId = params.id

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the media item to check permissions and get file path
    const { data: media, error: mediaError } = await supabase
      .from("media")
      .select("*, memorials!inner(user_id)")
      .eq("id", mediaId)
      .single()

    if (mediaError || !media) {
      console.error("Error fetching media:", mediaError)
      return NextResponse.json({ error: "Media not found" }, { status: 404 })
    }

    // Check if the user owns the memorial
    if (media.memorials.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Extract the file path from the URL
    // The URL format is typically like: https://xxx.supabase.co/storage/v1/object/public/bucket-name/path/to/file
    const url = new URL(media.url)
    const pathname = url.pathname
    const parts = pathname.split("/")
    const bucketName = parts[parts.length - 3] // Assuming format /public/bucket-name/path
    const filePath = parts.slice(parts.length - 2).join("/")

    // Delete the file from storage if it's from our bucket
    if (bucketName && filePath) {
      const { error: storageError } = await supabase.storage.from(bucketName).remove([filePath])

      if (storageError) {
        console.error("Error deleting file from storage:", storageError)
        // Continue anyway to delete the database record
      }
    }

    // Delete the media record
    const { error: deleteError } = await supabase.from("media").delete().eq("id", mediaId)

    if (deleteError) {
      console.error("Error deleting media record:", deleteError)
      return NextResponse.json({ error: "Failed to delete media" }, { status: 500 })
    }

    // Redirect back to the manage images page
    return NextResponse.redirect(new URL(`/memorial/${media.memorial_id}/manage-images`, request.url))
  } catch (error) {
    console.error("Error deleting media:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
