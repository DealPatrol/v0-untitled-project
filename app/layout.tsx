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
    "Create lasting digital memorials with QR codes. Share memories, photos, and stories that honor your loved ones forever.",
  keywords: "memorial, QR code, digital memorial, obituary, remembrance, legacy",
  authors: [{ name: "Memorial QR" }],
  creator: "Memorial QR",
  publisher: "Memorial QR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://memorial-qr.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Memorial QR - Digital Memorial Platform",
    description:
      "Create lasting digital memorials with QR codes. Share memories, photos, and stories that honor your loved ones forever.",
    url: "https://memorial-qr.vercel.app",
    siteName: "Memorial QR",
    images: [
      {
        url: "/images/cemetery-hero.png",
        width: 1200,
        height: 630,
        alt: "Memorial QR - Digital Memorial Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorial QR - Digital Memorial Platform",
    description:
      "Create lasting digital memorials with QR codes. Share memories, photos, and stories that honor your loved ones forever.",
    images: ["/images/cemetery-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
