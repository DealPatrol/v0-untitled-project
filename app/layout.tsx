import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorial Plaques",
  description:
    "Create beautiful QR code memorial plaques that connect visitors to photos, videos, and stories of your loved one's life. Honor their memory with a lasting digital tribute.",
  keywords: "memorial, QR code, digital memorial, memorial plaque, remembrance, tribute, obituary, memorial website",
  authors: [{ name: "Memorial QR" }],
  creator: "Memorial QR",
  publisher: "Memorial QR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://memorialqr.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Memorial QR - Digital Memorial Plaques",
    description:
      "Create beautiful QR code memorial plaques that connect visitors to photos, videos, and stories of your loved one's life.",
    url: "/",
    siteName: "Memorial QR",
    images: [
      {
        url: "/memorial-qr-logo.png",
        width: 1200,
        height: 630,
        alt: "Memorial QR - Digital Memorial Plaques",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorial QR - Digital Memorial Plaques",
    description:
      "Create beautiful QR code memorial plaques that connect visitors to photos, videos, and stories of your loved one's life.",
    images: ["/memorial-qr-logo.png"],
    creator: "@memorialqr",
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
  verification: {
    google: "your-google-verification-code",
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Memorial QR" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
