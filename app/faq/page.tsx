import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif mb-2 text-rose-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-8">
            Find answers to the most common questions about Memorial QR products and services.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Accordion type="single" collapsible className="space-y-4">
              {/* Product Questions */}
              <div className="mb-6">
                <h2 className="text-xl font-medium text-rose-800 mb-4">About Our Products</h2>

                <AccordionItem value="what-is-memorial-qr">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    What is Memorial QR?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Memorial QR is a service that creates durable QR codes that link to digital memorial pages. When
                    placed on a headstone, memorial marker, or keepsake, visitors can scan the QR code with their
                    smartphone to access photos, videos, stories, and other memories of your loved one. It's a way to
                    preserve and share their legacy for generations to come.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-does-it-work">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How does Memorial QR work?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Purchase a Memorial QR code from our website.</li>
                      <li>
                        Create your memorial page by uploading photos, videos, stories, and biographical information.
                      </li>
                      <li>Receive your weather-resistant QR code in the mail.</li>
                      <li>Place the QR code on the headstone, memorial marker, or keep it as a personal keepsake.</li>
                      <li>Visitors can scan the QR code with any smartphone camera to access the memorial page.</li>
                      <li>You can continue to update the memorial page with new content at any time.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="qr-code-durability">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How durable is the QR code?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Our Memorial QR codes are made from high-quality, weather-resistant materials designed to withstand
                    outdoor conditions for many years. They are resistant to UV rays, rain, snow, and temperature
                    fluctuations. The QR codes are made with a special protective coating that prevents fading and
                    deterioration. We offer a 10-year durability guarantee, and with proper installation, many of our QR
                    codes have lasted much longer.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="installation">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How do I install the QR code on a headstone?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Each Memorial QR code comes with detailed installation instructions. For headstones, we recommend
                    using the included industrial-strength adhesive that is specifically designed for stone surfaces.
                    The process is simple:
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li>Clean the surface thoroughly with the provided alcohol wipe.</li>
                      <li>Remove the backing from the adhesive.</li>
                      <li>Carefully place the QR code on the desired location.</li>
                      <li>Press firmly for 30 seconds.</li>
                      <li>Allow 24 hours for the adhesive to fully cure.</li>
                    </ol>
                    For professional installation, many monument companies and cemeteries offer this service for a small
                    fee.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Plans and Pricing */}
              <div className="mb-6">
                <h2 className="text-xl font-medium text-rose-800 mb-4">Plans and Pricing</h2>

                <AccordionItem value="plan-differences">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    What's the difference between your plans?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    <p className="mb-2">We offer three main plans:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Premium Plan ($49.99):</strong> Includes 1 QR code, up to 50 photos, 10 videos,
                        unlimited text stories, and 5 years of hosting.
                      </li>
                      <li>
                        <strong>Deluxe Plan ($79.99):</strong> Includes 2 QR codes, up to 100 photos, 20 videos,
                        unlimited text stories, family tree feature, and 20 years of hosting.
                      </li>
                      <li>
                        <strong>Legacy Plan ($99.99):</strong> Includes 3 QR codes, unlimited photos and videos,
                        unlimited text stories, family tree feature, advanced customization options, and lifetime
                        hosting.
                      </li>
                    </ul>
                    <p className="mt-2">
                      All plans include our weather-resistant QR code, a customizable memorial page, and the ability to
                      make the page public or private.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="hosting-duration">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How long will my memorial page be hosted?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    The hosting duration depends on your plan:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Premium Plan: 5 years of hosting (renewable)</li>
                      <li>Deluxe Plan: 20 years of hosting (renewable)</li>
                      <li>Legacy Plan: Lifetime hosting (we maintain a trust fund to ensure perpetual hosting)</li>
                    </ul>
                    For Premium and Deluxe plans, you'll receive a notification before your hosting period expires with
                    options to renew. Renewal fees are significantly lower than the initial purchase price.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment-options">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover) through our secure
                    payment processor, Stripe. We also accept bank transfers and, in some cases, payment on delivery.
                    All transactions are encrypted and secure. We never store your full credit card information on our
                    servers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="refund-policy">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    What is your refund policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service
                    for any reason, you can request a full refund within 30 days of your purchase. For physical QR codes
                    that have been shipped, we ask that you return them to receive your refund. After 30 days, refunds
                    are considered on a case-by-case basis. Please contact our customer support team at
                    support@memorialqr.com to initiate a refund.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Technical Questions */}
              <div className="mb-6">
                <h2 className="text-xl font-medium text-rose-800 mb-4">Technical Questions</h2>

                <AccordionItem value="smartphone-compatibility">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    Do visitors need a special app to scan the QR code?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    No special app is required. Most modern smartphones (both iPhone and Android) have QR code scanning
                    capabilities built into their camera apps. Visitors simply need to open their camera app, point it
                    at the QR code, and tap the notification that appears. This will take them directly to the memorial
                    page in their web browser. For older phones without built-in QR scanning, free QR code scanner apps
                    are available in the App Store and Google Play Store.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="update-memorial">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How do I update the memorial page?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    You can update your memorial page at any time by logging into your account on our website. From your
                    dashboard, you can add, edit, or remove photos, videos, stories, and other content. Changes are
                    published immediately, and the QR code remains the same - it will always direct visitors to your
                    updated memorial page. There's no limit to how often you can update the page, and no additional fees
                    for updates.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="privacy-settings">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    Can I control who sees the memorial page?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Yes, you have complete control over the privacy settings of your memorial page:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        <strong>Public:</strong> Anyone who scans the QR code can view the memorial page.
                      </li>
                      <li>
                        <strong>Private:</strong> Only people with the password can view the memorial page.
                      </li>
                      <li>
                        <strong>Family Only:</strong> Only registered family members can view the memorial page.
                      </li>
                    </ul>
                    You can change these settings at any time from your dashboard. For private pages, you can share the
                    password with family and friends as needed.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-security">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How secure is my data?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    We take data security very seriously. All data is stored on secure, encrypted servers with regular
                    backups. We use industry-standard SSL encryption for all data transfers. Your personal information
                    is never shared with third parties without your explicit consent. We comply with all relevant data
                    protection regulations, including GDPR and CCPA. For more details, please see our{" "}
                    <Link href="/privacy-policy" className="text-rose-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Shipping and Delivery */}
              <div className="mb-6">
                <h2 className="text-xl font-medium text-rose-800 mb-4">Shipping and Delivery</h2>

                <AccordionItem value="shipping-time">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How long does shipping take?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Standard shipping within the United States takes 3-5 business days. Expedited shipping (1-2 business
                    days) is available for an additional fee. International shipping typically takes 7-14 business days,
                    depending on the destination country and customs processing. You'll receive a tracking number via
                    email once your order ships so you can monitor its progress.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="international-shipping">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    Do you ship internationally?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Yes, we ship to most countries worldwide. International shipping rates vary by destination. Please
                    note that any import duties, taxes, or customs fees are the responsibility of the recipient.
                    Delivery times for international orders may be longer due to customs processing. If we cannot ship
                    to your country, you'll be notified during the checkout process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tracking-order">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How can I track my order?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Once your order ships, you'll receive an email with a tracking number and a link to track your
                    package. You can also log into your account on our website and view your order status and tracking
                    information in the "Orders" section of your dashboard. If you haven't received a tracking number
                    within 2 business days of your order, please contact our customer support team.
                  </AccordionContent>
                </AccordionItem>
              </div>

              {/* Account Management */}
              <div>
                <h2 className="text-xl font-medium text-rose-800 mb-4">Account Management</h2>

                <AccordionItem value="multiple-memorials">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    Can I create multiple memorial pages with one account?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Yes, you can create and manage multiple memorial pages from a single account. Each memorial page
                    requires its own plan purchase, but you can easily switch between them from your dashboard. This is
                    particularly useful for families who want to create memorials for multiple loved ones or for funeral
                    homes managing memorials for clients.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="transfer-ownership">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    Can I transfer ownership of a memorial page?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Yes, you can transfer ownership of a memorial page to another person. The new owner will need to
                    create an account on our website (if they don't already have one). Then, from your dashboard, you
                    can initiate the transfer process. The new owner will receive an email notification and will need to
                    accept the transfer. Once accepted, they will have full control over the memorial page, and you will
                    no longer have access to it.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="family-collaboration">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    Can multiple family members contribute to a memorial page?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    Yes, you can invite family members and friends to contribute to a memorial page without giving them
                    full ownership. From your dashboard, you can send invitation emails with specific permission levels:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        <strong>Viewer:</strong> Can only view the memorial page, even if it's set to private.
                      </li>
                      <li>
                        <strong>Contributor:</strong> Can add photos, videos, and stories, but cannot change settings.
                      </li>
                      <li>
                        <strong>Editor:</strong> Can add content and edit existing content, but cannot change ownership
                        or delete the page.
                      </li>
                      <li>
                        <strong>Admin:</strong> Has full access except for billing changes and ownership transfer.
                      </li>
                    </ul>
                    This collaborative approach allows family members to share the responsibility of maintaining the
                    memorial and adding their own memories and perspectives.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-deletion">
                  <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-rose-700">
                    How do I delete my account?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    You can delete your account by going to the "Account Settings" section of your dashboard and
                    selecting "Delete Account." Please note that deleting your account will also delete any memorial
                    pages you own, unless you transfer ownership first. This action cannot be undone. If you have active
                    memorial pages with paid hosting, we recommend transferring ownership before deleting your account
                    to ensure the memorials remain accessible.
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
          </div>

          <div className="bg-rose-50 p-6 rounded-lg border border-rose-200">
            <h2 className="text-xl font-medium text-rose-800 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer to your question, our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-rose-700 hover:bg-rose-800">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild className="border-rose-300 text-rose-700 hover:bg-rose-50">
                <Link href="mailto:support@memorialqr.com">Email Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
