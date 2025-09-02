import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Heart, QrCode, Shield, Clock, Users, Star, CheckCircle, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section with Video */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Video */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black">
                  <iframe
                    src="https://www.youtube.com/embed/XsWR_-Yv96Y?autoplay=1&controls=1&rel=0&modestbranding=1"
                    title="Memorial QR Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  Trusted by 10,000+ Families
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="font-serif italic text-purple-600">Digital Memorial</span>
                  <br />
                  Plaques That Last Forever
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                  Honor your loved ones with beautiful, weatherproof memorial plaques featuring QR codes that link to
                  personalized digital tributes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Create Memorial - $149
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Free Shipping
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Lifetime Guarantee
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Limited Time: Save $50 on Your Memorial</h2>
          <p className="text-xl mb-6 opacity-90">Special pricing ends soon. Create a lasting tribute today.</p>
          <CountdownTimer />
          <div className="mt-8">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Claim Your Discount Now
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Loved by Families Everywhere</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600">Memorials Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
              <StarRating rating={4.9} />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">Would Recommend</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "The memorial plaque for my mother is absolutely beautiful. The QR code works perfectly and the
                  quality is outstanding."
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-sm text-gray-500">Verified Customer</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "Such a meaningful way to honor dad's memory. Family members can easily access photos and stories by
                  scanning the code."
                </p>
                <div className="font-semibold">Michael Chen</div>
                <div className="text-sm text-gray-500">Verified Customer</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <StarRating rating={5} className="mb-4" />
                <p className="text-gray-600 mb-4">
                  "The customer service was exceptional and the final product exceeded our expectations. Highly
                  recommend!"
                </p>
                <div className="font-semibold">Lisa Rodriguez</div>
                <div className="text-sm text-gray-500">Verified Customer</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Create a lasting memorial in just 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Share Their Story</h3>
              <p className="text-gray-600">
                Upload photos, write their biography, and share precious memories that celebrate their life.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Get Your Plaque</h3>
              <p className="text-gray-600">
                We create a beautiful, weatherproof memorial plaque with a custom QR code linking to their digital
                tribute.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Share & Remember</h3>
              <p className="text-gray-600">
                Family and friends can scan the QR code to view the memorial, leave messages, and share their own
                memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600">Premium quality memorials built to last forever</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Weatherproof</h3>
              <p className="text-gray-600 text-sm">Durable materials that withstand all weather conditions</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lifetime Access</h3>
              <p className="text-gray-600 text-sm">Digital memorial stays online forever at no extra cost</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Family Sharing</h3>
              <p className="text-gray-600 text-sm">Multiple family members can contribute photos and memories</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Easy Updates</h3>
              <p className="text-gray-600 text-sm">Add new photos and memories anytime through our portal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Memorial */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">See a Sample Memorial</h2>
          <p className="text-xl text-gray-600 mb-8">Experience how your loved one's memorial will look and feel</p>
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Glenda Kelso Memorial</CardTitle>
              <CardDescription>A loving tribute to a wonderful mother and grandmother</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <img
                  src="/glenda-memorial-portrait.jpeg"
                  alt="Glenda Kelso"
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                1943 - 2024 • Beloved mother, grandmother, and friend to all who knew her.
              </p>
              <Link href="/memorial/glenda-kelso">
                <Button className="w-full">
                  View Sample Memorial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Create a Lasting Memorial Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Honor your loved one with a beautiful memorial that will be treasured forever
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Get Started - $149
              </Button>
            </Link>
            <Link href="/memorial/glenda-kelso">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg bg-transparent"
              >
                View Sample Memorial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <HomepageStickyCTA />
    </div>
  )
}
