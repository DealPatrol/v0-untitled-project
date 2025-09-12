"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Share2,
  Calendar,
  MapPin,
  Users,
  Play,
  Pause,
  MessageSquare,
  BookOpen,
  Camera,
  Mic,
  UserPlus,
  Download,
} from "lucide-react"

export default function GlendaMemorial() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const { toast } = useToast()

  const songs = [
    { title: "Amazing Grace", artist: "Traditional", duration: "3:24" },
    { title: "How Great Thou Art", artist: "Traditional", duration: "4:12" },
    { title: "In the Sweet By and By", artist: "Traditional", duration: "2:58" },
  ]

  const handleSignIn = (name: string) => {
    setCurrentUser(name)
    setIsSignedIn(true)
    toast({
      title: "Welcome!",
      description: `You're now signed in as ${name}. You can now contribute to Glenda's memorial.`,
    })
  }

  const handleAddComment = (comment: string) => {
    toast({
      title: "Comment Added",
      description: "Your comment has been added to Glenda's memorial.",
    })
  }

  const handleAddStory = (story: string) => {
    toast({
      title: "Story Added",
      description: "Your story has been added to Glenda's memorial.",
    })
  }

  const handleFileUpload = (type: string) => {
    toast({
      title: "Upload Successful",
      description: `Your ${type} has been uploaded to Glenda's memorial.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <Image
                src="/glenda-memorial-portrait.jpeg"
                alt="Glenda Kelso"
                width={300}
                height={400}
                className="w-64 h-80 sm:w-72 sm:h-96 object-cover rounded-lg shadow-2xl border-4 border-white"
              />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Glenda Kelso</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 text-lg">
                <div className="flex items-center justify-center lg:justify-start">
                  <Calendar className="h-5 w-5 mr-2" />
                  July 27, 1952 - August 27, 2025
                </div>
                <div className="flex items-center justify-center lg:justify-start">
                  <MapPin className="h-5 w-5 mr-2" />
                  Cullman, AL
                </div>
              </div>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl">
                Beloved mother, grandmother, and friend who touched countless lives with her kindness, wisdom, and
                unwavering love for her family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Heart className="h-5 w-5 mr-2" />
                  Leave a Tribute
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Memorial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Section */}
      {!isSignedIn && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-yellow-800 font-medium">Are you a family member or friend of Glenda?</p>
                <p className="text-yellow-700 text-sm">
                  Sign in to add photos, stories, and memories to this memorial.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign In to Contribute
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign In to Contribute</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const name = (e.target as HTMLInputElement).value
                            if (name.trim()) {
                              handleSignIn(name.trim())
                            }
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship to Glenda</Label>
                      <Input id="relationship" placeholder="e.g., Daughter, Friend, Neighbor" />
                    </div>
                    <Button
                      onClick={() => {
                        const nameInput = document.getElementById("name") as HTMLInputElement
                        const name = nameInput?.value?.trim()
                        if (name) {
                          handleSignIn(name)
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
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>About Glenda</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Glenda Kelso was born on July 27, 1952, in Cullman, Alabama, where she spent her entire life
                  surrounded by the love of family and friends. She was a devoted mother, cherished grandmother, and
                  loyal friend who touched the lives of everyone she met with her warm smile and generous heart.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Throughout her 73 years, Glenda exemplified the values of kindness, compassion, and unwavering
                  dedication to her family. She had a special gift for making everyone feel welcome in her home, and her
                  kitchen was always filled with the aroma of her famous homemade biscuits and the sound of laughter.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Glenda was preceded in death by her beloved mother, Desmer McAnnally, who was her constant companion
                  and source of strength throughout her life. The bond between mother and daughter was unbreakable, and
                  Glenda often spoke of the wisdom and love her mama shared with her.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  On August 27, 2025, Glenda peacefully passed away, leaving behind a legacy of love that will continue
                  to inspire all who knew her. While we mourn her passing, we find comfort in knowing that she is now
                  reunited with her mama, Desmer McAnnally, in Heaven, where they can continue their eternal bond of
                  love.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                          onChange={() => handleFileUpload("photos")}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { src: "/glenda-memorial-portrait.jpeg", caption: "Glenda's beautiful smile" },
                { src: "/glenda-garden-couple.jpeg", caption: "In the garden with loved ones" },
                { src: "/glenda-christmas-daughter.jpeg", caption: "Christmas memories" },
                { src: "/glenda-hospital-visit.jpeg", caption: "Family visit" },
                { src: "/glenda-family-baseball.jpeg", caption: "Family baseball game" },
                { src: "/glenda-restaurant-couple.jpeg", caption: "Dinner out" },
                { src: "/glenda-hospital-bedside.jpeg", caption: "Surrounded by love" },
                { src: "/glenda-beach-walk.jpeg", caption: "Beach walk" },
                { src: "/glenda-hospital-final.jpeg", caption: "Final moments together" },
              ].map((photo, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.caption}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">{photo.caption}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                      <DialogTitle>Share a Story About Glenda</DialogTitle>
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
                      <div className="flex gap-2">
                        <Button onClick={() => handleAddStory("story")} className="flex-1">
                          Share Story
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Stories Yet</h3>
              <p className="text-gray-600 mb-4">
                Be the first to share a story about Glenda's life and the memories you cherish.
              </p>
              {!isSignedIn && (
                <p className="text-sm text-gray-500">Sign in above to share your stories and memories.</p>
              )}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Messages & Condolences</h2>
              {isSignedIn && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Leave a Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Leave a Message</DialogTitle>
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
                      <Button onClick={() => handleAddComment("message")} className="w-full">
                        Post Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages Yet</h3>
              <p className="text-gray-600 mb-4">
                Be the first to leave a message of condolence or share your thoughts about Glenda.
              </p>
              {!isSignedIn && <p className="text-sm text-gray-500">Sign in above to leave messages and condolences.</p>}
            </div>
          </TabsContent>

          {/* Music Tab */}
          <TabsContent value="music" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold">Memorial Music</h2>
              {isSignedIn && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Mic className="h-4 w-4 mr-2" />
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
                          onChange={() => handleFileUpload("music")}
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

            <div className="space-y-4">
              {songs.map((song, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          size="sm"
                          variant={currentSong === index && isPlaying ? "default" : "outline"}
                          onClick={() => {
                            setCurrentSong(index)
                            setIsPlaying(!isPlaying)
                          }}
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
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{song.duration}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Family Tab */}
          <TabsContent value="family" className="space-y-6">
            <h2 className="text-2xl font-bold">Family Tree</h2>

            <div className="space-y-8">
              {/* Preceded in Death */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preceded in Death</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">Desmer McAnnally</h4>
                      <p className="text-sm text-gray-600">Mother</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Survived By */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Survived By</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Family Information Private</h3>
                    <p className="text-gray-600">Family members can sign in to add and view family information.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Code Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Share This Memorial</h2>
          <p className="text-gray-600 mb-8">
            Use this QR code to easily share Glenda's memorial with family and friends
          </p>
          <div className="inline-block p-6 bg-white rounded-lg shadow-lg">
            <Image src="/qr-code-sample.png" alt="Memorial QR Code" width={200} height={200} className="mx-auto" />
            <Button className="mt-4 bg-transparent" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
