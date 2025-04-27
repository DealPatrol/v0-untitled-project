import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { path } = await request.json()
    const supabase = createServerSupabaseClient()

    // Check if the not_found_errors table exists, if not create it
    const { error: tableCheckError } = await supabase.from("not_found_errors").select("id").limit(1).maybeSingle()

    // If table doesn't exist, create it
    if (tableCheckError && tableCheckError.message.includes('relation "not_found_errors" does not exist')) {
      await supabase.rpc("create_not_found_errors_table")
    }

    // Log the 404 error
    const { error } = await supabase.from("not_found_errors").insert({
      path: path || "unknown",
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error logging 404:", error)
      return NextResponse.json({ success: false }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to track 404 error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
