"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  MessageCircle,
  BookOpen,
  Camera,
  Video,
  Music,
  Upload,
  User,
  Clock,
  Star,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  avatar?: string
}

interface Story {
  id: string
  author: string
  title: string
  content: string
  timestamp: string
  avatar?: string
}

interface MediaItem {
  id: string
  type: "photo" | "video" | "audio"
  url: string
  title: string
  uploadedBy: string
  timestamp: string
}

export default function GlendaKelsoMemorial() {
  const { toast } = useToast()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [signInOpen, setSignInOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  // Mock data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Mitchell",
      content:
        "Grandma Glenda was such a wonderful woman. She always had the best stories and made everyone feel so welcome in her home. I'll never forget her famous apple pie!",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      author: "Michael Johnson",
      content:
        "I remember when Glenda helped me through a difficult time in my life. Her wisdom and kindness meant everything to me. She will be deeply missed.",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      author: "Emily Rodriguez",
      content:
        "What a beautiful soul. Glenda's laugh could light up any room. Thank you for sharing these precious memories with us.",
      timestamp: "3 days ago",
    },
  ])

  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      author: "David Kelso",
      title: "Mom's Famous Sunday Dinners",
      content:
        "Every Sunday, without fail, Mom would prepare the most incredible feast for our family. The smell of her roast beef and homemade rolls would fill the entire house. She'd spend hours in the kitchen, humming her favorite hymns, making sure everything was perfect. Those Sunday dinners weren't just about the food - they were about bringing our family together, sharing stories, and creating memories that would last a lifetime. Even when we all moved away, we'd still come back for Mom's Sunday dinners. It was our tradition, our anchor, our way of staying connected.",
      timestamp: "1 week ago",
    },
    {
      id: "2",
      author: "Lisa Thompson",
      title: "The Garden Teacher",
      content:
        "Aunt Glenda taught me everything I know about gardening. I was just seven years old when she first handed me a packet of sunflower seeds and said, 'These will grow as tall as you someday.' She was right - by the end of that summer, those sunflowers towered over me, and I was hooked. She showed me how to prepare the soil, when to water, and most importantly, how to be patient. 'Gardens teach us about life,' she'd say. 'Sometimes you plant seeds and wait, and sometimes you're surprised by what grows.' Her garden was always the most beautiful on the block, but more than that, it was a place of learning, love, and endless conversations.",
      timestamp: "2 weeks ago",
    },
  ])

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      type: "photo",
      url: "/glenda-memorial-portrait.jpeg",
      title: "Glenda's Portrait",
      uploadedBy: "Family",
      timestamp: "1 month ago",
    },
    {
      id: "2",
      type: "photo",
      url: "/glenda-garden-couple.jpeg",
      title: "In the Garden",
      uploadedBy: "David Kelso",
      timestamp: "3 weeks ago",
    },
    {
      id: "3",
      type: "photo",
      url: "/glenda-christmas-daughter.jpeg",
      title: "Christmas Morning",
      uploadedBy: "Sarah Mitchell",
      timestamp: "2 weeks ago",
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [newStoryTitle, setNewStoryTitle] = useState("")
  const [newStoryContent, setNewStoryContent] = useState("")

  const handleSignIn = () => {
    if (userName && userEmail) {
      setIsSignedIn(true)
      setSignInOpen(false)
      toast({
        title: "Welcome!",
        description: `You're now signed in as ${userName}. You can leave comments, share stories, and upload media.`,
      })
    }
  }

  const handleAddComment = () => {
    if (newComment.trim() && isSignedIn) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: userName,
        content: newComment,
        timestamp: "Just now",
      }
      setComments([comment, ...comments])
      setNewComment("")
      toast({
        title: "Comment Added",
        description: "Your comment has been shared with the family.",
      })
    }
  }

  const handleAddStory = () => {
    if (newStoryTitle.trim() && newStoryContent.trim() && isSignedIn) {
      const story: Story = {
        id: Date.now().toString(),
        author: userName,
        title: newStoryTitle,
        content: newStoryContent,
        timestamp: "Just now",
      }
      setStories([story, ...stories])
      setNewStoryTitle("")
      setNewStoryContent("")
      toast({
        title: "Story Shared",
        description: "Thank you for sharing your memory of Glenda.",
      })
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "photo" | "video" | "audio") => {
    const file = event.target.files?.[0]
    if (file && isSignedIn) {
      setIsUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)

            const mediaItem: MediaItem = {
              id: Date.now().toString(),
              type,
              url: URL.createObjectURL(file),
              title: file.name,
              uploadedBy: userName,
              timestamp: "Just now",
            }
            setMediaItems([mediaItem, ...mediaItems])

            toast({
              title: "Upload Complete",
              description: `Your ${type} has been added to the memorial.`,
            })

            return 0
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const stats = {
    visitors: 1247,
    photos: mediaItems.filter((item) => item.type === "photo").length,
    stories: stories.length,
    comments: comments.length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>

            <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
              <DialogTrigger asChild>
                <Button variant={isSignedIn ? "outline" : "default"} className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {isSignedIn ? `Signed in as ${userName}` : "Sign In to Contribute"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In to Leave Tributes</DialogTitle>
                  <DialogDescription>
                    Share your memories, photos, and stories to honor Glenda's legacy.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  <Button onClick={handleSignIn} className="w-full">
                    Sign In
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <Image
            src="/glenda-memorial-portrait.jpeg"
            alt="Glenda Jane Kelso"
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative -mt-16">
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <Image
                    src="/glenda-memorial-portrait.jpeg"
                    alt="Glenda Jane Kelso"
                    width={200}
                    height={200}
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>

                <div className="text-center md:text-left flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Glenda Jane Kelso</h1>
                  <p className="text-xl text-gray-600 mb-4">March 15, 1943 - December 28, 2023</p>
                  <p className="text-lg text-gray-700 mb-6">
                    Beloved mother, grandmother, and friend. A woman of faith, kindness, and endless stories.
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Nashville, Tennessee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>80 years of beautiful life</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Survived by 3 children, 8 grandchildren</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.visitors}</div>
              <div className="text-sm text-gray-600">Visitors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.photos}</div>
              <div className="text-sm text-gray-600">Photos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.stories}</div>
              <div className="text-sm text-gray-600">Stories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.comments}</div>
              <div className="text-sm text-gray-600">Comments</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <Tabs defaultValue="biography" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="biography">Biography</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="our-story">Our Story</TabsTrigger>
          </TabsList>

          <TabsContent value="biography">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Life Story
                </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  Glenda Jane Kelso was born on March 15, 1943, in Nashville, Tennessee, to loving parents who instilled
                  in her the values of faith, family, and service to others. From an early age, Glenda showed a natural
                  gift for storytelling and bringing people together.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  She met the love of her life, Robert Kelso, at a church social in 1962. They married two years later
                  and built a beautiful life together, raising three wonderful children: David, Susan, and Michael.
                  Glenda was the heart of their home, creating a warm and welcoming environment where everyone felt
                  loved and valued.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  As a devoted mother and later grandmother, Glenda's greatest joy came from her family. She was known
                  for her incredible Sunday dinners, her beautiful garden, and most of all, her amazing ability to tell
                  stories that would captivate audiences of all ages. Her grandchildren especially loved gathering
                  around her to hear tales of her childhood and the wisdom she had gained throughout her life.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Glenda was an active member of First Baptist Church for over 50 years, where she served in various
                  ministries and touched countless lives with her kindness and compassion. She volunteered at the local
                  hospital, helped organize community events, and was always the first to offer help to anyone in need.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  In her final years, even as her health declined, Glenda's spirit remained strong. She continued to
                  share her stories, offer her wisdom, and show love to everyone around her. She was preceded in death
                  by her beloved husband Robert and her dear mother, Desmer McAnnally.
                </p>

                <p className="text-lg leading-relaxed">
                  Glenda passed away peacefully on December 28, 2023, surrounded by her loving family. While we mourn
                  her loss, we celebrate the incredible legacy she leaves behind. She is now reunited with her beloved
                  Robert and her mama, Desmer McAnnally, in Heaven, where we know she's sharing her wonderful stories
                  with the angels.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-blue-500" />
                  Photo Gallery
                </CardTitle>
                <CardDescription>Precious moments and memories captured in time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { src: "/glenda-memorial-portrait.jpeg", title: "Beautiful Portrait" },
                    { src: "/glenda-garden-couple.jpeg", title: "In the Garden with Robert" },
                    { src: "/glenda-christmas-daughter.jpeg", title: "Christmas Morning Joy" },
                    { src: "/glenda-hospital-visit.jpeg", title: "Hospital Visit with Family" },
                    { src: "/glenda-family-baseball.jpeg", title: "Family Baseball Game" },
                    { src: "/glenda-restaurant-couple.jpeg", title: "Date Night with Robert" },
                  ].map((photo, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg">
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.title}
                        width={400}
                        height={300}
                        className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-medium">{photo.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  Comments & Tributes
                </CardTitle>
                <CardDescription>Share your memories and thoughts about Glenda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isSignedIn ? (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Share a memory or leave a tribute..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Sign in to leave a comment or tribute</p>
                    <Button onClick={() => setSignInOpen(true)}>Sign In to Comment</Button>
                  </div>
                )}

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Stories & Memories
                </CardTitle>
                <CardDescription>Share longer stories and cherished memories of Glenda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isSignedIn ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="Story title..."
                      value={newStoryTitle}
                      onChange={(e) => setNewStoryTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Share your story or memory of Glenda..."
                      value={newStoryContent}
                      onChange={(e) => setNewStoryContent(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <Button onClick={handleAddStory} disabled={!newStoryTitle.trim() || !newStoryContent.trim()}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Share Story
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Sign in to share your stories and memories</p>
                    <Button onClick={() => setSignInOpen(true)}>Sign In to Share Story</Button>
                  </div>
                )}

                <div className="space-y-6">
                  {stories.map((story) => (
                    <div key={story.id} className="bg-white border rounded-lg p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{story.author}</span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {story.timestamp}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{story.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{story.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-orange-500" />
                  Media Gallery
                </CardTitle>
                <CardDescription>Upload and view photos, videos, and audio memories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isSignedIn ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Photos</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "photo")}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload">
                        <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                          Choose Photos
                        </Button>
                      </label>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Videos</p>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, "video")}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload">
                        <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                          Choose Videos
                        </Button>
                      </label>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload Audio</p>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => handleFileUpload(e, "audio")}
                        className="hidden"
                        id="audio-upload"
                      />
                      <label htmlFor="audio-upload">
                        <Button variant="outline" size="sm" className="cursor-pointer bg-transparent">
                          Choose Audio
                        </Button>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Sign in to upload photos, videos, and audio</p>
                    <Button onClick={() => setSignInOpen(true)}>Sign In to Upload</Button>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaItems.map((item) => (
                    <div key={item.id} className="bg-white border rounded-lg overflow-hidden">
                      {item.type === "photo" && (
                        <Image
                          src={item.url || "/placeholder.svg"}
                          alt={item.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      )}
                      {item.type === "video" && (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      {item.type === "audio" && (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                          <Music className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="font-medium text-sm truncate">{item.title}</p>
                        <p className="text-xs text-gray-500">
                          By {item.uploadedBy} • {item.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="our-story">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Our Story
                </CardTitle>
                <CardDescription>The reason behind Memorial Star QR</CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">The Reason I Started This</h2>
                  <p className="text-lg text-gray-700 mb-4">Hey, I'm Cole Collins.</p>
                  <p className="text-lg text-gray-700 mb-6">I built Memorial Star QR for my grandma, Glenda Kelso.</p>
                </div>

                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    My grandma was the best storyteller I've ever known. It was her superpower. She didn't just tell
                    stories; she made you feel like you were right there with her. Whether she was making everyone laugh
                    at a family dinner or offering a piece of gentle wisdom, she knew the perfect story for every
                    moment. That's how she showed her love.
                  </p>

                  <p>
                    When she passed away, that's what I missed the most—the stories. The quiet was really hard. At her
                    funeral, we all shared our favorite memories of her, and it was so comforting. But afterwards, I
                    kept thinking, "What about next year? Or in ten years? What if someone wants to hear her story but
                    doesn't know who to ask?"
                  </p>

                  <p className="font-semibold text-gray-900">I couldn't stand the idea of her stories fading away.</p>

                  <p>
                    So, I decided to build her a permanent home online. A place that would always be there, day or
                    night, for anyone who loved her. A place to hear her laugh, see her smile, and remember the
                    incredible person she was.
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
                    <p className="text-blue-800 font-medium">
                      You can see what I made for her here:{" "}
                      <Link href="/memorial/glenda-kelso" className="underline hover:text-blue-600">
                        Glenda's Memorial Page
                      </Link>
                    </p>
                  </div>

                  <p>
                    We even put a QR code on her headstone. Now, when my family visits, we can scan it with our phones
                    and immediately be surrounded by her memories. It's like she's right there with us, telling her
                    stories all over again.
                  </p>

                  <p>
                    Creating this for her changed everything for me. It turned my grief into something meaningful. I
                    realized that if this helped my family so much, it could help others, too.
                  </p>

                  <p className="font-semibold text-gray-900">
                    That's the real heart behind this business. It's not about the tech or the QR codes—it's about
                    making sure the people we love are never forgotten. It's about honoring legacies, just like my
                    grandma's.
                  </p>

                  <p>I'm so proud to get to help other families keep their loved ones' stories alive.</p>

                  <div className="bg-gray-50 rounded-lg p-6 mt-8">
                    <p className="text-gray-700 mb-2">Thanks for listening,</p>
                    <p className="font-bold text-gray-900 text-xl">Cole Collins</p>
                    <p className="text-gray-600">Founder, Memorial Star QR & Glenda's Grandson</p>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-6 py-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-yellow-800 font-medium">Built with love for Grandma Glenda</span>
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
