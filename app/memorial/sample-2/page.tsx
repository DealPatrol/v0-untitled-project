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

export default function ElizabethMemorialPage() {
  const memorial = {
    id: "sample-2",
    name: "Elizabeth Marie Thompson",
    birth_date: "1938-11-05",
    death_date: "2023-01-17",
    bio: "Elizabeth was a dedicated teacher for over 40 years. Her love for literature and music inspired generations of students. She leaves behind a legacy of compassion and wisdom.\n\nBorn in Chicago to immigrant parents, Elizabeth discovered her passion for education early in life. She graduated with honors from Northwestern University and went on to teach English literature at Lincoln High School. Her innovative teaching methods and genuine care for her students earned her the Teacher of the Year award three times.\n\nOutside the classroom, Elizabeth was an accomplished pianist and avid gardener. Her home was always filled with music, books, and fresh flowers from her garden. She volunteered at the local library's literacy program and mentored countless young teachers throughout her career.\n\nElizabeth is survived by her husband of 52 years, James, their two children, Michael and Sarah, and five grandchildren who were the light of her life. Her kindness, intelligence, and unwavering belief in the power of education continue to inspire all who knew her.",
    cover_image_url: "/images/memorial-2.jpg",
  }

  const media = [
    { id: 1, url: "/images/elizabeth-1.jpg", caption: "Elizabeth's graduation day" },
    { id: 2, url: "/images/elizabeth-2.jpg", caption: "Teaching her favorite class" },
    { id: 3, url: "/images/elizabeth-3.jpg", caption: "Family vacation, 1985" },
    { id: 4, url: "/images/elizabeth-4.jpg", caption: "At the piano" },
    { id: 5, url: "/images/elizabeth-5.jpg", caption: "50th wedding anniversary" },
    { id: 6, url: "/images/elizabeth-6.jpg", caption: "With her grandchildren" },
  ]

  const stories = [
    {
      id: 1,
      author_name: "Michael Thompson",
      content:
        "Mom always said that a good book and a cup of tea could solve most of life's problems. Her wisdom and patience shaped not just her students, but everyone who knew her. I miss our Sunday afternoon discussions about literature and life.",
      created_at: "2023-02-10T14:30:00Z",
    },
    {
      id: 2,
      author_name: "Jennifer Adams",
      content:
        "Mrs. Thompson was my English teacher in 1992, and she changed my life. She was the first person who told me I had talent as a writer. I became an English teacher because of her influence, and I try to inspire my students the way she inspired me.",
      created_at: "2023-01-25T09:15:00Z",
    },
    {
      id: 3,
      author_name: "Robert Chen",
      content:
        "I'll never forget how Mrs. Thompson stayed after school for weeks to help me prepare for my college interviews. She believed in me when I didn't believe in myself. Her kindness and dedication made all the difference in my life.",
      created_at: "2023-02-05T16:45:00Z",
    },
  ]

  const qrCode = {
    unique_code: "ELIZ-2023-THMP",
  }

  const baseUrl = getBaseUrl()
  const formattedBirthDate = "November 5, 1938"
  const formattedDeathDate = "January 17, 2023"
  const birthLocation = "Chicago, Illinois"
  const deathLocation = "Portland, Oregon"

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
              src="/images/elizabeth-profile.jpg"
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
                  <h3 className="text-xl font-medium mb-2">Family Tree</h3>
                  <p className="text-gray-500 mb-4">
                    Elizabeth's family tree includes her husband James, their two children, and five grandchildren.
                  </p>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="flex justify-center">
                      <div className="text-center mx-2">
                        <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center mx-auto">
                          <span className="text-rose-800">James</span>
                        </div>
                        <p className="mt-2 text-sm">Husband</p>
                      </div>
                      <div className="text-center mx-2">
                        <div className="w-20 h-20 rounded-full bg-rose-200 flex items-center justify-center mx-auto">
                          <span className="text-rose-800">Elizabeth</span>
                        </div>
                        <p className="mt-2 text-sm">1938-2023</p>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-gray-300 mx-auto my-2"></div>
                    <div className="flex justify-center space-x-12">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                          <span className="text-blue-800">Michael</span>
                        </div>
                        <p className="mt-2 text-sm">Son</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto">
                          <span className="text-pink-800">Sarah</span>
                        </div>
                        <p className="mt-2 text-sm">Daughter</p>
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
