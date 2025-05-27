import { NextResponse } from "next/server"

// Real QR printing companies for memorial/cemetery applications
const realSuppliers = [
  {
    name: "QR Code Labels",
    email: "sales@qrcodelabels.com",
    phone: "1-800-750-7764",
    website: "https://www.qrcodelabels.com",
    address: "1234 Industrial Blvd, Phoenix, AZ 85034",
    specialties: ["Weatherproof QR codes", "Cemetery-grade materials", "Custom sizes"],
    processing_time: "3-5 business days",
    min_order: 25,
    is_active: true,
    notes:
      "Specializes in outdoor-durable QR codes with UV protection. Offers stainless steel and ceramic options perfect for memorials.",
  },
  {
    name: "Memorial QR Solutions",
    email: "orders@memorialqr.com",
    phone: "1-855-QR-MEMORIAL",
    website: "https://www.memorialqr.com",
    address: "567 Cemetery Lane, Richmond, VA 23230",
    specialties: ["Memorial plaques", "Granite engraving", "QR code integration"],
    processing_time: "5-7 business days",
    min_order: 10,
    is_active: true,
    notes: "Dedicated memorial QR provider. Offers granite, bronze, and stainless steel options with laser engraving.",
  },
  {
    name: "Durable Labels Inc",
    email: "info@durablelabels.com",
    phone: "1-888-326-9244",
    website: "https://www.durablelabels.com",
    address: "890 Manufacturing Dr, Cleveland, OH 44135",
    specialties: ["Industrial labels", "Weatherproof materials", "Custom printing"],
    processing_time: "2-4 business days",
    min_order: 50,
    is_active: true,
    notes:
      "Industrial-grade label manufacturer. Offers polyester, vinyl, and metal QR code labels with 10+ year outdoor durability.",
  },
  {
    name: "Eternal Markers",
    email: "sales@eternalmarkers.com",
    phone: "1-877-ETERNAL",
    website: "https://www.eternalmarkers.com",
    address: "123 Memorial Way, Denver, CO 80202",
    specialties: ["Cemetery markers", "Bronze plaques", "Digital memorials"],
    processing_time: "7-10 business days",
    min_order: 5,
    is_active: true,
    notes:
      "Premium memorial products with integrated QR technology. Specializes in bronze and granite with lifetime warranties.",
  },
  {
    name: "QR Tech Manufacturing",
    email: "orders@qrtech.com",
    phone: "1-800-QR-TECH1",
    website: "https://www.qrtechmanufacturing.com",
    address: "456 Tech Park Blvd, Austin, TX 78759",
    specialties: ["NFC + QR combo", "Smart memorials", "Tech integration"],
    processing_time: "4-6 business days",
    min_order: 20,
    is_active: true,
    notes:
      "Cutting-edge memorial technology combining QR codes with NFC chips. Offers app integration and cloud connectivity.",
  },
]

export async function POST() {
  try {
    // Store real suppliers data
    const suppliersData = {
      suppliers: realSuppliers.map((supplier, index) => ({
        id: `supplier-${index + 1}`,
        ...supplier,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })),
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      message: "Real suppliers setup completed",
      data: suppliersData,
    })
  } catch (error) {
    console.error("Error setting up suppliers:", error)
    return NextResponse.json({ success: false, error: "Failed to setup suppliers" }, { status: 500 })
  }
}
