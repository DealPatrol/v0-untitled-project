import { Suspense } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MemorialCard } from "@/components/memorial-card"
import { Search, Filter, Heart, Users, Calendar } from "lucide-react"
import Link from "next/link"

// Sample memorial data with all required fields
const sampleMemorials = [
  {
    id: "sample-1",
    user_id: "sample-user-1",
    name: "Robert James Anderson",
    birth_date: "1945-03-11",
    death_date: "2022-08-23",
    bio: "Robert was a beloved father, grandfather, and veteran who served his country with honor. His passion for woodworking and storytelling brought joy to everyone who knew him.",
    cover_image_url: "/images/robert-military-portrait.jpeg",
    is_public: true,
    created_at: "2022-09-01T00:00:00Z",
    updated_at: "2022-09-01T00:00:00Z",
    gender: "male" as const,
  },
  {
    id: "sample-2",
    user_id: "sample-user-2",
    name: "Margaret Rose Thompson",
    birth_date: "1952-07-15",
    death_date: "2023-01-12",
    bio: "Margaret was a devoted teacher who touched the lives of hundreds of students over her 35-year career. She was known for her kindness, wisdom, and infectious laugh.",
    cover_image_url: "/images/female-memorial-portrait.png",
    is_public: true,
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z",
    gender: "female" as const,
  },
  {
    id: "sample-3",
    user_id: "sample-user-3",
    name: 'William "Bill" Harrison',
    birth_date: "1938-12-03",
    death_date: "2023-05-20",
    bio: "Bill was a dedicated firefighter who served his community for over 30 years. He was a loving husband, father, and grandfather who always put family first.",
    cover_image_url: "/images/veteran-portrait.png",
    is_public: true,
    created_at: "2023-06-01T00:00:00Z",
    updated_at: "2023-06-01T00:00:00Z",
    gender: "male" as const,
  },
  {
    id: "sample-4",
    user_id: "sample-user-4",
    name: "Eleanor Grace Mitchell",
    birth_date: "1929-04-22",
    death_date: "2023-03-08",
    bio: "Eleanor was a pioneering nurse who dedicated her life to caring for others. She was a trailblazer in her field and a loving mother to four children.",
    cover_image_url: "/images/female-memorial-cover.png",
    is_public: true,
    created_at: "2023-04-01T00:00:00Z",
    updated_at: "2023-04-01T00:00:00Z",
    gender: "female" as const,
  },
  {
    id: "sample-5",
    user_id: "sample-user-5",
    name: "James Michael O'Connor",
    birth_date: "1965-09-18",
    death_date: "2023-07-14",
    bio: "James was a talented musician and music teacher who inspired countless students to pursue their passion for music. His legacy lives on through the many lives he touched.",
    cover_image_url: "/images/male-memorial-portrait.png",
    is_public: true,
    created_at: "2023-08-01T00:00:00Z",
    updated_at: "2023-08-01T00:00:00Z",
    gender: "male" as const,
  },
  {
    id: "sample-6",
    user_id: "sample-user-6",
    name: "Dorothy Ann Williams",
    birth_date: "1943-11-30",
    death_date: "2023-09-05",
    bio: "Dorothy was a beloved grandmother and community volunteer who spent her retirement years helping at the local food bank and mentoring young mothers.",
    cover_image_url: "/images/female-memorial-family.png",
    is_public: true,
    created_at: "2023-10-01T00:00:00Z",
    updated_at: "2023-10-01T00:00:00Z",
    gender: "female" as const,
  },
]

function MemorialGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleMemorials.map((memorial) => (
        <MemorialCard key={memorial.id} memorial={memorial} />
      ))}
    </div>
  )
}

function MemorialGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function BrowseMemorialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Browse Memorials</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and honor the lives of those who have passed. Each memorial tells a unique story of love, legacy,
              and remembrance.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search memorials by name..." className="pl-10" />
            </div>

            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="older">Older</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <Heart className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                    <p className="text-sm text-gray-600">Memorials Created</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">18,392</p>
                    <p className="text-sm text-gray-600">Family Members Connected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">45,621</p>
                    <p className="text-sm text-gray-600">Memories Shared</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Memorial Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Memorials</h2>
              <p className="text-gray-600">Showing {sampleMemorials.length} memorials</p>
            </div>
            <Badge variant="secondary" className="bg-rose-100 text-rose-800">
              {sampleMemorials.length} Public Memorials
            </Badge>
          </div>

          <Suspense fallback={<MemorialGridSkeleton />}>
            <MemorialGrid />
          </Suspense>
        </div>
      </section>

      {/* Create Memorial CTA */}
      <section className="bg-rose-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Create a Memorial for Your Loved One</h2>
            <p className="text-xl text-rose-100">
              Honor their memory with a beautiful digital memorial that will preserve their legacy forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/checkout">
                  <Heart className="mr-2 h-5 w-5" />
                  Create Memorial - $119.99
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-rose-600 bg-transparent"
              >
                <Link href="/memorial/sample-1">View Example Memorial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
