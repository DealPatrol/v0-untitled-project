"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Trash2,
  MessageCircle,
  Users,
  Calendar,
  MapPin,
  Camera,
  Video,
  Music,
  BookOpen,
} from "lucide-react"

interface Photo {
  id: string
  url: string
  caption: string
  uploadedBy: string
  uploadedAt: string
}

interface VideoMemory {
  id: string
  url: string
  title: string
  description: string
  uploadedBy: string
  uploadedAt: string
}

interface Story {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

interface Message {
  id: string
  content: string
  author: string
  createdAt: string
}

interface Song {
  id: string
  title: string
  artist: string
  duration: string
  url: string
}

interface FamilyMember {
  name: string
  relationship: string
  email: string
  isFamily: boolean
}

export default function GlendaKelsoMemorial() {
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<FamilyMember | null>(null)
  const [signInForm, setSignInForm] = useState({ name: "", relationship: "", email: "" })
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "/glenda-memorial-portrait.jpeg",
      caption: "Glenda in her favorite garden spot",
      uploadedBy: "Sarah Kelso",
      uploadedAt: "2024-01-15",
    },
    {
      id: "2",
      url: "/glenda-garden-couple.jpeg",
      caption: "Glenda and Robert in their beautiful garden",
      uploadedBy: "Michael Kelso",
      uploadedAt: "2024-01-14",
    },
    {
      id: "3",
      url: "/glenda-christmas-daughter.jpeg",
      caption: "Christmas morning with daughter Sarah",
      uploadedBy: "Sarah Kelso",
      uploadedAt: "2024-01-13",
    },
    {
      id: "4",
      url: "/glenda-hospital-visit.jpeg",
      caption: "Surrounded by love during her final days",
      uploadedBy: "David Kelso",
      uploadedAt: "2024-01-12",
    },
    {
      id: "5",
      url: "/glenda-family-baseball.jpeg",
      caption: "Family baseball game - Glenda cheering from the sidelines",
      uploadedBy: "Jennifer Kelso",
      uploadedAt: "2024-01-11",
    },
    {
      id: "6",
      url: "/glenda-restaurant-couple.jpeg",
      caption: "Date night at their favorite restaurant",
      uploadedBy: "Robert Kelso",
      uploadedAt: "2024-01-10",
    },
  ])

  const [videos, setVideos] = useState<VideoMemory[]>([
    {
      id: "1",
      url: "/placeholder-video.mp4",
      title: "Glenda's 70th Birthday Speech",
      description: "Glenda giving a heartfelt thank you speech at her surprise 70th birthday party",
      uploadedBy: "Michael Kelso",
      uploadedAt: "2024-01-15",
    },
  ])

  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      title: "The Chocolate Gravy Legend",
      content:
        "Every Sunday morning, Glenda would make her famous chocolate gravy from scratch. The grandkids would line up with their biscuits, and she'd serve each one with a smile and a kiss on the forehead. That recipe died with her - she never wrote it down, saying \"the secret ingredient is love, and you can't measure that.\"",
      author: "Sarah Kelso",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Garden Wisdom",
      content:
        "Mom taught me that gardens, like families, need constant tending. She'd say, \"You can't plant love and expect it to grow without water.\" Every morning, she'd walk through her flowers with her coffee, talking to each plant like an old friend.",
      author: "Michael Kelso",
      createdAt: "2024-01-14",
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Glenda was like a second mother to me. Her door was always open, and there was always room at her table. I'll miss her warm hugs and wise words.",
      author: "Mary Johnson (Family Friend)",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      content:
        "Mrs. Kelso made the best chocolate gravy in three counties. More than that, she made everyone feel like family. Our neighborhood won't be the same without her.",
      author: "Tom and Linda Martinez (Neighbors)",
      createdAt: "2024-01-14",
    },
  ])

  const [songs] = useState<Song[]>([
    { id: "1", title: "Amazing Grace", artist: "Traditional", duration: "3:24", url: "/placeholder-audio.mp3" },
    { id: "2", title: "How Great Thou Art", artist: "Traditional", duration: "4:12", url: "/placeholder-audio.mp3" },
    { id: "3", title: "In the Garden", artist: "Traditional", duration: "3:45", url: "/placeholder-audio.mp3" },
    {
      id: "4",
      title: "What a Friend We Have in Jesus",
      artist: "Traditional",
      duration: "3:18",
      url: "/placeholder-audio.mp3",
    },
  ])

  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const [newPhoto, setNewPhoto] = useState({ caption: "" })
  const [newVideo, setNewVideo] = useState({ title: "", description: "" })
  const [newStory, setNewStory] = useState({ title: "", content: "" })
  const [newMessage, setNewMessage] = useState({ content: "" })

  const familyMembers = ["Robert Kelso", "Michael Kelso", "David Kelso", "Sarah Kelso", "Jennifer Kelso", "Lisa Kelso"]

  const handleSignIn = () => {
    if (!signInForm.name || !signInForm.relationship || !signInForm.email) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const isFamily = familyMembers.some(
      (member) =>
        member.toLowerCase().includes(signInForm.name.toLowerCase()) ||
        signInForm.relationship.toLowerCase().includes("son") ||
        signInForm.relationship.toLowerCase().includes("daughter") ||
        signInForm.relationship.toLowerCase().includes("spouse") ||
        signInForm.relationship.toLowerCase().includes("husband"),
    )

    const user: FamilyMember = {
      name: signInForm.name,
      relationship: signInForm.relationship,
      email: signInForm.email,
      isFamily,
    }

    setCurrentUser(user)
    setSignInForm({ name: "", relationship: "", email: "" })

    toast({
      title: `Welcome, ${user.name}`,
      description: `Signed in as ${user.relationship}${user.isFamily ? " (Family Member)" : ""}`,
    })
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    toast({
      title: "Signed out successfully",
    })
  }

  const playPauseSong = (songId: string) => {
    if (currentSong === songId && isPlaying) {
      setIsPlaying(false)
      audioRef.current?.pause()
    } else {
      setCurrentSong(songId)
      setIsPlaying(true)
      // In a real app, you'd load and play the actual audio file
      toast({
        title: "Playing song",
        description: songs.find((s) => s.id === songId)?.title,
      })
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const addPhoto = () => {
    if (!currentUser) {
      toast({
        title: "Please sign in to upload photos",
        variant: "destructive",
      })
      return
    }

    if (!newPhoto.caption) {
      toast({
        title: "Please add a caption",
        variant: "destructive",
      })
      return
    }

    const photo: Photo = {
      id: Date.now().toString(),
      url: "/placeholder.svg?height=300&width=400&text=New+Photo",
      caption: newPhoto.caption,
      uploadedBy: currentUser.name,
      uploadedAt: new Date().toISOString().split("T")[0],
    }

    setPhotos([photo, ...photos])
    setNewPhoto({ caption: "" })

    toast({
      title: "Photo uploaded successfully",
      description: "Your photo has been added to the memorial",
    })
  }

  const deletePhoto = (photoId: string) => {
    const photo = photos.find((p) => p.id === photoId)
    if (!currentUser || (photo?.uploadedBy !== currentUser.name && !currentUser.isFamily)) {
      toast({
        title: "Permission denied",
        description: "You can only delete your own photos",
        variant: "destructive",
      })
      return
    }

    setPhotos(photos.filter((p) => p.id !== photoId))
    toast({
      title: "Photo deleted",
    })
  }

  const addVideo = () => {
    if (!currentUser) {
      toast({
        title: "Please sign in to upload videos",
        variant: "destructive",
      })
      return
    }

    if (!newVideo.title || !newVideo.description) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const video: VideoMemory = {
      id: Date.now().toString(),
      url: "/placeholder-video.mp4",
      title: newVideo.title,
      description: newVideo.description,
      uploadedBy: currentUser.name,
      uploadedAt: new Date().toISOString().split("T")[0],
    }

    setVideos([video, ...videos])
    setNewVideo({ title: "", description: "" })

    toast({
      title: "Video uploaded successfully",
      description: "Your video has been added to the memorial",
    })
  }

  const deleteVideo = (videoId: string) => {
    const video = videos.find((v) => v.id === videoId)
    if (!currentUser || (video?.uploadedBy !== currentUser.name && !currentUser.isFamily)) {
      toast({
        title: "Permission denied",
        description: "You can only delete your own videos",
        variant: "destructive",
      })
      return
    }

    setVideos(videos.filter((v) => v.id !== videoId))
    toast({
      title: "Video deleted",
    })
  }

  const addStory = () => {
    if (!currentUser) {
      toast({
        title: "Please sign in to share a story",
        variant: "destructive",
      })
      return
    }

    if (!newStory.title || !newStory.content) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const story: Story = {
      id: Date.now().toString(),
      title: newStory.title,
      content: newStory.content,
      author: currentUser.name,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setStories([story, ...stories])
    setNewStory({ title: "", content: "" })

    toast({
      title: "Story shared successfully",
      description: "Your story has been added to the memorial",
    })
  }

  const deleteStory = (storyId: string) => {
    const story = stories.find((s) => s.id === storyId)
    if (!currentUser || (story?.author !== currentUser.name && !currentUser.isFamily)) {
      toast({
        title: "Permission denied",
        description: "You can only delete your own stories",
        variant: "destructive",
      })
      return
    }

    setStories(stories.filter((s) => s.id !== storyId))
    toast({
      title: "Story deleted",
    })
  }

  const addMessage = () => {
    if (!currentUser) {
      toast({
        title: "Please sign in to leave a message",
        variant: "destructive",
      })
      return
    }

    if (!newMessage.content) {
      toast({
        title: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.content,
      author: currentUser.name,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setMessages([message, ...messages])
    setNewMessage({ content: "" })

    toast({
      title: "Message posted successfully",
      description: "Your message has been shared with the family",
    })
  }

  const deleteMessage = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId)
    if (!currentUser || (message?.author !== currentUser.name && !currentUser.isFamily)) {
      toast({
        title: "Permission denied",
        description: "You can only delete your own messages",
        variant: "destructive",
      })
      return
    }

    setMessages(messages.filter((m) => m.id !== messageId))
    toast({
      title: "Message deleted",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* User Status Banner */}
      {currentUser && (
        <div className="bg-green-100 border-b border-green-200 px-4 py-2">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <span className="text-green-800 text-sm">
              Signed in as {currentUser.name} ({currentUser.relationship})
              {currentUser.isFamily && <Badge className="ml-2 bg-green-600">Family Member</Badge>}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative h-96 bg-gradient-to-r from-rose-400 to-pink-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
            <Image
              src="/glenda-memorial-portrait.jpeg"
              alt="Glenda Kelso"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Glenda Kelso</h1>
          <p className="text-xl mb-2">March 15, 1954 - January 8, 2024</p>
          <p className="text-lg opacity-90">Beloved Wife, Mother, and Grandmother</p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Springfield, Illinois</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>69 years</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Sign In Section */}
        {!currentUser && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Users className="w-5 h-5" />
                Sign In to Contribute
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">
                Sign in to share photos, videos, stories, and messages in memory of Glenda.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={signInForm.name}
                    onChange={(e) => setSignInForm({ ...signInForm, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship to Glenda</Label>
                  <Input
                    id="relationship"
                    value={signInForm.relationship}
                    onChange={(e) => setSignInForm({ ...signInForm, relationship: e.target.value })}
                    placeholder="e.g., Son, Friend, Neighbor"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <Button onClick={handleSignIn} className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Photos</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Music</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Stories</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Glenda</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-4">
                  Glenda Kelso, 69, of Springfield, Illinois, passed away peacefully on January 8, 2024, surrounded by
                  her loving family. Born on March 15, 1954, to Harold and Margaret Thompson, Glenda lived a life filled
                  with love, laughter, and service to others.
                </p>

                <p className="mb-4">
                  Glenda was the devoted wife of Robert Kelso for 47 beautiful years. Together, they built a loving home
                  and raised four wonderful children: Michael (Jennifer) Kelso of Chicago, David (Lisa) Kelso of
                  Springfield, Sarah Kelso-Martinez (Carlos) of Phoenix, and Jennifer Kelso-Brown (Mark) of St. Louis.
                </p>

                <p className="mb-4">
                  As a grandmother, Glenda found her greatest joy. She was "Grandma Glenda" to eight precious
                  grandchildren: Emma, Jacob, and Sophia Kelso; Tyler and Madison Kelso; Isabella and Diego Martinez;
                  and little Lily Brown. Her face would light up whenever she spoke of her grandchildren, and she never
                  missed a school play, baseball game, or dance recital.
                </p>

                <p className="mb-4">
                  Glenda worked as a registered nurse at Memorial Medical Center for 35 years, touching countless lives
                  with her compassion and skill. She had a special gift for making patients feel comfortable and cared
                  for during their most vulnerable moments. Even after retirement, she continued volunteering at the
                  hospital's cancer center, providing comfort to patients and families facing difficult journeys.
                </p>

                <p className="mb-4">
                  Those who knew Glenda will remember her infectious laugh, her legendary chocolate gravy (a closely
                  guarded family secret), and her ability to make everyone feel like family. Her home was always open,
                  her table always had room for one more, and her heart was big enough to love everyone who crossed her
                  path.
                </p>

                <p className="mb-4">
                  Glenda was an active member of First Baptist Church of Springfield, where she served in the nursery,
                  organized countless potluck dinners, and was known for her beautiful voice in the church choir. Her
                  faith was the cornerstone of her life, and she lived it out through her actions of love and service to
                  others.
                </p>

                <p className="mb-4">
                  She had a passion for gardening and could often be found tending to her roses and vegetables in the
                  backyard. Her garden was her sanctuary, and she loved sharing its bounty with neighbors and friends.
                  She also enjoyed quilting, reading romance novels, and watching old movies with Robert on Sunday
                  afternoons.
                </p>

                <p className="mb-4">
                  In addition to her husband and children, Glenda is survived by her sister, Patricia (James) Wilson of
                  Decatur, and her brother, Thomas (Mary) Thompson of Peoria, along with numerous nieces, nephews, and
                  cousins who all held a special place in her heart.
                </p>

                <p className="mb-4">
                  She was preceded in death by her parents and her beloved brother, William Thompson, who passed away in
                  2018.
                </p>

                <p className="text-lg font-medium">
                  Glenda's legacy lives on in the love she shared, the lives she touched, and the family she cherished.
                  She taught us that the most important things in life aren't things at all – they're the relationships
                  we build and the love we give. Her memory will be a blessing to all who knew her.
                </p>
              </CardContent>
            </Card>

            {/* Family Tree */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Family Tree
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-block bg-rose-100 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-lg">Glenda Kelso</h3>
                      <p className="text-sm text-gray-600">March 15, 1954 - January 8, 2024</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-blue-800">Spouse</h4>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="font-medium">Robert Kelso</p>
                        <p className="text-sm text-gray-600">Married 47 years</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-green-800">Children</h4>
                      <div className="space-y-2">
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="font-medium">Michael Kelso</p>
                          <p className="text-sm text-gray-600">Married to Jennifer • Lives in Chicago</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="font-medium">David Kelso</p>
                          <p className="text-sm text-gray-600">Married to Lisa • Lives in Springfield</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="font-medium">Sarah Kelso-Martinez</p>
                          <p className="text-sm text-gray-600">Married to Carlos • Lives in Phoenix</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="font-medium">Jennifer Kelso-Brown</p>
                          <p className="text-sm text-gray-600">Married to Mark • Lives in St. Louis</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-purple-800">Grandchildren</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        "Emma Kelso",
                        "Jacob Kelso",
                        "Sophia Kelso",
                        "Tyler Kelso",
                        "Madison Kelso",
                        "Isabella Martinez",
                        "Diego Martinez",
                        "Lily Brown",
                      ].map((grandchild) => (
                        <div key={grandchild} className="bg-purple-50 rounded-lg p-2 text-center">
                          <p className="text-sm font-medium">{grandchild}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            {currentUser && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload a Photo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="photo-caption">Photo Caption</Label>
                      <Input
                        id="photo-caption"
                        value={newPhoto.caption}
                        onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                        placeholder="Describe this photo..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addPhoto} className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={photo.url || "/placeholder.svg"} alt={photo.caption} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium mb-2">{photo.caption}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>By {photo.uploadedBy}</span>
                      <span>{photo.uploadedAt}</span>
                    </div>
                    {currentUser && (currentUser.name === photo.uploadedBy || currentUser.isFamily) && (
                      <Button variant="destructive" size="sm" className="mt-2" onClick={() => deletePhoto(photo.id)}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            {currentUser && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload a Video</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="video-title">Video Title</Label>
                      <Input
                        id="video-title"
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        placeholder="Give your video a title..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="video-description">Description</Label>
                      <Textarea
                        id="video-description"
                        value={newVideo.description}
                        onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                        placeholder="Describe this video memory..."
                      />
                    </div>
                    <Button onClick={addVideo} className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <Video className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-500">Video Player</p>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <p className="text-gray-600 mb-3">{video.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>By {video.uploadedBy}</span>
                      <span>{video.uploadedAt}</span>
                    </div>
                    {currentUser && (currentUser.name === video.uploadedBy || currentUser.isFamily) && (
                      <Button variant="destructive" size="sm" className="mt-2" onClick={() => deleteVideo(video.id)}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Music Tab */}
          <TabsContent value="music" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Glenda's Favorite Songs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {songs.map((song) => (
                    <div key={song.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playPauseSong(song.id)}
                          className={currentSong === song.id && isPlaying ? "bg-blue-100" : ""}
                        >
                          {currentSong === song.id && isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-gray-600">{song.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{song.duration}</span>
                        <Button variant="ghost" size="sm" onClick={toggleMute}>
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            {currentUser && (
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
                        value={newStory.title}
                        onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                        placeholder="Give your story a title..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="story-content">Your Story</Label>
                      <Textarea
                        id="story-content"
                        value={newStory.content}
                        onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                        placeholder="Share a memory or story about Glenda..."
                        rows={4}
                      />
                    </div>
                    <Button onClick={addStory} className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Share Story
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-6">
              {stories.map((story) => (
                <Card key={story.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          By {story.author} • {story.createdAt}
                        </p>
                      </div>
                      {currentUser && (currentUser.name === story.author || currentUser.isFamily) && (
                        <Button variant="ghost" size="sm" onClick={() => deleteStory(story.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed">{story.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            {currentUser && (
              <Card>
                <CardHeader>
                  <CardTitle>Leave a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="message-content">Your Message</Label>
                      <Textarea
                        id="message-content"
                        value={newMessage.content}
                        onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                        placeholder="Share your condolences or a message for the family..."
                        rows={3}
                      />
                    </div>
                    <Button onClick={addMessage} className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Post Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{message.author}</p>
                        <p className="text-sm text-gray-600">{message.createdAt}</p>
                      </div>
                      {currentUser && (currentUser.name === message.author || currentUser.isFamily) && (
                        <Button variant="ghost" size="sm" onClick={() => deleteMessage(message.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <p className="leading-relaxed">{message.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <audio ref={audioRef} />
    </div>
  )
}
