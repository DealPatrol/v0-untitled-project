"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
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
  MessageCircle,
  Users,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  Camera,
  Music,
} from "lucide-react"

export default function GlendaMemorial() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [stories, setStories] = useState<
    Array<{ id: number; author: string; title: string; content: string; date: string }>
  >([])
  const [messages, setMessages] = useState<Array<{ id: number; author: string; content: string; date: string }>>([])
  const [photos, setPhotos] = useState([
    { src: "/glenda-memorial-portrait.jpeg", caption: "Glenda in her favorite garden" },
    { src: "/glenda-garden-couple.jpeg", caption: "With her beloved husband in their garden" },
    { src: "/glenda-christmas-daughter.jpeg", caption: "Christmas morning with her daughter" },
    { src: "/glenda-hospital-visit.jpeg", caption: "Visiting friends at the hospital" },
    { src: "/glenda-family-baseball.jpeg", caption: "Family baseball game" },
    { src: "/glenda-restaurant-couple.jpeg", caption: "Anniversary dinner" },
    { src: "/glenda-hospital-bedside.jpeg", caption: "Comforting a patient" },
    { src: "/glenda-beach-walk.jpeg", caption: "Beach walk with family" },
  ])
  const [currentUser, setCurrentUser] = useState("")
  const { toast } = useToast()

  const songs = [
    { title: "Amazing Grace", artist: "Traditional", duration: "3:45", totalSeconds: 225 },
    { title: "How Great Thou Art", artist: "Traditional", duration: "4:12", totalSeconds: 252 },
    { title: "In the Garden", artist: "Traditional", duration: "3:28", totalSeconds: 208 },
  ]

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

  const handleSignIn = (name: string) => {
    setCurrentUser(name)
    setIsSignedIn(true)
    setShowSignIn(false)
    toast({
      title: "Welcome!",
      description: `You're now signed in as ${name}. You can now contribute to Glenda's memorial.`,
    })
  }

  const handlePlayPause = (songIndex: number) => {
    if (currentSong !== songIndex) {
      setCurrentSong(songIndex)
      setIsPlaying(true)
      setPlaybackTime(0)
      toast({
        title: "Now Playing",
        description: `${songs[songIndex].title} by ${songs[songIndex].artist}`,
      })
    } else {
      setIsPlaying(!isPlaying)
      if (!isPlaying) {
        toast({
          title: "Music Resumed",
          description: `${songs[songIndex].title}`,
        })
      } else {
        toast({
          title: "Music Paused",
          description: `${songs[songIndex].title}`,
        })
      }
    }

    // Simulate playback progress
    if (!isPlaying && currentSong === songIndex) {
      const interval = setInterval(() => {
        setPlaybackTime((prev) => {
          const newTime = prev + 1
          if (newTime >= songs[songIndex].totalSeconds) {
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

  const handleAddStory = (title: string, content: string) => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and story content.",
        variant: "destructive",
      })
      return
    }

    const newStory = {
      id: Date.now(),
      author: currentUser,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString(),
    }

    setStories([...stories, newStory])
    toast({
      title: "Story Added",
      description: "Your story has been added to Glenda's memorial.",
    })

    // Clear the form
    const titleInput = document.getElementById("story-title") as HTMLInputElement
    const contentInput = document.getElementById("story-content") as HTMLTextAreaElement
    if (titleInput) titleInput.value = ""
    if (contentInput) contentInput.value = ""
  }

  const handleAddMessage = (content: string) => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message.",
        variant: "destructive",
      })
      return
    }

    const newMessage = {
      id: Date.now(),
      author: currentUser,
      content: content.trim(),
      date: new Date().toLocaleDateString(),
    }

    setMessages([...messages, newMessage])
    toast({
      title: "Message Added",
      description: "Your message has been added to Glenda's memorial.",
    })

    // Clear the form
    const messageInput = document.getElementById("message-content") as HTMLTextAreaElement
    if (messageInput) messageInput.value = ""
  }

  const handleAddPhoto = (files: FileList | null, caption: string) => {
    if (!files || files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one photo.",
        variant: "destructive",
      })
      return
    }

    // Simulate photo upload
    Array.from(files).forEach((file) => {
      const newPhoto = {
        src: URL.createObjectURL(file),
        caption: caption || `Photo added by ${currentUser}`,
      }
      setPhotos([...photos, newPhoto])
    })

    toast({
      title: "Photos Added",
      description: `${files.length} photo(s) have been added to Glenda's memorial.`,
    })

    // Clear the form
    const photoInput = document.getElementById("photo-upload") as HTMLInputElement
    const captionInput = document.getElementById("photo-caption") as HTMLTextAreaElement
    if (photoInput) photoInput.value = ""
    if (captionInput) captionInput.value = ""
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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

      {/* Sign In Section */}
      {!isSignedIn && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-yellow-800 font-medium">Are you a family member or friend of Glenda?</p>
                <p className="text-yellow-700 text-sm">
                  Sign in to add photos, stories, and memories to this memorial.
                </p>
              </div>
              <Button onClick={() => setShowSignIn(true)} className="bg-yellow-600 hover:bg-yellow-700 text-white">
                Sign In to Contribute
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
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
                <h2 className="text-2xl font-bold">Photo Gallery</h2>
                {isSignedIn && (
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
                            onChange={(e) => {
                              const caption =
                                (document.getElementById("photo-caption") as HTMLTextAreaElement)?.value || ""
                              handleAddPhoto(e.target.files, caption)
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="photo-caption">Caption (optional)</Label>
                          <Textarea id="photo-caption" placeholder="Add a caption for these photos..." />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.caption}
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600">{photo.caption}</p>
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
                {isSignedIn && (
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
                    {songs.map((song, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Button
                            size="sm"
                            variant={currentSong === index && isPlaying ? "default" : "outline"}
                            onClick={() => handlePlayPause(index)}
                          >
                            {currentSong === index && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                          <div>
                            <h4 className="font-medium">{song.title}</h4>
                            <p className="text-sm text-gray-600">{song.artist}</p>
                            {currentSong === index && (
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
                <h2 className="text-2xl font-bold">Stories & Memories</h2>
                {isSignedIn && (
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
                          <Input id="story-title" placeholder="Give your story a title..." />
                        </div>
                        <div>
                          <Label htmlFor="story-content">Your Story</Label>
                          <Textarea id="story-content" placeholder="Share your favorite memory of Glenda..." rows={6} />
                        </div>
                        <Button
                          onClick={() => {
                            const title = (document.getElementById("story-title") as HTMLInputElement)?.value || ""
                            const content =
                              (document.getElementById("story-content") as HTMLTextAreaElement)?.value || ""
                            handleAddStory(title, content)
                          }}
                          className="w-full"
                        >
                          Share Story
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {stories.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Stories Yet</h3>
                    <p className="text-gray-500 mb-6">Be the first to share a memory of Glenda</p>
                    {!isSignedIn && <Button onClick={() => setShowSignIn(true)}>Sign In to Share a Story</Button>}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {stories.map((story) => (
                    <Card key={story.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <p className="text-sm text-gray-600">
                          By {story.author} on {story.date}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{story.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold">Messages of Condolence</h2>
                {isSignedIn && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <MessageCircle className="h-4 w-4 mr-2" />
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
                          />
                        </div>
                        <Button
                          onClick={() => {
                            const content =
                              (document.getElementById("message-content") as HTMLTextAreaElement)?.value || ""
                            handleAddMessage(content)
                          }}
                          className="w-full"
                        >
                          Post Message
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {messages.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-600 mb-2">No Messages Yet</h3>
                    <p className="text-gray-500 mb-6">Be the first to leave a message for the family</p>
                    {!isSignedIn && <Button onClick={() => setShowSignIn(true)}>Sign In to Leave a Message</Button>}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id}>
                      <CardHeader>
                        <p className="text-sm text-gray-600">
                          By {message.author} on {message.date}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{message.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In to Contribute</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="signin-name">Your Name</Label>
              <Input id="signin-name" placeholder="Enter your full name" />
            </div>
            <div>
              <Label htmlFor="signin-relationship">Relationship to Glenda</Label>
              <Input id="signin-relationship" placeholder="e.g., Daughter, Friend, Neighbor" />
            </div>
            <Button
              onClick={() => {
                const name = (document.getElementById("signin-name") as HTMLInputElement)?.value?.trim()
                if (name) {
                  handleSignIn(name)
                } else {
                  toast({
                    title: "Error",
                    description: "Please enter your name.",
                    variant: "destructive",
                  })
                }
              }}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
