import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { Quote, Heart, Users } from "lucide-react"

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Denver, CO",
      image: "/hispanic-woman-smiling-professional-portrait.png",
      text: "Memorial QR helped us create a beautiful tribute for my father. The QR plaque at his gravesite allows visitors to see his life story and photos. It's brought so much comfort to our family.",
      rating: 5,
      relationship: "Daughter",
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA",
      image: "/asian-man-engineer-smiling-professional-portrait.png",
      text: "The digital memorial has brought our family closer together. We can all contribute memories and stories in one place. The quality of the plaque exceeded our expectations.",
      rating: 5,
      relationship: "Son",
    },
    {
      name: "Lisa Rodriguez",
      location: "Austin, TX",
      image: "/professional-woman-doctor-white-coat-smiling.png",
      text: "Professional service and beautiful results. The memorial plaque looks elegant and the digital content is easy to manage. Our grandmother would have loved this tribute.",
      rating: 5,
      relationship: "Granddaughter",
    },
    {
      name: "Robert Thompson",
      location: "Phoenix, AZ",
      image: "/elderly-veteran-man-uniform-portrait.png",
      text: "As a veteran myself, I wanted something special for my wife's memorial. The QR code plaque is perfect - dignified yet modern. Visitors can learn about her incredible life of service.",
      rating: 5,
      relationship: "Husband",
    },
    {
      name: "Jennifer Martinez",
      location: "Miami, FL",
      image: "/hospital-nurse-helping-patient.png",
      text: "The customer service was exceptional throughout the process. They helped us create something truly meaningful. The memorial has become a gathering place for sharing memories.",
      rating: 5,
      relationship: "Wife",
    },
    {
      name: "David Wilson",
      location: "Chicago, IL",
      image: "/medical-research-scientist.png",
      text: "The technology is impressive but the real value is emotional. Being able to share my mother's story with future generations through a simple QR scan is remarkable.",
      rating: 5,
      relationship: "Son",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Families Served" },
    { number: "50,000+", label: "Memories Preserved" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "99.9%", label: "Satisfaction Rate" },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
          <Heart className="w-4 h-4 mr-2" />
          Loved by Families
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Stories from Families We've Helped</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          See how Memorial QR has helped thousands of families create lasting tributes and preserve precious memories
          for future generations.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
            <div className="text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="memorial-card h-full">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <StarRating rating={testimonial.rating} size="sm" />
                  </div>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {testimonial.relationship}
                  </Badge>
                </div>
              </div>

              <div className="relative">
                <Quote className="w-6 h-6 text-slate-300 mb-2" />
                <p className="text-slate-700 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-slate-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Trusted by Families Nationwide</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join thousands of families who have chosen Memorial QR to honor their loved ones with dignity and lasting
            beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Family Owned</h4>
            <p className="text-slate-600 text-sm">
              Founded by a family who understands the importance of preserving memories with care and respect.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Made with Love</h4>
            <p className="text-slate-600 text-sm">
              Every memorial is crafted with attention to detail and genuine care for your family's story.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Personal Support</h4>
            <p className="text-slate-600 text-sm">
              Our compassionate team is here to guide you through every step of creating your memorial.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
