import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Heart, Calendar, MapPin, Users, Star, QrCode } from "lucide-react"

// Sample memorial data
const memorials = [
  {
    id: 1,
    name: "Robert 'Bob' Johnson",
    birthDate: "March 15, 1945",
    deathDate: "September 22, 2023",
    age: 78,
    location: "Springfield, Illinois",
    image: "/elderly-man-smiling-portrait.png",
    coverImage: "/family-gathering-outdoor-picnic.png",
    bio: "Bob was a devoted husband, father, and grandfather who spent 40 years as a high school math teacher. He touched countless lives through his passion for education and his unwavering belief that every student could succeed. Bob loved fishing, woodworking, and spending time with his 6 grandchildren.",
    highlights: [
      "Taught mathematics for 40 years at Springfield High School",
      "Married to his beloved wife Margaret for 52 years",
      "Father of 3 children and grandfather of 6",
      "Volunteer firefighter for 25 years",
      "Built furniture for local families in need",
    ],
    family: "Survived by wife Margaret, children Sarah, Michael, and David, and 6 grandchildren",
    hobbies: ["Fishing", "Woodworking", "Gardening", "Reading"],
    quote: "The best teachers are those who show you where to look, but don't tell you what to see.",
    visitors: 247,
    messages: 89,
  },
  {
    id: 2,
    name: "Maria Elena Rodriguez",
    birthDate: "July 8, 1962",
    deathDate: "January 14, 2024",
    age: 61,
    location: "San Antonio, Texas",
    image: "/hispanic-woman-smiling-professional-portrait.png",
    coverImage: "/hospital-nurse-helping-patient.png",
    bio: "Maria was a compassionate nurse who dedicated her life to caring for others. For 35 years, she worked in pediatric oncology, bringing comfort and hope to children and families during their most difficult times. Her warm smile and gentle spirit made her beloved by patients, families, and colleagues alike.",
    highlights: [
      "Pediatric oncology nurse for 35 years",
      "Received the Nurse of the Year award 3 times",
      "Fluent in English and Spanish",
      "Organized annual toy drives for hospitalized children",
      "Mentored over 50 new nurses throughout her career",
    ],
    family: "Beloved mother of twins Carlos and Isabella, grandmother of 4",
    hobbies: ["Cooking", "Dancing", "Volunteering", "Traveling"],
    quote: "Healing is not just about medicine - it's about love, hope, and human connection.",
    visitors: 312,
    messages: 156,
  },
  {
    id: 3,
    name: "James 'Jim' Mitchell",
    birthDate: "November 3, 1938",
    deathDate: "August 7, 2023",
    age: 84,
    location: "Portland, Oregon",
    image: "/elderly-veteran-man-uniform-portrait.png",
    coverImage: "/military-veterans-memorial-ceremony.png",
    bio: "Jim was a proud U.S. Army veteran who served two tours in Vietnam. After his military service, he became a successful small business owner, running Mitchell's Hardware Store for 45 years. Jim was known for his integrity, his willingness to help anyone in need, and his incredible stories from his travels around the world.",
    highlights: [
      "U.S. Army veteran - served in Vietnam (1967-1969)",
      "Owned and operated Mitchell's Hardware Store for 45 years",
      "Purple Heart and Bronze Star recipient",
      "Active in Veterans of Foreign Wars (VFW)",
      "Traveled to all 50 states and 23 countries",
    ],
    family: "Loving husband to Betty for 58 years, father of 4, grandfather of 9, great-grandfather of 3",
    hobbies: ["Traveling", "Photography", "Fishing", "Storytelling"],
    quote: "Service to others is the rent you pay for your room here on earth.",
    visitors: 189,
    messages: 67,
  },
  {
    id: 4,
    name: "Dr. Patricia 'Pat' Williams",
    birthDate: "February 20, 1955",
    deathDate: "May 11, 2024",
    age: 69,
    location: "Boston, Massachusetts",
    image: "/professional-woman-doctor-white-coat-smiling.png",
    coverImage: "/medical-research-scientist.png",
    bio: "Dr. Patricia Williams was a pioneering researcher in cancer treatment who dedicated her life to finding cures for childhood cancers. Her groundbreaking research led to improved survival rates for pediatric leukemia patients. Pat was not only a brilliant scientist but also a mentor, mother, and advocate for women in STEM fields.",
    highlights: [
      "Leading pediatric oncology researcher for 40 years",
      "Published over 200 scientific papers",
      "Developed new treatment protocols that improved survival rates",
      "Mentored 75+ medical students and residents",
      "Received the National Cancer Institute's Outstanding Investigator Award",
    ],
    family: "Devoted mother of 2 daughters, grandmother of 5, sister to 3 siblings",
    hobbies: ["Classical music", "Hiking", "Reading", "Mentoring young scientists"],
    quote: "Science is not just about discovery - it's about hope and healing for future generations.",
    visitors: 428,
    messages: 203,
  },
  {
    id: 5,
    name: "Thomas 'Tom' Chen",
    birthDate: "June 12, 1970",
    deathDate: "December 3, 2023",
    age: 53,
    location: "Seattle, Washington",
    image: "/asian-man-engineer-smiling-professional-portrait.png",
    coverImage: "/family-hiking-mountain-trail-together.png",
    bio: "Tom was a brilliant software engineer and devoted family man who balanced his successful tech career with his passion for the outdoors. He worked on innovative projects that helped millions of people connect and communicate. Tom was an avid hiker, photographer, and coach for his children's soccer teams.",
    highlights: [
      "Senior software engineer at major tech company for 20 years",
      "Led development of communication platforms used by millions",
      "Coached youth soccer for 10 years",
      "Completed hiking trails in 15 national parks",
      "Volunteer coding instructor for underserved communities",
    ],
    family: "Loving husband to Lisa for 25 years, father of Emma (16) and Alex (14)",
    hobbies: ["Hiking", "Photography", "Coding", "Soccer coaching"],
    quote: "Technology should bring people together, not drive them apart.",
    visitors: 356,
    messages: 178,
  },
  {
    id: 6,
    name: "Dorothy 'Dot' Thompson",
    birthDate: "April 5, 1932",
    deathDate: "October 15, 2023",
    age: 91,
    location: "Nashville, Tennessee",
    image: "/elderly-woman-grandmother-smiling-portrait.png",
    coverImage: "/large-family-reunion-multiple-generations.png",
    bio: "Dorothy was the heart of her family and community for over nine decades. As a mother of 7, grandmother of 18, and great-grandmother of 12, she was known for her incredible cooking, her warm hugs, and her ability to make everyone feel loved and welcome. Dot was active in her church and volunteered at the local food bank well into her 80s.",
    highlights: [
      "Devoted mother of 7 children",
      "Grandmother to 18 and great-grandmother to 12",
      "Volunteered at community food bank for 30 years",
      "Famous for her award-winning apple pie recipe",
      "Active member of First Baptist Church for 70 years",
    ],
    family: "Beloved matriarch of a family of 37 members across 4 generations",
    hobbies: ["Cooking", "Quilting", "Gardening", "Church activities"],
    quote: "Love is the ingredient that makes everything better.",
    visitors: 523,
    messages: 287,
  },
]

export default function BrowseMemorialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-lg">
            Real Memorial Examples
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Sample Digital Memorials</h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            See how families have honored their loved ones with beautiful digital memorials. Each QR code connects
            visitors to a lasting tribute filled with photos, stories, and cherished memories.
          </p>

          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
            <Link href="/create-profile">Create Your Memorial</Link>
          </Button>
        </div>
      </section>

      {/* Memorials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {memorials.map((memorial) => (
              <Card
                key={memorial.id}
                className="overflow-hidden border-2 border-gray-200 hover:border-orange-300 transition-colors shadow-lg"
              >
                {/* Cover Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={memorial.coverImage || "/placeholder.svg"}
                    alt={`Memorial cover for ${memorial.name}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-orange-600 text-white">
                      <QrCode className="w-4 h-4 mr-1" />
                      QR Memorial
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Profile Section */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-orange-200 flex-shrink-0">
                      <Image
                        src={memorial.image || "/placeholder.svg"}
                        alt={memorial.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{memorial.name}</h3>
                      <div className="flex items-center gap-4 text-gray-600 text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {memorial.birthDate} - {memorial.deathDate}
                          </span>
                        </div>
                        <span className="text-orange-600 font-medium">Age {memorial.age}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{memorial.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed">{memorial.bio}</p>
                  </div>

                  {/* Quote */}
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 mb-6">
                    <p className="text-gray-800 italic">"{memorial.quote}"</p>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Life Highlights:</h4>
                    <ul className="space-y-2">
                      {memorial.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <Star className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Family & Hobbies */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Family
                      </h4>
                      <p className="text-sm text-gray-700">{memorial.family}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Interests
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {memorial.hobbies.map((hobby, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {hobby}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{memorial.visitors} visitors</span>
                      <span>{memorial.messages} messages</span>
                    </div>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      View Memorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Create a Beautiful Memorial Like These</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Honor your loved one with a lasting digital tribute that preserves their memory and allows others to share
            in celebrating their life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-xl font-bold"
            >
              <Link href="/create-profile">Start Creating Memorial - $119.99</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>

          <div className="text-lg opacity-90">
            ✓ 30-Day Money Back Guarantee • ✓ Lifetime Access • ✓ No Monthly Fees
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-gray-400 text-sm">Honoring memories with digital memorials that last forever.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="hover:text-white">
                    Sample Memorials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
