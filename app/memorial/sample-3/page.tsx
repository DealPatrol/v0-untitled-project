import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QRImage } from "@/components/qr-image"
import { MessageCircle, Users, ImageIcon, BookOpen } from "lucide-react"

// Helper function to get base URL that works in all environments
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://memorial-qr-website.vercel.app"
}

export default function MichaelMemorialPage() {
  const memorial = {
    id: "sample-3",
    name: "Michael David Wilson",
    birth_date: "1952-07-22",
    death_date: "2021-12-03",
    bio: "Michael was known for his infectious laugh and entrepreneurial spirit. As a community leader and business owner, he helped countless people achieve their dreams.\n\nBorn in Seattle to Robert and Mary Wilson, Michael showed an early talent for business, starting his first venture—a neighborhood lawn care service—at just 12 years old. After graduating from the University of Washington with a degree in Business Administration, he founded Wilson Technologies, which grew to become one of the region's most respected software companies.\n\nBeyond his business success, Michael was deeply committed to his community. He established the Wilson Foundation to provide scholarships for underprivileged youth and served on the boards of several local charities. His mentorship program helped launch dozens of successful startups in the Seattle area.\n\nMichael's greatest joy was his family. He met his wife, Jennifer, during college, and they shared 45 wonderful years together. They raised three children and delighted in their seven grandchildren. Family gatherings at their lake house were legendary for good food, better stories, and Michael's famous barbecue.\n\nHe approached his battle with cancer with the same optimism and determination that characterized his entire life. His legacy lives on through his family, his business, and the countless lives he touched with his generosity and wisdom.",
    cover_image_url: "/images/memorial-3.jpg",
  }

  const media = [
    { id: 1, url: "/images/michael-1.jpg", caption: "Michael at his company's founding" },
    { id: 2, url: "/images/michael-2.jpg", caption: "Family vacation in Hawaii" },
    { id: 3, url: "/images/michael-3.jpg", caption: "Receiving community leadership award" },
    { id: 4, url: "/images/michael-4.jpg", caption: "At his daughter's wedding" },
    { id: 5, url: "/images/michael-5.jpg", caption: "Fishing at the lake house" },
    { id: 6, url: "/images/michael-6.jpg", caption: "With his grandchildren" },
  ]

  const stories = [
    {
      id: 1,
      author_name: "Jennifer Wilson",
      content:
        "Michael lived every day to the fullest. His optimism was contagious, and he never met a challenge he didn't face with a smile. Our 45 years together were filled with adventure, laughter, and love. I miss his warmth beside me every day, but I'm grateful for the beautiful life we built together.",
      created_at: "2022-01-15T10:30:00Z",
    },
    {
      id: 2,
      author_name: "David Chen",
      content:
        "Michael gave me my first real chance in business when no one else would. He didn't just invest in my company; he invested in me as a person. His mentorship changed the trajectory of my life. I owe my success to his guidance and belief in me.",
      created_at: "2021-12-20T14:45:00Z",
    },
    {
      id: 3,
      author_name: "Sarah Wilson-Brooks",
      content:
        "Dad taught us that success isn't measured by what you have, but by what you give. He lived those values every day. I'll never forget our Sunday morning pancake traditions and the life lessons he shared while flipping those perfect pancakes. His wisdom guides me still.",
      created_at: "2022-02-03T09:15:00Z",
    },
  ]

  const qrCode = {
    unique_code: "MICH-2021-WLSN",
  }

  const baseUrl = getBaseUrl()
  const formattedBirthDate = "July 22, 1952"
  const formattedDeathDate = "December 3, 2021"
  const birthLocation = "Seattle, Washington"
  const deathLocation = "Seattle, Washington"

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Photo */}
      <div className="relative w-full h-64 md:h-80 bg-gray-200">
        <Image
          src={memorial.cover_image_url || "/placeholder.svg"}
          alt={memorial.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Birth/Death Info and Profile Photo */}
      <div className="relative px-4 md:px-8 max-w-5xl mx-auto">
        {/* Birth/Death Info */}
        <div className="flex justify-between text-center py-4 text-sm">
          <div className="w-1/2 pr-2">
            <div className="font-bold uppercase">BORN</div>
            <div>{formattedBirthDate}</div>
            <div>{birthLocation}</div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="font-bold uppercase">DIED</div>
            <div>{formattedDeathDate}</div>
            <div>{deathLocation}</div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-gray-200">
            <Image
              src="/images/michael-profile.jpg"
              alt={memorial.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
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
            <Card className="p-6">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{memorial.bio}</p>
              </div>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div key={item.id} className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={item.url || "/placeholder.svg"}
                      alt={item.caption || "Memorial image"}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family" className="space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Family Tree</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <h3 className="text-xl font-medium mb-2">Wilson Family</h3>
                  <p className="text-gray-500 mb-4">
                    Michael's family includes his wife Jennifer, three children, and seven grandchildren.
                  </p>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex justify-center">
                      <div className="text-center mx-2">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                          <span className="text-blue-800">Michael</span>
                        </div>
                        <p className="mt-2 text-sm">1952-2021</p>
                      </div>
                      <div className="text-center mx-2">
                        <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mx-auto">
                          <span className="text-rose-800">Jennifer</span>
                        </div>
                        <p className="mt-2 text-sm">Wife</p>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 mx-auto my-2"></div>
                    <div className="flex justify-center space-x-8">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                          <span className="text-blue-800">Robert</span>
                        </div>
                        <p className="mt-2 text-sm">Son</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto">
                          <span className="text-pink-800">Sarah</span>
                        </div>
                        <p className="mt-2 text-sm">Daughter</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                          <span className="text-blue-800">James</span>
                        </div>
                        <p className="mt-2 text-sm">Son</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 text-sm text-gray-500">
                    Upgrade to Premium to view and edit the complete family tree
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guest Book Tab */}
          <TabsContent value="guestbook" className="space-y-6">
            <div className="text-center mb-6">
              <Button className="bg-navy-blue hover:bg-navy-blue/90 text-white">Submit Guestbook Entry</Button>
            </div>

            <div className="space-y-6">
              {stories.map((story) => (
                <Card key={story.id} className="p-6 bg-cream">
                  <div className="mb-2">
                    <strong>{story.author_name}</strong>
                    <span className="text-sm text-gray-500 ml-2">
                      {new Date(story.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="whitespace-pre-line">{story.content}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* QR Code and Share Section */}
        <div className="mt-12 mb-16 text-center">
          <h3 className="text-xl font-semibold mb-4">Share This Memorial</h3>
          <div className="flex justify-center mb-4">
            {qrCode && (
              <div className="p-2 bg-white border rounded-md">
                <QRImage value={`${baseUrl}/qr/${qrCode.unique_code}`} size={150} />
              </div>
            )}
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
