import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Header } from "@/components/header"
import { Toaster } from "@/components/toaster"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { CookieConsent } from "@/components/cookie-consent"
import { Suspense } from "react"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Memorial QR - Digital Memorial Platform",
  description:
    "Create beautiful digital memorials with QR code access. Preserve photos, videos, stories, and family connections forever.",
  keywords: "memorial, QR code, digital memorial, obituary, family tree, remembrance",
  authors: [{ name: "Memorial QR" }],
  creator: "Memorial QR",
  publisher: "Memorial QR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://memorialqr.com"),
  openGraph: {
    title: "Memorial QR - Digital Memorial Platform",
    description:
      "Create beautiful digital memorials with QR code access. Preserve photos, videos, stories, and family connections forever.",
    url: "/",
    siteName: "Memorial QR",
    images: [
      {
        url: "/images/og-image.jpg",
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
      "Create beautiful digital memorials with QR code access. Preserve photos, videos, stories, and family connections forever.",
    images: ["/images/og-image.jpg"],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <AnalyticsProvider>
            <Header />
            <main>{children}</main>
            <footer className="bg-gray-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold">MEMORIAL</span>
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-xl font-bold">QR</span>
                    </div>
                    <p className="text-gray-400">Creating lasting digital memorials that preserve memories forever.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Product</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <Link href="/how-it-works" className="hover:text-white transition-colors">
                          How It Works
                        </Link>
                      </li>
                      <li>
                        <Link href="/pricing" className="hover:text-white transition-colors">
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link href="/memorial/sample" className="hover:text-white transition-colors">
                          Sample Memorial
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq" className="hover:text-white transition-colors">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <Link href="/contact" className="hover:text-white transition-colors">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/help" className="hover:text-white transition-colors">
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link href="/shipping-policy" className="hover:text-white transition-colors">
                          Shipping Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/returns" className="hover:text-white transition-colors">
                          Returns
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-of-service" className="hover:text-white transition-colors">
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 Memorial QR. All rights reserved.</p>
                </div>
              </div>
            </footer>
            <Toaster />
            <CookieConsent />
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  )
}
