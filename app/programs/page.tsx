"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Heart, Users, Camera, Music, Share2, QrCode, Smartphone, Globe } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Memorial Programs</h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
              Create a lasting digital memorial that celebrates your loved one's life and keeps their memory alive
              forever
            </p>
          </div>
        </div>
      </div>

      {/* Main Program */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <Badge className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 mb-4">Most Popular</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Complete Digital Memorial Package</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create a beautiful, lasting tribute to your loved one
          </p>
        </div>

        <Card className="shadow-xl border-2 border-purple-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>

          <CardHeader className="text-center pb-8 pt-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">(4.9/5 from 500+ families)</span>
            </div>

            <CardTitle className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">$149</CardTitle>
            <p className="text-gray-600">One-time payment • Lifetime access</p>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-8">
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  Memorial Features
                </h3>
                <ul className="space-y-3">
                  {[
                    "Beautiful memorial website",
                    "Photo & video galleries",
                    "Life story & biography",
                    "Family tree display",
                    "Memorial guestbook",
                    "Music & audio memories",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <QrCode className="h-5 w-5 text-purple-500 mr-2" />
                  QR Code & Sharing
                </h3>
                <ul className="space-y-3">
                  {[
                    "Custom QR code generation",
                    "High-resolution downloads",
                    "Social media sharing",
                    "Email invitations",
                    "Mobile-friendly access",
                    "Search engine optimization",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  Family Collaboration
                </h3>
                <ul className="space-y-3">
                  {[
                    "Multiple family contributors",
                    "Story & memory sharing",
                    "Photo upload permissions",
                    "Comment moderation",
                    "Private family sections",
                    "Notification system",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Globe className="h-5 w-5 text-green-500 mr-2" />
                  Premium Support
                </h3>
                <ul className="space-y-3">
                  {[
                    "Lifetime hosting included",
                    "24/7 technical support",
                    "Regular backups",
                    "SSL security certificate",
                    "Custom domain option",
                    "Professional design themes",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What's Included Highlight */}
            <div className="bg-purple-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">Everything Included - No Hidden Fees</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Camera className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Unlimited Photos</span>
                </div>
                <div className="flex flex-col items-center">
                  <Music className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Audio Memories</span>
                </div>
                <div className="flex flex-col items-center">
                  <Share2 className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Easy Sharing</span>
                </div>
                <div className="flex flex-col items-center">
                  <Smartphone className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Mobile Ready</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold w-full sm:w-auto"
              >
                <Link href="/pricing">Create Memorial Now - $149</Link>
              </Button>
              <p className="text-sm text-gray-600 mt-4">30-day money-back guarantee • Secure payment processing</p>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">What Families Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                relation: "Daughter",
                text: "Creating mom's memorial was so easy and meaningful. The QR code at the funeral allowed everyone to share their memories instantly.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                relation: "Son",
                text: "The family collaboration features let all of us contribute photos and stories. It's become a place we visit to remember dad.",
                rating: 5,
              },
              {
                name: "Lisa Rodriguez",
                relation: "Wife",
                text: "The support team helped us every step of the way. The memorial is beautiful and will preserve his memory forever.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.relation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to create a memorial?",
                answer:
                  "Most families complete their memorial in 30-60 minutes. You can always add more content later.",
              },
              {
                question: "Can multiple family members contribute?",
                answer: "Yes! Family members can sign in to add photos, stories, and memories to the memorial.",
              },
              {
                question: "Is the memorial website permanent?",
                answer:
                  "Yes, your memorial includes lifetime hosting. It will remain online permanently at no additional cost.",
              },
              {
                question: "Can I customize the design?",
                answer:
                  "Yes, we offer several professional design themes and customization options to match your preferences.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Honor Their Memory Today</h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Create a beautiful, lasting tribute that celebrates their life and keeps their memory alive for generations
            to come.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            <Link href="/pricing">Get Started Now - $149</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
