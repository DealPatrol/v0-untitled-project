"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Grid, List, Heart, Calendar, MapPin, Star } from "lucide-react"

const memorials = [
  {
    id: "glenda-kelso",
    name: "Glenda Jane Kelso",
    dates: "July 27, 1952 - August 27, 2025",
    location: "Cullman, AL",
    image: "/glenda-memorial-portrait.jpeg",
    description: "Beloved mother, grandmother, and friend who touched countless lives with her kindness and wisdom.",
    tags: ["Mother", "Grandmother", "Teacher"],
    featured: true,
    rating: 5,
    visits: 1247,
  },
  {
    id: "robert-johnson",
    name: "Robert Johnson",
    dates: "March 15, 1945 - December 10, 2024",
    location: "Birmingham, AL",
    image: "/elderly-man-smiling-portrait.png",
    description: "Devoted father and veteran who served his country and community with honor.",
    tags: ["Father", "Veteran", "Community Leader"],
    featured: false,
    rating: 5,
    visits: 892,
  },
  {
    id: "maria-gonzalez",
    name: "Maria Gonzalez",
    dates: "June 8, 1960 - November 22, 2024",
    location: "Mobile, AL",
    image: "/hispanic-woman-smiling-professional-portrait.png",
    description: "Caring nurse and mother who dedicated her life to helping others heal.",
    tags: ["Mother", "Nurse", "Caregiver"],
    featured: false,
    rating: 5,
    visits: 634,
  },
  {
    id: "james-williams",
    name: "James Williams",
    dates: "September 12, 1938 - October 5, 2024",
    location: "Huntsville, AL",
    image: "/elderly-veteran-man-uniform-portrait.png",
    description: "Proud veteran and grandfather who shared his wisdom with three generations.",
    tags: ["Grandfather", "Veteran", "Mentor"],
    featured: false,
    rating: 5,
    visits: 756,
  },
  {
    id: "sarah-davis",
    name: "Dr. Sarah Davis",
    dates: "April 3, 1955 - September 18, 2024",
    location: "Montgomery, AL",
    image: "/professional-woman-doctor-white-coat-smiling.png",
    description: "Pioneering physician who broke barriers and saved countless lives.",
    tags: ["Doctor", "Pioneer", "Healer"],
    featured: false,
    rating: 5,
    visits: 923,
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    dates: "January 20, 1962 - August 14, 2024",
    location: "Tuscaloosa, AL",
    image: "/asian-man-engineer-smiling-professional-portrait.png",
    description: "Innovative engineer and loving father who built bridges both literal and metaphorical.",
    tags: ["Father", "Engineer", "Innovator"],
    featured: false,
    rating: 5,
    visits: 567,
  },
  {
    id: "elizabeth-brown",
    name: "Elizabeth Brown",
    dates: "May 14, 1943 - July 30, 2024",
    location: "Auburn, AL",
    image: "/elderly-woman-grandmother-smiling-portrait.png",
    description: "Devoted grandmother who filled every room with laughter and love.",
    tags: ["Grandmother", "Teacher", "Volunteer"],
    featured: false,
    rating: 5,
    visits: 445,
  },
  {
    id: "william-thompson",
    name: "William Thompson",
    dates: "August 7, 1950 - June 15, 2024",
    location: "Florence, AL",
    image: "/elderly-man-teaching-children-classroom.png",
    description: "Dedicated educator who inspired thousands of students over four decades.",
    tags: ["Teacher", "Mentor", "Father"],
    featured: false,
    rating: 5,
    visits: 678,
  },
]

export default function Memorials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterTag, setFilterTag] = useState("all")

  const allTags = ["all", ...Array.from(new Set(memorials.flatMap((m) => m.tags)))]

  const filteredMemorials = memorials
    .filter((memorial) => {
      const matchesSearch =
        memorial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memorial.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memorial.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = filterTag === "all" || memorial.tags.includes(filterTag)
      return matchesSearch && matchesTag
    })
    .sort((a, b) => {
      if (sortBy === "recent")
        return new Date(b.dates.split(" - ")[1]).getTime() - new Date(a.dates.split(" - ")[1]).getTime()
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name)
      if (sortBy === "featured") return b.featured ? 1 : -1
      if (sortBy === "popular") return b.visits - a.visits
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Memorial Gallery</h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8">
            Explore beautiful digital memorials that celebrate the lives and legacies of loved ones. Each memorial tells
            a unique story of love, loss, and remembrance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
              <Link href="/pricing">Create Your Memorial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search memorials by name, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Select value={filterTag} onValueChange={setFilterTag}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Filter by tag" />
                </SelectTrigger>
                <SelectContent>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag === "all" ? "All Categories" : tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="popular">Most Visited</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none h-12 px-4"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none h-12 px-4"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-gray-600 text-lg">
              Showing {filteredMemorials.length} memorial{filteredMemorials.length !== 1 ? "s" : ""}
            </p>
            <p className="text-sm text-gray-500">
              {memorials.reduce((sum, m) => sum + m.visits, 0).toLocaleString()} total visits across all memorials
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{memorials.filter((m) => m.featured).length} Featured</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>5.0 Average Rating</span>
            </div>
          </div>
        </div>

        {/* Memorials Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMemorials.map((memorial) => (
              <Card key={memorial.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <Image
                    src={memorial.image || "/placeholder.svg"}
                    alt={memorial.name}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {memorial.featured && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0">
                      <Heart className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(memorial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-white text-xs ml-1">({memorial.visits} visits)</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {memorial.name}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{memorial.dates}</span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{memorial.location}</span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">{memorial.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {memorial.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {memorial.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{memorial.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button asChild className="w-full group-hover:bg-purple-600 transition-colors">
                    <Link href={`/memorial/${memorial.id}`}>View Memorial</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredMemorials.map((memorial) => (
              <Card key={memorial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={memorial.image || "/placeholder.svg"}
                        alt={memorial.name}
                        width={160}
                        height={160}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      {memorial.featured && (
                        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                          <Heart className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{memorial.name}</h3>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(memorial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-gray-500 text-sm ml-1">({memorial.visits} visits)</span>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/memorial/${memorial.id}`}>View Memorial</Link>
                        </Button>
                      </div>

                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm mr-6">{memorial.dates}</span>
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{memorial.location}</span>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{memorial.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {memorial.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredMemorials.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Memorials Found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any memorials matching your search criteria. Try adjusting your filters or search
                terms.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilterTag("all")
                  setSortBy("recent")
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your Own Memorial</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Honor your loved one with a beautiful digital memorial that preserves their memory forever. Join thousands
            of families who have chosen Memorial QR.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/pricing">Get Started Today</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/contact">Have Questions?</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-gray-400 text-sm">
                Creating lasting digital memorials to honor and remember your loved ones.
              </p>
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
                    Examples
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
