"use server"

import { headers } from "next/headers"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function track404Error() {
  try {
    const headersList = headers()
    const supabase = createServerSupabaseClient()

    // Get the current URL path that triggered the 404
    const path = headersList.get("x-pathname") || "unknown"
    const referrer = headersList.get("referer") || null
    const userAgent = headersList.get("user-agent") || null

    // Check if the not_found_errors table exists, if not create it
    const { error: tableCheckError } = await supabase.from("not_found_errors").select("id").limit(1).maybeSingle()

    // If table doesn't exist, create it
    if (tableCheckError && tableCheckError.message.includes('relation "not_found_errors" does not exist')) {
      await supabase.rpc("create_not_found_errors_table")
    }

    // Log the 404 error
    const { error } = await supabase.from("not_found_errors").insert({
      path,
      referrer,
      user_agent: userAgent,
      created_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error logging 404:", error)
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to track 404 error:", error)
    return { success: false }
  }
}
