import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Heart, Star, Users, Shield, Clock, CheckCircle, Play } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-rose-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cemetery-hero.png')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              ✨ Now Available - Create Beautiful Memorial Pages
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-rose-800 bg-clip-text text-transparent">
              Honor Their Memory Forever
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Create beautiful, lasting memorial pages with QR codes that connect physical memorials to digital
              memories. Share stories, photos, and celebrate the lives of those we love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                <Link href="/create-profile">
                  <Heart className="mr-2 h-5 w-5" />
                  Create Memorial Page
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                <Link href="/how-it-works">
                  <Play className="mr-2 h-5 w-5" />
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <StarRating rating={5} readonly size="sm" />
                <span className="font-medium">4.9/5 from 2,847 families</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Trusted by 10,000+ families worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 Limited Time: Launch Special Pricing</h2>
          <p className="text-xl mb-6 text-rose-100">
            Get your memorial page for just <span className="text-3xl font-bold">$119.99</span>
            <span className="line-through text-rose-200 ml-2">$199.99</span>
          </p>

          <div className="mb-6">
            <p className="text-lg mb-4">⏰ Offer ends in:</p>
            <CountdownTimer className="justify-center text-white" />
          </div>

          <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-gray-100">
            <Link href="/create-profile">
              Claim Your Memorial Page Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Honor Their Memory</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive memorial platform makes it easy to create, share, and preserve precious memories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Beautiful Memorial Pages</CardTitle>
                <CardDescription>
                  Create stunning, personalized memorial pages with photos, stories, and memories that celebrate their
                  unique life.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>QR Code Integration</CardTitle>
                <CardDescription>
                  Connect physical memorials to digital memories with weatherproof QR codes that last forever.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Family Collaboration</CardTitle>
                <CardDescription>
                  Invite family and friends to contribute memories, photos, and stories to create a complete tribute.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Lifetime Preservation</CardTitle>
                <CardDescription>
                  Your memorial page is preserved forever with our lifetime hosting guarantee and regular backups.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Premium Design</CardTitle>
                <CardDescription>
                  Choose from beautiful, professionally designed templates that honor your loved one with dignity and
                  grace.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Easy Setup</CardTitle>
                <CardDescription>
                  Get your memorial page live in minutes with our simple, guided setup process. No technical skills
                  required.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Families Everywhere</h2>
            <p className="text-xl text-gray-600">See what families are saying about their memorial pages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <StarRating rating={5} readonly />
                </div>
                <p className="text-gray-700 mb-4">
                  "Creating a memorial page for my father was so meaningful. The QR code on his headstone lets visitors
                  learn about his incredible life story. It's brought our family so much comfort."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-gray-600">Daughter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <StarRating rating={5} readonly />
                </div>
                <p className="text-gray-700 mb-4">
                  "The memorial page helped our entire extended family share memories of grandma. Cousins from across
                  the country added photos and stories we'd never seen before. It's like she's still bringing us
                  together."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Johnson</p>
                    <p className="text-sm text-gray-600">Grandson</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <StarRating rating={5} readonly />
                </div>
                <p className="text-gray-700 mb-4">
                  "As a funeral director, I recommend Memorial QR to all families. It's a beautiful way to extend the
                  celebration of life beyond the service. The quality and care in every detail is exceptional."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-semibold">DW</span>
                  </div>
                  <div>
                    <p className="font-semibold">David Wilson</p>
                    <p className="text-sm text-gray-600">Funeral Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Honor Their Memory?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of families who have created lasting tributes with Memorial QR. Start preserving precious
            memories today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/create-profile">
                <Heart className="mr-2 h-5 w-5" />
                Create Memorial Page - $119.99
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/browse-memorials">
                <Users className="mr-2 h-5 w-5" />
                Browse Memorial Pages
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <HomepageStickyCTA />
    </main>
  )
}
