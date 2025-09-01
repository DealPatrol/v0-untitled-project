import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import CountdownTimer from "@/components/countdown-timer"
import StarRating from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Heart, QrCode, Smartphone, Clock, Shield, Users, CheckCircle, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* YouTube Video - Far Left Side */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <iframe
          width="200"
          height="356"
          src="https://youtube.com/embed/XsWR_-Yv96Y?autoplay=1&mute=1&loop=1&playlist=XsWR_-Yv96Y&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="Memorial QR Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              ✨ Limited Time Offer - Save $50!
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Honor Their Memory with
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Digital Memorials
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create beautiful QR code memorial plaques that connect to digital tributes. Share photos, stories, and
              memories that family and friends can access forever.
            </p>

            {/* Countdown Timer */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-4">Special pricing ends in:</p>
              <CountdownTimer targetDate="2024-12-31T23:59:59" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4"
              >
                <Link href="/pricing">
                  Create Memorial - Only $149
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                <Link href="/browse-memorials">View Examples</Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <StarRating rating={5} size={16} />
                <span>4.9/5 from 500+ families</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>1,000+ memorials created</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Lifetime guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 hover:border-purple-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Share Their Story</h3>
                <p className="text-gray-600">
                  Upload photos, videos, and write about their life, achievements, and the memories you cherish most.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-purple-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Get Your QR Plaque</h3>
                <p className="text-gray-600">
                  We create a beautiful, weather-resistant memorial plaque with a QR code that links to their digital
                  tribute.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-purple-200 transition-colors">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Share & Remember</h3>
                <p className="text-gray-600">
                  Family and friends can scan the QR code to view the memorial, leave messages, and share their own
                  memories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most meaningful way to preserve and share memories
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Lasts Forever</h3>
                <p className="text-gray-600">
                  Weather-resistant materials and lifetime digital hosting ensure memories are preserved forever.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Easy to Share</h3>
                <p className="text-gray-600">
                  Anyone can access the memorial by simply scanning the QR code with their smartphone.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your memorial is protected with privacy controls and secure hosting.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Interactive Tributes</h3>
                <p className="text-gray-600">
                  Visitors can leave messages, share photos, and contribute their own memories.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <QrCode className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Professional Design</h3>
                <p className="text-gray-600">
                  Beautiful, customizable memorial pages that honor their memory with dignity.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No Monthly Fees</h3>
                <p className="text-gray-600">
                  One-time payment includes everything - the plaque, digital memorial, and lifetime hosting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
            <StarRating rating={5} size={24} className="justify-center mb-4" />
            <p className="text-xl text-gray-600">Trusted by over 1,000 families</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <StarRating rating={5} size={16} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "This gave us such comfort during a difficult time. Now family members from around the world can visit
                  mom's memorial and share their memories."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">S</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <StarRating rating={5} size={16} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "The quality is amazing and the process was so easy. It's beautiful to see all the photos and stories
                  in one place."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael R.</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <StarRating rating={5} size={16} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "Worth every penny. The memorial plaque looks professional and the digital tribute is exactly what we
                  wanted."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">L</span>
                  </div>
                  <div>
                    <p className="font-semibold">Linda K.</p>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Create a Lasting Memorial Today</h2>
          <p className="text-xl text-purple-100 mb-8">
            Honor their memory with a beautiful digital tribute that will last forever
          </p>

          <div className="mb-8">
            <p className="text-purple-100 mb-4">Limited time offer ends in:</p>
            <CountdownTimer targetDate="2024-12-31T23:59:59" />
          </div>

          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
            <Link href="/pricing">
              Get Started - Only $149
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <p className="text-sm text-purple-200 mt-4">
            ✓ Lifetime hosting included ✓ No monthly fees ✓ 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Memorial QR</h3>
              <p className="text-gray-400 text-sm">
                Creating lasting digital memorials that honor and preserve precious memories.
              </p>
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
                    Examples
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
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

      <HomepageStickyCTA />
    </div>
  )
}
