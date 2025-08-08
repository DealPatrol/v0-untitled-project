import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const memorialId = params.id

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get form data
    const formData = await request.formData()
    const updateData = {
      name: formData.get("name") as string,
      gender: formData.get("gender") as string,
      birth_date: (formData.get("birth_date") as string) || null,
      death_date: (formData.get("death_date") as string) || null,
      birth_location: (formData.get("birth_location") as string) || null,
      death_location: (formData.get("death_location") as string) || null,
      bio: (formData.get("bio") as string) || null,
    }

    // Update the memorial
    const { data, error } = await supabase
      .from("memorials")
      .update(updateData)
      .eq("id", memorialId)
      .eq("user_id", user.id)
      .select()

    if (error) {
      console.error("Error updating memorial:", error)
      return NextResponse.json({ error: "Failed to update memorial" }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Memorial not found or unauthorized" }, { status: 404 })
    }

    // Redirect back to the memorial page
    redirect(`/memorial/${memorialId}`)
  } catch (error) {
    console.error("Error in memorial update:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
