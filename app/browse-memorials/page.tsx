"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Heart, Calendar, MapPin, Users, Grid, List } from "lucide-react"

const memorials = [
  {
    id: "glenda-kelso",
    name: "Glenda Kelso",
    dates: "July 27, 1952 - August 27, 2025",
    age: 73,
    location: "Cullman, AL",
    image: "/glenda-memorial-portrait.jpeg",
    description: "Beloved mother, grandmother, and friend who touched countless lives with her kindness and wisdom.",
    category: "Family",
    tributes: 0,
    photos: 9,
    stories: 0,
    featured: true,
  },
  {
    id: "robert-johnson",
    name: 'Robert "Bob" Johnson',
    dates: "March 15, 1945 - January 12, 2024",
    age: 78,
    location: "Birmingham, AL",
    image: "/elderly-veteran-man-uniform-portrait.png",
    description: "Decorated Vietnam veteran and devoted family man who served his country and community with honor.",
    category: "Veteran",
    tributes: 23,
    photos: 15,
    stories: 8,
    featured: false,
  },
  {
    id: "maria-gonzalez",
    name: "Dr. Maria Gonzalez",
    dates: "June 8, 1962 - November 3, 2024",
    age: 62,
    location: "Mobile, AL",
    image: "/professional-woman-doctor-white-coat-smiling.png",
    description: "Compassionate physician who dedicated her life to healing others and advancing medical research.",
    category: "Professional",
    tributes: 45,
    photos: 22,
    stories: 12,
    featured: true,
  },
  {
    id: "william-chen",
    name: "William Chen",
    dates: "September 22, 1958 - August 15, 2024",
    age: 65,
    location: "Huntsville, AL",
    image: "/asian-man-engineer-smiling-professional-portrait.png",
    description: "Innovative engineer and mentor who helped shape the next generation of technology leaders.",
    category: "Professional",
    tributes: 31,
    photos: 18,
    stories: 9,
    featured: false,
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    dates: "December 5, 1938 - February 28, 2024",
    age: 85,
    location: "Montgomery, AL",
    image: "/elderly-woman-grandmother-smiling-portrait.png",
    description: "Loving grandmother and community volunteer who spent decades helping those in need.",
    category: "Family",
    tributes: 67,
    photos: 34,
    stories: 18,
    featured: true,
  },
  {
    id: "nurse-patricia",
    name: "Patricia Martinez",
    dates: "April 18, 1970 - September 10, 2024",
    age: 54,
    location: "Tuscaloosa, AL",
    image: "/hospital-nurse-helping-patient.png",
    description:
      "Dedicated nurse who provided comfort and care to patients and families during their most difficult times.",
    category: "Healthcare",
    tributes: 89,
    photos: 41,
    stories: 25,
    featured: false,
  },
]

export default function BrowseMemorials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredMemorials = memorials.filter((memorial) => {
    const matchesSearch =
      memorial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || memorial.category.toLowerCase() === categoryFilter
    const matchesLocation = locationFilter === "all" || memorial.location.includes(locationFilter)

    return matchesSearch && matchesCategory && matchesLocation
  })

  const categories = ["all", "family", "veteran", "professional", "healthcare"]
  const locations = ["all", "Birmingham", "Mobile", "Huntsville", "Montgomery", "Tuscaloosa", "Cullman"]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Browse Memorial Gallery</h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
              Honor the memories of loved ones and discover the stories that celebrate their lives
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search memorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === "all" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMemorials.length} of {memorials.length} memorials
          </p>
        </div>

        {/* Memorial Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemorials.map((memorial) => (
              <Card key={memorial.id} className="memorial-card hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <Image
                    src={memorial.image || "/placeholder.svg"}
                    alt={memorial.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {memorial.featured && <Badge className="absolute top-3 left-3 bg-purple-600">Featured</Badge>}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{memorial.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        {memorial.dates} (Age {memorial.age})
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {memorial.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{memorial.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {memorial.tributes}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {memorial.photos}
                      </span>
                    </div>
                    <Badge variant="outline">{memorial.category}</Badge>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/memorial/${memorial.id}`}>View Memorial</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMemorials.map((memorial) => (
              <Card key={memorial.id} className="memorial-card hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={memorial.image || "/placeholder.svg"}
                        alt={memorial.name}
                        width={200}
                        height={150}
                        className="w-full sm:w-48 h-32 object-cover rounded-lg"
                      />
                      {memorial.featured && <Badge className="absolute top-2 left-2 bg-purple-600">Featured</Badge>}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">{memorial.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {memorial.dates} (Age {memorial.age})
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            {memorial.location}
                          </div>
                        </div>
                        <Badge variant="outline" className="self-start">
                          {memorial.category}
                        </Badge>
                      </div>

                      <p className="text-gray-700 text-sm mb-4">{memorial.description}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {memorial.tributes} tributes
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {memorial.photos} photos
                          </span>
                        </div>

                        <Button asChild>
                          <Link href={`/memorial/${memorial.id}`}>View Memorial</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredMemorials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No memorials found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-purple-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Create a Memorial for Your Loved One</h2>
          <p className="text-lg text-gray-600 mb-8">
            Honor their memory with a beautiful, lasting tribute that family and friends can cherish forever.
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/pricing">Create Memorial</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
