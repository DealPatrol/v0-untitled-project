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
        "Memorial QR helped us create a beautiful tribute for my mother. The QR code on her headstone allows visitors to see her life story and leave messages. It's brought our family so much comfort.",
    },
    {
      name: "Michael Thompson",
      role: "Son",
      avatar: "/elderly-man-smiling-portrait.png",
      rating: 5,
      content:
        "The platform is incredibly easy to use. We were able to upload photos, share stories, and create a lasting memorial that truly captures dad's spirit. Highly recommended.",
    },
    {
      name: "Sarah Johnson",
      role: "Wife",
      avatar: "/professional-woman-doctor-white-coat-smiling.png",
      rating: 5,
      content:
        "Having a digital memorial has been a blessing. Family and friends from around the world can visit, share memories, and feel connected to my husband's legacy.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Families Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from families who have found comfort and connection through Memorial QR
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
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
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <StarRating rating={testimonial.rating} className="mb-4" />

                <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
