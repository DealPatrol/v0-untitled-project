"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, ExternalLink } from "lucide-react"

export default function FooterLinkTestPage() {
  const [testedLinks, setTestedLinks] = useState<Record<string, boolean>>({})

  const footerLinks = [
    {
      category: "Quick Links",
      links: [
        { name: "Products", url: "/pricing", description: "Product pricing page" },
        { name: "How It Works", url: "/how-it-works", description: "How Memorial QR works" },
        { name: "Testimonials", url: "/#testimonials", description: "Customer testimonials section" },
        { name: "FAQ", url: "/faq", description: "Frequently asked questions" },
      ],
    },
    {
      category: "Customer Support",
      links: [
        { name: "Contact Us", url: "/contact", description: "Contact form and information" },
        { name: "Shipping Policy", url: "/shipping-policy", description: "Shipping and delivery policy" },
        { name: "Returns & Refunds", url: "/returns", description: "Return and refund policy" },
        { name: "Privacy Policy", url: "/privacy-policy", description: "Privacy and data policy" },
      ],
    },
    {
      category: "Additional Pages",
      links: [
        { name: "Terms of Service", url: "/terms-of-service", description: "Terms and conditions" },
        { name: "AI Tools", url: "/ai-tools", description: "AI-powered memorial tools" },
        { name: "Memorials", url: "/memorials", description: "Sample memorial pages" },
        { name: "Checkout", url: "/checkout", description: "Purchase flow" },
      ],
    },
  ]

  const markTested = (url: string, working: boolean) => {
    setTestedLinks((prev) => ({ ...prev, [url]: working }))
  }

  const getStatusIcon = (url: string) => {
    if (!(url in testedLinks)) return null
    return testedLinks[url] ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif flex items-center">
            Memorial QR
            <span className="text-yellow-400 ml-1">★</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-serif mb-6">Footer Link Testing</h1>
          <p className="text-gray-600 mb-8">
            Click through each link below to test that all footer links are working properly. Mark each as working or
            broken.
          </p>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {footerLinks.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.links.map((link) => (
                      <div key={link.url} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{link.name}</h3>
                          {getStatusIcon(link.url)}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{link.description}</p>
                        <div className="flex gap-2">
                          <Link href={link.url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="text-xs">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Test Link
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-green-50 text-green-700 hover:bg-green-100"
                            onClick={() => markTested(link.url, true)}
                          >
                            ✓ Works
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-red-50 text-red-700 hover:bg-red-100"
                            onClick={() => markTested(link.url, false)}
                          >
                            ✗ Broken
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">URL: {link.url}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testing Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Testing Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {footerLinks.reduce((acc, cat) => acc + cat.links.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Links</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Object.values(testedLinks).filter(Boolean).length}
                  </div>
                  <div className="text-sm text-gray-600">Working</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {Object.values(testedLinks).filter((v) => !v).length}
                  </div>
                  <div className="text-sm text-gray-600">Broken</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-600">
                    {footerLinks.reduce((acc, cat) => acc + cat.links.length, 0) - Object.keys(testedLinks).length}
                  </div>
                  <div className="text-sm text-gray-600">Not Tested</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Click "Test Link" to open each page in a new tab</li>
                <li>Verify the page loads correctly and displays the expected content</li>
                <li>Mark the link as "Works" if it loads properly, or "Broken" if there are issues</li>
                <li>Check for any 404 errors, missing content, or broken functionality</li>
                <li>Test on both desktop and mobile if possible</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
