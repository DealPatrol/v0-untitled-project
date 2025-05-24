import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { MemorialImageUploader } from "@/components/memorial-image-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PersonImage } from "@/components/person-image"
import { ArrowLeft, Trash2 } from "lucide-react"

async function getMemorialData(memorialId: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Not authenticated" }
    }

    // Fetch the memorial
    const { data: memorial, error: memorialError } = await supabase
      .from("memorials")
      .select("*")
      .eq("id", memorialId)
      .eq("user_id", user.id)
      .single()

    if (memorialError) {
      console.error("Error fetching memorial:", memorialError)
      return { error: "Failed to fetch memorial" }
    }

    if (!memorial) {
      return { error: "Memorial not found or you don't have permission" }
    }

    // Fetch related media
    const { data: media, error: mediaError } = await supabase
      .from("media")
      .select("*")
      .eq("memorial_id", memorialId)
      .order("display_order", { ascending: true })

    if (mediaError) {
      console.error("Error fetching media:", mediaError)
      return { error: "Failed to fetch media" }
    }

    return { memorial, media: media || [] }
  } catch (error) {
    console.error("Error in getMemorialData:", error)
    return { error: "An unexpected error occurred" }
  }
}

export default async function ManageMemorialImagesPage({ params }: { params: { id: string } }) {
  const memorialId = params.id
  const result = await getMemorialData(memorialId)

  if (result.error) {
    if (result.error === "Memorial not found or you don't have permission") {
      notFound()
    }
    return (
      <div className="container max-w-4xl py-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{result.error}</p>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { memorial, media } = result

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-6">
        <Link href={`/memorial/${memorialId}`} className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Memorial
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Manage Images for {memorial.name}</h1>
      </div>

      <div className="space-y-8">
        {/* Current images section */}
        <Card>
          <CardHeader>
            <CardTitle>Current Images</CardTitle>
            <CardDescription>
              These images are currently being used in the memorial. The first image is used as the profile picture.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {media.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {media.map((item, index) => (
                  <div key={item.id} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <PersonImage
                        name={item.caption || `Image ${index + 1}`}
                        customImageUrl={item.url}
                        className="w-full h-full object-cover"
                        alt={item.caption || `Memorial image ${index + 1}`}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <form action={`/api/delete-media/${item.id}`} method="POST">
                        <Button size="sm" variant="destructive" className="px-2">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </form>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 truncate text-center">
                      {item.caption || `Image ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">No images have been added to this memorial yet.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload new images section */}
        <MemorialImageUploader memorialId={memorialId} maxFiles={10} />

        <div className="pt-4">
          <Link href={`/memorial/${memorialId}`}>
            <Button variant="outline">Back to Memorial</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
