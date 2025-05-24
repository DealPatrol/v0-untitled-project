import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MemorialImageUploader } from "@/components/memorial-image-uploader"

export default function ManageMemorialPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Memorial</h1>
          <p className="text-gray-600">Robert James Anderson</p>
        </div>
        <Button asChild>
          <Link href="/memorial/sample-1">View Memorial</Link>
        </Button>
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Memorial Images</CardTitle>
              <CardDescription>
                Upload and manage images for this memorial. The first image will be used as the profile picture.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemorialImageUploader memorialId="sample-1" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Edit the basic information for this memorial.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Information editing coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stories & Memories</CardTitle>
              <CardDescription>Manage stories and memories shared on this memorial.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Story management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Family Tree</CardTitle>
              <CardDescription>Manage family members and relationships.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Family tree management coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
