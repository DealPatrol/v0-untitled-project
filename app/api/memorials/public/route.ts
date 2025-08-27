import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const sortBy = searchParams.get("sortBy") || "recent"
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("memorials")
      .select(`
        id,
        name,
        birth_date,
        death_date,
        location,
        biography,
        profile_image_url,
        tags,
        created_at
      `)
      .eq("is_public", true)
      .range(offset, offset + limit - 1)

    // Apply search filter
    if (search) {
      query = query.or(`
        name.ilike.%${search}%,
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
        query = query.order("name", { ascending: true })
        break
      case "oldest":
        query = query.order("death_date", { ascending: true })
        break
      case "recent":
      default:
        query = query.order("created_at", { ascending: false })
        break
    }

    const { data: memorials, error } = await query

    if (error) {
      console.error("Error fetching memorials:", error)
      return NextResponse.json({ error: "Failed to fetch memorials" }, { status: 500 })
    }

    // Calculate age for each memorial
    const memorialsWithAge =
      memorials?.map((memorial) => ({
        ...memorial,
        age:
          memorial.birth_date && memorial.death_date
            ? new Date(memorial.death_date).getFullYear() - new Date(memorial.birth_date).getFullYear()
            : null,
      })) || []

    return NextResponse.json({
      memorials: memorialsWithAge,
      total: memorialsWithAge.length,
    })
  } catch (error) {
    console.error("Error in public memorials API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
