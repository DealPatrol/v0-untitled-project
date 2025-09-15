"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Denver, CO",
    avatar: "/hispanic-woman-smiling-professional-portrait.png",
    text: "Memorial QR helped us create a beautiful tribute for my father. The QR plaque at his gravesite allows visitors to see his life story and photos. It's brought so much comfort to our family.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    location: "Seattle, WA",
    avatar: "/asian-man-engineer-smiling-professional-portrait.png",
    text: "The digital memorial has brought our family closer together. We can all contribute memories and stories in one place. The quality of the plaque exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Lisa Rodriguez",
    location: "Austin, TX",
    avatar: "/professional-woman-doctor-white-coat-smiling.png",
    text: "Professional service and beautiful results. The memorial plaque looks elegant and the digital content is easy to manage. Highly recommend to other families.",
    rating: 5,
  },
  {
    name: "Robert Thompson",
    location: "Phoenix, AZ",
    avatar: "/elderly-veteran-man-uniform-portrait.png",
    text: "As a veteran, I wanted something special for my wife's memorial. The QR code connects to her service photos and stories. Perfect way to honor her memory.",
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    location: "Boston, MA",
    avatar: "/medical-research-scientist.png",
    text: "The technology is impressive and the customer service was exceptional. They helped us create exactly what we envisioned for our mother's memorial.",
    rating: 5,
  },
  {
    name: "Maria Gonzalez",
    location: "Miami, FL",
    avatar: "/elderly-woman-grandmother-smiling-portrait.png",
    text: "Our grandmother's memorial page has become a gathering place for our large family. Everyone can share photos and memories. It's truly special.",
    rating: 5,
  },
]

export default function TestimonialSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join thousands of families who have created lasting digital memorials with Memorial QR
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="memorial-card h-full">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <div className="mt-1">
                    <StarRating rating={testimonial.rating} size="sm" />
                  </div>
                </div>
                <Quote className="w-6 h-6 text-gray-300 flex-shrink-0" />
              </div>

              <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
            <p className="text-gray-600">Families Served</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
            <p className="text-gray-600">Uptime Guarantee</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <p className="text-gray-600">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  )
}
