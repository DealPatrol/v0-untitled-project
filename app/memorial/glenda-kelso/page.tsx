"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Share2,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  MessageCircle,
  BookOpen,
  Camera,
  Video,
  Music,
  Upload,
  Play,
  Pause,
  User,
  Clock,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const memorialUrl = typeof window !== "undefined" ? `${window.location.origin}/memorial/glenda-jane-kelso` : ""

// Mock data for interactive features
const mockComments = [
  {
    id: 1,
    author: "Sarah Johnson",
    content:
      "Glenda was such a wonderful woman. She always had a smile and kind words for everyone. I'll miss our conversations at the grocery store.",
    timestamp: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    author: "Michael Chen",
    content:
      "Mrs. Kelso was like a second mother to me growing up. She made the best chocolate chip cookies and always made sure we kids felt welcome in her home.",
    timestamp: "1 day ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    author: "Lisa Rodriguez",
    content:
      "I worked with Glenda at the hospital for 15 years. Her dedication to her patients was inspiring. She truly made a difference in so many lives.",
    timestamp: "3 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const mockStories = [
  {
    id: 1,
    title: "The Garden That Brought Us Together",
    author: "David Kelso",
    content:
      "Mom's garden was her pride and joy. Every spring, she would spend hours planning what to plant where. She taught me that gardening wasn't just about growing plants - it was about nurturing life and creating beauty. Even in her final days, she would ask about her roses and whether I was watering them properly. That garden now serves as a living memorial to her love and care.",
    timestamp: "1 day ago",
  },
  {
    id: 2,
    title: "Sunday Dinners and Life Lessons",
    author: "Jennifer Martinez",
    content:
      "Every Sunday for twenty years, Glenda opened her home to anyone who needed a meal and company. She would cook for hours, making sure there was enough food for whoever might show up. These dinners weren't just about the food - they were about community, love, and belonging. She taught us that a table shared is love multiplied.",
    timestamp: "2 days ago",
  },
]

const mockMedia = [
  {
    id: 1,
    type: "photo",
    url: "/glenda-memorial-portrait.jpeg",
    caption: "Glenda's official memorial portrait",
    uploadedBy: "Family",
  },
  {
    id: 2,
    type: "photo",
    url: "/glenda-garden-couple.jpeg",
    caption: "Glenda and Robert in their beloved garden",
    uploadedBy: "David Kelso",
  },
  {
    id: 3,
    type: "video",
    url: "/placeholder-video.mp4",
    caption: "Glenda's 80th birthday celebration",
    uploadedBy: "Sarah Johnson",
    thumbnail: "/glenda-christmas-daughter.jpeg",
  },
  {
    id: 4,
    type: "audio",
    url: "/placeholder-audio.mp3",
    caption: "Glenda singing her favorite hymn",
    uploadedBy: "Michael Chen",
  },
]

export default function GlendaKelsoMemorial() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [newStoryTitle, setNewStoryTitle] = useState("")
  const [newStoryContent, setNewStoryContent] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [playingAudio, setPlayingAudio] = useState<number | null>(null)
  const [comments, setComments] = useState(mockComments)
  const [stories, setStories] = useState(mockStories)
  const [media, setMedia] = useState(mockMedia)
  const { toast } = useToast()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSignedIn(true)
    setShowSignIn(false)
    toast({
      title: "Welcome!",
      description: "You're now signed in and can contribute to this memorial.",
    })
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      author: "You",
      content: newComment,
      timestamp: "Just now",
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setComments([comment, ...comments])
    setNewComment("")
    toast({
      title: "Comment added",
      description: "Your comment has been shared with the memorial.",
    })
  }

  const handleAddStory = () => {
    if (!newStoryTitle.trim() || !newStoryContent.trim()) return

    const story = {
      id: stories.length + 1,
      title: newStoryTitle,
      author: "You",
      content: newStoryContent,
      timestamp: "Just now",
    }

    setStories([story, ...stories])
    setNewStoryTitle("")
    setNewStoryContent("")
    toast({
      title: "Story shared",
      description: "Your story has been added to the memorial.",
    })
  }

  const handleFileUpload = (type: string) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          toast({
            title: "Upload complete",
            description: `Your ${type} has been added to the memorial.`,
          })
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Glenda Kelso Memorial",
        text: "View this beautiful memorial tribute",
        url: window.location.href,
      })
    } catch (err) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Memorial link has been copied to your clipboard.",
      })
    }
  }

  const handleDownloadQR = () => {
    // Create a canvas element to generate QR code
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 200
    canvas.height = 200

    // Simple QR code placeholder (in real app, use QR library)
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, 200, 200)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(10, 10, 180, 180)

    // Add some QR-like patterns
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillStyle = "#000000"
          ctx.fillRect(20 + i * 16, 20 + j * 16, 16, 16)
        }
      }
    }

    // Download the image
    const link = document.createElement("a")
    link.download = "glenda-kelso-memorial-qr.png"
    link.href = canvas.toDataURL()
    link.click()

    toast({
      title: "QR Code downloaded",
      description: "The memorial QR code has been saved to your device.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-serif italic text-gray-900">Memorial QR</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" onClick={handleDownloadQR}>
                <Download className="w-4 h-4 mr-2" />
                QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Memorial Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <img
              src="/glenda-memorial-portrait.jpeg"
              alt="Glenda Kelso"
              className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg border-4 border-white"
            />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">Glenda Mae Kelso</h1>
          <p className="text-xl text-gray-600 mb-4">March 15, 1943 - November 28, 2024</p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Beloved mother, grandmother, and friend to all who knew her. Glenda's legacy of love, kindness, and service
            will live on in the hearts of many.
          </p>

          {/* Memorial Stats */}
          <div className="flex justify-center space-x-8 mt-8 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">1,247</div>
              <div className="text-sm text-gray-600">Visitors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{media.length}</div>
              <div className="text-sm text-gray-600">Photos & Videos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{stories.length}</div>
              <div className="text-sm text-gray-600">Stories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{comments.length}</div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
          </div>
        </div>

        {/* Interactive Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Share Your Memories</h2>
            {!isSignedIn && (
              <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <User className="w-4 h-4 mr-2" />
                    Sign In to Contribute
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign In to Memorial</DialogTitle>
                    <DialogDescription>
                      Sign in to leave comments, share stories, and upload media to this memorial.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Your full name" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            {isSignedIn && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <User className="w-3 h-3 mr-1" />
                Signed in as You
              </Badge>
            )}
          </div>

          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comments" className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Comments</span>
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Stories</span>
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center space-x-2">
                <Camera className="w-4 h-4" />
                <span>Media</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="space-y-6">
              {isSignedIn && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Leave a Comment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Share a memory or leave a message..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={comment.avatar || "/placeholder.svg"}
                          alt={comment.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-6">
              {isSignedIn && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Share a Story</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="story-title">Story Title</Label>
                      <Input
                        id="story-title"
                        placeholder="Give your story a title..."
                        value={newStoryTitle}
                        onChange={(e) => setNewStoryTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="story-content">Your Story</Label>
                      <Textarea
                        id="story-content"
                        placeholder="Tell us about a special memory with Glenda..."
                        value={newStoryContent}
                        onChange={(e) => setNewStoryContent(e.target.value)}
                        rows={5}
                      />
                    </div>
                    <Button onClick={handleAddStory} disabled={!newStoryTitle.trim() || !newStoryContent.trim()}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Share Story
                    </Button>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-6">
                {stories.map((story) => (
                  <Card key={story.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">{story.title}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <span>By {story.author}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {story.timestamp}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{story.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {media.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      {item.type === "photo" && (
                        <div className="space-y-3">
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.caption}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <ImageIcon className="w-4 h-4" />
                            <span>Photo</span>
                          </div>
                        </div>
                      )}

                      {item.type === "video" && (
                        <div className="space-y-3">
                          <div className="relative">
                            <img
                              src={item.thumbnail || "/placeholder.svg"}
                              alt={item.caption}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button size="sm" className="rounded-full">
                                <Play className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Video className="w-4 h-4" />
                            <span>Video</span>
                          </div>
                        </div>
                      )}

                      {item.type === "audio" && (
                        <div className="space-y-3">
                          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                            <Button
                              variant="outline"
                              onClick={() => setPlayingAudio(playingAudio === item.id ? null : item.id)}
                            >
                              {playingAudio === item.id ? (
                                <Pause className="w-4 h-4 mr-2" />
                              ) : (
                                <Play className="w-4 h-4 mr-2" />
                              )}
                              {playingAudio === item.id ? "Pause" : "Play"}
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Music className="w-4 h-4" />
                            <span>Audio</span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-sm font-medium">{item.caption}</p>
                        <p className="text-xs text-gray-500">Uploaded by {item.uploadedBy}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              {!isSignedIn ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Sign In to Upload</h3>
                    <p className="text-gray-600 mb-4">
                      Please sign in to upload photos, videos, and audio files to this memorial.
                    </p>
                    <Button onClick={() => setShowSignIn(true)}>Sign In</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Camera className="w-5 h-5" />
                        <span>Upload Photos</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-4">Drag and drop photos here, or click to select</p>
                        <Button variant="outline" onClick={() => handleFileUpload("photo")} disabled={isUploading}>
                          Select Photos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Video className="w-5 h-5" />
                        <span>Upload Videos</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-4">Drag and drop videos here, or click to select</p>
                        <Button variant="outline" onClick={() => handleFileUpload("video")} disabled={isUploading}>
                          Select Videos
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Music className="w-5 h-5" />
                        <span>Upload Audio</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-4">Drag and drop audio files here, or click to select</p>
                        <Button variant="outline" onClick={() => handleFileUpload("audio")} disabled={isUploading}>
                          Select Audio
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {isUploading && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Uploading...</span>
                        <span className="text-sm text-gray-500">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Biography Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Life Story</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Glenda Mae Kelso was born on March 15, 1943, in a small farming community in rural Kansas. She was the
                  eldest of four children born to Harold and Desmer McAnnally, who instilled in her the values of hard
                  work, compassion, and service to others that would define her entire life.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  After graduating from high school as valedictorian, Glenda pursued her dream of becoming a nurse. She
                  earned her nursing degree from the University of Kansas in 1965 and immediately began working at the
                  local hospital, where she would dedicate over 40 years of her life to caring for others.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  In 1967, Glenda married the love of her life, Robert Kelso, whom she met at a church social. Their
                  marriage was blessed with two wonderful children: David in 1969 and Jennifer in 1972. Glenda balanced
                  her demanding career with being a devoted wife and mother, always putting her family's needs first
                  while never losing sight of her calling to heal and comfort others.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Throughout her nursing career, Glenda touched countless lives with her gentle care and unwavering
                  dedication. She specialized in pediatric nursing, finding joy in helping children and comforting
                  worried parents. Her colleagues often remarked that she had a special gift for making even the most
                  frightened child feel safe and loved.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond her professional life, Glenda was deeply involved in her community. She volunteered at the
                  local food bank, organized charity drives for underprivileged families, and served as a Sunday school
                  teacher for over 30 years. Her home was always open to anyone in need, and her famous Sunday dinners
                  became legendary in the neighborhood.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Glenda's greatest joy came from her role as grandmother to five beautiful grandchildren: Michael,
                  Sarah, Emma, Lucas, and baby Sophia. She spoiled them with homemade cookies, bedtime stories, and
                  unconditional love. Her garden became their playground, and she taught each of them the joy of growing
                  things and nurturing life.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  After a courageous battle with illness, Glenda peacefully passed away on November 28, 2024, surrounded
                  by her loving family. Her legacy lives on in the countless lives she touched, the family she raised
                  with such love, and the community she served so faithfully. She is now reunited with her beloved
                  husband Robert and her dear mother, Desmer McAnnally, in Heaven.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Service Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Service Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Visitation</h4>
                  <p className="text-gray-600">December 2, 2024</p>
                  <p className="text-gray-600">2:00 PM - 6:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Funeral Service</h4>
                  <p className="text-gray-600">December 3, 2024</p>
                  <p className="text-gray-600">10:00 AM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">Peaceful Rest Funeral Home</p>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    123 Memorial Drive, Hometown, KS
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Contact</h4>
                  <p className="text-gray-600 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    (555) 123-4567
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    info@peacefulrest.com
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Family Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>Family</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Preceded in Death</h4>
                  <p className="text-gray-600">Husband: Robert Kelso</p>
                  <p className="text-gray-600">Mother: Desmer McAnnally</p>
                  <p className="text-gray-600">Father: Harold McAnnally</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Survived By</h4>
                  <p className="text-gray-600">Son: David Kelso</p>
                  <p className="text-gray-600">Daughter: Jennifer Martinez</p>
                  <p className="text-gray-600">Grandchildren: Michael, Sarah, Emma, Lucas, and Sophia</p>
                  <p className="text-gray-600">Siblings: Mary, John, and Patricia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Photo Gallery */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-purple-500" />
              <span>Photo Gallery</span>
            </CardTitle>
            <CardDescription>Celebrating the beautiful moments of Glenda's life</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <img
                  src="/glenda-memorial-portrait.jpeg"
                  alt="Glenda's memorial portrait"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Memorial Portrait</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-garden-couple.jpeg"
                  alt="Glenda and Robert in their garden"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">With Robert in their beloved garden</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-christmas-daughter.jpeg"
                  alt="Glenda with her daughter at Christmas"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Christmas with Jennifer</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-hospital-visit.jpeg"
                  alt="Glenda at the hospital"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Dedicated nurse at work</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-family-baseball.jpeg"
                  alt="Family baseball game"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Family baseball game</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-restaurant-couple.jpeg"
                  alt="Glenda and Robert at dinner"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Anniversary dinner</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-hospital-bedside.jpeg"
                  alt="Glenda caring for patients"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Caring for her patients</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-beach-walk.jpeg"
                  alt="Glenda walking on the beach"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Peaceful beach walk</p>
              </div>
              <div className="space-y-2">
                <img
                  src="/glenda-hospital-final.jpeg"
                  alt="Glenda's final days"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 text-center">Surrounded by love</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memorial Actions */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700">
              <Share2 className="w-4 h-4 mr-2" />
              Share Memorial
            </Button>
            <Button variant="outline" onClick={handleDownloadQR}>
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
            <Link href="/">
              <Button variant="outline">Create Your Own Memorial</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
