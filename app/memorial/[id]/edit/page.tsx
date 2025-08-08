import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft, Save, Eye } from "lucide-react"

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

    return { memorial }
  } catch (error) {
    console.error("Error in getMemorialData:", error)
    return { error: "An unexpected error occurred" }
  }
}

export default async function EditMemorialPage({ params }: { params: { id: string } }) {
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

  const { memorial } = result

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href={`/memorial/${memorialId}`} className="mr-4">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Memorial
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Memorial</h1>
              <p className="text-gray-600 mt-1">Update information for {memorial.name}</p>
            </div>
          </div>
          <Link href={`/memorial/${memorialId}`}>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </Link>
        </div>

        <form action={`/api/memorials/${memorialId}/update`} method="POST" className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the basic details about your loved one</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" defaultValue={memorial.name} placeholder="Enter full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    defaultValue={memorial.gender || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="neutral">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birth_date">Date of Birth</Label>
                  <Input
                    id="birth_date"
                    name="birth_date"
                    defaultValue={memorial.birth_date || ""}
                    placeholder="e.g., March 15, 1945"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="death_date">Date of Death</Label>
                  <Input
                    id="death_date"
                    name="death_date"
                    defaultValue={memorial.death_date || ""}
                    placeholder="e.g., January 8, 2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birth_location">Place of Birth</Label>
                  <Input
                    id="birth_location"
                    name="birth_location"
                    defaultValue={memorial.birth_location || ""}
                    placeholder="City, State, Country"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="death_location">Place of Death</Label>
                  <Input
                    id="death_location"
                    name="death_location"
                    defaultValue={memorial.death_location || ""}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Biography */}
          <Card>
            <CardHeader>
              <CardTitle>Life Story</CardTitle>
              <CardDescription>Share the story of your loved one's life</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  defaultValue={memorial.bio || ""}
                  placeholder="Write about your loved one's life, achievements, passions, and the legacy they left behind..."
                  rows={8}
                  className="min-h-[200px]"
                />
                <p className="text-sm text-gray-500">
                  Include personal stories, quotes, or memories that capture their personality and spirit.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links to Media Management */}
          <Card>
            <CardHeader>
              <CardTitle>Photos & Videos</CardTitle>
              <CardDescription>Manage the visual memories for this memorial</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/memorial/${memorialId}/manage-images`}>
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <span className="font-medium">Manage Photos</span>
                    <span className="text-sm text-gray-500">Upload, edit, and organize images</span>
                  </Button>
                </Link>
                <Link href={`/memorial/${memorialId}/manage-videos`}>
                  <Button variant="outline" className="w-full h-20 flex flex-col bg-transparent">
                    <span className="font-medium">Manage Videos</span>
                    <span className="text-sm text-gray-500">Upload and organize video memories</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-between items-center pt-6">
            <Link href={`/memorial/${memorialId}`}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-navy-blue hover:bg-navy-blue/90 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
