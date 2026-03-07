import { NextRequest, NextResponse } from "next/server"

// Sample dropship products - in production, these would come from your database
const PRODUCTS = [
  {
    id: "1",
    name: "Memorial Necklace - Cremation Urn",
    category: "jewelry",
    price: 34.99,
    compareAtPrice: 49.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    description: "Stainless steel cremation urn necklace with adjustable chain",
    features: ["Waterproof", "Includes chain", "Memorial keepsake"],
    supplier: "Printful",
  },
  {
    id: "2",
    name: "Memorial Plaque with QR Code",
    category: "memorial_plaque",
    price: 79.99,
    compareAtPrice: 129.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    description: "8x10 custom engraved plaque with integrated QR code",
    features: ["Custom engraving", "QR code integration", "Premium materials"],
    supplier: "Gooten",
  },
  {
    id: "3",
    name: "Memorial Bracelet",
    category: "jewelry",
    price: 24.99,
    compareAtPrice: 39.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    description: "Personalized memorial bracelet with name engraving",
    features: ["Adjustable fit", "Personalized engraving", "Stainless steel"],
    supplier: "Printful",
  },
  {
    id: "4",
    name: "Photo Frame Keepsake",
    category: "keepsake",
    price: 44.99,
    compareAtPrice: 69.99,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop",
    description: "5x7 wooden photo frame with memorial inscription",
    features: ["Wooden construction", "Photo included", "Custom engraving"],
    supplier: "Gooten",
  },
  {
    id: "5",
    name: "Memorial Garden Stone",
    category: "keepsake",
    price: 54.99,
    compareAtPrice: 84.99,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
    description: "Weather-resistant stone with QR code and engraving",
    features: ["Weather-resistant", "QR code compatible", "Long-lasting"],
    supplier: "Printful",
  },
  {
    id: "6",
    name: "Memorial Candle Holder",
    category: "accessory",
    price: 29.99,
    compareAtPrice: 49.99,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
    description: "Elegant memorial candle holder with personalization",
    features: ["Elegant design", "Personalized", "Metal construction"],
    supplier: "Gooten",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const category = searchParams.get("category")

    if (id) {
      const product = PRODUCTS.find(p => p.id === id)
      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 })
      }
      return NextResponse.json(product)
    }

    let filtered = PRODUCTS
    if (category && category !== "all") {
      filtered = PRODUCTS.filter(p => p.category === category)
    }

    return NextResponse.json(filtered)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
