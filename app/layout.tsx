import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StickyPurchaseCTA } from "@/components/sticky-purchase-cta"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Preserve Memories Forever",
  description: "Create lasting digital memorials with QR codes for headstones and memorials.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StickyPurchaseCTA />
        {children}
      </body>
    </html>
  )
}
