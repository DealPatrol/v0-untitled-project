import { Suspense } from "react"
import { Header } from "@/components/header"
import { StarRating } from "@/components/star-rating"
import { CountdownTimer } from "@/components/countdown-timer"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Clock, Users, Star, ArrowRight, CheckCircle, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Cemetery Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cemetery Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cemetery-hero.png"
            alt="Peaceful cemetery background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Badge className="mb-6 bg-orange-500/90 text-white border-orange-400 hover:bg-orange-600/90">
            ⭐ Trusted by 10,000+ Families
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory with a<span className="text-orange-400 block mt-2">Digital Memorial</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Create a beautiful, lasting tribute that family and friends can visit anytime, anywhere. Share stories,
            photos, and memories that celebrate a life well-lived.
          </p>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <StarRating rating={5} readonly />
            <span className="text-lg font-semibold text-gray-200">4.9/5 from 2,847 families</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/create-profile">
                Create Memorial Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
            >
              <Link href="/memorials">
                View Sample Memorial
                <Play className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Limited Time Offer */}
          <div className="bg-orange-500/90 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-orange-400/50">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">Limited Time Offer</span>
            </div>
            <p className="text-2xl font-bold text-white mb-2">Save $30 - Only $119.99</p>
            <p className="text-white/90 mb-4">Regular price $149.99 • Offer ends soon</p>
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10,000+</div>
              <div className="text-gray-600">Families Served</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600">Secure & Private</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Forever</div>
              <div className="text-gray-600">Lasting Tribute</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Creating a Memorial is Simple</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In just a few minutes, you can create a beautiful digital memorial that honors your loved one's life and
              legacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 hover:border-orange-200 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Share Their Story</h3>
                <p className="text-gray-600">
                  Tell us about your loved one - their life, achievements, and the memories that matter most.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-orange-200 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Add Photos & Videos</h3>
                <p className="text-gray-600">
                  Upload cherished photos and videos that capture their personality and special moments.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 hover:border-orange-200 transition-colors">
              <CardContent className="pt-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Share & Remember</h3>
                <p className="text-gray-600">
                  Get a beautiful QR code to place at the gravesite, allowing visitors to access the memorial instantly.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full"
            >
              <Link href="/how-it-works">
                Learn More About Our Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Honor Their Memory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive memorial platform includes all the features you need to create a lasting tribute.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Beautiful Photo Galleries",
                description: "Showcase their life with unlimited photo uploads and elegant gallery displays.",
              },
              {
                icon: Users,
                title: "Family Tree Integration",
                description: "Connect family members and show relationships across generations.",
              },
              {
                icon: Shield,
                title: "Privacy Controls",
                description: "Choose who can view and contribute to the memorial with flexible privacy settings.",
              },
              {
                icon: Clock,
                title: "Timeline of Life",
                description: "Create a chronological journey through their most important life events.",
              },
              {
                icon: Star,
                title: "Memory Sharing",
                description: "Allow family and friends to share their own stories and memories.",
              },
              {
                icon: CheckCircle,
                title: "QR Code Access",
                description: "Weather-resistant QR code for easy access at the gravesite or memorial location.",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Families Everywhere</h2>
            <p className="text-xl text-gray-600">See what families are saying about their memorial experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "Denver, CO",
                rating: 5,
                text: "Creating a memorial for my father was so meaningful. The QR code at his gravesite allows visitors to learn about his incredible life story.",
              },
              {
                name: "Michael Chen",
                location: "Austin, TX",
                rating: 5,
                text: "The family tree feature helped us connect with distant relatives who shared beautiful memories we never knew about. Truly special.",
              },
              {
                name: "Lisa Rodriguez",
                location: "Miami, FL",
                rating: 5,
                text: "The memorial we created for mom has become a gathering place for our family online. It's comforting to visit and remember together.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <StarRating rating={testimonial.rating} readonly className="mb-4" />
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Start Creating Their Memorial Today</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have created lasting tributes for their loved ones. Begin your memorial in
            just a few minutes.
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto mb-8">
            <div className="text-3xl font-bold text-orange-600 mb-2">$119.99</div>
            <div className="text-gray-500 line-through mb-4">Regular price: $149.99</div>
            <div className="text-green-600 font-semibold mb-6">✓ Save $30 with limited-time offer</div>

            <Button
              asChild
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-semibold rounded-full mb-4"
            >
              <Link href="/create-profile">
                Create Memorial Now - $119.99
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <p className="text-sm text-gray-500">30-day money-back guarantee • Secure payment • Instant access</p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <Suspense fallback={null}>
        <HomepageStickyCTA />
      </Suspense>
    </div>
  )
}
