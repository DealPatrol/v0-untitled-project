"use server"

import { createClient } from "@/lib/supabase"

/**
 * Sends an order to a supplier's API
 */
export async function sendOrderToSupplier(
  orderId: string,
  supplierId: string,
  orderItems: any[],
  shippingAddress: any,
) {
  try {
    const supabase = createClient()

    // Get supplier details
    const { data: supplier, error: supplierError } = await supabase
      .from("suppliers")
      .select("*")
      .eq("id", supplierId)
      .single()

    if (supplierError || !supplier) {
      console.error("Error fetching supplier:", supplierError)
      return { success: false, error: "Supplier not found" }
    }

    // Skip if supplier doesn't have API integration
    if (!supplier.api_endpoint || !supplier.api_key) {
      return {
        success: false,
        error: "Supplier does not have API integration configured",
        manual: true,
      }
    }

    // Format the order data according to the supplier's API requirements
    // This would need to be customized for each supplier
    const orderData = {
      external_order_id: orderId,
      shipping_address: {
        name: shippingAddress.name,
        address1: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postal_code: shippingAddress.postalCode,
        country: shippingAddress.country || "US",
        phone: shippingAddress.phone,
        email: shippingAddress.email,
      },
      line_items: orderItems.map((item) => ({
        product_id: item.supplierProductId,
        quantity: item.quantity,
        personalization: item.personalization || {},
      })),
    }

    // Send the order to the supplier's API
    const response = await fetch(supplier.api_endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supplier.api_key}`,
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Supplier API error:", errorText)
      return { success: false, error: `Supplier API error: ${response.status}` }
    }

    const responseData = await response.json()

    // Update the order_fulfillments table with the supplier's response
    const { error: updateError } = await supabase
      .from("order_fulfillments")
      .update({
        supplier_order_id: responseData.order_id || responseData.id,
        status: "processing",
        tracking_number: responseData.tracking_number,
        tracking_url: responseData.tracking_url,
        shipping_carrier: responseData.shipping_carrier,
        estimated_delivery_date: responseData.estimated_delivery_date,
        notes: `Order successfully sent to supplier. Response: ${JSON.stringify(responseData)}`,
      })
      .eq("order_id", orderId)
      .eq("supplier_id", supplierId)

    if (updateError) {
      console.error("Error updating order fulfillment:", updateError)
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("Error sending order to supplier:", error)
    return { success: false, error: "Failed to send order to supplier" }
  }
}

/**
 * Checks the status of an order with a supplier
 */
export async function checkOrderStatus(fulfillmentId: string) {
  try {
    const supabase = createClient()

    // Get fulfillment details
    const { data: fulfillment, error: fulfillmentError } = await supabase
      .from("order_fulfillments")
      .select("*, suppliers(*)")
      .eq("id", fulfillmentId)
      .single()

    if (fulfillmentError || !fulfillment) {
      console.error("Error fetching fulfillment:", fulfillmentError)
      return { success: false, error: "Fulfillment not found" }
    }

    const supplier = fulfillment.suppliers

    // Skip if supplier doesn't have API integration or no supplier order ID
    if (!supplier.api_endpoint || !supplier.api_key || !fulfillment.supplier_order_id) {
      return {
        success: false,
        error: "Cannot check status - missing API details or supplier order ID",
        manual: true,
      }
    }

    // Check the order status with the supplier's API
    const response = await fetch(`${supplier.api_endpoint}/orders/${fulfillment.supplier_order_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${supplier.api_key}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Supplier API error:", errorText)
      return { success: false, error: `Supplier API error: ${response.status}` }
    }

    const responseData = await response.json()

    // Update the order_fulfillments table with the latest status
    const { error: updateError } = await supabase
      .from("order_fulfillments")
      .update({
        status: responseData.status || fulfillment.status,
        tracking_number: responseData.tracking_number || fulfillment.tracking_number,
        tracking_url: responseData.tracking_url || fulfillment.tracking_url,
        shipping_carrier: responseData.shipping_carrier || fulfillment.shipping_carrier,
        estimated_delivery_date: responseData.estimated_delivery_date || fulfillment.estimated_delivery_date,
        actual_delivery_date: responseData.delivered_at || fulfillment.actual_delivery_date,
        updated_at: new Date().toISOString(),
      })
      .eq("id", fulfillmentId)

    if (updateError) {
      console.error("Error updating order fulfillment:", updateError)
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("Error checking order status:", error)
    return { success: false, error: "Failed to check order status" }
  }
}
