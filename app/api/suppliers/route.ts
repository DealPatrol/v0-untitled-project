import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if user is authenticated and is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get user role
  const { data: userRole } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!userRole || userRole.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Fetch all suppliers
  const { data, error } = await supabase.from("suppliers").select("*").order("name")

  if (error) {
    console.error("Error fetching suppliers:", error)
    return NextResponse.json({ error: "Failed to fetch suppliers" }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if user is authenticated and is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get user role
  const { data: userRole } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!userRole || userRole.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  // Get supplier data from request
  const supplierData = await request.json()

  // Validate required fields
  if (!supplierData.name || !supplierData.email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
  }

  // Insert new supplier
  const { data, error } = await supabase.from("suppliers").insert([supplierData]).select()

  if (error) {
    console.error("Error creating supplier:", error)
    return NextResponse.json({ error: "Failed to create supplier" }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
