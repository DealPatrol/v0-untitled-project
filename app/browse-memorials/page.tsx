"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Heart, MapPin, Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PersonImage } from "@/components/person-image"

interface Memorial {
  id: string
  name: string
  birth_date: string
  death_date: string
  location: string
  biography: string
  profile_image_url?: string
  tags: string[]
  age: number
  gender?: "male" | "female" | "neutral"
}

export default function BrowseMemorialsPage() {
  const [memorials, setMemorials] = useState<Memorial[]>([])
  const [filteredMemorials, setFilteredMemorials] = useState<Memorial[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [loading, setLoading] = useState(true)

  // Sample memorial data - replace with API call
  const sampleMemorials: Memorial[] = [
    {
      id: "1",
      name: "Robert Johnson",
      birth_date: "1925-03-15",
      death_date: "2023-11-20",
      location: "Birmingham, Alabama",
      biography:
        "A loving father, grandfather, and World War II veteran who dedicated his life to his family and community. Robert worked as a carpenter for over 40 years and was known for his kindness and generosity.",
      profile_image_url: "/images/robert-portrait.jpg",
      tags: ["veteran", "father", "carpenter"],
      age: 98,
      gender: "male",
    },
    {
      id: "2",
      name: "Mary Elizabeth Smith",
      birth_date: "1940-07-22",
      death_date: "2024-01-15",
      location: "Nashville, Tennessee",
      biography:
        "A beloved teacher who touched the lives of thousands of students over her 35-year career. Mary was passionate about education and spent her retirement volunteering at local literacy programs.",
      profile_image_url: "/images/female-memorial-portrait.png",
      tags: ["teacher", "mother", "volunteer"],
      age: 83,
      gender: "female",
    },
    {
      id: "3",
      name: "James Michael Wilson",
      birth_date: "1955-12-08",
      death_date: "2023-09-30",
      location: "Atlanta, Georgia",
      biography:
        "A talented musician and artist who brought joy to everyone around him. James performed in local bands and taught guitar lessons to children in his community for over 20 years.",
      profile_image_url: "/images/male-memorial-portrait.png",
      tags: ["musician", "artist", "teacher"],
      age: 67,
      gender: "male",
    },
    {
      id: "4",
      name: "Dorothy Mae Thompson",
      birth_date: "1935-05-18",
      death_date: "2024-02-28",
      location: "Memphis, Tennessee",
      biography:
        "A devoted nurse who spent 45 years caring for others at Memphis General Hospital. Dorothy was known for her compassionate care and mentored countless young nurses throughout her career.",
      profile_image_url: "/images/female-memorial-cover.png",
      tags: ["nurse", "mentor", "caregiver"],
      age: 88,
      gender: "female",
    },
    {
      id: "5",
      name: "William Charles Davis",
      birth_date: "1950-09-12",
      death_date: "2023-12-05",
      location: "Mobile, Alabama",
      biography:
        "A dedicated firefighter who served his community for 30 years. William was a hero who saved countless lives and was beloved by his fellow firefighters and the community he served.",
      profile_image_url: "/images/veteran-portrait.png",
      tags: ["firefighter", "hero", "father"],
      age: 73,
      gender: "male",
    },
    {
      id: "6",
      name: "Helen Grace Anderson",
      birth_date: "1945-11-03",
      death_date: "2024-01-20",
      location: "Huntsville, Alabama",
      biography:
        "A brilliant engineer who worked on the Apollo space program at NASA. Helen broke barriers as one of the few women in aerospace engineering and inspired generations of young women to pursue STEM careers.",
      profile_image_url: "/images/female-memorial-family.png",
      tags: ["engineer", "nasa", "pioneer"],
      age: 78,
      gender: "female",
    },
  ]

  useEffect(() => {
    // Simulate API call
    const fetchMemorials = async () => {
      setLoading(true)
      // In production, replace with actual API call
      // const response = await fetch('/api/memorials/public')
      // const data = await response.json()

      setTimeout(() => {
        setMemorials(sampleMemorials)
        setFilteredMemorials(sampleMemorials)
        setLoading(false)
      }, 1000)
    }

    fetchMemorials()
  }, [])

  useEffect(() => {
    let filtered = memorials

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (memorial) =>
          memorial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          memorial.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          memorial.biography.toLowerCase().includes(searchTerm.toLowerCase()) ||
          memorial.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((memorial) => memorial.tags.includes(selectedCategory))
    }

    // Sort results
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.death_date).getTime() - new Date(a.death_date).getTime())
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.death_date).getTime() - new Date(b.death_date).getTime())
        break
    }

    setFilteredMemorials(filtered)
  }, [memorials, searchTerm, selectedCategory, sortBy])

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "veteran", label: "Veterans" },
    { value: "teacher", label: "Teachers" },
    { value: "father", label: "Fathers" },
    { value: "mother", label: "Mothers" },
    { value: "artist", label: "Artists" },
    { value: "musician", label: "Musicians" },
    { value: "nurse", label: "Nurses" },
    { value: "firefighter", label: "Firefighters" },
    { value: "engineer", label: "Engineers" },
  ]

  const sortOptions = [
    { value: "recent", label: "Recently Added" },
    { value: "name", label: "Name (A-Z)" },
    { value: "oldest", label: "Oldest First" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Browse Memorials</h1>
            <p className="text-xl text-gray-600">Loading memorials...</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Browse Memorials</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Search and discover beautiful memorial pages created by families to honor their loved ones.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, location, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMemorials.length} of {memorials.length} memorials
          </p>
        </div>

        {/* Memorial Grid */}
        {filteredMemorials.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No memorials found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or filters to find more memorials.</p>
            <Button asChild>
              <Link href="/create-profile">Create a Memorial</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMemorials.map((memorial) => (
              <Card key={memorial.id} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <PersonImage
                      name={memorial.name}
                      gender={memorial.gender}
                      src={memorial.profile_image_url}
                      alt={`${memorial.name} memorial photo`}
                      className="w-full h-full object-cover rounded-t-lg"
                      type="cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{memorial.name}</CardTitle>

                  <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {new Date(memorial.birth_date).getFullYear()} - {new Date(memorial.death_date).getFullYear()} (Age{" "}
                      {memorial.age})
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{memorial.location}</span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{memorial.biography}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {memorial.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/memorial/${memorial.id}`}>
                      View Memorial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-lg shadow-lg p-8">
          <User className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Create a Memorial for Your Loved One</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Honor their memory with a beautiful memorial page that family and friends can visit and contribute to.
          </p>
          <Button asChild size="lg">
            <Link href="/create-profile">
              Create Memorial Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
