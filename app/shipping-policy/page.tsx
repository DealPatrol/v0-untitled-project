import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ShippingPolicyPage() {
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
          <h1 className="text-3xl font-serif mb-6">Shipping Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-medium mb-3">1. Shipping Overview</h2>
              <p>
                Memorial QR is committed to delivering your memorial QR codes and related products safely and promptly.
                We work with trusted shipping partners and suppliers to ensure your memorial products reach you in
                perfect condition.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">2. Processing Time</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-blue-900 mb-2">Standard Processing Times:</h3>
                <ul className="list-disc pl-6 space-y-1 text-blue-800">
                  <li>
                    <strong>Premium QR Package:</strong> 3-5 business days
                  </li>
                  <li>
                    <strong>Deluxe QR Package:</strong> 5-7 business days
                  </li>
                  <li>
                    <strong>Legacy QR Package:</strong> 7-10 business days
                  </li>
                </ul>
              </div>
              <p>
                Processing time begins after payment confirmation and completion of your memorial content. Custom
                engraving and special materials may require additional processing time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">3. Shipping Methods & Timeframes</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Shipping Method</th>
                      <th className="border border-gray-300 p-3 text-left">Delivery Time</th>
                      <th className="border border-gray-300 p-3 text-left">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3">Standard Shipping</td>
                      <td className="border border-gray-300 p-3">5-7 business days</td>
                      <td className="border border-gray-300 p-3">FREE</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">Expedited Shipping</td>
                      <td className="border border-gray-300 p-3">2-3 business days</td>
                      <td className="border border-gray-300 p-3">$15.99</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3">Express Shipping</td>
                      <td className="border border-gray-300 p-3">1-2 business days</td>
                      <td className="border border-gray-300 p-3">$29.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600">
                * Delivery times are estimates and may vary based on location and weather conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">4. Shipping Coverage</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Domestic Shipping (USA)</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>All 50 states</li>
                    <li>Washington D.C.</li>
                    <li>Puerto Rico</li>
                    <li>US Virgin Islands</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">International Shipping</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Canada (additional fees apply)</li>
                    <li>Mexico (additional fees apply)</li>
                    <li>Other countries: Contact us</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-3 text-yellow-800">5. 20-Day Delivery Guarantee</h2>
              <div className="text-yellow-700">
                <p className="font-medium mb-2">
                  🚚 If your order is not received within 20 days of your order date, you are eligible for a full
                  refund.
                </p>
                <p className="text-sm">To claim your refund under this guarantee:</p>
                <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm">
                  <li>
                    Contact us at{" "}
                    <a href="mailto:colecollins763@gmail.com" className="text-blue-600 hover:underline">
                      colecollins763@gmail.com
                    </a>
                  </li>
                  <li>Provide your order number and shipping address</li>
                  <li>We will investigate and process your refund within 3-5 business days</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">6. Tracking Your Order</h2>
              <p>Once your order ships, you will receive:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Email confirmation with tracking number</li>
                <li>Direct link to track your package</li>
                <li>SMS updates (if phone number provided)</li>
                <li>Delivery confirmation notification</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">7. Special Shipping Instructions</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Memorial Products Require:</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Signature confirmation for orders over $100</li>
                  <li>Careful packaging to prevent damage</li>
                  <li>Weather-resistant packaging for outdoor installation</li>
                  <li>Installation instructions included</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">8. Damaged or Lost Packages</h2>
              <p>If your package arrives damaged or goes missing:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Damaged:</strong> Take photos and contact us within 48 hours
                </li>
                <li>
                  <strong>Lost:</strong> We will file a claim with the carrier and send a replacement
                </li>
                <li>
                  <strong>Stolen:</strong> File a police report and contact us for assistance
                </li>
                <li>
                  <strong>Wrong Address:</strong> Additional shipping fees may apply for redelivery
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">9. Address Changes</h2>
              <p>
                Address changes must be requested within 2 hours of placing your order. After processing begins, address
                changes may not be possible. Contact us immediately at{" "}
                <a href="mailto:colecollins763@gmail.com" className="text-blue-600 hover:underline">
                  colecollins763@gmail.com
                </a>{" "}
                or call{" "}
                <a href="tel:256-595-3354" className="text-blue-600 hover:underline">
                  (256) 595-3354
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">10. Holiday and Weather Delays</h2>
              <p>Shipping may be delayed during:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Federal holidays</li>
                <li>Severe weather conditions</li>
                <li>Peak shipping seasons (November-December)</li>
                <li>Natural disasters or emergencies</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                We will notify customers of any expected delays and provide updated delivery estimates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium mb-3">11. Contact Information</h2>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium mb-2">For shipping questions or issues:</p>
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
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
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
