"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoUploader } from "@/components/video-uploader"
import { SimpleVideoPlayer } from "@/components/simple-video-player"
import { ArrowLeft, Trash2, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Video {
  id: string
  url: string
  caption: string
  display_order: number
  created_at: string
}

export default function ManageVideosPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [memorial, setMemorial] = useState<any>(null)

  const memorialId = params.id as string

  // Load memorial and videos
  useEffect(() => {
    loadMemorialData()
  }, [memorialId])

  const loadMemorialData = async () => {
    try {
      setLoading(true)

      // For sample memorial, use mock data
      if (memorialId.startsWith("sample-")) {
        setMemorial({
          id: memorialId,
          name: "Robert James Anderson",
        })
        setVideos([
          {
            id: "v1",
            url: "/videos/revolutionizing-remembrance-qr.mov",
            caption: "Robert sharing stories about his woodworking passion, 2020",
            display_order: 1,
            created_at: "2022-01-01T00:00:00Z",
          },
        ])
        setLoading(false)
        return
      }

      // For real memorials, fetch from API
      const response = await fetch(`/api/memorials/${memorialId}`)
      if (response.ok) {
        const data = await response.json()
        setMemorial(data.memorial)

        // Fetch videos
        const videosResponse = await fetch(`/api/memorials/${memorialId}/videos`)
        if (videosResponse.ok) {
          const videosData = await videosResponse.json()
          setVideos(videosData.videos || [])
        }
      }
    } catch (error) {
      console.error("Error loading memorial data:", error)
      toast({
        title: "Error",
        description: "Failed to load memorial data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVideoUpload = async () => {
    // Refresh the videos list after upload
    await loadMemorialData()
    toast({
      title: "Success",
      description: "Video uploaded successfully",
    })
  }

  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm("Are you sure you want to delete this video?")) {
      return
    }

    try {
      const response = await fetch(`/api/delete-media/${videoId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setVideos(videos.filter((v) => v.id !== videoId))
        toast({
          title: "Success",
          description: "Video deleted successfully",
        })
      } else {
        throw new Error("Failed to delete video")
      }
    } catch (error) {
      console.error("Error deleting video:", error)
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-blue mx-auto mb-4"></div>
          <p>Loading memorial videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push(`/memorial/${memorialId}`)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Memorial
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Manage Videos - {memorial?.name}</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage videos for this memorial. Videos help preserve precious memories and allow visitors to
            hear and see your loved one.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upload New Video</CardTitle>
                <CardDescription>
                  Add videos to share memories and stories. Supported formats: MP4, MOV, AVI (max 100MB each)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoUploader onVideoSelected={handleVideoUpload} />
              </CardContent>
            </Card>
          </div>

          {/* Current Videos */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Current Videos ({videos.length})</CardTitle>
                <CardDescription>Manage existing videos for this memorial</CardDescription>
              </CardHeader>
              <CardContent>
                {videos.length > 0 ? (
                  <div className="space-y-6">
                    {videos.map((video) => (
                      <div key={video.id} className="border rounded-lg p-4">
                        <div className="aspect-video mb-4">
                          <SimpleVideoPlayer src={video.url} title={video.caption} poster={memorial?.cover_image_url} />
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{video.caption}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Uploaded on {new Date(video.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteVideo(video.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No videos uploaded yet.</p>
                    <p className="text-sm text-gray-400 mt-1">Upload your first video using the form on the left.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
