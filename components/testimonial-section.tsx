import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Quote } from "lucide-react"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Daughter",
      image: "/hispanic-woman-smiling-professional-portrait.png",
      rating: 5,
      text: "Memorial QR helped us create a beautiful tribute to my mother. The QR code on her headstone allows visitors to see her life story and leave their own memories. It's brought our family so much comfort.",
    },
    {
      name: "Michael Thompson",
      role: "Son",
      image: "/elderly-veteran-man-uniform-portrait.png",
      rating: 5,
      text: "As a veteran's family, we wanted something special to honor dad's service. The digital memorial captures his military career and family life perfectly. Visitors at the cemetery can now learn about the hero he was.",
    },
    {
      name: "Dr. Lisa Chen",
      role: "Colleague",
      image: "/professional-woman-doctor-white-coat-smiling.png",
      rating: 5,
      text: "Sarah was an incredible physician and friend. Her memorial page has become a place where patients, colleagues, and family share stories about how she touched their lives. It's exactly what she would have wanted.",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Families Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how Memorial QR has helped families honor their loved ones
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-gold-400 mb-4" />
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <StarRating rating={testimonial.rating} size="sm" className="mt-1" />
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
