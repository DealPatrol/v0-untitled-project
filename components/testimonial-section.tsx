import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Daughter",
      avatar: "/hispanic-woman-smiling-professional-portrait.png",
      rating: 5,
      text: "Memorial QR helped us create a beautiful tribute to my mother. The QR code on her headstone allows visitors to see her life story and photos. It's brought our family so much comfort.",
    },
    {
      name: "David Thompson",
      role: "Son",
      avatar: "/elderly-veteran-man-uniform-portrait.png",
      rating: 5,
      text: "As a veteran's family, we wanted to honor my father's service. The memorial page showcases his military photos and stories from fellow veterans. It's exactly what we needed.",
    },
    {
      name: "Dr. Lisa Chen",
      role: "Wife",
      avatar: "/professional-woman-doctor-white-coat-smiling.png",
      rating: 5,
      text: "The platform made it easy to collaborate with family members across the country. Everyone could contribute photos and memories. The result is a comprehensive celebration of my husband's life.",
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Families Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from families who have created lasting memorials for their loved ones
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} size="md" />
                <p className="text-gray-700 mt-4 italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
