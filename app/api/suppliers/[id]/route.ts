import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

  // Get supplier ID from params
  const { id } = params

  // Get update data from request
  const updateData = await request.json()

  // Update supplier
  const { data, error } = await supabase.from("suppliers").update(updateData).eq("id", id).select()

  if (error) {
    console.error("Error updating supplier:", error)
    return NextResponse.json({ error: "Failed to update supplier" }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

  // Get supplier ID from params
  const { id } = params

  // Delete supplier
  const { error } = await supabase.from("suppliers").delete().eq("id", id)

  if (error) {
    console.error("Error deleting supplier:", error)
    return NextResponse.json({ error: "Failed to delete supplier" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
