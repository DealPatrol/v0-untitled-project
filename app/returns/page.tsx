import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ReturnsPage() {
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
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-serif mb-6">Returns & Refunds Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-medium mb-3">1. Return Policy Overview</h2>
              <p>
                At Memorial QR, we understand that creating a memorial is a deeply personal experience. We want you to
                be completely satisfied with your purchase. If for any reason you are not satisfied, we offer a
                comprehensive return and refund policy.
              </p>
            </section>

            <section className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-3 text-green-800">2. 30-Day Money-Back Guarantee</h2>
              <div className="text-green-700">
                <p className="font-medium mb-2">
                  ✅ We offer a full 30-day money-back guarantee on all Memorial QR packages.
                </p>
                <p className="text-sm">
                  If you're not completely satisfied with your memorial QR code or digital memorial page, you can
                  request a full refund within 30 days of your purchase date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">3. What Can Be Returned</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">✅ Eligible for Return:</h3>
                  <ul className="list-disc pl-6 space-y-1 text-blue-800 text-sm">
                    <li>Physical QR code plaques (unused condition)</li>
                    <li>Digital memorial packages</li>
                    <li>Unused QR code credits</li>
                    <li>Defective or damaged products</li>
                    <li>Products not matching description</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900 mb-2">❌ Not Eligible for Return:</h3>
                  <ul className="list-disc pl-6 space-y-1 text-red-800 text-sm">
                    <li>Custom engraved products (after approval)</li>
                    <li>Digital content after 30 days</li>
                    <li>QR codes damaged by customer</li>
                    <li>Memorial pages with extensive customization</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">4. How to Request a Return</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium mb-3">Step-by-Step Return Process:</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Contact Us:</strong> Email{" "}
                    <a href="mailto:colecollins763@gmail.com" className="text-blue-600 hover:underline">
                      colecollins763@gmail.com
                    </a>{" "}
                    or call{" "}
                    <a href="tel:256-595-3354" className="text-blue-600 hover:underline">
                      (256) 595-3354
                    </a>
                  </li>
                  <li>
                    <strong>Provide Information:</strong> Include your order number, reason for return, and any photos
                    if applicable
                  </li>
                  <li>
                    <strong>Receive Return Authorization:</strong> We'll provide a return authorization number and
                    instructions
                  </li>
                  <li>
                    <strong>Ship the Item:</strong> Package securely and ship to our return address (we'll provide
                    prepaid label for defective items)
                  </li>
                  <li>
                    <strong>Receive Refund:</strong> Refund processed within 3-5 business days after we receive the item
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">5. Refund Methods</h2>
              <p>Refunds will be processed using the same payment method used for the original purchase:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Credit Card:</strong> 3-5 business days to appear on statement
                </li>
                <li>
                  <strong>PayPal:</strong> 1-2 business days
                </li>
                <li>
                  <strong>Bank Transfer:</strong> 5-7 business days
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Note: Original shipping costs are non-refundable unless the return is due to our error or a defective
                product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">6. Exchanges</h2>
              <p>
                We offer exchanges for defective products or if you received the wrong item. For exchanges to a
                different product type or upgrade, you may need to pay the price difference.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>Quick Exchange:</strong> For defective QR codes, we'll expedite a replacement at no charge and
                  provide a prepaid return label for the defective item.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">7. Damaged or Defective Items</h2>
              <p>If you receive a damaged or defective item:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Contact us immediately with photos of the damage</li>
                <li>We'll provide a prepaid return label</li>
                <li>Replacement will be expedited at no charge</li>
                <li>Full refund available if replacement is not satisfactory</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">8. Digital Memorial Content</h2>
              <p>
                For digital memorial pages and content, refunds are available within 30 days. However, any custom work
                or extensive personalization may affect refund eligibility. We'll work with you to find a satisfactory
                solution.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">9. Warranty Coverage</h2>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">5-Year Durability Warranty:</h3>
                <p className="text-green-800 text-sm">
                  All Memorial QR codes come with a 5-year warranty against weather damage, fading, or scanning issues.
                  Warranty replacements are provided free of charge.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">10. Contact Information</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium mb-2">For returns, refunds, or warranty claims:</p>
                <ul className="space-y-1">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:colecollins763@gmail.com" className="text-blue-600 hover:underline">
                      colecollins763@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>Phone:</strong>{" "}
                    <a href="tel:256-595-3354" className="text-blue-600 hover:underline">
                      (256) 595-3354
                    </a>
                  </li>
                  <li>
                    <strong>Address:</strong> 12476 CR 747, Hanceville, AL 35077
                  </li>
                  <li>
                    <strong>Hours:</strong> Monday-Friday, 9 AM - 5 PM CST
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Memorial QR. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy-policy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/shipping-policy" className="hover:text-gray-700">
              Shipping Policy
            </Link>
            <Link href="/contact" className="hover:text-gray-700">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
