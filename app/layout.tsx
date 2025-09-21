import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorial Platform",
  description:
    "Create lasting digital memorials with QR codes. Preserve memories, share stories, and honor loved ones with our secure memorial platform.",
  keywords: "memorial, QR code, digital memorial, obituary, remembrance, legacy",
  authors: [{ name: "Memorial QR Team" }],
  openGraph: {
    title: "Memorial QR - Digital Memorial Platform",
    description:
      "Create lasting digital memorials with QR codes. Preserve memories, share stories, and honor loved ones.",
    type: "website",
    url: "https://memorialqr.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorial QR - Digital Memorial Platform",
    description:
      "Create lasting digital memorials with QR codes. Preserve memories, share stories, and honor loved ones.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
