import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { ClientErrorBoundary } from "@/components/client-error-boundary"
import { ErrorTracker } from "@/components/error-tracker"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorial Keepsakes",
  description:
    "Create beautiful digital memorials with QR codes. Preserve memories, share stories, and honor loved ones with our premium memorial keepsakes.",
  keywords: "memorial, QR code, digital memorial, remembrance, keepsake, obituary, tribute",
  authors: [{ name: "Memorial QR" }],
  creator: "Memorial QR",
  publisher: "Memorial QR",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://memorialqr.com",
    siteName: "Memorial QR",
    title: "Memorial QR - Digital Memorial Keepsakes",
    description:
      "Create beautiful digital memorials with QR codes. Preserve memories, share stories, and honor loved ones.",
    images: [
      {
        url: "/images/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Memorial QR - Digital Memorial Keepsakes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorial QR - Digital Memorial Keepsakes",
    description:
      "Create beautiful digital memorials with QR codes. Preserve memories, share stories, and honor loved ones.",
    images: ["/images/hero-image.png"],
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
        <ClientErrorBoundary>
          <Suspense fallback={null}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <AnalyticsProvider>
                <ErrorTracker />
                <Header />
                <main>{children}</main>
                <Toaster />
                <CookieConsent />
              </AnalyticsProvider>
            </ThemeProvider>
          </Suspense>
        </ClientErrorBoundary>
      </body>
    </html>
  )
}
