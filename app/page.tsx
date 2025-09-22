import { Header } from "@/components/header"
import { MemorialLogo } from "@/components/memorial-logo"
import { StarRating } from "@/components/star-rating"
import { TestimonialSection } from "@/components/testimonial-section"
import { PreservationInfo } from "@/components/preservation-info"
import { HomepageStickyCTA } from "@/components/homepage-sticky-cta"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Shield, Clock, Users, QrCode, Camera, Share2, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cemetery-hero.png"
            alt="Peaceful cemetery with memorial stones"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <MemorialLogo className="text-6xl md:text-8xl mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Honor Their Memory
            <br />
            <span className="text-yellow-400">Forever</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Create beautiful digital memorials with QR codes that preserve precious memories and stories for generations
            to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg">
              <Link href="/create-memorial">Create Memorial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/browse-memorials">Browse Memorials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Memorials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Memorials</h2>
            <p className="text-gray-600 text-lg">Celebrating lives and preserving memories</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rodriguez",
                image: "/hispanic-woman-smiling-professional-portrait.png",
                years: "1952 - 2023",
                visitors: 1247,
                rating: 5,
              },
              {
                name: "Robert Johnson",
                image: "/elderly-veteran-man-uniform-portrait.png",
                years: "1945 - 2023",
                visitors: 892,
                rating: 5,
              },
              {
                name: "Dr. Sarah Chen",
                image: "/professional-woman-doctor-white-coat-smiling.png",
                years: "1968 - 2023",
                visitors: 2156,
                rating: 5,
              },
            ].map((memorial, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={memorial.image || "/placeholder.svg"} alt={memorial.name} />
                      <AvatarFallback>
                        {memorial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{memorial.name}</h3>
                      <p className="text-gray-600">{memorial.years}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <StarRating rating={memorial.rating} />
                      <span className="text-sm text-gray-600">({memorial.visitors} visitors)</span>
                    </div>
                    <Badge variant="secondary">
                      <Heart className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Create a lasting tribute in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <Camera className="w-8 h-8" />,
                title: "Upload Photos & Stories",
                description: "Share precious memories, photos, and stories that celebrate their life and legacy.",
              },
              {
                step: "2",
                icon: <QrCode className="w-8 h-8" />,
                title: "Generate QR Code",
                description: "We create a unique QR code that links to your beautiful digital memorial page.",
              },
              {
                step: "3",
                icon: <Share2 className="w-8 h-8" />,
                title: "Share & Remember",
                description: "Place the QR code on headstones, programs, or anywhere to share memories instantly.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
                  {item.icon}
                </div>
                <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Memorial QR</h2>
            <p className="text-gray-600 text-lg">The most trusted platform for digital memorials</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure & Private",
                description: "Your memories are protected with enterprise-grade security",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Forever Preserved",
                description: "Guaranteed hosting for 100+ years with multiple backups",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Family Friendly",
                description: "Easy for all family members to contribute and visit",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Accessible Anywhere",
                description: "View memorials from any device, anywhere in the world",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-yellow-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
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
      <section className="py-16 px-4 bg-yellow-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Preserving Memories Today</h2>
          <p className="text-xl mb-8 text-yellow-100">
            Join thousands of families who trust Memorial QR to honor their loved ones
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link href="/create-memorial">Create Memorial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-yellow-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <MemorialLogo className="text-2xl mb-4" />
              <p className="text-gray-400 mb-4">Preserving memories and honoring lives through digital memorials.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
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
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
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
              <ul className="space-y-2 text-gray-400">
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
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <HomepageStickyCTA />
    </div>
  )
}
