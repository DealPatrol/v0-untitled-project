import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Quote } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Daughter",
      avatar: "/elderly-woman-grandmother-smiling-portrait.png",
      rating: 5,
      content:
        "Memorial QR helped us create a beautiful tribute to my mother. The QR code on her headstone allows visitors to see her life story and photos. It's brought our family so much comfort.",
    },
    {
      name: "Michael Chen",
      role: "Son",
      avatar: "/asian-man-engineer-smiling-professional-portrait.png",
      rating: 5,
      content:
        "The platform is incredibly easy to use. We were able to create a comprehensive memorial with photos, videos, and stories from family members around the world. Highly recommended.",
    },
    {
      name: "Lisa Rodriguez",
      role: "Wife",
      avatar: "/hispanic-woman-smiling-professional-portrait.png",
      rating: 5,
      content:
        "Having a digital memorial has been a blessing. Friends and family can visit anytime to share memories and leave messages. It keeps my husband's memory alive in a meaningful way.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from families who have found comfort and connection through Memorial QR
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative p-6 hover:shadow-lg transition-shadow">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-200" />
              <CardContent className="p-0">
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} size="md" />
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
