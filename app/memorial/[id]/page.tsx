import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { QRImage } from "@/components/qr-image"
import { FamilyTree } from "@/components/family-tree/family-tree"
import { format } from "date-fns"
import { MessageCircle, Users, ImageIcon, BookOpen, Video, Edit, Star, Play, ArrowLeft, Share2 } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase"
import { PersonImage } from "@/components/person-image"
import { ReliableImage } from "@/components/reliable-image"
import { ReliableVideo } from "@/components/reliable-video"
import Link from "next/link"

// Single sample memorial for focused development
const sampleMemorials = {
  "sample-1": {
    id: "sample-1",
    name: "Robert James Anderson",
    gender: "male",
    birth_date: "1945-03-11",
    death_date: "2022-08-23",
    bio: "Robert James Anderson was born on March 11, 1945, in Portland, Oregon. He was the second of four children born to James and Mary Anderson.\n\nAfter graduating high school in 1963, Robert joined the United States Army where he served with distinction for 8 years, including a tour in Vietnam. Upon returning home, he used his GI Bill to attend college, earning a degree in Engineering from Oregon State University.\n\nRobert worked for Pacific Northwest Engineering for over 30 years, where he was known for his problem-solving abilities and mentorship of younger engineers. In his spare time, he was an avid woodworker, creating beautiful furniture pieces that are still cherished by his family.\n\nHe married the love of his life, Margaret, in 1970, and together they raised three children: James, Sarah, and Michael. Robert was a devoted grandfather to his seven grandchildren, always ready with a story or a new wooden toy he had crafted.\n\nRobert was known for his infectious laugh, his unwavering integrity, and his willingness to help anyone in need. He was active in his local veterans' organization and volunteered regularly at the community woodshop, teaching classes to at-risk youth.\n\nHe passed peacefully on August 23, 2022, surrounded by his loving family. His legacy lives on through the many lives he touched and the values he instilled in his children and grandchildren.",
    cover_image_url: "/images/robert-ocean-view.png",
    profile_image_url: "/images/robert-vintage-uniform.jpeg",
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
        url: "/images/robert-vintage-uniform.jpeg",
        caption: "Robert's grandfather in military uniform during World War I, 1918",
        display_order: 1,
        media_type: "image",
      },
      {
        id: "2",
        url: "/images/robert-military-portrait.jpeg",
        caption: "Robert following in his grandfather's footsteps, in his military uniform, 1963",
        display_order: 2,
        media_type: "image",
      },
      {
        id: "3",
        url: "/images/robert-graduation.png",
        caption: "Robert's college graduation from Oregon State University, 1971",
        display_order: 3,
        media_type: "image",
      },
      {
        id: "4",
        url: "/images/robert-wedding.png",
        caption: "Robert and Margaret on their wedding day, 1970",
        display_order: 4,
        media_type: "image",
      },
      {
        id: "5",
        url: "/images/robert-fishing.png",
        caption: "Fishing trip with the grandchildren, 2015",
        display_order: 5,
        media_type: "image",
      },
      {
        id: "6",
        url: "/images/robert-woodworking.png",
        caption: "Robert in his workshop crafting furniture, 2018",
        display_order: 6,
        media_type: "image",
      },
    ],
    videos: [
      {
        id: "v1",
        url: "/videos/revolutionizing-remembrance-qr.mov",
        caption: "Robert sharing stories about his woodworking passion, 2020",
        description: "A heartwarming video of Robert in his workshop, demonstrating his woodworking techniques.",
        display_order: 1,
        media_type: "video",
      },
      {
        id: "v2",
        url: "/videos/memorial-qr-demo.mp4",
        caption: "Family gathering at Robert's 75th birthday celebration, 2020",
        description: "A joyful family celebration with Robert surrounded by his children and grandchildren.",
        display_order: 2,
        media_type: "video",
      },
    ],
  },
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

    // Fetch related media (both images and videos)
    const { data: media, error: mediaError } = await supabase
      .from("media")
      .select("*")
      .eq("memorial_id", memorialId)
      .order("display_order", { ascending: true })

    if (mediaError) {
      console.error("Error fetching media:", mediaError)
    }

    // Separate images and videos
    const images = media?.filter((item) => item.media_type === "image") || []
    const videos = media?.filter((item) => item.media_type === "video") || []

    // Return the combined data
    return {
      ...memorial,
      stories: stories || [],
      media: images,
      videos: videos,
    }
  } catch (error) {
    console.error("Error in getMemorialData:", error)
    return null
  }
}

// Check if user owns this memorial
async function checkMemorialOwnership(memorialId: string) {
  if (memorialId.startsWith("sample-")) {
    return true // Sample memorials are always editable for demo
  }

  try {
    const supabase = createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return false

    const { data: memorial } = await supabase.from("memorials").select("user_id").eq("id", memorialId).single()

    return memorial?.user_id === user.id
  } catch {
    return false
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
  const isOwner = await checkMemorialOwnership(memorialId)

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

  // Determine gender for the image
  const gender = (memorial.gender as "male" | "female" | "neutral") || "neutral"

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Memorial
              </Button>
              {isOwner && (
                <Link href={`/memorial/${memorialId}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Memorial
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Gray Background with Memorial Cover Text */}
      <section className="relative bg-gray-400 h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-600 opacity-50">Memorial Cover</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white">In Loving Memory</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Birth/Death Info and Profile Section */}
      <section className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Birth and Death Info */}
          <div className="flex justify-between items-start mb-8">
            <div className="text-center flex-1">
              <div className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-1">BORN</div>
              <div className="text-lg font-medium text-gray-900">{formattedBirthDate || "Unknown"}</div>
              <div className="text-gray-600">{birthLocation}</div>
            </div>

            {/* Profile Photo - Centered */}
            <div className="flex-shrink-0 mx-8">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                {memorial.profile_image_url ? (
                  <ReliableImage
                    src={memorial.profile_image_url}
                    alt={`${memorial.name} profile`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                    fallbackText={memorial.name}
                  />
                ) : (
                  <PersonImage
                    name={memorial.name}
                    gender={gender}
                    className="w-full h-full object-cover"
                    seed={`${memorial.id}-profile`}
                    alt={`${memorial.name} profile`}
                    type="profile"
                  />
                )}
              </div>
            </div>

            <div className="text-center flex-1">
              <div className="font-bold text-sm uppercase tracking-wide text-gray-900 mb-1">DIED</div>
              <div className="text-lg font-medium text-gray-900">{formattedDeathDate || "Unknown"}</div>
              <div className="text-gray-600">{deathLocation}</div>
            </div>
          </div>

          {/* Name and Dates */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{memorial.name}</h1>
            <p className="text-xl text-gray-600">
              {formattedBirthDate} - {formattedDeathDate}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-t">
        <div className="max-w-4xl mx-auto px-4">
          <Tabs defaultValue="biography" className="w-full">
            <TabsList className="grid grid-cols-5 w-full bg-transparent border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="biography"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none py-4 px-6 text-gray-600 hover:text-gray-900"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Biography
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none py-4 px-6 text-gray-600 hover:text-gray-900"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none py-4 px-6 text-gray-600 hover:text-gray-900"
              >
                <Video className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="family"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none py-4 px-6 text-gray-600 hover:text-gray-900"
              >
                <Users className="h-4 w-4 mr-2" />
                Family
              </TabsTrigger>
              <TabsTrigger
                value="guestbook"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none py-4 px-6 text-gray-600 hover:text-gray-900"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Guest Book
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="py-8">
              {/* Biography Tab */}
              <TabsContent value="biography" className="mt-0">
                <div className="max-w-3xl mx-auto">
                  {memorial.bio ? (
                    <div className="prose prose-lg max-w-none">
                      <p className="whitespace-pre-line text-gray-700 leading-relaxed">{memorial.bio}</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No biography has been added yet.</p>
                      {isOwner && (
                        <Link href={`/memorial/${memorialId}/edit`} className="mt-2 inline-block">
                          <Button variant="outline" size="sm">
                            Add Biography
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery" className="mt-0">
                <div className="max-w-4xl mx-auto">
                  {memorial.media && memorial.media.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {memorial.media.map((item, index) => (
                        <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <ReliableImage
                            src={item.url}
                            alt={item.caption || `Memorial image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-200"
                            fallbackText={item.caption || `Photo ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No photos have been added yet.</p>
                      {isOwner && (
                        <Link href={`/memorial/${memorialId}/manage-images`} className="mt-2 inline-block">
                          <Button variant="outline" size="sm">
                            Add Photos
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos" className="mt-0">
                <div className="max-w-4xl mx-auto">
                  {memorial.videos && memorial.videos.length > 0 ? (
                    <div className="space-y-8">
                      {memorial.videos.map((video, index) => (
                        <Card key={video.id} className="overflow-hidden">
                          <ReliableVideo
                            src={video.url}
                            title={video.caption || `Memorial video ${index + 1}`}
                            poster={memorial.cover_image_url}
                            className="w-full"
                            width={800}
                            height={450}
                          />
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 h-96 flex items-center justify-center">
                      <div className="text-center">
                        <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">Memorial Videos</p>
                        <p className="text-gray-500 text-sm mb-4">Videos and memories will be displayed here</p>
                        {isOwner && (
                          <Link href={`/memorial/${memorialId}/manage-videos`}>
                            <Button variant="outline" size="sm">
                              Add Videos
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Family Tab */}
              <TabsContent value="family" className="mt-0">
                <div className="max-w-4xl mx-auto">
                  <FamilyTree memorialId={memorialId} isEditable={isOwner} />
                </div>
              </TabsContent>

              {/* Guest Book Tab */}
              <TabsContent value="guestbook" className="mt-0">
                <div className="max-w-3xl mx-auto space-y-6">
                  {memorial.stories && memorial.stories.length > 0 ? (
                    <div className="space-y-6">
                      {memorial.stories.map((story) => (
                        <div key={story.id} className="border-l-4 border-blue-500 pl-6 py-4">
                          <div className="flex items-center mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">
                              {format(new Date(story.created_at), "MMM d, yyyy")}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed whitespace-pre-line">{story.content}</p>
                          <p className="text-sm font-medium text-gray-900">- {story.author_name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No guestbook entries have been added yet.</p>
                    </div>
                  )}

                  {/* Add Memory Form */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-8">
                    <h3 className="text-lg font-semibold mb-4">Leave a Memory</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          id="authorName"
                          placeholder="Enter your name"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Memory or Tribute
                        </label>
                        <textarea
                          id="content"
                          placeholder="Share your memory, story, or tribute..."
                          rows={4}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Submit Memory
                      </Button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* QR Code and Share Section */}
      <div className="mt-12 mb-16 text-center max-w-4xl mx-auto px-4">
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
  )
}
