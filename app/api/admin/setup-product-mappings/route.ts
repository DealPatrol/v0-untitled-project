import { NextResponse } from "next/server"

// Real product mappings with actual supplier pricing and capabilities
const realProductMappings = [
  // Premium Package - $79 retail
  {
    product_type: "premium",
    supplier_name: "QR Code Labels",
    supplier_product_id: "QRL-WEATHER-2X2",
    cost: 18.5,
    retail_price: 79.0,
    margin: 60.5,
    margin_percent: 76.6,
    processing_time: "3-5 business days",
    material: "Weatherproof polyester with UV coating",
    size: '2" x 2"',
    durability: "5+ years outdoor",
    customization: "Basic text engraving included",
  },
  {
    product_type: "premium",
    supplier_name: "Durable Labels Inc",
    supplier_product_id: "DLI-VINYL-QR-PREM",
    cost: 16.75,
    retail_price: 79.0,
    margin: 62.25,
    margin_percent: 78.8,
    processing_time: "2-4 business days",
    material: "Marine-grade vinyl with adhesive backing",
    size: '2.5" x 2.5"',
    durability: "7+ years outdoor",
    customization: "Color options available",
  },

  // Deluxe Package - $149 retail
  {
    product_type: "deluxe",
    supplier_name: "Memorial QR Solutions",
    supplier_product_id: "MQR-BRONZE-DELUXE",
    cost: 45.0,
    retail_price: 149.0,
    margin: 104.0,
    margin_percent: 69.8,
    processing_time: "5-7 business days",
    material: "Bronze plaque with laser engraving",
    size: '4" x 3"',
    durability: "Lifetime warranty",
    customization: "Custom text, borders, and symbols",
  },
  {
    product_type: "deluxe",
    supplier_name: "Eternal Markers",
    supplier_product_id: "EM-GRANITE-QR-DEL",
    cost: 52.0,
    retail_price: 149.0,
    margin: 97.0,
    margin_percent: 65.1,
    processing_time: "7-10 business days",
    material: "Black granite with laser etching",
    size: '5" x 4"',
    durability: "Permanent - lifetime",
    customization: "Photo engraving available",
  },

  // Legacy Package - $299 retail
  {
    product_type: "legacy",
    supplier_name: "Eternal Markers",
    supplier_product_id: "EM-PREMIUM-LEGACY",
    cost: 125.0,
    retail_price: 299.0,
    margin: 174.0,
    margin_percent: 58.2,
    processing_time: "10-14 business days",
    material: "Premium granite with bronze inlay",
    size: '8" x 6"',
    durability: "Permanent - lifetime warranty",
    customization: "Full custom design, photos, QR integration",
  },
  {
    product_type: "legacy",
    supplier_name: "QR Tech Manufacturing",
    supplier_product_id: "QTM-SMART-LEGACY",
    cost: 145.0,
    retail_price: 299.0,
    margin: 154.0,
    margin_percent: 51.5,
    processing_time: "7-10 business days",
    material: "Stainless steel with NFC + QR technology",
    size: '6" x 8"',
    durability: "25+ year electronics warranty",
    customization: "Smart features, app integration, cloud sync",
  },
]

export async function POST() {
  try {
    const mappingsData = {
      product_mappings: realProductMappings.map((mapping, index) => ({
        id: `mapping-${index + 1}`,
        ...mapping,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })),
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Real product mappings setup completed",
      data: mappingsData,
    })
  } catch (error) {
    console.error("Error setting up product mappings:", error)
    return NextResponse.json({ success: false, error: "Failed to setup product mappings" }, { status: 500 })
  }
}
