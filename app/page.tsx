import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { CountdownTimer } from "@/components/countdown-timer"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import {
  Heart,
  QrCode,
  Smartphone,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Camera,
  Share2,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/cemetery-hero.png')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30">
              ⭐ Trusted by 10,000+ Families Worldwide
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Preserve Their Legacy
              <span className="block text-orange-400">Forever</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto">
              Create beautiful, weatherproof QR memorial plaques that link to personalized tribute pages. Share stories,
              photos, and memories that last for generations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/create-profile">
                  Create Memorial Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg bg-transparent"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <p className="text-sm text-slate-300">10-Year Guarantee</p>
              </div>
              <div className="text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <p className="text-sm text-slate-300">Made with Love</p>
              </div>
              <div className="text-center">
                <QrCode className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <p className="text-sm text-slate-300">Free QR Code</p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <p className="text-sm text-slate-300">Family Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Loved by Families Everywhere</h2>
            <div className="flex justify-center items-center gap-2 mb-6">
              <StarRating rating={5} size="lg" />
              <span className="text-lg font-semibold text-slate-700">4.9/5 from 2,847 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                  <span className="ml-2 text-sm text-slate-600">Verified Purchase</span>
                </div>
                <p className="text-slate-700 mb-4">
                  "This memorial QR code has brought our family together. We can all share memories of Dad, and even
                  strangers at the cemetery leave beautiful messages."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-slate-900">Sarah Johnson</p>
                    <p className="text-sm text-slate-600">Michigan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                  <span className="ml-2 text-sm text-slate-600">Verified Purchase</span>
                </div>
                <p className="text-slate-700 mb-4">
                  "After 3 years, the QR plaque still looks brand new despite harsh winters. The memorial page has
                  become our family's digital gathering place."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-slate-900">Michael Rodriguez</p>
                    <p className="text-sm text-slate-600">Canada</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                  <span className="ml-2 text-sm text-slate-600">Verified Purchase</span>
                </div>
                <p className="text-slate-700 mb-4">
                  "The setup was so easy, and now Mom's full life story is preserved forever. Worth every penny for the
                  peace of mind it brings."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-slate-900">Emily Chen</p>
                    <p className="text-sm text-slate-600">California</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-red-100 text-red-700 border-red-200">
              <Clock className="w-4 h-4 mr-1" />
              Limited Time Offer
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Special Launch Pricing Ends Soon</h2>

            <p className="text-xl text-slate-700 mb-8">
              Save $30 on your memorial package - but only for the next 7 days!
            </p>

            <CountdownTimer />

            <div className="mt-8">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/pricing">
                  Claim Your Discount Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Creating a lasting memorial is simple with our 3-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-10 w-10 text-orange-600" />
              </div>
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Create Your Memorial</h3>
              <p className="text-slate-600">
                Upload photos, write their story, and customize your tribute page with our easy-to-use editor. Add
                videos, memories, and family connections.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="h-10 w-10 text-orange-600" />
              </div>
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Receive Your QR Plaque</h3>
              <p className="text-slate-600">
                We create your weatherproof QR plaque and ship it within 3 business days. Includes mounting hardware and
                installation guide.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="h-10 w-10 text-orange-600" />
              </div>
              <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Share & Connect</h3>
              <p className="text-slate-600">
                Install your plaque and share the memorial with family. Anyone can scan to view the tribute and add
                their own memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Why Choose MemorialStarQR?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We've thought of everything to make honoring your loved one simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">10-Year Durability</h3>
                <p className="text-slate-600">
                  Industrial-grade materials that withstand harsh weather, UV rays, and temperature extremes. Guaranteed
                  to last a decade outdoors.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">Beautiful Tributes</h3>
                <p className="text-slate-600">
                  Customizable memorial pages with photo galleries, life stories, virtual candles, and guest books for
                  lasting remembrance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">Family Collaboration</h3>
                <p className="text-slate-600">
                  Invite family members to contribute photos and memories. Everyone can help build a complete picture of
                  your loved one's life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">Easy Setup</h3>
                <p className="text-slate-600">
                  No technical skills required. Our step-by-step process makes creating and installing your memorial
                  simple and stress-free.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <QrCode className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">Fast Shipping</h3>
                <p className="text-slate-600">
                  Free worldwide shipping with tracking. Most orders ship within 24 hours and arrive in 3-5 business
                  days.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <Smartphone className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-slate-900">Premium Support</h3>
                <p className="text-slate-600">
                  Dedicated customer support team available 7 days a week. We're here to help you every step of the way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't Let Their Memory Fade Away</h2>
            <p className="text-xl text-slate-300 mb-8">
              Create a lasting tribute that preserves their legacy for future generations. Start building their memorial
              today with our 30-day money-back guarantee.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/create-profile">
                  Create Memorial Now - $119.99
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg bg-transparent"
              >
                <Link href="/pricing">View All Packages</Link>
              </Button>
            </div>

            <p className="text-sm text-slate-400 mt-6">
              ✓ 30-Day Money-Back Guarantee ✓ Free Worldwide Shipping ✓ 10-Year Durability Warranty
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-8">Need Help? We're Here for You</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-orange-400 mb-3" />
              <div className="font-semibold mb-1">Call Us</div>
              <div className="text-gray-300">256-595-3354</div>
              <div className="text-sm text-gray-400">Mon-Fri 9AM-6PM EST</div>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-orange-400 mb-3" />
              <div className="font-semibold mb-1">Email Us</div>
              <div className="text-gray-300">support@memorialstarqr.com</div>
              <div className="text-sm text-gray-400">24/7 Support</div>
            </div>

            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-orange-400 mb-3" />
              <div className="font-semibold mb-1">Based In</div>
              <div className="text-gray-300">United States</div>
              <div className="text-sm text-gray-400">Serving Worldwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Component */}
      <HomepageStickyCTA />
    </div>
  )
}
