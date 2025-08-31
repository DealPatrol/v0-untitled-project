import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
      <Header />

      {/* Hero Section */}
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
          <Badge className="mb-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-lg">
            ⭐ Trusted by 10,000+ Families
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory with a <span className="text-purple-400">Digital Memorial</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            Preserve precious memories with our elegant QR code memorial plaques and stones. Keep memories alive for
            generations to come.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              <Link href="/pricing">View Pricing Options</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/browse-memorials">View Sample Memorials</Link>
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
            <div className="text-lg">✓ Lifetime Access Available</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive memorial platform includes all the features you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="text-purple-600 text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Easy to Access</h3>
              <p className="text-slate-600">
                Anyone with a smartphone can scan the QR code to access the digital memorial instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="text-purple-600 text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3">Permanent Hosting</h3>
              <p className="text-slate-600">
                We guarantee to host the digital memorial content for 5, 25, or lifetime years with our plans.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="text-purple-600 text-3xl mb-4">✏️</div>
              <h3 className="text-xl font-semibold mb-3">Easy to Update</h3>
              <p className="text-slate-600">
                Add new photos, videos, or stories at any time without replacing the physical memorial.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="text-purple-600 text-3xl mb-4">🏛️</div>
              <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
              <p className="text-slate-600">Choose from basic plaques to premium granite stones and monuments.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="text-purple-600 text-3xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-semibold mb-3">Family Collaboration</h3>
              <p className="text-slate-600">Multiple family members can contribute photos, stories, and memories.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
              <div className="text-purple-600 text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Privacy Controls</h3>
              <p className="text-slate-600">
                Choose who can view and contribute to the memorial with flexible privacy settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Memorial Plan</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From basic QR plaques to premium granite monuments, we offer lasting tributes with guaranteed hosting
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Basic Memorial</h3>
                <div className="text-4xl font-bold text-slate-900 mb-4">$149</div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>5GB Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Up to 10 Photos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>5 Year Hosting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Basic QR Plaque</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/checkout?plan=basic">Select Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-4 border-purple-500 hover:border-purple-600 transition-colors transform scale-105">
              <div className="bg-purple-600 text-white text-center py-2 text-sm font-bold">MOST POPULAR</div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Premium Memorial</h3>
                <div className="text-4xl font-bold text-purple-600 mb-4">$299</div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>20GB Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Unlimited Photos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>25 Year Hosting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Granite QR Stone</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/checkout?plan=premium">Select Plan</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-200 hover:border-purple-300 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Family Memorial</h3>
                <div className="text-4xl font-bold text-slate-900 mb-4">$499</div>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>50GB Storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Unlimited Content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Lifetime Hosting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Large Monument</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/checkout?plan=family">Select Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              <Link href="/pricing">View All Pricing Details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Families Everywhere</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how our memorial QR codes have helped families honor their loved ones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-slate-100">
              <CardContent className="p-8">
                <StarRating rating={5} readonly className="mb-4 text-yellow-500" />
                <p className="text-slate-700 mb-6 italic">
                  "The QR memorial we purchased for my father's gravesite has been a comfort to our entire family. We
                  can all add new photos and stories, keeping his memory alive for future generations."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-slate-500">Memorial for Robert Johnson</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100">
              <CardContent className="p-8">
                <StarRating rating={5} readonly className="mb-4 text-yellow-500" />
                <p className="text-slate-700 mb-6 italic">
                  "I was hesitant about the technology at first, but now I'm so grateful we chose Memorial QR. It's so
                  easy to use, and we've been able to share so many more memories."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Michael Thompson</div>
                  <div className="text-slate-500">Memorial for Linda Thompson</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100">
              <CardContent className="p-8">
                <StarRating rating={5} readonly className="mb-4 text-yellow-500" />
                <p className="text-slate-700 mb-6 italic">
                  "The quality of the granite stone exceeded my expectations. The QR code is beautifully integrated into
                  the design, and the digital platform is so easy to manage."
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Emily Rodriguez</div>
                  <div className="text-slate-500">Memorial for Maria Rodriguez</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Create a Lasting Tribute Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of families who have chosen to honor their loved ones with a beautiful digital memorial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-xl font-bold"
            >
              <Link href="/pricing">View Pricing Options</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>

          <div className="text-lg opacity-90">
            ✓ 30-Day Money Back Guarantee • ✓ Guaranteed Hosting • ✓ No Monthly Fees
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-slate-400 text-sm">Honoring memories with digital memorials that last forever.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
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
              <ul className="space-y-2 text-sm text-slate-400">
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
              <ul className="space-y-2 text-sm text-slate-400">
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

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </div>
  )
}
