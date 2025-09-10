"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import {
  Search,
  Filter,
  Heart,
  Calendar,
  MapPin,
  Users,
  MessageCircle,
  Camera,
  Star,
  QrCode,
  Grid,
  List,
  SortAsc,
} from "lucide-react"

// Sample memorial data
const memorials = [
  {
    id: "robert-johnson",
    name: "Robert Johnson",
    birthDate: "1945-03-12",
    deathDate: "2023-11-15",
    age: 78,
    location: "Birmingham, Alabama",
    category: "Veteran",
    image: "/elderly-veteran-man-uniform-portrait.png",
    coverImage: "/military-veterans-memorial-ceremony.png",
    description: "Beloved husband, father, and decorated Vietnam War veteran who served his country with honor.",
    visitors: 3421,
    messages: 127,
    photos: 24,
    stories: 18,
    tags: ["Veteran", "Father", "Grandfather"],
  },
  {
    id: "glenda-kelso",
    name: "Glenda Jane Kelso",
    birthDate: "1943-03-15",
    deathDate: "2023-12-28",
    age: 80,
    location: "Hanceville, Alabama",
    category: "Community Leader",
    image: "/glenda-memorial-portrait.jpeg",
    coverImage: "/glenda-garden-couple.jpeg",
    description:
      "A life so beautifully lived deserves to be beautifully remembered. Devoted wife, mother, and grandmother known for her warm hospitality and caring nature.",
    visitors: 1247,
    messages: 89,
    photos: 18,
    stories: 12,
    tags: ["Mother", "Grandmother", "Community"],
  },
  {
    id: "maria-rodriguez",
    name: "Dr. Maria Rodriguez",
    birthDate: "1952-07-22",
    deathDate: "2024-01-10",
    age: 71,
    location: "Mobile, Alabama",
    category: "Healthcare Professional",
    image: "/professional-woman-doctor-white-coat-smiling.png",
    coverImage: "/hospital-nurse-helping-patient.png",
    description: "Dedicated physician who spent 40 years caring for patients and training young doctors.",
    visitors: 2156,
    messages: 156,
    photos: 31,
    stories: 22,
    tags: ["Doctor", "Mentor", "Healer"],
  },
  {
    id: "james-thompson",
    name: "James Thompson",
    birthDate: "1938-09-05",
    deathDate: "2023-10-20",
    age: 85,
    location: "Huntsville, Alabama",
    category: "Engineer",
    image: "/asian-man-engineer-smiling-professional-portrait.png",
    coverImage: "/medical-research-scientist.png",
    description: "Brilliant aerospace engineer who contributed to NASA's space program for over 30 years.",
    visitors: 1876,
    messages: 94,
    photos: 22,
    stories: 15,
    tags: ["Engineer", "NASA", "Innovator"],
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    birthDate: "1955-12-03",
    deathDate: "2024-02-14",
    age: 68,
    location: "Montgomery, Alabama",
    category: "Educator",
    image: "/hispanic-woman-smiling-professional-portrait.png",
    coverImage: "/family-gathering-outdoor-picnic.png",
    description: "Passionate teacher who inspired thousands of students over her 35-year career in education.",
    visitors: 1654,
    messages: 112,
    photos: 28,
    stories: 19,
    tags: ["Teacher", "Educator", "Mentor"],
  },
  {
    id: "william-davis",
    name: "William Davis",
    birthDate: "1940-06-18",
    deathDate: "2023-09-12",
    age: 83,
    location: "Tuscaloosa, Alabama",
    category: "Business Owner",
    image: "/elderly-man-smiling-portrait.png",
    coverImage: "/family-hiking-mountain-trail-together.png",
    description: "Successful businessman and philanthropist who gave back to his community throughout his life.",
    visitors: 2234,
    messages: 143,
    photos: 35,
    stories: 26,
    tags: ["Businessman", "Philanthropist", "Community Leader"],
  },
]

export default function BrowseMemorials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter and sort memorials
  const filteredMemorials = memorials
    .filter((memorial) => {
      const matchesSearch =
        memorial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memorial.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memorial.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || memorial.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.deathDate).getTime() - new Date(a.deathDate).getTime()
        case "oldest":
          return new Date(a.deathDate).getTime() - new Date(b.deathDate).getTime()
        case "visitors":
          return b.visitors - a.visitors
        case "messages":
          return b.messages - a.messages
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const categories = ["all", ...Array.from(new Set(memorials.map((m) => m.category)))]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Memorial Gallery</h1>
            <p className="text-xl text-orange-100 mb-8">
              Explore digital memorials celebrating lives well-lived. Each memorial tells a unique story of love,
              legacy, and remembrance.
            </p>
            <div className="flex items-center justify-center gap-6 text-orange-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{memorials.reduce((sum, m) => sum + m.visitors, 0).toLocaleString()} Total Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{memorials.reduce((sum, m) => sum + m.messages, 0)} Messages</span>
              </div>
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                <span>{memorials.reduce((sum, m) => sum + m.photos, 0)} Photos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search memorials by name, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="visitors">Most Visited</SelectItem>
                  <SelectItem value="messages">Most Messages</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredMemorials.length} of {memorials.length} memorials
          </div>
        </div>
      </section>

      {/* Memorials Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredMemorials.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No memorials found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
              {filteredMemorials.map((memorial) => (
                <Card key={memorial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative h-48 bg-gray-100">
                        <Image
                          src={memorial.coverImage || "/placeholder.svg?height=200&width=400"}
                          alt={`Memorial cover for ${memorial.name}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-orange-600 text-white">
                            <QrCode className="w-3 h-3 mr-1" />
                            Digital Memorial
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">{memorial.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-200 flex-shrink-0">
                            <Image
                              src={memorial.image || "/placeholder.svg?height=64&width=64"}
                              alt={memorial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{memorial.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDate(memorial.birthDate)} - {formatDate(memorial.deathDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{memorial.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{memorial.description}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {memorial.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                          <div>
                            <div className="font-semibold text-orange-600">{memorial.visitors.toLocaleString()}</div>
                            <div className="text-gray-500">Visitors</div>
                          </div>
                          <div>
                            <div className="font-semibold text-orange-600">{memorial.messages}</div>
                            <div className="text-gray-500">Messages</div>
                          </div>
                          <div>
                            <div className="font-semibold text-orange-600">{memorial.photos}</div>
                            <div className="text-gray-500">Photos</div>
                          </div>
                        </div>

                        <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                          <Link href={`/memorial/${memorial.id}`}>
                            <Heart className="w-4 h-4 mr-2" />
                            View Memorial
                          </Link>
                        </Button>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-orange-200 flex-shrink-0">
                          <Image
                            src={memorial.image || "/placeholder.svg?height=96&width=96"}
                            alt={memorial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-2xl font-bold text-gray-900">{memorial.name}</h3>
                            <div className="flex gap-2">
                              <Badge variant="secondary">{memorial.category}</Badge>
                              <Badge className="bg-orange-600 text-white">
                                <QrCode className="w-3 h-3 mr-1" />
                                Digital
                              </Badge>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDate(memorial.birthDate)} - {formatDate(memorial.deathDate)} (Age {memorial.age})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{memorial.location}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{memorial.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-orange-600" />
                                <span>{memorial.visitors.toLocaleString()} visitors</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4 text-orange-600" />
                                <span>{memorial.messages} messages</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Camera className="w-4 h-4 text-orange-600" />
                                <span>{memorial.photos} photos</span>
                              </div>
                            </div>
                            <Button asChild className="bg-orange-600 hover:bg-orange-700">
                              <Link href={`/memorial/${memorial.id}`}>
                                <Heart className="w-4 h-4 mr-2" />
                                View Memorial
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Create a Memorial for Your Loved One</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Honor their memory with a beautiful digital memorial that family and friends can visit anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
              <Link href="/create-sample-memorial">
                <Star className="w-5 h-5 mr-2" />
                Create Sample Memorial
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
            >
              <Link href="/pricing">
                <QrCode className="w-5 h-5 mr-2" />
                View Pricing Plans
              </Link>
            </Button>
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
