import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Heart, Users, Camera, Plus } from "lucide-react"
import Link from "next/link"

const timelineEvents = [
  {
    id: 1,
    year: 1945,
    date: "March 11, 1945",
    title: "Born in Portland, Oregon",
    description: "Robert James Anderson was born to James and Mary Anderson, the second of four children.",
    location: "Portland, Oregon",
    type: "birth",
    image: "/images/robert-baby-photo.png",
  },
  {
    id: 2,
    year: 1963,
    date: "June 15, 1963",
    title: "High School Graduation",
    description:
      "Graduated from Lincoln High School with honors, where he played varsity football and was class treasurer.",
    location: "Portland, Oregon",
    type: "education",
    image: "/images/robert-graduation.png",
  },
  {
    id: 3,
    year: 1963,
    date: "September 1, 1963",
    title: "Enlisted in U.S. Army",
    description: "Joined the United States Army and began basic training at Fort Benning, Georgia.",
    location: "Fort Benning, Georgia",
    type: "military",
    image: "/images/robert-military-portrait.jpeg",
  },
  {
    id: 4,
    year: 1965,
    date: "April 12, 1965",
    title: "Deployed to Vietnam",
    description: "Served with distinction in the Vietnam War as part of the 1st Infantry Division.",
    location: "South Vietnam",
    type: "military",
    image: "/images/robert-vietnam.png",
  },
  {
    id: 5,
    year: 1970,
    date: "June 20, 1970",
    title: "Married Margaret",
    description:
      "Married the love of his life, Margaret Rose Thompson, in a beautiful ceremony surrounded by family and friends.",
    location: "Portland, Oregon",
    type: "marriage",
    image: "/images/robert-wedding.png",
  },
  {
    id: 6,
    year: 1971,
    date: "May 15, 1971",
    title: "College Graduation",
    description: "Earned a Bachelor's degree in Engineering from Oregon State University using the GI Bill.",
    location: "Corvallis, Oregon",
    type: "education",
    image: "/images/robert-college-graduation.png",
  },
  {
    id: 7,
    year: 1972,
    date: "August 3, 1972",
    title: "First Child Born",
    description: "Welcomed their first child, James Robert Anderson, into the world.",
    location: "Portland, Oregon",
    type: "family",
    image: "/images/robert-first-child.png",
  },
  {
    id: 8,
    year: 1975,
    date: "March 22, 1975",
    title: "Second Child Born",
    description: "Sarah Elizabeth Anderson was born, completing their growing family.",
    location: "Portland, Oregon",
    type: "family",
    image: "/images/robert-second-child.png",
  },
  {
    id: 9,
    year: 1978,
    date: "November 10, 1978",
    title: "Third Child Born",
    description: "Michael Thomas Anderson was born, making them a family of five.",
    location: "Portland, Oregon",
    type: "family",
    image: "/images/robert-third-child.png",
  },
  {
    id: 10,
    year: 1985,
    date: "July 1, 1985",
    title: "Promoted to Senior Engineer",
    description:
      "Received a promotion to Senior Engineer at Pacific Northwest Engineering after 10 years of dedicated service.",
    location: "Portland, Oregon",
    type: "career",
    image: "/images/robert-promotion.png",
  },
  {
    id: 11,
    year: 1995,
    date: "September 15, 1995",
    title: "First Grandchild Born",
    description: "Became a grandfather when his daughter Sarah gave birth to Emma Rose Johnson.",
    location: "Seattle, Washington",
    type: "family",
    image: "/images/robert-first-grandchild.png",
  },
  {
    id: 12,
    year: 2005,
    date: "December 31, 2005",
    title: "Retirement",
    description:
      "Retired from Pacific Northwest Engineering after 30 years of service, receiving recognition for his contributions to the field.",
    location: "Portland, Oregon",
    type: "career",
    image: "/images/robert-retirement.png",
  },
  {
    id: 13,
    year: 2020,
    date: "March 11, 2020",
    title: "75th Birthday Celebration",
    description: "Celebrated his 75th birthday surrounded by all seven grandchildren and his loving family.",
    location: "Seattle, Washington",
    type: "celebration",
    image: "/images/robert-75th-birthday.png",
  },
  {
    id: 14,
    year: 2022,
    date: "August 23, 2022",
    title: "Passed Away Peacefully",
    description: "Robert passed away peacefully at home, surrounded by his loving family, after a brief illness.",
    location: "Seattle, Washington",
    type: "death",
    image: "/images/robert-memorial.png",
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "birth":
      return "bg-green-100 text-green-800"
    case "education":
      return "bg-blue-100 text-blue-800"
    case "military":
      return "bg-red-100 text-red-800"
    case "marriage":
      return "bg-pink-100 text-pink-800"
    case "family":
      return "bg-purple-100 text-purple-800"
    case "career":
      return "bg-orange-100 text-orange-800"
    case "celebration":
      return "bg-yellow-100 text-yellow-800"
    case "death":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getEventTypeIcon = (type: string) => {
  switch (type) {
    case "birth":
      return <Heart className="h-4 w-4" />
    case "education":
      return <Calendar className="h-4 w-4" />
    case "military":
      return <Badge className="h-4 w-4" />
    case "marriage":
      return <Heart className="h-4 w-4" />
    case "family":
      return <Users className="h-4 w-4" />
    case "career":
      return <Clock className="h-4 w-4" />
    case "celebration":
      return <Camera className="h-4 w-4" />
    case "death":
      return <Heart className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Life Timeline</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A chronological journey through the important moments, milestones, and memories that shaped a life.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-rose-500"></div>

              {/* Timeline events */}
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative flex items-start space-x-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-blue-600 font-bold text-sm">{event.year}</span>
                      </div>
                    </div>

                    {/* Event content */}
                    <div className="flex-1 min-w-0">
                      <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Badge className={getEventTypeColor(event.type)}>
                                  {getEventTypeIcon(event.type)}
                                  <span className="ml-1 capitalize">{event.type}</span>
                                </Badge>
                                <span className="text-sm text-gray-500">{event.date}</span>
                              </div>
                              <CardTitle className="text-xl">{event.title}</CardTitle>
                            </div>
                            {event.image && (
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 ml-4">
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                  <Camera className="h-6 w-6 text-gray-400" />
                                </div>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed mb-3">{event.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Event CTA */}
      <section className="bg-white border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Add to the Timeline</h2>
            <p className="text-gray-600">
              Help us complete this life story by adding important events, milestones, or memories.
            </p>
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              <Plus className="mr-2 h-5 w-5" />
              Add Timeline Event
            </Button>
          </div>
        </div>
      </section>

      {/* Create Your Own Timeline CTA */}
      <section className="bg-rose-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Create a Timeline for Your Loved One</h2>
            <p className="text-xl text-rose-100">
              Chronicle their life story with a beautiful interactive timeline that preserves their legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/checkout">
                  <Clock className="mr-2 h-5 w-5" />
                  Create Memorial Timeline
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-rose-600 bg-transparent"
              >
                <Link href="/ai-tools">Use AI Timeline Generator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
