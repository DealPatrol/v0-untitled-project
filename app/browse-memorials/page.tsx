import { Suspense } from "react"
import { Search, Filter, Users, Heart, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PersonImage } from "@/components/person-image"
import Link from "next/link"

// Sample memorial data - in production, this would come from your database
const sampleMemorials = [
  {
    id: "sample-1",
    firstName: "Robert",
    lastName: "Johnson",
    birthDate: "1925-03-15",
    deathDate: "2023-11-20",
    location: "Springfield, IL",
    biography:
      "A loving father, grandfather, and World War II veteran who dedicated his life to his family and community. Robert worked as a carpenter for over 40 years and was known for his kindness and generosity.",
    profileImage: "/images/robert-portrait.jpg",
    coverImage: "/images/robert-cover.jpg",
    tags: ["veteran", "father", "carpenter"],
    createdAt: "2023-11-25",
  },
  {
    id: "sample-2",
    firstName: "Mary",
    lastName: "Williams",
    birthDate: "1940-07-22",
    deathDate: "2023-10-15",
    location: "Chicago, IL",
    biography:
      "A beloved teacher who touched the lives of thousands of students over her 35-year career. Mary was passionate about education and spent her retirement volunteering at local literacy programs.",
    profileImage: "/images/female-memorial-portrait.png",
    coverImage: "/images/female-memorial-cover.png",
    tags: ["teacher", "mother", "volunteer"],
    createdAt: "2023-10-20",
  },
  {
    id: "sample-3",
    firstName: "James",
    lastName: "Davis",
    birthDate: "1955-12-08",
    deathDate: "2023-09-30",
    location: "Austin, TX",
    biography:
      "A talented musician and loving husband who brought joy to everyone around him. James played guitar in local bands and taught music lessons to children in his community.",
    profileImage: "/images/male-memorial-portrait.png",
    coverImage: "/images/male-memorial-cover.png",
    tags: ["musician", "husband", "teacher"],
    createdAt: "2023-10-05",
  },
  {
    id: "veteran-sample",
    firstName: "William",
    lastName: "Thompson",
    birthDate: "1930-01-10",
    deathDate: "2023-08-15",
    location: "Denver, CO",
    biography:
      "A decorated Korean War veteran who served his country with honor and distinction. After the war, William became a successful businessman and devoted family man.",
    profileImage: "/images/veteran-portrait.png",
    coverImage: "/images/veteran-cover.png",
    tags: ["veteran", "businessman", "father"],
    createdAt: "2023-08-20",
  },
]

function calculateAge(birthDate: string, deathDate: string) {
  const birth = new Date(birthDate)
  const death = new Date(deathDate)
  const age = death.getFullYear() - birth.getFullYear()
  const monthDiff = death.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && death.getDate() < birth.getDate())) {
    return age - 1
  }
  return age
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function MemorialCard({ memorial }: { memorial: (typeof sampleMemorials)[0] }) {
  const age = calculateAge(memorial.birthDate, memorial.deathDate)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-100">
        <PersonImage
          src={memorial.profileImage}
          alt={`${memorial.firstName} ${memorial.lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">
            {memorial.firstName} {memorial.lastName}
          </h3>
          <p className="text-sm opacity-90">Age {age}</p>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDate(memorial.birthDate)} - {formatDate(memorial.deathDate)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{memorial.location}</span>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{memorial.biography}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {memorial.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Link href={`/memorial/${memorial.id}`}>
          <Button className="w-full">
            <Heart className="w-4 h-4 mr-2" />
            View Memorial
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function BrowseMemorialsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Memorial Pages</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Search and discover memorial pages created by families to honor their loved ones. Find and visit memorials
              to pay your respects and share memories.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input placeholder="Search by name, location, or keywords..." className="pl-10" />
              </div>
            </div>

            <Select>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="veteran">Veterans</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="parent">Parents</SelectItem>
                <SelectItem value="musician">Musicians</SelectItem>
                <SelectItem value="businessman">Business People</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="date-desc">Recently Passed</SelectItem>
                <SelectItem value="date-asc">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>{sampleMemorials.length} memorial pages found</span>
          </div>

          <Link href="/create-profile">
            <Button>
              <Heart className="w-4 h-4 mr-2" />
              Create Memorial
            </Button>
          </Link>
        </div>

        {/* Memorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleMemorials.map((memorial) => (
            <MemorialCard key={memorial.id} memorial={memorial} />
          ))}
        </div>

        {/* Empty State (when no results) */}
        {sampleMemorials.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No memorials found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Link href="/create-profile">
              <Button>
                <Heart className="w-4 h-4 mr-2" />
                Create the First Memorial
              </Button>
            </Link>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Honor Your Loved One</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Create a beautiful memorial page to celebrate the life of someone special. Share memories, photos, and
            stories that will be treasured forever.
          </p>
          <Link href="/create-profile">
            <Button size="lg">
              <Heart className="w-5 h-5 mr-2" />
              Create Memorial Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function BrowseMemorialsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowseMemorialsContent />
    </Suspense>
  )
}
