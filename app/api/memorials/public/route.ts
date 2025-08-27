import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const sortBy = searchParams.get("sortBy") || "recent"
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("memorials")
      .select(`
        id,
        first_name,
        last_name,
        birth_date,
        death_date,
        location,
        biography,
        profile_image_url,
        cover_image_url,
        tags,
        created_at,
        is_public
      `)
      .eq("is_public", true)

    // Apply search filter
    if (search) {
      query = query.or(`
        first_name.ilike.%${search}%,
        last_name.ilike.%${search}%,
        location.ilike.%${search}%,
        biography.ilike.%${search}%,
        tags.cs.{${search}}
      `)
    }

    // Apply category filter
    if (category && category !== "all") {
      query = query.contains("tags", [category])
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        query = query.order("last_name", { ascending: true })
        break
      case "date-desc":
        query = query.order("death_date", { ascending: false })
        break
      case "date-asc":
        query = query.order("death_date", { ascending: true })
        break
      default: // recent
        query = query.order("created_at", { ascending: false })
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: memorials, error, count } = await query

    if (error) {
      console.error("Error fetching memorials:", error)
      return NextResponse.json({ error: "Failed to fetch memorials" }, { status: 500 })
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from("memorials")
      .select("*", { count: "exact", head: true })
      .eq("is_public", true)

    return NextResponse.json({
      memorials: memorials || [],
      totalCount: totalCount || 0,
      hasMore: offset + limit < (totalCount || 0),
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
