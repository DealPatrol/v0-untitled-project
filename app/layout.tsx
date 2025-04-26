import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Suspense } from "react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Memorial QR - Preserve Memories with QR Codes",
  description: "Create lasting digital memorials with our weather-resistant QR codes for headstones and memorials.",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Memorial QR - Preserve Memories with QR Codes" />
        <meta
          property="og:description"
          content="Create lasting digital memorials with our weather-resistant QR codes for headstones and memorials."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://memorialqr.com" />
        <meta property="og:image" content="https://memorialqr.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense>
            <AnalyticsProvider>
              {children}
              <CookieConsent />
            </AnalyticsProvider>
          </Suspense>
        </ThemeProvider>
        {/* Footer with Privacy and Terms links */}
        <footer className="bg-white border-t py-6">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Memorial QR. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link href="/privacy-policy" className="hover:text-gray-700">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-gray-700">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-gray-700">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
