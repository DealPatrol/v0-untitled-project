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
import Header from "@/components/header"
import HomepageStickyCTA from "@/components/homepage-sticky-cta"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorials with QR Codes",
  description:
    "Create beautiful digital memorials with weather-resistant QR codes. Preserve memories, photos, and stories forever. $119.99 - No monthly fees.",
  keywords: "memorial, QR code, digital memorial, obituary, remembrance, family tree, condolences",
  openGraph: {
    title: "Memorial QR - Digital Memorials with QR Codes",
    description:
      "Create beautiful digital memorials with weather-resistant QR codes. Preserve memories, photos, and stories forever.",
    type: "website",
    url: "https://memorialqr.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Memorial QR - Digital Memorials with QR Codes",
    description:
      "Create beautiful digital memorials with weather-resistant QR codes. Preserve memories, photos, and stories forever.",
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
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <AnalyticsProvider>
              <Suspense fallback={null}>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <footer className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4">
                      <div className="grid md:grid-cols-4 gap-8">
                        <div>
                          <h3 className="text-xl font-bold mb-4">Memorial QR</h3>
                          <p className="text-gray-400">
                            Creating lasting digital memorials with weather-resistant QR codes.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4">Product</h4>
                          <ul className="space-y-2 text-gray-400">
                            <li>
                              <a href="/pricing" className="hover:text-white">
                                Pricing
                              </a>
                            </li>
                            <li>
                              <a href="/how-it-works" className="hover:text-white">
                                How It Works
                              </a>
                            </li>
                            <li>
                              <a href="/memorial/sample" className="hover:text-white">
                                Sample Memorial
                              </a>
                            </li>
                            <li>
                              <a href="/faq" className="hover:text-white">
                                FAQ
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4">Support</h4>
                          <ul className="space-y-2 text-gray-400">
                            <li>
                              <a href="/help" className="hover:text-white">
                                Help Center
                              </a>
                            </li>
                            <li>
                              <a href="/contact" className="hover:text-white">
                                Contact Us
                              </a>
                            </li>
                            <li>
                              <a href="/shipping-policy" className="hover:text-white">
                                Shipping Policy
                              </a>
                            </li>
                            <li>
                              <a href="/returns" className="hover:text-white">
                                Returns
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-4">Legal</h4>
                          <ul className="space-y-2 text-gray-400">
                            <li>
                              <a href="/privacy-policy" className="hover:text-white">
                                Privacy Policy
                              </a>
                            </li>
                            <li>
                              <a href="/terms-of-service" className="hover:text-white">
                                Terms of Service
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Memorial QR. All rights reserved.</p>
                      </div>
                    </div>
                  </footer>
                </div>
                <HomepageStickyCTA />
                <Toaster />
                <CookieConsent />
                <ErrorTracker />
              </Suspense>
            </AnalyticsProvider>
          </ThemeProvider>
        </ClientErrorBoundary>
      </body>
    </html>
  )
}
