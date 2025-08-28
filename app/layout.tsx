import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorials with QR Codes",
  description:
    "Create beautiful digital memorials with QR codes. Honor your loved ones with lasting tributes that preserve memories forever.",
  keywords: [
    "memorial",
    "QR code",
    "digital memorial",
    "obituary",
    "remembrance",
    "tribute",
    "cemetery",
    "headstone",
    "memorial plaque",
  ],
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
    title: "Memorial QR - Digital Memorials with QR Codes",
    description:
      "Create beautiful digital memorials with QR codes. Honor your loved ones with lasting tributes that preserve memories forever.",
    url: "https://memorial-qr.vercel.app",
    siteName: "Memorial QR",
    images: [
      {
        url: "/images/cemetery-hero.png",
        width: 1200,
        height: 630,
        alt: "Memorial QR - Digital Memorials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorial QR - Digital Memorials with QR Codes",
    description:
      "Create beautiful digital memorials with QR codes. Honor your loved ones with lasting tributes that preserve memories forever.",
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
