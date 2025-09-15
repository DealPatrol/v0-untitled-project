import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect and handle your personal information.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <p className="text-gray-600">Last updated: January 1, 2024</p>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create a memorial, contact us, or
                use our services. This may include:
              </p>
              <ul>
                <li>Name, email address, and contact information</li>
                <li>Photos, videos, and stories you upload</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Usage data and analytics</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our memorial services</li>
                <li>Process payments and fulfill orders</li>
                <li>Communicate with you about your account</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties except as
                described in this policy. We may share information:
              </p>
              <ul>
                <li>With service providers who assist in our operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer</li>
                <li>With your consent</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure payment processing through Stripe</li>
              </ul>

              <h2>5. Memorial Privacy</h2>
              <p>You control the privacy settings of your memorial. You can choose to make your memorial:</p>
              <ul>
                <li>Public - accessible to anyone with the QR code or link</li>
                <li>Private - accessible only to invited family and friends</li>
                <li>Password protected - requiring a password to access</li>
              </ul>

              <h2>6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and fulfill the
                purposes outlined in this policy. Memorial content is stored permanently as part of our lifetime hosting
                commitment.
              </p>

              <h2>7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Export your memorial content</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about data processing</li>
              </ul>

              <h2>8. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to improve your experience, analyze usage, and provide
                personalized content. You can control cookie settings through your browser.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal information
                from children under 13. If we become aware of such collection, we will delete the information promptly.
              </p>

              <h2>10. International Users</h2>
              <p>
                If you are accessing our services from outside the United States, please be aware that your information
                may be transferred to, stored, and processed in the United States.
              </p>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes by
                posting the new policy on this page and updating the "last updated" date.
              </p>

              <h2>12. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our data practices, please contact us at:</p>
              <p>
                Email: privacy@memorialqr.com
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
