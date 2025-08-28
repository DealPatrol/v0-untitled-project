import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { CountdownTimer } from "@/components/countdown-timer"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Cemetery Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cemetery-hero.png"
            alt="Peaceful cemetery background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-lg">
            ⭐ Trusted by 10,000+ Families
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory with a <span className="text-orange-400">Digital Memorial</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Create a beautiful QR code memorial that connects visitors to cherished memories, photos, and stories that
            celebrate a life well-lived.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Link href="/create-profile">Create Memorial Now - $119.99</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/memorials">View Sample Memorials</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <StarRating rating={5} readonly className="text-yellow-400" />
              <span className="text-lg">4.9/5 Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-400" />
            <div className="text-lg">✓ 30-Day Money Back Guarantee</div>
            <div className="hidden sm:block w-px h-6 bg-gray-400" />
            <div className="text-lg">✓ Lifetime Access</div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🎯 Special Launch Pricing</h2>
          <p className="text-xl text-gray-700 mb-8">
            Get your memorial QR code for just <span className="font-bold text-orange-600">$119.99</span> (Regular
            price: $199.99)
          </p>

          <CountdownTimer className="mb-8" />

          <Button
            asChild
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-xl font-bold"
          >
            <Link href="/create-profile">Claim Your Discount Now</Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Share Their Story</h3>
                <p className="text-gray-600">
                  Upload photos, write their biography, and add cherished memories that capture their unique life
                  journey.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Your QR Code</h3>
                <p className="text-gray-600">
                  Receive a beautiful, weatherproof QR code plaque that links directly to their digital memorial.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Connect & Remember</h3>
                <p className="text-gray-600">
                  Visitors can scan the code to instantly access memories, leave condolences, and celebrate their life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Honor Their Memory
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive memorial platform includes all the features you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-orange-600 text-3xl mb-4">📸</div>
              <h3 className="text-xl font-semibold mb-3">Photo Galleries</h3>
              <p className="text-gray-600">
                Upload unlimited photos and create beautiful galleries that tell their story.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-orange-600 text-3xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-3">Life Stories</h3>
              <p className="text-gray-600">
                Share their biography, achievements, and the moments that made them special.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-orange-600 text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3">Guest Messages</h3>
              <p className="text-gray-600">Allow visitors to leave condolences and share their own memories.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-orange-600 text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Weatherproof QR Code</h3>
              <p className="text-gray-600">Durable, weather-resistant plaque that lasts for years in any conditions.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-orange-600 text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Privacy Controls</h3>
              <p className="text-gray-600">
                Choose who can view and contribute to the memorial with flexible privacy settings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-orange-600 text-3xl mb-4">♾️</div>
              <h3 className="text-xl font-semibold mb-3">Lifetime Access</h3>
              <p className="text-gray-600">
                Your memorial is preserved forever with no recurring fees or subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Families Everywhere</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our memorial QR codes have helped families honor their loved ones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-100">
              <CardContent className="p-8">
                <StarRating rating={5} readonly className="mb-4 text-yellow-500" />
                <p className="text-gray-700 mb-6 italic">
                  "This gave us such comfort knowing that visitors to Dad's grave can learn about his incredible life.
                  The QR code has brought our family closer together through shared memories."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-gray-500">Memorial for Robert Johnson</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardContent className="p-8">
                <StarRating rating={5} readonly className="mb-4 text-yellow-500" />
                <p className="text-gray-700 mb-6 italic">
                  "The quality of the QR code plaque exceeded our expectations. It's been through rain, snow, and sun
                  for over a year and still works perfectly."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Michael Chen</div>
                  <div className="text-gray-500">Memorial for Linda Chen</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-100">
              <CardContent className="p-8">
                <StarRating rating={5} readonly className="mb-4 text-yellow-500" />
                <p className="text-gray-700 mb-6 italic">
                  "Setting up the memorial was so easy, and now we have a beautiful way to share Mom's story with future
                  generations. Highly recommended."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Emily Rodriguez</div>
                  <div className="text-gray-500">Memorial for Maria Rodriguez</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Create a Lasting Tribute Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of families who have chosen to honor their loved ones with a beautiful digital memorial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-xl font-bold"
            >
              <Link href="/create-profile">Get Started - $119.99</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/pricing">View Pricing Details</Link>
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

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
