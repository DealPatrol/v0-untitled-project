"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import type { Supplier, ProductSupplier, OrderFulfillment } from "@/types/supabase"
import { revalidatePath } from "next/cache"

// Get all suppliers with robust error handling
export async function getSuppliers() {
  try {
    const supabase = createServerSupabaseClient()

    // First check if the table exists by trying a simple query
    try {
      const { data, error } = await supabase.from("suppliers").select("count").limit(1)

      // If we get here without error, the table exists
      if (!error) {
        // Now do the actual query
        const { data: suppliers, error: queryError } = await supabase.from("suppliers").select("*").order("name")

        if (queryError) {
          console.error("Error fetching suppliers:", queryError)
          return { suppliers: [], error: queryError.message }
        }

        return { suppliers: suppliers || [], error: null }
      } else {
        // Table doesn't exist - return empty array instead of error
        console.log("Suppliers table doesn't exist yet:", error.message)
        return { suppliers: [], error: null }
      }
    } catch (queryError: any) {
      // Handle JSON parsing errors or other unexpected errors
      console.error("Error in suppliers query:", queryError)
      return { suppliers: [], error: "Database error: " + queryError.message }
    }
  } catch (error: any) {
    console.error("Error in getSuppliers:", error)
    return { suppliers: [], error: "Connection error: " + error.message }
  }
}

// Get a supplier by ID
export async function getSupplierById(id: string) {
  try {
    const supabase = createServerSupabaseClient()

    try {
      const { data, error } = await supabase
        .from("suppliers")
        .select(`
          *,
          product_suppliers(*)
        `)
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching supplier:", error)
        return { supplier: null, error: error.message }
      }

      return { supplier: data, error: null }
    } catch (queryError: any) {
      console.error("Error in supplier query:", queryError)
      return { supplier: null, error: "Database error: " + queryError.message }
    }
  } catch (error: any) {
    console.error("Error in getSupplierById:", error)
    return { supplier: null, error: "Connection error: " + error.message }
  }
}

// Create or update a supplier
export async function saveSupplier(supplier: Partial<Supplier>) {
  try {
    const supabase = createServerSupabaseClient()

    // First check if the table exists
    try {
      const { error: checkError } = await supabase.from("suppliers").select("count").limit(1)

      // If table doesn't exist, create it
      if (checkError && checkError.message.includes("does not exist")) {
        await createSuppliersTable()
      }

      if (supplier.id) {
        // Update existing supplier
        const { data, error } = await supabase
          .from("suppliers")
          .update({
            name: supplier.name,
            email: supplier.email,
            phone: supplier.phone,
            website: supplier.website,
            api_key: supplier.api_key,
            api_endpoint: supplier.api_endpoint,
            is_active: supplier.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", supplier.id)
          .select()
          .single()

        if (error) {
          console.error("Error updating supplier:", error)
          return { supplier: null, error: error.message }
        }

        revalidatePath("/dashboard/suppliers")
        return { supplier: data, error: null }
      } else {
        // Create new supplier
        const { data, error } = await supabase
          .from("suppliers")
          .insert({
            name: supplier.name!,
            email: supplier.email!,
            phone: supplier.phone,
            website: supplier.website,
            api_key: supplier.api_key,
            api_endpoint: supplier.api_endpoint,
            is_active: supplier.is_active ?? true,
          })
          .select()
          .single()

        if (error) {
          console.error("Error creating supplier:", error)
          return { supplier: null, error: error.message }
        }

        revalidatePath("/dashboard/suppliers")
        return { supplier: data, error: null }
      }
    } catch (queryError: any) {
      console.error("Error in supplier operation:", queryError)
      return { supplier: null, error: "Database error: " + queryError.message }
    }
  } catch (error: any) {
    console.error("Error in saveSupplier:", error)
    return { supplier: null, error: "Connection error: " + error.message }
  }
}

// Helper function to create suppliers table
async function createSuppliersTable() {
  try {
    const supabase = createServerSupabaseClient()

    // Create suppliers table
    const { error } = await supabase.rpc("exec_sql", {
      sql_query: `
        CREATE TABLE IF NOT EXISTS suppliers (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          website TEXT,
          api_key TEXT,
          api_endpoint TEXT,
          is_active BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    })

    if (error) {
      console.error("Error creating suppliers table:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in createSuppliersTable:", error)
    return false
  }
}

// Delete a supplier
export async function deleteSupplier(id: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("suppliers").delete().eq("id", id)

    if (error) {
      console.error("Error deleting supplier:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/dashboard/suppliers")
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Error in deleteSupplier:", error)
    return { success: false, error: "Connection error: " + error.message }
  }
}

// Save product-supplier mapping
export async function saveProductSupplier(productSupplier: Partial<ProductSupplier>) {
  try {
    const supabase = createServerSupabaseClient()

    if (productSupplier.id) {
      // Update existing mapping
      const { data, error } = await supabase
        .from("product_suppliers")
        .update({
          product_type: productSupplier.product_type,
          supplier_id: productSupplier.supplier_id,
          supplier_product_id: productSupplier.supplier_product_id,
          cost: productSupplier.cost,
          processing_time: productSupplier.processing_time,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productSupplier.id)
        .select()
        .single()

      if (error) {
        console.error("Error updating product supplier:", error)
        return { productSupplier: null, error: error.message }
      }

      return { productSupplier: data, error: null }
    } else {
      // Create new mapping
      const { data, error } = await supabase
        .from("product_suppliers")
        .insert({
          product_type: productSupplier.product_type!,
          supplier_id: productSupplier.supplier_id!,
          supplier_product_id: productSupplier.supplier_product_id,
          cost: productSupplier.cost!,
          processing_time: productSupplier.processing_time,
        })
        .select()
        .single()

      if (error) {
        console.error("Error creating product supplier:", error)
        return { productSupplier: null, error: error.message }
      }

      return { productSupplier: data, error: null }
    }
  } catch (error: any) {
    console.error("Error in saveProductSupplier:", error)
    return { productSupplier: null, error: error.message || "An unexpected error occurred" }
  }
}

// Delete product-supplier mapping
export async function deleteProductSupplier(id: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("product_suppliers").delete().eq("id", id)

    if (error) {
      console.error("Error deleting product supplier:", error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error: any) {
    console.error("Error in deleteProductSupplier:", error)
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// Get product-supplier mappings for a specific product type
export async function getProductSuppliers(productType: string) {
  try {
    const supabase = createServerSupabaseClient()

    try {
      // First check if the table exists
      const { error: checkError } = await supabase.from("product_suppliers").select("count").limit(1)

      if (checkError && checkError.message.includes("does not exist")) {
        // Table doesn't exist, return empty array
        return { productSuppliers: [], error: null }
      }

      const { data, error } = await supabase
        .from("product_suppliers")
        .select(`
          *,
          suppliers(*)
        `)
        .eq("product_type", productType)

      if (error) {
        console.error("Error fetching product suppliers:", error)
        return { productSuppliers: [], error: error.message }
      }

      return { productSuppliers: data || [], error: null }
    } catch (queryError: any) {
      console.error("Error in product suppliers query:", queryError)
      return { productSuppliers: [], error: "Database error: " + queryError.message }
    }
  } catch (error: any) {
    console.error("Error in getProductSuppliers:", error)
    return { productSuppliers: [], error: "Connection error: " + error.message }
  }
}

// Create order fulfillment record when an order is placed
export async function createOrderFulfillment(orderId: string, productType: string) {
  try {
    const supabase = createServerSupabaseClient()

    try {
      // Check if tables exist before querying
      const { error: checkError } = await supabase.from("product_suppliers").select("count").limit(1)

      if (checkError && checkError.message.includes("does not exist")) {
        // Tables don't exist yet
        return { error: "Product suppliers table not available yet" }
      }

      // Find the supplier for this product type
      const { data: productSupplier, error: productSupplierError } = await supabase
        .from("product_suppliers")
        .select("*, suppliers(*)")
        .eq("product_type", productType)
        .order("cost", { ascending: true })
        .limit(1)
        .maybeSingle()

      if (productSupplierError) {
        console.error("Error finding supplier for product:", productSupplierError)
        return { error: "Error finding supplier for this product type" }
      }

      if (!productSupplier) {
        console.warn("No supplier found for product type:", productType)
        return { error: "No supplier found for this product type" }
      }

      // Check if order_fulfillments table exists
      const { error: fulfillmentCheckError } = await supabase.from("order_fulfillments").select("count").limit(1)

      if (fulfillmentCheckError && fulfillmentCheckError.message.includes("does not exist")) {
        // Create order_fulfillments table
        await createOrderFulfillmentsTable()
      }

      // Create fulfillment record
      const { data: fulfillment, error: fulfillmentError } = await supabase
        .from("order_fulfillments")
        .insert({
          order_id: orderId,
          supplier_id: productSupplier.supplier_id,
          status: "pending",
          notes: `Auto-assigned to supplier: ${productSupplier.suppliers?.name || "Unknown"}`,
        })
        .select()
        .single()

      if (fulfillmentError) {
        console.error("Error creating order fulfillment:", fulfillmentError)
        return { error: fulfillmentError.message }
      }

      return { fulfillment, error: null }
    } catch (queryError: any) {
      console.error("Error in order fulfillment operation:", queryError)
      return { error: "Database error: " + queryError.message }
    }
  } catch (error: any) {
    console.error("Error in createOrderFulfillment:", error)
    return { error: "Connection error: " + error.message }
  }
}

// Helper function to create order_fulfillments table
async function createOrderFulfillmentsTable() {
  try {
    const supabase = createServerSupabaseClient()

    // Create order_fulfillments table
    const { error } = await supabase.rpc("exec_sql", {
      sql_query: `
        CREATE TABLE IF NOT EXISTS order_fulfillments (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          order_id TEXT NOT NULL,
          supplier_id UUID NOT NULL,
          supplier_order_id TEXT,
          status TEXT NOT NULL DEFAULT 'pending',
          tracking_number TEXT,
          shipping_carrier TEXT,
          estimated_delivery_date TIMESTAMP WITH TIME ZONE,
          notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS order_fulfillments_order_id_idx ON order_fulfillments(order_id);
      `,
    })

    if (error) {
      console.error("Error creating order_fulfillments table:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in createOrderFulfillmentsTable:", error)
    return false
  }
}

// Update order fulfillment status
export async function updateOrderFulfillment(fulfillmentId: string, updates: Partial<OrderFulfillment>) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("order_fulfillments")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", fulfillmentId)
      .select()
      .single()

    if (error) {
      console.error("Error updating order fulfillment:", error)
      return { fulfillment: null, error: error.message }
    }

    return { fulfillment: data, error: null }
  } catch (error: any) {
    console.error("Error in updateOrderFulfillment:", error)
    return { fulfillment: null, error: "Connection error: " + error.message }
  }
}

// Get fulfillment details for an order
export async function getOrderFulfillment(orderId: string) {
  try {
    const supabase = createServerSupabaseClient()

    try {
      // Check if table exists before querying
      const { error: checkError } = await supabase.from("order_fulfillments").select("count").limit(1)

      if (checkError && checkError.message.includes("does not exist")) {
        // Table doesn't exist, return null without error
        return { fulfillment: null, error: null }
      }

      const { data, error } = await supabase
        .from("order_fulfillments")
        .select(`
          *,
          suppliers(*)
        `)
        .eq("order_id", orderId)
        .maybeSingle()

      if (error) {
        console.error("Error fetching order fulfillment:", error)
        return { fulfillment: null, error: error.message }
      }

      return { fulfillment: data, error: null }
    } catch (queryError: any) {
      console.error("Error in order fulfillment query:", queryError)
      return { fulfillment: null, error: "Database error: " + queryError.message }
    }
  } catch (error: any) {
    console.error("Error in getOrderFulfillment:", error)
    return { fulfillment: null, error: "Connection error: " + error.message }
  }
}
