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

  // Fetch all product-supplier mappings
  const { data, error } = await supabase.from("product_suppliers").select("*").order("product_type")

  if (error) {
    console.error("Error fetching product suppliers:", error)
    return NextResponse.json({ error: "Failed to fetch product suppliers" }, { status: 500 })
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

  // Get product supplier data from request
  const productSupplierData = await request.json()

  // Validate required fields
  if (!productSupplierData.product_type || !productSupplierData.supplier_id || productSupplierData.cost === undefined) {
    return NextResponse.json({ error: "Product type, supplier ID, and cost are required" }, { status: 400 })
  }

  // Insert new product-supplier mapping
  const { data, error } = await supabase.from("product_suppliers").insert([productSupplierData]).select()

  if (error) {
    console.error("Error creating product supplier:", error)
    return NextResponse.json({ error: "Failed to create product supplier" }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
