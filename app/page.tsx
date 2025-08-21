import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Heart, Users, Clock, Shield, QrCode, Globe } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HomepageStickyCTA />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">⭐ Trusted by 10,000+ Families</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Honor Their Memory with a <span className="text-blue-600">Digital Memorial</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create a beautiful, lasting tribute that family and friends can access anytime, anywhere. Share
                  stories, photos, and memories with a simple QR code.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/create-profile">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                    Create Memorial - $119.99
                  </Button>
                </Link>
                <Link href="/memorial/sample">
                  <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
                    View Sample Memorial
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <StarRating rating={5} />
                  <span className="text-sm text-gray-600">4.9/5 from 2,847 reviews</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <video className="w-full rounded-lg" autoPlay muted loop playsInline poster="/images/memorial-demo.jpg">
                  <source src="/videos/memorial-qr-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">See how easy it is to create and share a memorial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Memorials Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50,000+</div>
              <div className="text-gray-600">Stories Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a beautiful memorial is simple and takes just minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">1. Share Their Story</h3>
                <p className="text-gray-600">
                  Upload photos, write their biography, and add meaningful details about their life
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <QrCode className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">2. Get Your QR Code</h3>
                <p className="text-gray-600">
                  We create a unique QR code and beautiful memorial page that lasts forever
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">3. Share & Remember</h3>
                <p className="text-gray-600">
                  Family and friends can scan the code to view the memorial and add their own memories
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to Honor Their Memory
              </h2>
              <div className="space-y-4">
                {[
                  "Unlimited photo and video uploads",
                  "Beautiful, responsive memorial pages",
                  "QR code for easy sharing",
                  "Family tree and relationship mapping",
                  "Guest book for condolences",
                  "Timeline of life events",
                  "Privacy controls and moderation",
                  "Mobile-optimized viewing",
                  "Lifetime hosting guarantee",
                  "24/7 customer support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="/images/how-it-works.jpg" alt="Memorial QR Code Features" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">🔥 Limited Time Offer</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Create a Lasting Memorial Today</h2>
            <p className="text-xl text-gray-600 mb-8">One-time payment. Lifetime hosting. No hidden fees.</p>

            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600 mb-2">$119.99</div>
                <div className="text-gray-500 line-through text-xl">$199.99</div>
                <div className="text-green-600 font-semibold">Save $80 - Limited Time!</div>
              </div>

              <CountdownTimer />

              <div className="space-y-3 text-left mb-8">
                {[
                  "Complete memorial website",
                  "Custom QR code",
                  "Unlimited photos & videos",
                  "Family tree builder",
                  "Guest book & condolences",
                  "Lifetime hosting",
                  "Mobile responsive design",
                  "24/7 support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/create-profile">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg">
                  Create Memorial Now - $119.99
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>30-day guarantee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
            <p className="text-xl text-gray-600">See what our customers say about Memorial QR</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <StarRating rating={5} />
                <p className="text-gray-700">
                  "Creating my father's memorial was so easy and meaningful. The QR code on his headstone allows
                  visitors to learn about his incredible life story."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <StarRating rating={5} />
                <p className="text-gray-700">
                  "The memorial page is beautiful and has brought our family closer together. We love being able to
                  share memories and photos in one place."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <StarRating rating={5} />
                <p className="text-gray-700">
                  "Outstanding service and support. The team helped us create something truly special that will preserve
                  mom's memory forever."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-semibold">Lisa Rodriguez</div>
                    <div className="text-sm text-gray-500">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Create a Beautiful Memorial?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of families who have chosen Memorial QR to honor their loved ones. Get started today with
              our easy-to-use memorial creator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create-profile">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  Create Memorial - $119.99
                </Button>
              </Link>
              <Link href="/memorial/sample">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg bg-transparent"
                >
                  View Sample Memorial
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Trusted by 10,000+ families</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
