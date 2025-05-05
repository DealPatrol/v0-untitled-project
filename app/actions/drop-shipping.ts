"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { Supplier, ProductSupplier, OrderFulfillment } from "@/types/supabase"

// Get all suppliers
export async function getSuppliers() {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.from("suppliers").select("*").order("name")

    if (error) {
      console.error("Error fetching suppliers:", error)
      return { error: error.message }
    }

    return { suppliers: data }
  } catch (error: any) {
    console.error("Error in getSuppliers:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Get a supplier by ID
export async function getSupplierById(id: string) {
  try {
    const supabase = createServerSupabaseClient()
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
      return { error: error.message }
    }

    return { supplier: data }
  } catch (error: any) {
    console.error("Error in getSupplierById:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Create or update a supplier
export async function saveSupplier(supplier: Partial<Supplier>) {
  try {
    const supabase = createServerSupabaseClient()

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
        return { error: error.message }
      }

      revalidatePath("/dashboard/suppliers")
      return { supplier: data }
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
        return { error: error.message }
      }

      revalidatePath("/dashboard/suppliers")
      return { supplier: data }
    }
  } catch (error: any) {
    console.error("Error in saveSupplier:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Delete a supplier
export async function deleteSupplier(id: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("suppliers").delete().eq("id", id)

    if (error) {
      console.error("Error deleting supplier:", error)
      return { error: error.message }
    }

    revalidatePath("/dashboard/suppliers")
    return { success: true }
  } catch (error: any) {
    console.error("Error in deleteSupplier:", error)
    return { error: error.message || "An unexpected error occurred" }
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
        return { error: error.message }
      }

      return { productSupplier: data }
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
        return { error: error.message }
      }

      return { productSupplier: data }
    }
  } catch (error: any) {
    console.error("Error in saveProductSupplier:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Delete product-supplier mapping
export async function deleteProductSupplier(id: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase.from("product_suppliers").delete().eq("id", id)

    if (error) {
      console.error("Error deleting product supplier:", error)
      return { error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Error in deleteProductSupplier:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Get product-supplier mappings for a specific product type
export async function getProductSuppliers(productType: string) {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from("product_suppliers")
      .select(`
        *,
        suppliers(*)
      `)
      .eq("product_type", productType)

    if (error) {
      console.error("Error fetching product suppliers:", error)
      return { error: error.message }
    }

    return { productSuppliers: data }
  } catch (error: any) {
    console.error("Error in getProductSuppliers:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Create order fulfillment record when an order is placed
export async function createOrderFulfillment(orderId: string, productType: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Find the supplier for this product type
    const { data: productSupplier, error: productSupplierError } = await supabase
      .from("product_suppliers")
      .select("*, suppliers(*)")
      .eq("product_type", productType)
      .eq("suppliers.is_active", true)
      .order("cost", { ascending: true })
      .limit(1)
      .single()

    if (productSupplierError || !productSupplier) {
      console.error("Error finding supplier for product:", productSupplierError)
      return { error: "No active supplier found for this product type" }
    }

    // Create fulfillment record
    const { data: fulfillment, error: fulfillmentError } = await supabase
      .from("order_fulfillments")
      .insert({
        order_id: orderId,
        supplier_id: productSupplier.supplier_id,
        status: "pending",
        notes: `Auto-assigned to supplier: ${productSupplier.suppliers.name}`,
      })
      .select()
      .single()

    if (fulfillmentError) {
      console.error("Error creating order fulfillment:", fulfillmentError)
      return { error: fulfillmentError.message }
    }

    // Now send the order to the supplier's API if they have one configured
    if (productSupplier.suppliers.api_endpoint && productSupplier.suppliers.api_key) {
      const result = await sendOrderToSupplier(
        fulfillment.id,
        productSupplier.suppliers.api_endpoint,
        productSupplier.suppliers.api_key,
        productSupplier.supplier_product_id || productType,
      )

      if (result.error) {
        // Update fulfillment with error
        await supabase
          .from("order_fulfillments")
          .update({
            status: "failed",
            notes: `Failed to send to supplier API: ${result.error}`,
            updated_at: new Date().toISOString(),
          })
          .eq("id", fulfillment.id)

        return { error: result.error }
      }

      // Update fulfillment with supplier order ID
      if (result.supplierOrderId) {
        await supabase
          .from("order_fulfillments")
          .update({
            supplier_order_id: result.supplierOrderId,
            status: "processing",
            notes: `Successfully sent to supplier API. Supplier order ID: ${result.supplierOrderId}`,
            updated_at: new Date().toISOString(),
          })
          .eq("id", fulfillment.id)
      }
    }

    return { fulfillment }
  } catch (error: any) {
    console.error("Error in createOrderFulfillment:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Send order to supplier's API
async function sendOrderToSupplier(fulfillmentId: string, apiEndpoint: string, apiKey: string, productId: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Get fulfillment details with order information
    const { data: fulfillment, error: fulfillmentError } = await supabase
      .from("order_fulfillments")
      .select(`
        *,
        orders(*)
      `)
      .eq("id", fulfillmentId)
      .single()

    if (fulfillmentError || !fulfillment) {
      return { error: "Fulfillment not found" }
    }

    // Extract shipping information from order metadata
    const shippingInfo = fulfillment.orders.metadata?.shipping

    if (!shippingInfo) {
      return { error: "No shipping information found in order" }
    }

    // Make API call to supplier
    // This is a placeholder - you would implement the actual API call based on your supplier's API
    console.log(`Sending order to supplier API: ${apiEndpoint}`)
    console.log(`API Key: ${apiKey}`)
    console.log(`Product ID: ${productId}`)
    console.log(`Shipping Info:`, shippingInfo)

    // Simulate API response
    // In a real implementation, you would make an actual HTTP request to the supplier's API
    const supplierOrderId = `SUP-${Math.floor(100000 + Math.random() * 900000)}`

    return { success: true, supplierOrderId }
  } catch (error: any) {
    console.error("Error sending order to supplier:", error)
    return { error: error.message || "Failed to send order to supplier" }
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
      return { error: error.message }
    }

    return { fulfillment: data }
  } catch (error: any) {
    console.error("Error in updateOrderFulfillment:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}

// Get fulfillment details for an order
export async function getOrderFulfillment(orderId: string) {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from("order_fulfillments")
      .select(`
        *,
        suppliers(*)
      `)
      .eq("order_id", orderId)
      .single()

    if (error) {
      console.error("Error fetching order fulfillment:", error)
      return { error: error.message }
    }

    return { fulfillment: data }
  } catch (error: any) {
    console.error("Error in getOrderFulfillment:", error)
    return { error: error.message || "An unexpected error occurred" }
  }
}
