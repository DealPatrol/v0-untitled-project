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
      content:
        "Memorial QR helped us create a beautiful tribute for my father. The QR code on his headstone allows visitors to learn about his incredible life story. It's brought our family so much comfort.",
    },
    {
      name: "David Thompson",
      role: "Widower",
      avatar: "/elderly-man-smiling-portrait.png",
      rating: 5,
      content:
        "After losing my wife of 45 years, I wanted a way to share her memory with the world. This platform made it so easy to upload photos and stories. Now her grandchildren can always remember her.",
    },
    {
      name: "Sarah Chen",
      role: "Sister",
      avatar: "/professional-woman-doctor-white-coat-smiling.png",
      rating: 5,
      content:
        "The memorial we created for my brother has become a place where all his friends gather online. People from around the world have shared memories I never knew existed. It's truly special.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stories from Families We've Helped</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how Memorial QR has helped families preserve and share precious memories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
