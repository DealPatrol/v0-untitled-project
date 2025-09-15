import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, externalId } = body

    if (!name || !externalId) {
      return NextResponse.json({ error: "Missing required fields: name and externalId" }, { status: 400 })
    }

    // Log the check registration attempt
    console.log("[SERVER] Dev mode: Would register check", name, { name, externalId })

    // In production, this would integrate with Vercel Checks API
    // For development, we just simulate success
    const mockCheckId = `check_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json({
      success: true,
      checkId: mockCheckId,
      message: "Performance check registered successfully",
      environment: process.env.NODE_ENV || "development",
    })
  } catch (error) {
    console.error("Failed to register performance check:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to register performance check",
        details: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Memorial QR Performance Checks",
    version: "1.0.0",
    status: "operational",
    endpoints: {
      POST: "Register a new performance check",
      GET: "Get service information",
    },
    environment: process.env.NODE_ENV || "development",
  })
}
