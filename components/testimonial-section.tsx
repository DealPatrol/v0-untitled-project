import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StarRating } from "@/components/star-rating"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Denver, CO",
    avatar: "/hispanic-woman-smiling-professional-portrait.png",
    rating: 5,
    text: "Memorial QR helped us create a beautiful tribute for my mother. The QR code on her headstone allows visitors to see her life story, photos, and the impact she had on so many people. It's brought our family so much comfort.",
    memorial: "In memory of Margaret Johnson",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: "/asian-man-engineer-smiling-professional-portrait.png",
    rating: 5,
    text: "As a tech professional, I was impressed by the platform's simplicity and security. Creating dad's memorial was straightforward, and now family members across the country can contribute memories and photos. It's keeping his legacy alive.",
    memorial: "In memory of Robert Chen",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Austin, TX",
    avatar: "/professional-woman-doctor-white-coat-smiling.png",
    rating: 5,
    text: "The customer support was incredible during such a difficult time. They helped us set up everything and even assisted with uploading old family photos. The memorial has become a place where our extended family connects and shares memories.",
    memorial: "In memory of Carlos Rodriguez",
  },
]

export function TestimonialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Families Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of families who have found comfort and connection through Memorial QR
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="memorial-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-purple-600 opacity-50 mr-3" />
                  <StarRating rating={testimonial.rating} size="sm" />
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center">
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
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-xs text-purple-600 mt-1">{testimonial.memorial}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Memorial Community</h3>
            <p className="text-lg text-gray-600 mb-6">
              Over 10,000 families have trusted us to preserve their most precious memories. Your loved one's story
              deserves to be remembered and shared.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="font-semibold text-2xl text-purple-600 mr-2">4.9</span>
                <div>
                  <StarRating rating={5} size="sm" />
                  <div>Average Rating</div>
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-2xl text-purple-600">10,000+</div>
                <div>Memorials Created</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-2xl text-purple-600">50,000+</div>
                <div>Memories Shared</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
