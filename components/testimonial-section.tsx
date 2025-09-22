import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Jennifer Martinez",
      image: "/elderly-woman-grandmother-smiling-portrait.png",
      role: "Daughter",
      rating: 5,
      text: "Memorial QR helped us create a beautiful tribute to my mother. The QR code on her headstone allows visitors to see her life story and photos. It's brought our family so much comfort.",
    },
    {
      name: "David Chen",
      image: "/asian-man-engineer-smiling-professional-portrait.png",
      role: "Son",
      rating: 5,
      text: "The platform is incredibly easy to use. We were able to create a comprehensive memorial for my father in just a few hours. The support team was amazing throughout the process.",
    },
    {
      name: "Sarah Johnson",
      image: "/professional-woman-doctor-white-coat-smiling.png",
      role: "Wife",
      rating: 5,
      text: "Having a digital memorial means our grandchildren will always be able to learn about their grandfather. The stories and photos are preserved forever, which gives us peace of mind.",
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Families Say</h2>
          <p className="text-gray-600 text-lg">Trusted by thousands of families worldwide</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
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
