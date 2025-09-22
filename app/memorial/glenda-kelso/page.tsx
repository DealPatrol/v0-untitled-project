"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  Music,
  Camera,
  Video,
  MessageSquare,
  BookOpen,
  Edit,
  Trash2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  UserPlus,
  LogOut,
  Share2,
  Download,
} from "lucide-react"

interface User {
  id: string
  name: string
  relationship: string
  email?: string
  isFamily: boolean
}

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
  url: string
  addedBy: string
  duration: string
  totalSeconds: number
}

export default function GlendaMemorialPage() {
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [signInName, setSignInName] = useState("")
  const [signInRelationship, setSignInRelationship] = useState("")
  const [signInEmail, setSignInEmail] = useState("")
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  // Music player state
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackTime, setPlaybackTime] = useState(0)

  // Photo state
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      url: "/glenda-memorial-portrait.jpeg",
      caption: "Glenda in her favorite garden",
      uploadedBy: "Family",
      uploadedAt: "2024-01-10",
    },
    {
      id: "2",
      url: "/glenda-garden-couple.jpeg",
      caption: "With her beloved husband Lynn in their garden",
      uploadedBy: "Lynn Kelso",
      uploadedAt: "2024-01-11",
    },
    {
      id: "3",
      url: "/glenda-christmas-daughter.jpeg",
      caption: "Christmas morning with Penny",
      uploadedBy: "Penny Collins",
      uploadedAt: "2024-01-12",
    },
    {
      id: "4",
      url: "/glenda-hospital-visit.jpeg",
      caption: "Visiting friends at the hospital",
      uploadedBy: "Eddie Kelso",
      uploadedAt: "2024-01-13",
    },
    {
      id: "5",
      url: "/glenda-family-baseball.jpeg",
      caption: "Family baseball game - she never missed one!",
      uploadedBy: "Cole Collins",
      uploadedAt: "2024-01-14",
    },
    {
      id: "6",
      url: "/glenda-restaurant-couple.jpeg",
      caption: "Anniversary dinner at their favorite restaurant",
      uploadedBy: "Lynn Kelso",
      uploadedAt: "2024-01-15",
    },
    {
      id: "7",
      url: "/glenda-hospital-bedside.jpeg",
      caption: "Comforting a patient - she had such a caring heart",
      uploadedBy: "Family Friend",
      uploadedAt: "2024-01-16",
    },
    {
      id: "8",
      url: "/glenda-beach-walk.jpeg",
      caption: "Beach walk with the grandkids",
      uploadedBy: "Kristin Kelso",
      uploadedAt: "2024-01-17",
    },
  ])

  // Video state
  const [videos, setVideos] = useState<VideoMemory[]>([
    {
      id: "1",
      url: "/sample-video-1.mp4",
      title: "Glenda's 70th Birthday Celebration",
      description:
        "A beautiful celebration surrounded by family and friends. You can hear her infectious laugh throughout the whole video.",
      uploadedBy: "Eddie Kelso",
      uploadedAt: "2024-01-10",
    },
    {
      id: "2",
      url: "/sample-video-2.mp4",
      title: "Teaching Gracie to Garden",
      description: "Grandma Glenda showing her granddaughter how to plant tomatoes. This was just last spring.",
      uploadedBy: "Penny Collins",
      uploadedAt: "2024-01-12",
    },
  ])

  // Stories state
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      title: "Mom's Famous Chocolate Gravy",
      content:
        "Every Sunday morning, Mom would make her legendary chocolate gravy from scratch. The whole house would fill with the sweet aroma, and we'd all gather around the kitchen table. She never wrote down the recipe - it was all in her heart and hands. I've tried to recreate it so many times, but it never tastes quite the same. I think the secret ingredient was her love.",
      author: "Penny Collins",
      createdAt: "2024-01-15",
    },
  ])

  // Messages state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Glenda was such a light in our community. Her kindness and humor touched everyone she met. Sending love and prayers to the entire family during this difficult time.",
      author: "Sarah Mitchell",
      createdAt: "2024-01-14",
    },
  ])

  // Music state
  const [songs, setSongs] = useState<Song[]>([
    {
      id: "1",
      title: "Amazing Grace",
      artist: "Traditional",
      url: "/placeholder.svg?height=50&width=50",
      addedBy: "Memorial Admin",
      duration: "3:45",
      totalSeconds: 225,
    },
    {
      id: "2",
      title: "How Great Thou Art",
      artist: "Traditional",
      url: "/placeholder.svg?height=50&width=50",
      addedBy: "Memorial Admin",
      duration: "4:12",
      totalSeconds: 252,
    },
    {
      id: "3",
      title: "In the Garden",
      artist: "Traditional",
      url: "/placeholder.svg?height=50&width=50",
      addedBy: "Memorial Admin",
      duration: "3:28",
      totalSeconds: 208,
    },
  ])

  const [editingStory, setEditingStory] = useState<string | null>(null)
  const [editingMessage, setEditingMessage] = useState<string | null>(null)
  const [newPhotoCaption, setNewPhotoCaption] = useState("")
  const [newVideoTitle, setNewVideoTitle] = useState("")
  const [newVideoDescription, setNewVideoDescription] = useState("")
  const [newStoryTitle, setNewStoryTitle] = useState("")
  const [newStoryContent, setNewStoryContent] = useState("")
  const [newMessageContent, setNewMessageContent] = useState("")

  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const familyTree = [
    { name: "Glenda Jane Kelso", relation: "Self", dates: "July 27, 1952 - August 27, 2025" },
    { name: "Desmer McAnnally", relation: "Mother", dates: "Preceded in Death" },
    { name: "Lynn Kelso", relation: "Husband", dates: "Married 57 years" },
    { name: "Eddie Kelso", relation: "Son", dates: "" },
    { name: "Penny Collins", relation: "Daughter", dates: "" },
    { name: "Cole Collins", relation: "Grandson", dates: "" },
    { name: "Kristin Kelso", relation: "Granddaughter", dates: "" },
    { name: "Gracie Dean", relation: "Granddaughter", dates: "" },
    { name: "Braxton Phillips", relation: "Grandson", dates: "" },
    { name: "Weston Green", relation: "Grandson", dates: "" },
    { name: "Addalynn Rassman", relation: "Granddaughter", dates: "" },
    { name: "Wrenley Hunter", relation: "Granddaughter", dates: "" },
    { name: "Ridge Thompson", relation: "Grandson", dates: "" },
  ]

  const handleSignIn = () => {
    if (!signInName.trim() || !signInRelationship.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name and relationship are required to sign in.",
        variant: "destructive",
      })
      return
    }

    const familyRelationships = ["son", "daughter", "spouse", "husband", "wife"]
    const isFamily = familyRelationships.some((rel) => signInRelationship.toLowerCase().includes(rel))

    const user: User = {
      id: Date.now().toString(),
      name: signInName,
      relationship: signInRelationship,
      email: signInEmail || undefined,
      isFamily,
    }

    setCurrentUser(user)
    setIsSignInOpen(false)
    setSignInName("")
    setSignInRelationship("")
    setSignInEmail("")

    toast({
      title: "Welcome!",
      description: `Thank you for signing in, ${user.name}. You can now contribute to Glenda's memorial.`,
    })
  }

  const handleSignOut = () => {
    setCurrentUser(null)
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    })
  }

  const handlePlayPause = (songId: string) => {
    const song = songs.find((s) => s.id === songId)
    if (!song) return

    if (currentSong !== songId) {
      setCurrentSong(songId)
      setIsPlaying(true)
      setPlaybackTime(0)
      toast({
        title: "Now Playing",
        description: `${song.title} by ${song.artist}`,
      })
    } else {
      setIsPlaying(!isPlaying)
    }

    // Simulate playback progress
    if (!isPlaying && currentSong === songId) {
      const interval = setInterval(() => {
        setPlaybackTime((prev) => {
          const newTime = prev + 1
          if (newTime >= song.totalSeconds) {
            setIsPlaying(false)
            clearInterval(interval)
            return 0
          }
          return newTime
        })
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && currentUser) {
      const newPhoto: Photo = {
        id: Date.now().toString(),
        url: URL.createObjectURL(file),
        caption: newPhotoCaption,
        uploadedBy: currentUser.name,
        uploadedAt: new Date().toISOString().split("T")[0],
      }
      setPhotos([...photos, newPhoto])
      setNewPhotoCaption("")
      toast({
        title: "Photo uploaded!",
        description: "Your photo has been added to the memorial.",
      })
    }
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && currentUser) {
      const newVideo: VideoMemory = {
        id: Date.now().toString(),
        url: URL.createObjectURL(file),
        title: newVideoTitle,
        description: newVideoDescription,
        uploadedBy: currentUser.name,
        uploadedAt: new Date().toISOString().split("T")[0],
      }
      setVideos([...videos, newVideo])
      setNewVideoTitle("")
      setNewVideoDescription("")
      toast({
        title: "Video uploaded!",
        description: "Your video has been added to the memorial.",
      })
    }
  }

  const handleAddStory = () => {
    if (!currentUser || !newStoryTitle.trim() || !newStoryContent.trim()) return

    const newStory: Story = {
      id: Date.now().toString(),
      title: newStoryTitle,
      content: newStoryContent,
      author: currentUser.name,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setStories([...stories, newStory])
    setNewStoryTitle("")
    setNewStoryContent("")
    toast({
      title: "Story added!",
      description: "Your story has been shared on the memorial.",
    })
  }

  const handleAddMessage = () => {
    if (!currentUser || !newMessageContent.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: newMessageContent,
      author: currentUser.name,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setMessages([...messages, newMessage])
    setNewMessageContent("")
    toast({
      title: "Message added!",
      description: "Your message has been added to the memorial.",
    })
  }

  const canEdit = (authorName: string) => {
    return currentUser && (currentUser.name === authorName || currentUser.isFamily)
  }

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(photos.filter((p) => p.id !== photoId))
    toast({
      title: "Photo deleted",
      description: "The photo has been removed from the memorial.",
    })
  }

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter((v) => v.id !== videoId))
    toast({
      title: "Video deleted",
      description: "The video has been removed from the memorial.",
    })
  }

  const handleDeleteStory = (storyId: string) => {
    setStories(stories.filter((s) => s.id !== storyId))
    toast({
      title: "Story deleted",
      description: "The story has been removed from the memorial.",
    })
  }

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((m) => m.id !== messageId))
    toast({
      title: "Message deleted",
      description: "The message has been removed from the memorial.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Image
                src="/glenda-memorial-portrait.jpeg"
                alt="Glenda Jane Kelso"
                width={300}
                height={300}
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white shadow-2xl"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Glenda Jane Kelso</h1>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-xl">July 27, 1952 - August 27, 2025</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-xl">Cullman, AL</span>
                </div>
              </div>
              <p className="text-xl text-slate-200 mb-8 max-w-2xl">
                A life so beautifully lived deserves to be beautifully remembered. The heart of her home and a force of
                nature in the lives of all who knew her.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-red-500 text-white px-4 py-2 text-sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Beloved Wife
                </Badge>
                <Badge className="bg-blue-500 text-white px-4 py-2 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Devoted Mother
                </Badge>
                <Badge className="bg-green-500 text-white px-4 py-2 text-sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Cherished Grandmother
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Status Banner */}
      {!currentUser ? (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-yellow-800 font-medium">Are you a family member or friend of Glenda?</p>
                <p className="text-yellow-700 text-sm">
                  Sign in to add photos, videos, stories, and memories to this memorial.
                </p>
              </div>
              <Button onClick={() => setIsSignInOpen(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign In to Contribute
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border-b border-green-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-green-800 font-medium">
                  Welcome, {currentUser?.name}! ({currentUser?.relationship})
                </p>
                <p className="text-green-700 text-sm">
                  You can now add photos, videos, stories, and messages to honor Glenda's memory.
                </p>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About Glenda Jane Kelso</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  A life so beautifully lived deserves to be beautifully remembered. Today, we gather not only in sorrow
                  but in profound gratitude for the extraordinary woman we were blessed to know—Glenda Jane Kelso.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Glenda was the heart of her home and a force of nature in the lives of all who knew her. She left this
                  world as she lived in it: on her own terms, with a quick wit, and likely planning a joke we have yet
                  to discover. For 57 years, she was the devoted and loving partner to her husband, Lynn. She was a
                  selfless homemaker who dedicated her life to her children, Eddie and Penny, and to countless others
                  she welcomed into her heart and home as her own.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  To know Glenda was to be loved fiercely, laugh loudly, and feel truly spoiled. She was a woman of
                  beautiful contrasts: patient and kind, yet tough as nails. Her fanatic sense of humor was a light that
                  could cut through the hardest days, and her legendary chocolate gravy was a taste of her deep, abiding
                  love. She never let anyone forget who was really in charge, but she also never wavered in her loyalty,
                  sticking by her family even when the world said no.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Glenda found pure joy in the magic of the ordinary, especially when it brought smiles to the faces of
                  children. She delighted in dressing up for holidays, with Halloween holding a special place in her
                  heart, creating moments of wonder that will be cherished forever. Her happiness was found in the
                  noisy, loving chaos of being surrounded by family, though the steady chatter of the police scanner was
                  a close second.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  She was a curator of joy, a teller of hard truths, and the unwavering glue that held her family
                  together through good times and bad. Glenda's love was a vibrant tapestry woven with threads of
                  laughter, music, fierce protection, and an occasional, loving dose of stubbornness.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  We are certain that her reunion in Heaven with her beloved mother, Desmer, is filled with laughter and
                  a heavenly plan to keep a loving, watchful eye on us all.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Glenda's incredible legacy lives on in her husband, Lynn; her children, Eddie Kelso and Penny Collins;
                  her cherished grandchildren, Cole Collins, Kristin Kelso, Gracie Dean, Braxton Phillips, Weston Green,
                  Addalynn Rassman, Wrenley Hunter, and Ridge Thompson; her beautiful French daughter-in-love, Caroline;
                  her god-sent angels, Colton, Anzlie, and Remi; her children of the heart, Savannah (Bo) Pitts, Bama
                  Thompson, Taylor (Kelly) Hunter, and Jordan Thompson; and her special friends.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  We are fortunate, blessed, and endlessly grateful to have been loved by her. Though our hearts are
                  broken and we will miss her beyond measure, we find comfort in knowing that her spirit—her laughter,
                  her love, and her legendary chocolate gravy—will forever be a part of us.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Rest easy, dear Glenda. Your work here was a masterpiece.
                </p>

                <p className="text-lg leading-relaxed italic">
                  The family extends their deepest gratitude to the compassionate staff at Cullman Regional Medical
                  Center, Folsom Center Nursing Home, Cullman Dialysis Clinic, and Southern Care Hospice for the
                  dignity, kindness, and peace they provided in her final days.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Photo Gallery</h2>
                  <p className="text-gray-600">{photos.length} photos shared by family and friends</p>
                </div>
                {currentUser && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Camera className="h-4 w-4 mr-2" />
                        Add Photos
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Photos</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="photo-upload">Select Photos</Label>
                          <Input
                            id="photo-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            ref={photoInputRef}
                            onChange={handlePhotoUpload}
                          />
                        </div>
                        <div>
                          <Label htmlFor="photo-caption">Caption</Label>
                          <Textarea
                            id="photo-caption"
                            placeholder="Add a caption for these photos..."
                            value={newPhotoCaption}
                            onChange={(e) => setNewPhotoCaption(e.target.value)}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.caption}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                      {currentUser && canEdit(photo.uploadedBy) && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeletePhoto(photo.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700 mb-2">{photo.caption}</p>
                      <p className="text-xs text-gray-500">
                        Shared by {photo.uploadedBy} on {photo.uploadedAt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Video Memories</h2>
                  <p className="text-gray-600">{videos.length} videos shared by family and friends</p>
                </div>
                {currentUser && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Video className="h-4 w-4 mr-2" />
                        Add Video
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Video Memory</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="video-upload">Select Video</Label>
                          <Input
                            id="video-upload"
                            type="file"
                            accept="video/*"
                            ref={videoInputRef}
                            onChange={handleVideoUpload}
                          />
                          <p className="text-xs text-gray-500 mt-1">Supported formats: MP4, MOV, AVI (max 100MB)</p>
                        </div>
                        <div>
                          <Label htmlFor="video-title">Video Title</Label>
                          <Input
                            id="video-title"
                            placeholder="Give your video a title..."
                            value={newVideoTitle}
                            onChange={(e) => setNewVideoTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="video-description">Description</Label>
                          <Textarea
                            id="video-description"
                            placeholder="Tell us about this video memory..."
                            rows={3}
                            value={newVideoDescription}
                            onChange={(e) => setNewVideoDescription(e.target.value)}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden group">
                    <div className="relative">
                      <div className="video-container bg-black">
                        <video controls className="w-full h-full" poster="/placeholder.svg?height=300&width=400">
                          <source src={video.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      {currentUser && canEdit(video.uploadedBy) && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteVideo(video.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                      <p className="text-sm text-gray-700 mb-3">{video.description}</p>
                      <p className="text-xs text-gray-500">
                        Shared by {video.uploadedBy} on {video.uploadedAt}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="music">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Memorial Music</h2>
                  <p className="text-gray-600">Songs that were meaningful to Glenda</p>
                </div>
                {currentUser && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Music className="h-4 w-4 mr-2" />
                        Add Music
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Music</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="music-upload">Upload Audio File</Label>
                          <Input
                            id="music-upload"
                            type="file"
                            accept="audio/*"
                            onChange={() => {
                              toast({
                                title: "Music Added",
                                description: "Your music has been added to Glenda's memorial.",
                              })
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="music-title">Song Title</Label>
                          <Input id="music-title" placeholder="Enter song title..." />
                        </div>
                        <div>
                          <Label htmlFor="music-artist">Artist</Label>
                          <Input id="music-artist" placeholder="Enter artist name..." />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {songs.map((song) => (
                      <div key={song.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Button
                            size="sm"
                            variant={currentSong === song.id && isPlaying ? "default" : "outline"}
                            onClick={() => handlePlayPause(song.id)}
                          >
                            {currentSong === song.id && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <div>
                            <h4 className="font-medium">{song.title}</h4>
                            <p className="text-sm text-gray-600">{song.artist}</p>
                            {currentSong === song.id && (
                              <div className="text-xs text-gray-500 mt-1">
                                {isPlaying ? "Playing..." : "Paused"} - {formatTime(playbackTime)} / {song.duration}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" onClick={() => setIsMuted(!isMuted)}>
                              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={isMuted ? 0 : volume}
                              onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                              className="w-16"
                            />
                          </div>
                          <span className="text-sm text-gray-600">{song.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="family">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Family Tree</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyTree.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-lg">{member.name}</h4>
                        <p className="text-gray-600">{member.relation}</p>
                      </div>
                      {member.dates && <p className="text-sm text-gray-500">{member.dates}</p>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Stories & Memories</h2>
                  <p className="text-gray-600">{stories.length} stories shared by family and friends</p>
                </div>
                {currentUser && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Share a Story
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Share a Memory of Glenda</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
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
                            placeholder="Share your favorite memory of Glenda..."
                            rows={6}
                            value={newStoryContent}
                            onChange={(e) => setNewStoryContent(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleAddStory} className="w-full">
                          Share Story
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="space-y-4">
                {stories.map((story) => (
                  <Card key={story.id} className="group">
                    <CardHeader className="flex flex-row items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          By {story.author} on {story.createdAt}
                        </p>
                      </div>
                      {currentUser && canEdit(story.author) && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteStory(story.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{story.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Messages of Condolence</h2>
                  <p className="text-gray-600">{messages.length} messages from family and friends</p>
                </div>
                {currentUser && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Leave a Message
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Leave a Message for the Family</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="message-content">Your Message</Label>
                          <Textarea
                            id="message-content"
                            placeholder="Share your condolences or a message for the family..."
                            rows={4}
                            value={newMessageContent}
                            onChange={(e) => setNewMessageContent(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleAddMessage} className="w-full">
                          Post Message
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id} className="group">
                    <CardHeader className="flex flex-row items-start justify-between">
                      <p className="text-sm text-gray-600">
                        By {message.author} on {message.createdAt}
                      </p>
                      {currentUser && canEdit(message.author) && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteMessage(message.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{message.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share Memorial
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download QR Code
          </Button>
          <Button asChild>
            <Link href="/pricing">Create Your Own Memorial</Link>
          </Button>
        </div>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In to Contribute</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="signin-name">Your Name</Label>
              <Input
                id="signin-name"
                placeholder="Enter your full name"
                value={signInName}
                onChange={(e) => setSignInName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="signin-relationship">Relationship to Glenda</Label>
              <Input
                id="signin-relationship"
                placeholder="e.g., Daughter, Son, Friend, Neighbor, Coworker"
                value={signInRelationship}
                onChange={(e) => setSignInRelationship(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="signin-email">Email (optional)</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="your.email@example.com"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleSignIn} className="w-full">
              Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
