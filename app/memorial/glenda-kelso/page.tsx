"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  MessageCircle,
  Upload,
  BookOpen,
  Star,
  User,
  Camera,
  Video,
  Music,
  FileText,
  Send,
  Eye,
  ThumbsUp,
  Building,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GlendaKelsoMemorial() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [newStory, setNewStory] = useState("")
  const [storyTitle, setStoryTitle] = useState("")
  const { toast } = useToast()

  // Mock data for interactive features
  const [stats, setStats] = useState({
    views: 1247,
    comments: 23,
    stories: 8,
    photos: 15,
    videos: 3,
  })

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      date: "2 days ago",
      content:
        "Glenda was such a wonderful woman. She always had a smile and a kind word for everyone. I'll never forget her stories about her garden.",
      likes: 5,
    },
    {
      id: 2,
      author: "Michael Davis",
      date: "1 week ago",
      content:
        "I worked with Glenda at the hospital for 15 years. She was the most caring nurse I've ever known. Her patients loved her.",
      likes: 8,
    },
    {
      id: 3,
      author: "Jennifer Wilson",
      date: "2 weeks ago",
      content:
        "Aunt Glenda's Sunday dinners were legendary. She could make anyone feel like family. Missing her so much.",
      likes: 12,
    },
  ])

  const [stories, setStories] = useState([
    {
      id: 1,
      title: "The Garden That Brought Joy",
      author: "Robert Kelso",
      date: "1 week ago",
      content:
        "Every spring, Mom would spend hours planning her garden. She'd say 'A garden is hope planted in the ground.' Her roses were the talk of the neighborhood, but more than that, she'd give bouquets to anyone who needed cheering up. That garden wasn't just about flowers - it was about spreading love.",
      likes: 15,
    },
    {
      id: 2,
      title: "The Nurse Who Never Stopped Caring",
      author: "Dr. Patricia Mills",
      date: "2 weeks ago",
      content:
        "In 30 years of medicine, I never met a nurse like Glenda. She remembered every patient's name, their family members, their fears. She'd stay late to hold someone's hand or call to check on them at home. She didn't just treat patients - she loved them back to health.",
      likes: 22,
    },
  ])

  const handleSignIn = () => {
    setIsSignedIn(true)
    setShowSignIn(false)
    toast({
      title: "Welcome!",
      description: "You can now leave comments and share stories.",
    })
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      author: "You",
      date: "Just now",
      content: newComment,
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
    setStats((prev) => ({ ...prev, comments: prev.comments + 1 }))

    toast({
      title: "Comment Added",
      description: "Thank you for sharing your memory.",
    })
  }

  const handleAddStory = () => {
    if (!newStory.trim() || !storyTitle.trim()) return

    const story = {
      id: stories.length + 1,
      title: storyTitle,
      author: "You",
      date: "Just now",
      content: newStory,
      likes: 0,
    }

    setStories([story, ...stories])
    setNewStory("")
    setStoryTitle("")
    setStats((prev) => ({ ...prev, stories: prev.stories + 1 }))

    toast({
      title: "Story Added",
      description: "Your story has been shared with the memorial.",
    })
  }

  const handleMediaUpload = (type: string) => {
    toast({
      title: "Upload Started",
      description: `Your ${type} is being uploaded to the memorial.`,
    })

    // Simulate upload
    setTimeout(() => {
      setStats((prev) => ({
        ...prev,
        photos: type === "photo" ? prev.photos + 1 : prev.photos,
        videos: type === "video" ? prev.videos + 1 : prev.videos,
      }))

      toast({
        title: "Upload Complete",
        description: `Your ${type} has been added to the memorial.`,
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Memorial QR
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{stats.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{stats.comments} comments</span>
                </div>
              </div>

              {!isSignedIn ? (
                <Button onClick={() => setShowSignIn(true)} size="sm">
                  Sign In to Contribute
                </Button>
              ) : (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <User className="w-3 h-3 mr-1" />
                  Signed In
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src="/glenda-memorial-portrait.jpeg"
                alt="Glenda Kelso"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">Glenda Jane Kelso</h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg text-purple-100 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>March 15, 1945 - November 28, 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Beloved of Hanceville, Alabama</span>
              </div>
            </div>

            <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              A life so beautifully lived deserves to be beautifully remembered.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="biography" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
                <TabsTrigger value="biography" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Biography</span>
                </TabsTrigger>
                <TabsTrigger value="photos" className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span className="hidden sm:inline">Photos</span>
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Comments</span>
                </TabsTrigger>
                <TabsTrigger value="stories" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Stories</span>
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Media</span>
                </TabsTrigger>
                <TabsTrigger value="our-story" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span className="hidden sm:inline">Our Story</span>
                </TabsTrigger>
              </TabsList>

              {/* Biography Tab */}
              <TabsContent value="biography">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-red-500" />
                          In Loving Memory of Glenda Jane Kelso
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed mb-6">
                          A life so beautifully lived deserves to be beautifully remembered. Today, we gather not only
                          in sorrow but in profound gratitude for the extraordinary woman we were blessed to know—Glenda
                          Jane Kelso.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          Glenda was the heart of her home and a force of nature in the lives of all who knew her. She
                          left this world as she lived in it: on her own terms, with a quick wit, and likely planning a
                          joke we have yet to discover. For 57 years, she was the devoted and loving partner to her
                          husband, Lynn. She was a selfless homemaker who dedicated her life to her children, Eddie and
                          Penny, and to countless others she welcomed into her heart and home as her own.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          To know Glenda was to be loved fiercely, laugh loudly, and feel truly spoiled. She was a woman
                          of beautiful contrasts: patient and kind, yet tough as nails. Her fanatic sense of humor was a
                          light that could cut through the hardest days, and her legendary chocolate gravy was a taste
                          of her deep, abiding love. She never let anyone forget who was really in charge, but she also
                          never wavered in her loyalty, sticking by her family even when the world said no.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          Glenda found pure joy in the magic of the ordinary, especially when it brought smiles to the
                          faces of children. She delighted in dressing up for holidays, with Halloween holding a special
                          place in her heart, creating moments of wonder that will be cherished forever. Her happiness
                          was found in the noisy, loving chaos of being surrounded by family, though the steady chatter
                          of the police scanner was a close second.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          She was a curator of joy, a teller of hard truths, and the unwavering glue that held her
                          family together through good times and bad. Glenda's love was a vibrant tapestry woven with
                          threads of laughter, music, fierce protection, and an occasional, loving dose of stubbornness.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          We are certain that her reunion in Heaven with her beloved mother, Desmer, is filled with
                          laughter and a heavenly plan to keep a loving, watchful eye on us all.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          Glenda's incredible legacy lives on in her husband, Lynn; her children, Eddie Kelso and Penny
                          Collins; her cherished grandchildren, Cole Collins, Kristin Kelso, Gracie Dean, Braxton
                          Phillips, Weston Green, Addalynn Rassman, Wrenley Hunter, and Ridge Thompson; her beautiful
                          French daughter-in-love, Caroline; her god-sent angels, Colton, Anzlie, and Remi; her children
                          of the heart, Savannah (Bo) Pitts, Bama Thompson, Taylor (Kelly) Hunter, and Jordan Thompson;
                          and her special friends.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          We are fortunate, blessed, and endlessly grateful to have been loved by her. Though our hearts
                          are broken and we will miss her beyond measure, we find comfort in knowing that her spirit—her
                          laughter, her love, and her legendary chocolate gravy—will forever be a part of us.
                        </p>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          Rest easy, dear Glenda. Your work here was a masterpiece.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                          The family extends their deepest gratitude to the compassionate staff at Cullman Regional
                          Medical Center, Folsom Center Nursing Home, Cullman Dialysis Clinic, and Southern Care Hospice
                          for the dignity, kindness, and peace they provided in her final days.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-500" />
                          Family
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">Preceded in Death</h4>
                            <p className="text-gray-600">Desmer McAnnally (Mother)</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900">Survived By</h4>
                            <p className="text-gray-600">Lynn Kelso (Husband)</p>
                            <p className="text-gray-600">Eddie Kelso (Son)</p>
                            <p className="text-gray-600">Penny Collins (Daughter)</p>
                            <p className="text-gray-600">Cole Collins (Grandson)</p>
                            <p className="text-gray-600">Kristin Kelso (Granddaughter)</p>
                            <p className="text-gray-600">Gracie Dean (Granddaughter)</p>
                            <p className="text-gray-600">Braxton Phillips (Grandson)</p>
                            <p className="text-gray-600">Weston Green (Grandson)</p>
                            <p className="text-gray-600">Addalynn Rassman (Granddaughter)</p>
                            <p className="text-gray-600">Wrenley Hunter (Granddaughter)</p>
                            <p className="text-gray-600">Ridge Thompson (Grandson)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          Memorial Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Views</span>
                            <span className="font-semibold">{stats.views.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Comments</span>
                            <span className="font-semibold">{stats.comments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Stories Shared</span>
                            <span className="font-semibold">{stats.stories}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Photos</span>
                            <span className="font-semibold">{stats.photos}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Videos</span>
                            <span className="font-semibold">{stats.videos}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Photos Tab */}
              <TabsContent value="photos">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { src: "/glenda-memorial-portrait.jpeg", title: "Portrait", year: "2020" },
                    { src: "/glenda-garden-couple.jpeg", title: "In the Garden", year: "2019" },
                    { src: "/glenda-christmas-daughter.jpeg", title: "Christmas with Family", year: "2022" },
                    { src: "/glenda-hospital-visit.jpeg", title: "Hospital Visit", year: "2018" },
                    { src: "/glenda-family-baseball.jpeg", title: "Family Baseball Game", year: "2021" },
                    { src: "/glenda-restaurant-couple.jpeg", title: "Anniversary Dinner", year: "2020" },
                    { src: "/glenda-hospital-bedside.jpeg", title: "With Family", year: "2017" },
                    { src: "/glenda-beach-walk.jpeg", title: "Beach Walk", year: "2019" },
                    { src: "/glenda-hospital-final.jpeg", title: "Family Gathering", year: "2018" },
                  ].map((photo, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square relative">
                        <Image src={photo.src || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-gray-600">{photo.year}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments">
                <div className="space-y-6">
                  {/* Add Comment Section */}
                  {isSignedIn ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Leave a Comment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Share a memory or leave a message for the family..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={3}
                          />
                          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                            <Send className="w-4 h-4 mr-2" />
                            Post Comment
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Share Your Memories</h3>
                        <p className="text-gray-600 mb-4">
                          Sign in to leave comments and share your memories of Glenda
                        </p>
                        <Button onClick={() => setShowSignIn(true)}>Sign In to Comment</Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold">{comment.author}</h4>
                              <p className="text-sm text-gray-500">{comment.date}</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{comment.likes}</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Stories Tab */}
              <TabsContent value="stories">
                <div className="space-y-6">
                  {/* Add Story Section */}
                  {isSignedIn ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Share a Story</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="story-title">Story Title</Label>
                            <Input
                              id="story-title"
                              placeholder="Give your story a meaningful title..."
                              value={storyTitle}
                              onChange={(e) => setStoryTitle(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="story-content">Your Story</Label>
                            <Textarea
                              id="story-content"
                              placeholder="Tell us about a special memory, moment, or story about Glenda..."
                              value={newStory}
                              onChange={(e) => setNewStory(e.target.value)}
                              rows={5}
                            />
                          </div>
                          <Button onClick={handleAddStory} disabled={!newStory.trim() || !storyTitle.trim()}>
                            <FileText className="w-4 h-4 mr-2" />
                            Share Story
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Share Your Stories</h3>
                        <p className="text-gray-600 mb-4">Sign in to share meaningful stories and memories of Glenda</p>
                        <Button onClick={() => setShowSignIn(true)}>Sign In to Share Stories</Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Stories List */}
                  <div className="space-y-6">
                    {stories.map((story) => (
                      <Card key={story.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl">{story.title}</CardTitle>
                              <p className="text-sm text-gray-500">
                                By {story.author} • {story.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{story.likes}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 leading-relaxed">{story.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Media Upload Tab */}
              <TabsContent value="media">
                <div className="space-y-6">
                  {isSignedIn ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card
                        className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleMediaUpload("photo")}
                      >
                        <CardContent className="p-8">
                          <Camera className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
                          <p className="text-gray-600 text-sm">Share photos and memories</p>
                        </CardContent>
                      </Card>

                      <Card
                        className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleMediaUpload("video")}
                      >
                        <CardContent className="p-8">
                          <Video className="w-12 h-12 text-green-500 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Upload Videos</h3>
                          <p className="text-gray-600 text-sm">Share video memories</p>
                        </CardContent>
                      </Card>

                      <Card
                        className="text-center hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleMediaUpload("audio")}
                      >
                        <CardContent className="p-8">
                          <Music className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Upload Audio</h3>
                          <p className="text-gray-600 text-sm">Share voice recordings</p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Upload Media</h3>
                        <p className="text-gray-600 mb-6">
                          Sign in to upload photos, videos, and audio recordings to honor Glenda's memory
                        </p>
                        <Button onClick={() => setShowSignIn(true)} size="lg">
                          Sign In to Upload Media
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Recent Uploads */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Uploads</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Camera className="w-5 h-5 text-blue-500" />
                          <div className="flex-1">
                            <p className="font-medium">Family Christmas 2022</p>
                            <p className="text-sm text-gray-500">Uploaded by Penny Collins • 2 days ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Video className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="font-medium">Glenda's Halloween Costume</p>
                            <p className="text-sm text-gray-500">Uploaded by Eddie Kelso • 1 week ago</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Music className="w-5 h-5 text-purple-500" />
                          <div className="flex-1">
                            <p className="font-medium">Glenda Singing Favorite Song</p>
                            <p className="text-sm text-gray-500">Uploaded by Cole Collins • 2 weeks ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Our Story Tab */}
              <TabsContent value="our-story">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-purple-600" />
                      Our Story - Why We Created Memorial QR
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-lg max-w-none">
                    <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600 mb-6">
                      <h3 className="text-xl font-bold text-purple-900 mb-3">The Reason I Started This</h3>
                      <p className="text-purple-800 mb-2">
                        Hey, I'm <strong>Cole Collins</strong>.
                      </p>
                      <p className="text-purple-800">
                        I built Memorial Star QR for my grandma, <strong>Glenda Kelso</strong>.
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      My grandma was the best storyteller I've ever known. It was her superpower. She didn't just tell
                      stories; she made you feel like you were right there with her. Whether she was making everyone
                      laugh at a family dinner or offering a piece of gentle wisdom, she knew the perfect story for
                      every moment. That's how she showed her love.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      When she passed away, that's what I missed the most—the stories. The quiet was really hard. At her
                      funeral, we all shared our favorite memories of her, and it was so comforting. But afterwards, I
                      kept thinking,{" "}
                      <em>
                        "What about next year? Or in ten years? What if someone wants to hear her story but doesn't know
                        who to ask?"
                      </em>
                    </p>

                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 my-6">
                      <p className="text-lg font-semibold text-gray-900 mb-3">
                        I couldn't stand the idea of her stories fading away.
                      </p>
                      <p className="text-gray-700">
                        So, I decided to build her a permanent home online. A place that would always be there, day or
                        night, for anyone who loved her. A place to hear her laugh, see her smile, and remember the
                        incredible person she was.
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      We even put a QR code on her headstone. Now, when my family visits, we can scan it with our phones
                      and immediately be surrounded by her memories. It's like she's right there with us, telling her
                      stories all over again.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Creating this for her changed everything for me. It turned my grief into something meaningful. I
                      realized that if this helped my family so much, it could help others, too.
                    </p>

                    <div className="bg-blue-50 p-6 rounded-lg my-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        That's the real heart behind this business.
                      </h4>
                      <p className="text-gray-700 mb-3">
                        It's not about the tech or the QR codes—it's about making sure the people we love are never
                        forgotten. It's about honoring legacies, just like my grandma's.
                      </p>
                      <p className="text-gray-700">
                        I'm so proud to get to help other families keep their loved ones' stories alive.
                      </p>
                    </div>

                    <div className="text-center my-8 p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 mb-2">Thanks for listening,</p>
                      <p className="text-xl font-bold text-gray-900">Cole Collins</p>
                      <p className="text-gray-600">Founder, Memorial Star QR & Glenda's Grandson</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                      <Button asChild className="bg-purple-600 hover:bg-purple-700">
                        <Link href="/pricing">Create Your Own Memorial</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/our-story">Read Our Full Story</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Sign In Dialog */}
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In to Contribute</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship to Glenda</Label>
              <Input id="relationship" placeholder="e.g., Friend, Neighbor, Colleague" />
            </div>
            <Button onClick={handleSignIn} className="w-full">
              Sign In
            </Button>
            <p className="text-sm text-gray-500 text-center">
              By signing in, you can leave comments, share stories, and upload media to honor Glenda's memory.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold">Memorial QR</span>
            </div>

            <p className="text-slate-400 mb-6">
              Honoring the memory of Glenda Jane Kelso with love and digital preservation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact Support
              </Link>
              <Link href="/" className="hover:text-white">
                Create Your Memorial
              </Link>
            </div>

            <div className="border-t border-slate-800 mt-8 pt-8">
              <p className="text-slate-500 text-sm">
                &copy; 2024 Memorial QR. Created with love for preserving precious memories.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
