import { Header } from "@/components/header"
import { MemorialLogo } from "@/components/memorial-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { TestimonialSection } from "@/components/testimonial-section"
import { PreservationInfo } from "@/components/preservation-info"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Heart, QrCode, Share2, Shield, Clock, Users, ArrowRight, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cemetery-hero.png"
            alt="Peaceful cemetery with memorial stones"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <MemorialLogo className="text-6xl md:text-8xl mb-4" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory
            <br />
            <span className="text-gold-400">Forever</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Create beautiful digital memorials with QR codes that connect physical spaces to lasting online tributes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-8 py-4 text-lg">
              Create Memorial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent"
            >
              View Sample
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Memorials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Memorials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how families are honoring their loved ones with beautiful digital memorials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Maria Rodriguez",
                years: "1952 - 2023",
                image: "/hispanic-woman-smiling-professional-portrait.png",
                description: "Beloved mother, teacher, and community leader",
                visitors: 1247,
                rating: 5,
                memories: 23,
              },
              {
                name: "Robert Johnson",
                years: "1945 - 2023",
                image: "/elderly-veteran-man-uniform-portrait.png",
                description: "Proud veteran and devoted grandfather",
                visitors: 892,
                rating: 5,
                memories: 18,
              },
              {
                name: "Dr. Sarah Chen",
                years: "1968 - 2023",
                image: "/professional-woman-doctor-white-coat-smiling.png",
                description: "Dedicated physician and loving mother",
                visitors: 1456,
                rating: 5,
                memories: 31,
              },
            ].map((memorial, index) => (
              <Card
                key={index}
                className="memorial-shadow hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={memorial.image || "/placeholder.svg"} alt={memorial.name} />
                      <AvatarFallback>
                        {memorial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-gold-600 transition-colors">
                        {memorial.name}
                      </CardTitle>
                      <CardDescription className="text-gray-500">{memorial.years}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{memorial.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {memorial.visitors.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {memorial.memories}
                      </div>
                    </div>
                    <StarRating rating={memorial.rating} size="sm" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/browse-memorials">
                Browse All Memorials
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating a lasting digital memorial is simple and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Create Memorial",
                description: "Upload photos, write stories, and customize your loved one's digital memorial page",
                icon: Heart,
              },
              {
                step: "2",
                title: "Generate QR Code",
                description: "Get a unique QR code that links directly to the memorial page",
                icon: QrCode,
              },
              {
                step: "3",
                title: "Share & Honor",
                description: "Place the QR code on headstones, programs, or share digitally with family and friends",
                icon: Share2,
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-200 transition-colors">
                  <item.icon className="h-10 w-10 text-gold-600" />
                </div>
                <div className="w-8 h-8 bg-gold-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Memorial QR</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most trusted platform for creating lasting digital memorials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Forever Preserved",
                description: "Your memorial pages are permanently hosted and backed up across multiple secure servers",
                icon: Shield,
                color: "text-blue-600",
              },
              {
                title: "Easy to Share",
                description: "QR codes make it simple for anyone to access and contribute to memorial pages",
                icon: QrCode,
                color: "text-green-600",
              },
              {
                title: "Always Accessible",
                description: "Memorial pages are available 24/7 from any device, anywhere in the world",
                icon: Clock,
                color: "text-purple-600",
              },
              {
                title: "Family Collaboration",
                description: "Multiple family members can contribute photos, stories, and memories",
                icon: Users,
                color: "text-orange-600",
              },
              {
                title: "Privacy Controls",
                description: "Choose who can view and contribute to each memorial with flexible privacy settings",
                icon: Shield,
                color: "text-red-600",
              },
              {
                title: "Mobile Optimized",
                description: "Beautiful, responsive design that works perfectly on all devices",
                icon: Share2,
                color: "text-indigo-600",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* Preservation Info */}
      <PreservationInfo />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">Start Honoring Their Memory Today</h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Create a beautiful, lasting tribute that family and friends can visit anytime, anywhere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
              Create Memorial Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg bg-transparent"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <MemorialLogo className="text-3xl mb-4" />
              <p className="text-gray-400 mb-6 max-w-md">
                Creating lasting digital memorials that honor and preserve the memories of your loved ones forever.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <Link href="/how-it-works" className="block text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="/browse-memorials" className="block text-gray-400 hover:text-white transition-colors">
                  Browse Memorials
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <Link href="/help" className="block text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <HomepageStickyCTA />
    </div>
  )
}
