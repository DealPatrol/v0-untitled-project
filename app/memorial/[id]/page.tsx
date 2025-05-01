import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import AddMemoryForm from "@/components/add-memory-form"
import { QRImage } from "@/components/qr-image"
import { FamilyTree } from "@/components/family-tree/family-tree"
import { format } from "date-fns"
import { MessageCircle, Users, ImageIcon, BookOpen } from "lucide-react"

// Helper function to get base URL that works in all environments
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://memorial-qr-website.vercel.app"
}

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerSupabaseClient()
  const { data: memorial } = await supabase.from("memorials").select("*").eq("id", params.id).single()

  if (!memorial) {
    return {
      title: "Memorial Not Found",
    }
  }

  return {
    title: `${memorial.name} | Memorial QR`,
    description: memorial.bio || `In loving memory of ${memorial.name}`,
  }
}

export default async function MemorialPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient()
  const baseUrl = getBaseUrl()

  // Get memorial data
  const { data: memorial, error: memorialError } = await supabase
    .from("memorials")
    .select("*")
    .eq("id", params.id)
    .single()

  if (memorialError || !memorial) {
    notFound()
  }

  // Get media for this memorial
  const { data: media } = await supabase
    .from("media")
    .select("*")
    .eq("memorial_id", params.id)
    .order("display_order", { ascending: true })

  // Get approved stories for this memorial
  const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .eq("memorial_id", params.id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false })

  // Get QR code for this memorial
  const { data: qrCode } = await supabase.from("qr_codes").select("*").eq("memorial_id", params.id).single()

  // Format dates for display
  const formattedBirthDate = memorial.birth_date ? format(new Date(memorial.birth_date), "MMMM d, yyyy") : null
  const formattedDeathDate = memorial.death_date ? format(new Date(memorial.death_date), "MMMM d, yyyy") : null
  const birthLocation = "Location information" // This would come from your database if available
  const deathLocation = "Location information" // This would come from your database if available

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Photo */}
      <div className="relative w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
        {memorial.cover_image_url ? (
          <Image
            src={memorial.cover_image_url || "/placeholder.svg"}
            alt={memorial.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="text-4xl text-gray-400 font-light">NO PHOTO</div>
        )}
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
            {media && media[0] ? (
              <Image
                src={media[0].url || "/placeholder.svg"}
                alt={memorial.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">Photo</span>
              </div>
            )}
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
            {media && media.length > 0 ? (
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
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No photos have been added yet.</p>
              </Card>
            )}
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family" className="space-y-6">
            <FamilyTree memorialId={params.id} />
          </TabsContent>

          {/* Guest Book Tab */}
          <TabsContent value="guestbook" className="space-y-6">
            <div className="text-center mb-6">
              <Button className="bg-navy-blue hover:bg-navy-blue/90 text-white">Submit Guestbook Entry</Button>
            </div>

            {stories && stories.length > 0 ? (
              <div className="space-y-6">
                {stories.map((story) => (
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

            <AddMemoryForm memorialId={params.id} />
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
