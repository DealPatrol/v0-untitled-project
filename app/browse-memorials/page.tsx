"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, Heart, Calendar, MapPin, Eye } from "lucide-react"

export default function BrowseMemorialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")

  const memorials = [
    {
      id: "maria-rodriguez",
      name: "Maria Elena Rodriguez",
      birthYear: 1952,
      deathYear: 2023,
      location: "San Antonio, Texas",
      image: "/placeholder.svg?height=300&width=300&text=Maria+Rodriguez",
      description:
        "Beloved mother, grandmother, and community volunteer who dedicated her life to helping others. Maria was known for her warm smile, incredible cooking, and unwavering faith.",
      memories: 47,
      visitors: 1203,
      recentActivity: "2 days ago",
      tags: ["Mother", "Grandmother", "Volunteer"],
      featured: true,
    },
    {
      id: "james-wilson",
      name: "James Robert Wilson",
      birthYear: 1945,
      deathYear: 2023,
      location: "Denver, Colorado",
      image: "/placeholder.svg?height=300&width=300&text=James+Wilson",
      description:
        "Proud veteran who served two tours in Vietnam, loving father of three, and retired firefighter who saved countless lives during his 30-year career.",
      memories: 62,
      visitors: 856,
      recentActivity: "1 week ago",
      tags: ["Veteran", "Father", "Firefighter"],
      featured: false,
    },
    {
      id: "sarah-chen",
      name: "Sarah Michelle Chen",
      birthYear: 1978,
      deathYear: 2023,
      location: "Portland, Oregon",
      image: "/placeholder.svg?height=300&width=300&text=Sarah+Chen",
      description:
        "Passionate elementary school teacher who inspired hundreds of students over her 15-year career. Sarah was also an avid hiker and environmental advocate.",
      memories: 89,
      visitors: 2341,
      recentActivity: "3 days ago",
      tags: ["Teacher", "Environmentalist", "Hiker"],
      featured: true,
    },
    {
      id: "robert-johnson",
      name: "Robert 'Bob' Johnson",
      birthYear: 1938,
      deathYear: 2023,
      location: "Nashville, Tennessee",
      image: "/placeholder.svg?height=300&width=300&text=Robert+Johnson",
      description:
        "Talented musician and songwriter who played in local bands for over 40 years. Bob was a mentor to young musicians and a pillar of the Nashville music community.",
      memories: 73,
      visitors: 1567,
      recentActivity: "5 days ago",
      tags: ["Musician", "Mentor", "Songwriter"],
      featured: false,
    },
    {
      id: "elizabeth-davis",
      name: "Elizabeth 'Betty' Davis",
      birthYear: 1941,
      deathYear: 2023,
      location: "Charleston, South Carolina",
      image: "/placeholder.svg?height=300&width=300&text=Elizabeth+Davis",
      description:
        "Devoted nurse who worked in pediatric care for 35 years. Betty was known for her gentle touch with children and her ability to comfort families during difficult times.",
      memories: 56,
      visitors: 934,
      recentActivity: "1 day ago",
      tags: ["Nurse", "Caregiver", "Mother"],
      featured: false,
    },
    {
      id: "michael-thompson",
      name: "Michael David Thompson",
      birthYear: 1965,
      deathYear: 2023,
      location: "Seattle, Washington",
      image: "/placeholder.svg?height=300&width=300&text=Michael+Thompson",
      description:
        "Innovative software engineer and loving father who balanced his passion for technology with his dedication to his family. Mike coached little league for 8 years.",
      memories: 41,
      visitors: 678,
      recentActivity: "4 days ago",
      tags: ["Engineer", "Father", "Coach"],
      featured: false,
    },
  ]

  const filteredMemorials = memorials.filter((memorial) => {
    const matchesSearch =
      memorial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memorial.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "featured" && memorial.featured) ||
      (filterBy === "recent" && memorial.recentActivity.includes("day"))

    return matchesSearch && matchesFilter
  })

  const sortedMemorials = [...filteredMemorials].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.deathYear).getTime() - new Date(a.deathYear).getTime()
      case "visitors":
        return b.visitors - a.visitors
      case "memories":
        return b.memories - a.memories
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Memorial Gallery</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse beautiful memorials created by families to honor their loved ones. Each memorial tells a unique
              story of a life well-lived.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search memorials by name, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-4">
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Memorials</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="recent">Recent Activity</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="visitors">Most Visited</SelectItem>
                    <SelectItem value="memories">Most Memories</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {sortedMemorials.length} of {memorials.length} memorials
            </p>
            <Link href="/create-memorial">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create Memorial
              </Button>
            </Link>
          </div>

          {/* Memorial Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMemorials.map((memorial) => (
              <Card
                key={memorial.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <div className="relative">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={memorial.image || "/placeholder.svg"}
                      alt={memorial.name}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {memorial.featured && (
                    <Badge className="absolute top-3 left-3 bg-purple-600 text-white">Featured</Badge>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-semibold text-lg mb-1">{memorial.name}</h3>
                    <div className="flex items-center text-sm opacity-90">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>
                        {memorial.birthYear} - {memorial.deathYear}
                      </span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{memorial.location}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{memorial.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {memorial.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{memorial.memories}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{memorial.visitors.toLocaleString()}</span>
                      </div>
                    </div>
                    <span>Updated {memorial.recentActivity}</span>
                  </div>

                  <Link href={`/memorial/${memorial.id}`}>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Memorial
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {sortedMemorials.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No memorials found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setFilterBy("all")
                  setSortBy("recent")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create a Memorial for Your Loved One</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Honor their memory with a beautiful digital memorial that can be shared with family and friends. Get
              started in just a few minutes.
            </p>
            <Link href="/create-memorial">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Create Memorial Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
