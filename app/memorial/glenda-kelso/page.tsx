"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  Camera,
  Share2,
  Download,
  QrCode,
  Copy,
  Mail,
  Church,
  Star,
  BookOpen,
  Home,
  MessageCircle,
  Upload,
  Video,
  Music,
  Send,
  User,
  LogIn,
  Play,
  Pause,
} from "lucide-react"

const memorialUrl = typeof window !== "undefined" ? `${window.location.origin}/memorial/glenda-jane-kelso` : ""

// Mock data for comments and stories
const mockComments = [
  {
    id: 1,
    author: "Sarah Mitchell",
    date: "2 days ago",
    content:
      "Glenda was such a wonderful woman. She always had a smile and a kind word for everyone. I'll never forget her chocolate gravy - it was legendary!",
    avatar: "SM",
  },
  {
    id: 2,
    author: "Michael Johnson",
    date: "1 week ago",
    content:
      "I remember when Glenda dressed up as a witch for Halloween and scared all the neighborhood kids. She was laughing harder than anyone! Such a fun spirit.",
    avatar: "MJ",
  },
]

const mockStories = [
  {
    id: 1,
    author: "Lisa Rodriguez",
    title: "The Great Chocolate Gravy Recipe Hunt",
    date: "3 days ago",
    content:
      "For years, we all begged Glenda for her chocolate gravy recipe. She would just smile and say 'a little of this, a little of that.' Finally, last Christmas, she wrote it down for all of us. It was her way of making sure her legacy would live on in our kitchens. Every time I make it now, I can hear her laughing and telling me I'm doing it wrong!",
    avatar: "LR",
  },
]

const mockMedia = [
  {
    id: 1,
    type: "image",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2181-W2nQQTXll54HpT6hDYhnsFVDRgelfh.jpeg",
    title: "Memorial Portrait",
    author: "Family",
  },
  {
    id: 2,
    type: "video",
    url: "/placeholder-video.mp4",
    title: "Birthday Celebration 2022",
    author: "Eddie Kelso",
  },
  {
    id: 3,
    type: "audio",
    url: "/placeholder-audio.mp3",
    title: "Glenda's Favorite Song",
    author: "Lynn Kelso",
  },
]

export default function GlendaJaneKelsoMemorial() {
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isGeneratingQr, setIsGeneratingQr] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [newStoryTitle, setNewStoryTitle] = useState("")
  const [newStoryContent, setNewStoryContent] = useState("")
  const [playingAudio, setPlayingAudio] = useState<number | null>(null)

  const generateQrCode = async () => {
    setIsGeneratingQr(true)
    // Simulate QR code generation
    setTimeout(() => {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(memorialUrl)}&format=png&margin=10`
      setQrCodeUrl(qrUrl)
      setIsGeneratingQr(false)
    }, 1000)
  }

  const downloadQrCode = async () => {
    if (!qrCodeUrl) return
    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "glenda-jane-kelso-memorial-qr.png"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading QR code:", error)
    }
  }

  const copyMemorialUrl = async () => {
    try {
      await navigator.clipboard.writeText(memorialUrl)
    } catch (error) {
      console.error("Error copying URL:", error)
    }
  }

  const handleSignIn = () => {
    setIsSignedIn(true)
    setShowSignIn(false)
  }

  const handleSubmitComment = () => {
    if (newComment.trim() && isSignedIn) {
      // In a real app, this would submit to a backend
      console.log("Submitting comment:", newComment)
      setNewComment("")
    }
  }

  const handleSubmitStory = () => {
    if (newStoryTitle.trim() && newStoryContent.trim() && isSignedIn) {
      // In a real app, this would submit to a backend
      console.log("Submitting story:", { title: newStoryTitle, content: newStoryContent })
      setNewStoryTitle("")
      setNewStoryContent("")
    }
  }

  const handleFileUpload = (type: string) => {
    // In a real app, this would handle file uploads
    console.log(`Uploading ${type} file`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2173-DvzRNi43RzqFyJCL8MYc8goKHHuEoG.jpeg"
          alt="Glenda Jane Kelso Memorial Cover - Beach Walk"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <Badge className="mb-4 bg-orange-600 text-white">
            <QrCode className="w-4 h-4 mr-2" />
            Digital Memorial
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Glenda Jane Kelso</h1>
          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>March 15, 1943 - December 28, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Hanceville, Alabama</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200 flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2181-W2nQQTXll54HpT6hDYhnsFVDRgelfh.jpeg"
                      alt="Glenda Jane Kelso"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Glenda Jane Kelso</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <span>March 15, 1943 - December 28, 2023</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        <span>Hanceville, Alabama</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-orange-600" />
                        <span>Age 80</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Church className="w-5 h-5 text-orange-600" />
                        <span>Hanceville Funeral Home</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
                  <p className="text-gray-800 italic text-lg">"Love can be fierce, funny, and a little bit noisy."</p>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">A Life Lived on Her Own Terms</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Glenda Jane Kelso left this world the same way she lived in it—on her own terms, with a quick wit,
                    and probably planning a joke we haven't caught onto yet. She was a selfless and loving homemaker who
                    dedicated her life to her husband of 57 years, her children, grandchildren, and countless others she
                    took in as her own.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Patient and kind, yet tough as nails, she had a fanatic sense of humor that could cut through the
                    hardest days. She made the best chocolate gravy in the world, spoiled us rotten, and never let us
                    forget who was really in charge. She had a deep love for kids, always dressing up for
                    holidays—especially Halloween—and making magic out of the ordinary.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    She was happiest when surrounded by family, though we suspect the police scanner was a close second.
                    Glenda loved music, laughter, and telling it straight. She was bossy, stubborn, and never afraid to
                    stick by us when the world said no. Through the good and the bad, she cracked jokes, kept us
                    together, and reminded us that love can be fierce, funny, and a little bit noisy.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Glenda Jane Kelso was one of a kind. We are fortunate, blessed, and endlessly grateful to have been
                    loved by her. And though we'll miss her beyond measure, we can take comfort knowing she's with her
                    mama, Desmer McAnnally, in Heaven keeping check on us.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Section */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <MessageCircle className="w-6 h-6 text-orange-600" />
                    Share Your Memories
                  </h3>
                  {!isSignedIn && (
                    <Button onClick={() => setShowSignIn(true)} variant="outline" size="sm">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In to Contribute
                    </Button>
                  )}
                  {isSignedIn && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>Signed in as Guest User</span>
                    </div>
                  )}
                </div>

                {/* Sign In Modal */}
                {showSignIn && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Sign In to Contribute</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                          </div>
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Your full name" />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSignIn} className="flex-1">
                              <LogIn className="w-4 h-4 mr-2" />
                              Sign In
                            </Button>
                            <Button variant="outline" onClick={() => setShowSignIn(false)}>
                              Cancel
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 text-center">
                            By signing in, you agree to our terms and can contribute memories to this memorial.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Tabs defaultValue="comments" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="stories">Stories</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                  </TabsList>

                  {/* Comments Tab */}
                  <TabsContent value="comments" className="space-y-6">
                    {isSignedIn && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <Label htmlFor="comment">Leave a Comment</Label>
                        <Textarea
                          id="comment"
                          placeholder="Share a memory or leave a message for the family..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={3}
                        />
                        <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                          <Send className="w-4 h-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    )}

                    <div className="space-y-4">
                      {mockComments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-orange-200 pl-4 py-2">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-orange-600 text-sm font-semibold">{comment.avatar}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{comment.author}</div>
                              <div className="text-sm text-gray-500">{comment.date}</div>
                            </div>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Stories Tab */}
                  <TabsContent value="stories" className="space-y-6">
                    {isSignedIn && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <Label htmlFor="story-title">Share a Story</Label>
                        <Input
                          id="story-title"
                          placeholder="Story title..."
                          value={newStoryTitle}
                          onChange={(e) => setNewStoryTitle(e.target.value)}
                        />
                        <Textarea
                          placeholder="Tell us about a special memory with Glenda..."
                          value={newStoryContent}
                          onChange={(e) => setNewStoryContent(e.target.value)}
                          rows={5}
                        />
                        <Button onClick={handleSubmitStory} disabled={!newStoryTitle.trim() || !newStoryContent.trim()}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Share Story
                        </Button>
                      </div>
                    )}

                    <div className="space-y-6">
                      {mockStories.map((story) => (
                        <Card key={story.id} className="border-l-4 border-orange-600">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-orange-600 font-semibold">{story.avatar}</span>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">{story.title}</h4>
                                <div className="text-sm text-gray-500">
                                  by {story.author} • {story.date}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{story.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Media Tab */}
                  <TabsContent value="media" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {mockMedia.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            {item.type === "image" && (
                              <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                                <Image
                                  src={item.url || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            {item.type === "video" && (
                              <div className="relative h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                                <Video className="w-12 h-12 text-gray-400" />
                                <Button size="sm" className="absolute" onClick={() => console.log("Play video")}>
                                  <Play className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            {item.type === "audio" && (
                              <div className="bg-gray-100 rounded-lg p-6 mb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Music className="w-6 h-6 text-gray-600" />
                                    <div>
                                      <div className="font-medium">{item.title}</div>
                                      <div className="text-sm text-gray-500">Audio Recording</div>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setPlayingAudio(playingAudio === item.id ? null : item.id)}
                                  >
                                    {playingAudio === item.id ? (
                                      <Pause className="w-4 h-4" />
                                    ) : (
                                      <Play className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                            <div className="text-sm">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-gray-500">Shared by {item.author}</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Upload Tab */}
                  <TabsContent value="upload" className="space-y-6">
                    {!isSignedIn ? (
                      <div className="text-center py-8">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Sign In to Upload</h4>
                        <p className="text-gray-600 mb-4">
                          Please sign in to share photos, videos, and audio recordings.
                        </p>
                        <Button onClick={() => setShowSignIn(true)}>
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-dashed border-2 border-gray-300 hover:border-orange-400 transition-colors cursor-pointer">
                          <CardContent className="p-8 text-center" onClick={() => handleFileUpload("image")}>
                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-900 mb-2">Upload Photos</h4>
                            <p className="text-sm text-gray-600">Share favorite photos and memories</p>
                          </CardContent>
                        </Card>

                        <Card className="border-dashed border-2 border-gray-300 hover:border-orange-400 transition-colors cursor-pointer">
                          <CardContent className="p-8 text-center" onClick={() => handleFileUpload("video")}>
                            <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-900 mb-2">Upload Videos</h4>
                            <p className="text-sm text-gray-600">Share video memories and messages</p>
                          </CardContent>
                        </Card>

                        <Card className="border-dashed border-2 border-gray-300 hover:border-orange-400 transition-colors cursor-pointer">
                          <CardContent className="p-8 text-center" onClick={() => handleFileUpload("audio")}>
                            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h4 className="font-semibold text-gray-900 mb-2">Upload Audio</h4>
                            <p className="text-sm text-gray-600">Share voice messages or favorite songs</p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Life Highlights */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-orange-600" />
                  Life Highlights
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-orange-600" />
                      Family & Faith
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Devoted wife of 57 years to Lynn Kelso</li>
                      <li>• Loving mother and grandmother</li>
                      <li>• Took in countless others as her own family</li>
                      <li>• Known for her fierce, funny, and noisy love</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Home className="w-5 h-5 text-orange-600" />
                      Community & Legacy
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Made the best chocolate gravy in the world</li>
                      <li>• Loved dressing up for holidays, especially Halloween</li>
                      <li>• Had a deep love for kids and making magic from ordinary moments</li>
                      <li>• Known for her quick wit and fantastic sense of humor</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Section */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-orange-600" />
                  Family & Survivors
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Preceded in Death</h4>
                    <p className="text-gray-700">Her mother, Desmer McAnnally</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Husband</h4>
                    <p className="text-gray-700">Lynn Kelso (married 57 years)</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Children</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Eddie Kelso</li>
                      <li>• Penny Collins</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Children She Loved as Her Own</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Savannah (Bo) Pitts</li>
                      <li>• Bama Thompson</li>
                      <li>• Taylor (Kelly) Hunter</li>
                      <li>• Jordan Thompson</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Grandchildren</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Cole Collins</li>
                      <li>• Kristin Kelso</li>
                      <li>• Gracie Dean</li>
                      <li>• Braxton Phillips</li>
                      <li>• Weston Green</li>
                      <li>• Addalynn Rassman</li>
                      <li>• Wrenley Hunter</li>
                      <li>• Ridge Thompson</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Special Family</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Caroline (Caro) - Her beautiful French daughter-in-love</li>
                      <li>• Colton, Anzlie, and Remi - Her God sent angels</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Special Friends</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Eric Wells</li>
                      <li>• Shana Melton</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Camera className="w-6 h-6 text-orange-600" />
                  Photo Gallery
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2181-W2nQQTXll54HpT6hDYhnsFVDRgelfh.jpeg"
                      alt="Glenda Kelso Portrait"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Memorial Portrait
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2168-klki5nzsOCbEJNaljSBvPpXNsUQYUd.jpeg"
                      alt="Family at Baseball Game"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Family at UAB Game
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2174-i5BKus6N3sZ7434Sjy5TKTaKKBDhg3.jpeg"
                      alt="Glenda and husband in garden"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Garden Memories
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2176-SVOoBO6mZH0l4QTqM4jCH5UnoRGJNq.jpeg"
                      alt="Christmas with daughter"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Christmas Together
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2175-UGD9qDeIhgOBPHra2kyxiUgYewJODL.jpeg"
                      alt="Dining out together"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Date Night
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2173-DvzRNi43RzqFyJCL8MYc8goKHHuEoG.jpeg"
                      alt="Beach walk together"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Beach Walks
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2170-t1fKeAawpfBilxL2fRST68PYVrM8zw.jpeg"
                      alt="Hospital visit"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Final Days
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2171.PNG-3SQWBapiovMQs1gQ6afxH1AOa92m7M.jpeg"
                      alt="Hospital bedside"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Surrounded by Love
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2172.PNG-zxO8xwnDbpatfeSNxRMIVWf3ZrW9Nu.jpeg"
                      alt="Hospital visit with granddaughter"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      With Granddaughter
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Memorial Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Memorial Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Visitors</span>
                    </div>
                    <span className="font-semibold text-gray-900">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Photos</span>
                    </div>
                    <span className="font-semibold text-gray-900">9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Stories</span>
                    </div>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Comments</span>
                    </div>
                    <span className="font-semibold text-gray-900">24</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-orange-600" />
                  Memorial QR Code
                </h3>

                {qrCodeUrl ? (
                  <div className="text-center space-y-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                      <Image
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="Memorial QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <p className="text-sm text-gray-600">Scan to visit this memorial</p>
                    <div className="flex gap-2">
                      <Button onClick={downloadQrCode} size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={copyMemorialUrl} variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy URL
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <Button onClick={generateQrCode} disabled={isGeneratingQr} className="w-full">
                      {isGeneratingQr ? "Generating..." : "Generate QR Code"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Service Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Church className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Hanceville Funeral Home</div>
                      <div className="text-gray-600">Hanceville, Alabama</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Services Held</div>
                      <div className="text-gray-600">December 30, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Final Rest</div>
                      <div className="text-gray-600">With dignity and love</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Memorial */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-orange-600" />
                  Share Memorial
                </h3>
                <div className="space-y-3">
                  <Button onClick={copyMemorialUrl} variant="outline" className="w-full justify-start bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Memorial Link
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link
                      href={`mailto:?subject=Memorial for Glenda Jane Kelso&body=Please visit this memorial: ${memorialUrl}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Share via Email
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
