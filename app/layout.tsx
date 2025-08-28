import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { ClientErrorBoundary } from "@/components/client-error-boundary"
import { ErrorTracker } from "@/components/error-tracker"
import { Header } from "@/components/header"
import { Suspense } from "react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorial Tributes",
  description:
    "Create beautiful, lasting digital memorials with QR code access. Honor your loved ones with photos, videos, stories, and memories that last forever.",
  keywords: "memorial, QR code, digital tribute, obituary, remembrance, family tree, condolences",
  authors: [{ name: "Memorial QR Team" }],
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
    title: "Memorial QR - Digital Memorial Tributes",
    description:
      "Create beautiful, lasting digital memorials with QR code access. Honor your loved ones with photos, videos, stories, and memories that last forever.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://memorialqr.com",
    siteName: "Memorial QR",
    images: [
      {
        url: "/images/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Memorial QR - Digital Memorial Tributes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorial QR - Digital Memorial Tributes",
    description: "Create beautiful, lasting digital memorials with QR code access.",
    images: ["/images/hero-image.png"],
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <ErrorTracker />
          <ClientErrorBoundary>
            <AnalyticsProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <footer className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4">
                      <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Memorial QR</h3>
                          <p className="text-gray-400 text-sm">
                            Creating lasting digital memorials that honor and preserve the memories of your loved ones.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">Quick Links</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <Link href="/how-it-works" className="text-gray-400 hover:text-white">
                                How It Works
                              </Link>
                            </div>
                            <div>
                              <Link href="/pricing" className="text-gray-400 hover:text-white">
                                Pricing
                              </Link>
                            </div>
                            <div>
                              <Link href="/browse-memorials" className="text-gray-400 hover:text-white">
                                Sample Memorials
                              </Link>
                            </div>
                            <div>
                              <Link href="/faq" className="text-gray-400 hover:text-white">
                                FAQ
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">Support</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <Link href="/contact" className="text-gray-400 hover:text-white">
                                Contact Us
                              </Link>
                            </div>
                            <div>
                              <Link href="/help" className="text-gray-400 hover:text-white">
                                Help Center
                              </Link>
                            </div>
                            <div>
                              <Link href="/shipping-policy" className="text-gray-400 hover:text-white">
                                Shipping Policy
                              </Link>
                            </div>
                            <div>
                              <Link href="/returns" className="text-gray-400 hover:text-white">
                                Returns
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">Legal</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <Link href="/privacy-policy" className="text-gray-400 hover:text-white">
                                Privacy Policy
                              </Link>
                            </div>
                            <div>
                              <Link href="/terms-of-service" className="text-gray-400 hover:text-white">
                                Terms of Service
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2024 Memorial QR. All rights reserved.</p>
                      </div>
                    </div>
                  </footer>
                </div>
              </Suspense>
              <CookieConsent />
            </AnalyticsProvider>
          </ClientErrorBoundary>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
