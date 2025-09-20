"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Quote } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
      rating: 5,
      text: "Creating a memorial for my mother was so meaningful. The QR code on her headstone allows visitors to see her beautiful life story and photos. It's brought our family so much comfort.",
      relationship: "Daughter",
    },
    {
      name: "Michael Chen",
      location: "Austin, TX",
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
      rating: 5,
      text: "The process was incredibly easy during such a difficult time. The memorial page is beautiful and we've received so many touching messages from friends and family who found it through the QR code.",
      relationship: "Son",
    },
    {
      name: "Lisa Rodriguez",
      location: "Miami, FL",
      avatar: "/placeholder.svg?height=60&width=60&text=LR",
      rating: 5,
      text: "I was amazed by how professional and compassionate the team was. They helped us create something truly special that honors my husband's memory. The lifetime guarantee gives us peace of mind.",
      relationship: "Widow",
    },
    {
      name: "David Thompson",
      location: "Seattle, WA",
      avatar: "/placeholder.svg?height=60&width=60&text=DT",
      rating: 5,
      text: "We used this for my father's military memorial. Being able to include his service photos and stories from fellow veterans has created something really powerful. Highly recommend.",
      relationship: "Son",
    },
    {
      name: "Jennifer Williams",
      location: "Chicago, IL",
      avatar: "/placeholder.svg?height=60&width=60&text=JW",
      rating: 5,
      text: "The customer support was exceptional. They walked us through everything and even helped us organize old family photos. The final memorial exceeded our expectations.",
      relationship: "Daughter",
    },
    {
      name: "Robert Martinez",
      location: "Phoenix, AZ",
      avatar: "/placeholder.svg?height=60&width=60&text=RM",
      rating: 5,
      text: "What a beautiful way to celebrate my wife's life. Friends from around the world have been able to share memories and photos. It's become a gathering place for everyone who loved her.",
      relationship: "Widower",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
          <p className="text-gray-600 text-lg">See what families are saying about their memorial experiences</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Quote className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <StarRating rating={testimonial.rating} size="sm" className="mb-2" />
                    <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.text}"</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-600 font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.relationship} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <StarRating rating={5} size="sm" />
              <span className="font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>2,847+ Families Served</span>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>99.2% Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  )
}
