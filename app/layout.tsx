import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorial Platform",
  description:
    "Create lasting digital memorials with QR codes. Honor loved ones with photos, stories, and memories that last forever.",
  keywords: "memorial, QR code, digital memorial, obituary, remembrance, tribute",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
