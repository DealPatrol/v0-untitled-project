import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { CheckCircle, QrCode, Heart, Share2, Clock, Shield } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-lg">
            Simple 3-Step Process
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How Memorial QR Works</h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Creating a lasting digital memorial is simple and meaningful. Follow our easy 3-step process to honor your
            loved one with a beautiful QR code memorial.
          </p>

          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
            <Link href="/create-profile">Start Creating Memorial</Link>
          </Button>
        </div>
      </section>

      {/* Main Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Share Their Story</h2>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  Tell us about your loved one by filling out our simple form. Upload their favorite photos, write their
                  biography, and share the memories that made them special.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Upload unlimited photos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Write their life story</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Add important dates and details</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Include favorite quotes or sayings</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <Card className="border-2 border-orange-200 shadow-lg">
                  <CardContent className="p-8">
                    <div className="bg-orange-50 rounded-lg p-6 text-center">
                      <Heart className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Memorial Form</h3>
                      <p className="text-gray-600">
                        Easy-to-use form that guides you through creating a beautiful tribute
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-20">
              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Get Your QR Code</h2>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  Once you complete the memorial, we create a custom QR code and send you a beautiful, weatherproof
                  plaque. The QR code links directly to their digital memorial page.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Custom QR code generated</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Weatherproof metal plaque</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Professional engraving</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Fast shipping included</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <Card className="border-2 border-orange-200 shadow-lg">
                  <CardContent className="p-8">
                    <div className="bg-orange-50 rounded-lg p-6 text-center">
                      <QrCode className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">QR Code Plaque</h3>
                      <p className="text-gray-600">Durable, weather-resistant plaque that lasts for years</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Connect & Remember</h2>
                </div>

                <p className="text-lg text-gray-600 mb-6">
                  Visitors can scan the QR code with their phone to instantly access the memorial. They can view photos,
                  read their story, and leave their own memories and condolences.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Instant access via smartphone</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Visitors can leave messages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Share memories with family</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Available 24/7 forever</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <Card className="border-2 border-orange-200 shadow-lg">
                  <CardContent className="p-8">
                    <div className="bg-orange-50 rounded-lg p-6 text-center">
                      <Share2 className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Memorial</h3>
                      <p className="text-gray-600">Beautiful online tribute accessible to anyone with a smartphone</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to create lasting digital memorials that preserve memories forever
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Quick Setup</h3>
                <p className="text-gray-600">
                  Create a complete memorial in just 15 minutes. Our simple form guides you through every step.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Built to Last</h3>
                <p className="text-gray-600">
                  Weatherproof QR codes and secure digital hosting ensure your memorial lasts for generations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Meaningful Connection</h3>
                <p className="text-gray-600">
                  Help visitors connect with your loved one's story and leave their own memories to share.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Their Memorial?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start honoring your loved one today with a beautiful digital memorial that will preserve their memory
            forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-xl font-bold"
            >
              <Link href="/create-profile">Create Memorial - $119.99</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/browse-memorials">View Sample Memorials</Link>
            </Button>
          </div>

          <div className="text-lg opacity-90">
            ✓ 30-Day Money Back Guarantee • ✓ Lifetime Access • ✓ No Monthly Fees
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-gray-400 text-sm">Honoring memories with digital memorials that last forever.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="hover:text-white">
                    Sample Memorials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
