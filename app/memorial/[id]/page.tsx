import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { QRImage } from "@/components/qr-image"
import { FamilyTree } from "@/components/family-tree/family-tree"
import { format } from "date-fns"
import { MessageCircle, Users, ImageIcon, BookOpen } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"
import { SafeImage } from "@/components/safe-image"

// Sample memorial data for demo purposes
const sampleMemorials = {
  "sample-1": {
    id: "sample-1",
    name: "Robert James Anderson",
    birth_date: "1945-03-12",
    death_date: "2022-08-24",
    bio: "Robert James Anderson was born on March 12, 1945, in Portland, Oregon. He was the second of four children born to James and Mary Anderson.\n\nAfter graduating high school in 1963, Robert joined the United States Army where he served with distinction for 8 years, including a tour in Vietnam. Upon returning home, he used his GI Bill to attend college, earning a degree in Engineering from Oregon State University.\n\nRobert worked for Pacific Northwest Engineering for over 30 years, where he was known for his problem-solving abilities and mentorship of younger engineers. In his spare time, he was an avid woodworker, creating beautiful furniture pieces that are still cherished by his family.\n\nHe married the love of his life, Margaret, in 1970, and together they raised three children: James, Sarah, and Michael. Robert was a devoted grandfather to his seven grandchildren, always ready with a story or a new wooden toy he had crafted.\n\nRobert was known for his infectious laugh, his unwavering integrity, and his willingness to help anyone in need. He was active in his local veterans' organization and volunteered regularly at the community woodshop, teaching classes to at-risk youth.\n\nHe passed peacefully on August 24, 2022, surrounded by his loving family. His legacy lives on through the many lives he touched and the values he instilled in his children and grandchildren.",
    cover_image_url: "/images/robert-cover.jpg",
    profile_image_url: "/images/robert-portrait.jpg",
    birth_location: "Portland, Oregon",
    death_location: "Seattle, Washington",
    stories: [
      {
        id: "1",
        author_name: "Margaret Anderson",
        content:
          "My beloved husband of 52 years. Not a day goes by that I don't think of your smile and the warmth you brought into our lives. You were my rock, my best friend, and the love of my life. Until we meet again.",
        created_at: "2022-09-01T14:23:00Z",
      },
      {
        id: "2",
        author_name: "James Anderson",
        content:
          "Dad, you taught me what it means to be a man of integrity and compassion. I still use the toolbox you made for me when I was 10, and I think of you every time. Your grandchildren miss their 'Papa' and his stories. We're keeping your memory alive.",
        created_at: "2022-09-03T10:15:00Z",
      },
      {
        id: "3",
        author_name: "Sarah Johnson",
        content:
          "My father was the most patient person I've ever known. He taught me to fish when I was little, never getting frustrated when I tangled the line (which was often). That patience extended to everything he did. I'm trying to live up to that example with my own children.",
        created_at: "2022-09-05T16:42:00Z",
      },
    ],
    media: [
      {
        id: "1",
        url: "/images/robert-portrait.jpg",
        caption: "Robert at his 70th birthday celebration",
        display_order: 1,
      },
      {
        id: "2",
        url: "/images/robert-fishing.jpg",
        caption: "Fishing trip with the grandchildren, summer 2019",
        display_order: 2,
      },
      {
        id: "3",
        url: "/images/robert-anniversary.jpg",
        caption: "Robert and Margaret's 50th anniversary",
        display_order: 3,
      },
      {
        id: "4",
        url: "/images/robert-workshop.jpg",
        caption: "In his workshop crafting furniture",
        display_order: 4,
      },
      {
        id: "5",
        url: "/images/robert-family.jpg",
        caption: "Family reunion, 2020",
        display_order: 5,
      },
      {
        id: "6",
        url: "/images/robert-military.jpg",
        caption: "Military service photo, 1965",
        display_order: 6,
      },
    ],
  },
  // Other sample memorials...
}

// Function to fetch memorial data from the database
async function getMemorialData(memorialId: string) {
  console.log("Fetching memorial data for ID:", memorialId)

  // Check if it's a sample memorial first
  if (memorialId.startsWith("sample-")) {
    console.log("Using sample memorial data")
    return sampleMemorials[memorialId as keyof typeof sampleMemorials] || null
  }

  // Otherwise, fetch from the database
  try {
    const supabase = createServerSupabaseClient()

    // Fetch the memorial
    const { data: memorial, error: memorialError } = await supabase
      .from("memorials")
      .select("*")
      .eq("id", memorialId)
      .single()

    if (memorialError) {
      console.error("Error fetching memorial:", memorialError)
      return null
    }

    if (!memorial) {
      console.log("No memorial found with ID:", memorialId)
      return null
    }

    console.log("Found memorial:", memorial)

    // Fetch related stories
    const { data: stories, error: storiesError } = await supabase
      .from("stories")
      .select("*")
      .eq("memorial_id", memorialId)
      .order("created_at", { ascending: false })

    if (storiesError) {
      console.error("Error fetching stories:", storiesError)
    }

    // Fetch related media
    const { data: media, error: mediaError } = await supabase
      .from("media")
      .select("*")
      .eq("memorial_id", memorialId)
      .order("display_order", { ascending: true })

    if (mediaError) {
      console.error("Error fetching media:", mediaError)
    }

    // Return the combined data
    return {
      ...memorial,
      stories: stories || [],
      media: media || [],
    }
  } catch (error) {
    console.error("Error in getMemorialData:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const memorial = await getMemorialData(params.id)

  if (!memorial) {
    return {
      title: "Memorial Not Found",
    }
  }

  return {
    title: `${memorial.name} | Memorial QR`,
    description: memorial.bio ? memorial.bio.substring(0, 160) : `In loving memory of ${memorial.name}`,
  }
}

export default async function MemorialPage({ params }: { params: { id: string } }) {
  const memorialId = params.id
  const memorial = await getMemorialData(memorialId)

  if (!memorial) {
    console.log("Memorial not found, redirecting to 404")
    notFound()
  }

  // Format dates for display
  let formattedBirthDate = null
  let formattedDeathDate = null

  try {
    formattedBirthDate = memorial.birth_date ? format(new Date(memorial.birth_date), "MMMM d, yyyy") : null
  } catch (error) {
    console.error("Error formatting birth date:", error)
  }

  try {
    formattedDeathDate = memorial.death_date ? format(new Date(memorial.death_date), "MMMM d, yyyy") : null
  } catch (error) {
    console.error("Error formatting death date:", error)
  }

  const birthLocation = memorial.birth_location || "Location information"
  const deathLocation = memorial.death_location || "Location information"

  // Default images if none are provided
  const coverImageUrl = memorial.cover_image_url || "/images/memorial-1.jpg"
  const profileImageUrl =
    memorial.profile_image_url ||
    (memorial.media && memorial.media.length > 0 ? memorial.media[0].url : "/images/memorial-1.jpg")

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Photo */}
      <div className="relative w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
        <SafeImage
          src={coverImageUrl}
          alt={memorial.name}
          fill
          className="object-cover"
          priority
          fallbackSrc={`/placeholder.svg?height=800&width=1200&text=${encodeURIComponent(memorial.name)}`}
        />
      </div>

      {/* Birth/Death Info and Profile Photo */}
      <div className="relative px-4 md:px-8 max-w-5xl mx-auto">
        {/* Birth/Death Info */}
        <div className="flex justify-between text-center py-4 text-sm">
          <div className="w-1/2 pr-2">
            <div className="font-bold uppercase">BORN</div>
            <div>{formattedBirthDate || "Unknown"}</div>
            <div>{birthLocation}</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="font-bold uppercase">DIED</div>
            <div>{formattedDeathDate || "Unknown"}</div>
            <div>{deathLocation}</div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-gray-200">
            <SafeImage
              src={profileImageUrl}
              alt={memorial.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
              fallbackSrc={`/placeholder.svg?height=128&width=128&text=${encodeURIComponent(memorial.name.charAt(0))}`}
            />
          </div>
        </div>

        {/* Name */}
        <div className="text-center mt-16 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{memorial.name}</h1>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="biography" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="biography" className="data-[state=active]:bg-gray-100">
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Biography</span>
              <span className="sm:hidden">Bio</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-gray-100">
              <ImageIcon className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="family" className="data-[state=active]:bg-gray-100">
              <Users className="h-4 w-4 mr-2" />
              Family
            </TabsTrigger>
            <TabsTrigger value="guestbook" className="data-[state=active]:bg-gray-100">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Guest Book</span>
              <span className="sm:hidden">Book</span>
            </TabsTrigger>
          </TabsList>

          {/* Biography Tab */}
          <TabsContent value="biography" className="space-y-6">
            {memorial.bio ? (
              <Card className="p-6">
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{memorial.bio}</p>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No biography has been added yet.</p>
              </Card>
            )}
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            {memorial.media && memorial.media.length > 0 ? (
              <Card className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {memorial.media.map((item) => (
                    <div key={item.id} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                      <SafeImage
                        src={item.url || ""}
                        alt={item.caption || "Memorial image"}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                        fallbackSrc={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(memorial.name)}`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No photos have been added yet.</p>
              </Card>
            )}
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family" className="space-y-6">
            <FamilyTree memorialId={memorialId} />
          </TabsContent>

          {/* Guest Book Tab */}
          <TabsContent value="guestbook" className="space-y-6">
            <div className="text-center mb-6">
              <Button className="bg-navy-blue hover:bg-navy-blue/90 text-white">Submit Guestbook Entry</Button>
            </div>

            {memorial.stories && memorial.stories.length > 0 ? (
              <div className="space-y-6">
                {memorial.stories.map((story) => (
                  <Card key={story.id} className="p-6 bg-cream">
                    <div className="mb-2">
                      <strong>{story.author_name}</strong>
                      <span className="text-sm text-gray-500 ml-2">
                        {format(new Date(story.created_at), "yyyy-MM-dd")}
                      </span>
                    </div>
                    <p className="whitespace-pre-line">{story.content}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No guestbook entries have been added yet.</p>
              </Card>
            )}

            {/* Add Memory Form */}
            <Card className="p-6 bg-white">
              <form className="space-y-4">
                <h3 className="text-lg font-semibold">Add Your Memory</h3>
                <div>
                  <label htmlFor="authorName" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    id="authorName"
                    placeholder="Enter your name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium mb-1">
                    Your Memory or Tribute
                  </label>
                  <textarea
                    id="content"
                    placeholder="Share your memory, story, or tribute..."
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <Button type="submit" className="bg-navy-blue hover:bg-navy-blue/90 text-white">
                  Submit Memory
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        {/* QR Code and Share Section */}
        <div className="mt-12 mb-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Share This Memorial</h3>
          <div className="flex justify-center mb-4">
            <div className="p-2 bg-white border rounded-md">
              <QRImage value={`https://memorial-qr-website.vercel.app/memorial/${memorial.id}`} size={150} />
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              Facebook
            </Button>
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
