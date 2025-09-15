import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Please read these terms carefully before using our memorial services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <p className="text-gray-600">Last updated: January 1, 2024</p>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Memorial QR's services, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Memorial QR provides digital memorial services, including the creation of memorial pages, QR code
                generation, and physical memorial plaques. Our services allow users to create lasting tributes to their
                loved ones.
              </p>

              <h2>3. User Accounts</h2>
              <p>
                To use our services, you may be required to create an account. You are responsible for maintaining the
                confidentiality of your account information and for all activities that occur under your account.
              </p>

              <h2>4. Payment Terms</h2>
              <p>
                Our memorial package is offered for a one-time fee of $149. Payment is processed securely through
                Stripe. All sales are final, subject to our 30-day money-back guarantee.
              </p>

              <h2>5. Content Guidelines</h2>
              <p>You are responsible for all content you upload to your memorial. Content must be:</p>
              <ul>
                <li>Respectful and appropriate for a memorial setting</li>
                <li>Legally owned by you or used with permission</li>
                <li>Free from harmful, offensive, or illegal material</li>
                <li>Compliant with copyright and intellectual property laws</li>
              </ul>

              <h2>6. Prohibited Uses</h2>
              <p>You may not use our service:</p>
              <ul>
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>
                  To violate any international, federal, provincial, or state regulations, rules, laws, or local
                  ordinances
                </li>
                <li>
                  To infringe upon or violate our intellectual property rights or the intellectual property rights of
                  others
                </li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
              </ul>

              <h2>7. Intellectual Property Rights</h2>
              <p>
                The service and its original content, features, and functionality are and will remain the exclusive
                property of Memorial QR and its licensors. The service is protected by copyright, trademark, and other
                laws.
              </p>

              <h2>8. User Content</h2>
              <p>
                You retain ownership of content you upload to your memorial. By uploading content, you grant us a
                license to use, display, and distribute your content as necessary to provide our services.
              </p>

              <h2>9. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                service, to understand our practices.
              </p>

              <h2>10. Service Availability</h2>
              <p>
                We strive to provide continuous service availability but cannot guarantee uninterrupted access. We may
                temporarily suspend service for maintenance, updates, or other operational reasons.
              </p>

              <h2>11. Lifetime Hosting</h2>
              <p>
                We commit to hosting your memorial for the lifetime of our company. In the unlikely event of business
                closure, we will provide 90 days notice and assistance in transferring your memorial content.
              </p>

              <h2>12. Refund Policy</h2>
              <p>
                We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us within 30
                days of purchase for a full refund.
              </p>

              <h2>13. Limitation of Liability</h2>
              <p>
                In no event shall Memorial QR, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>

              <h2>14. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever and without limitation.
              </p>

              <h2>15. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these terms at any time. If a revision is material, we will
                provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2>16. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p>
                Email: legal@memorialqr.com
                <br />
                Phone: 1-800-MEMORIAL
                <br />
                Address: 123 Memory Lane, Birmingham, AL 35203
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
