"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createTestMemorialSimple } from "@/app/actions/create-test-memorial-simple"
import { uploadMemorialMedia } from "@/app/actions/upload-memorial-media"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Info, AlertCircle } from "lucide-react"
import Link from "next/link"
import { memorialTemplates } from "@/lib/memorial-templates"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { FileUploadField } from "./file-upload-field"

export function TestMemorialForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdMemorialId, setCreatedMemorialId] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("veteran")
  const [activeTab, setActiveTab] = useState<string>("template")
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    deathDate: "",
    birthLocation: "",
    deathLocation: "",
    bio: "",
  })

  // State for file uploads
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [selectedVideos, setSelectedVideos] = useState<File[]>([])

  // Update form data when template changes
  useEffect(() => {
    const template = memorialTemplates.find((t) => t.id === selectedTemplate)
    if (template) {
      setFormData({
        name: template.data.name,
        birthDate: template.data.birthDate,
        deathDate: template.data.deathDate,
        birthLocation: template.data.birthLocation,
        deathLocation: template.data.deathLocation,
        bio: template.data.bio,
      })
    }
  }, [selectedTemplate])

  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log("Form submitted with data:", formData)

    try {
      console.log("Calling createTestMemorialSimple action...")
      const result = await createTestMemorialSimple({
        name: formData.name,
        birth_date: formData.birthDate,
        death_date: formData.deathDate,
        birth_location: formData.birthLocation,
        death_location: formData.deathLocation,
        bio: formData.bio,
        template_id: activeTab === "template" ? selectedTemplate : undefined,
      })

      console.log("Action result:", result)

      if (result.error) {
        console.error("Error from server action:", result.error)

        // Check if the error is about authentication
        if (result.error.includes("No valid user found")) {
          toast({
            title: "Authentication Required",
            description: "Please log in to create a test memorial.",
            variant: "destructive",
          })
          // Redirect to login page after a short delay
          setTimeout(() => {
            router.push("/login?redirect=/test-memorial")
          }, 2000)
        } else {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          })
        }

        setIsSubmitting(false)
        return
      }

      // Store the memorial ID
      setCreatedMemorialId(result.memorialId)

      // If there are uploaded files, handle them
      if ((selectedImages.length > 0 || selectedVideos.length > 0) && result.memorialId) {
        setUploadingMedia(true)

        // Create FormData for file upload
        const uploadFormData = new FormData()
        uploadFormData.append("memorialId", result.memorialId)

        // Add all images and videos to the form data
        const allFiles = [...selectedImages, ...selectedVideos]
        allFiles.forEach((file) => {
          uploadFormData.append("files", file)
        })

        // Upload the files
        const uploadResult = await uploadMemorialMedia(uploadFormData)

        if (uploadResult.error) {
          console.error("Error uploading media:", uploadResult.error)
          toast({
            title: "Media Upload Warning",
            description: "Memorial was created but there was an issue uploading media: " + uploadResult.error,
            variant: "warning",
          })
        } else {
          console.log("Media uploaded successfully:", uploadResult)
        }

        setUploadingMedia(false)
      }

      toast({
        title: "Test Memorial Created",
        description: "Your test memorial has been created successfully.",
      })

      // Redirect to the new memorial with a longer delay to ensure data is available
      console.log("Will redirect to:", `/memorial/${result.memorialId}`)

      // Add a longer delay before redirecting to ensure the data is available
      setTimeout(() => {
        router.push(`/memorial/${result.memorialId}`)
      }, 3000)
    } catch (error) {
      console.error("Error creating test memorial:", error)
      toast({
        title: "Error",
        description: "There was a problem creating your test memorial. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const currentTemplate = memorialTemplates.find((t) => t.id === selectedTemplate)

  return (
    <Card className="p-6">
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
        <Info className="text-yellow-800 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
        <div className="text-yellow-800">
          <p className="font-medium mb-1">Test Memorial Creator</p>
          <p className="text-sm">
            Choose a template or upload your own media to create a test memorial. You can customize any of the fields
            before creating the memorial.
          </p>
        </div>
      </div>

      {createdMemorialId && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 font-medium">Memorial created successfully!</p>
          <p className="text-green-700 text-sm mt-1">
            Memorial ID: {createdMemorialId}. You will be redirected to the memorial page in a few seconds.
          </p>
          {uploadingMedia && (
            <div className="mt-2">
              <p className="text-sm text-green-700">Uploading your media files...</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>
          )}
          <div className="mt-3 flex flex-col space-y-2">
            <p className="text-sm text-green-700">
              <AlertCircle className="inline-block mr-1 h-4 w-4" /> If the page doesn't load automatically, please click
              the button below:
            </p>
            <Link href={`/memorial/${createdMemorialId}`}>
              <Button variant="outline" size="sm" className="bg-white">
                Go to Memorial Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="template" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="template">Use Template</TabsTrigger>
            <TabsTrigger value="custom">Custom Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4 pt-4">
            <div>
              <Label className="text-lg font-medium mb-2 block">Choose a Template</Label>
              <RadioGroup
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {memorialTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <RadioGroupItem value={template.id} id={template.id} className="sr-only" />
                    <Label htmlFor={template.id} className="cursor-pointer block h-full">
                      <div className="font-medium text-lg mb-1">{template.name}</div>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {currentTemplate && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-lg mb-2">{currentTemplate.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{currentTemplate.description}</p>
                <div className="flex flex-wrap gap-2">
                  {currentTemplate.data.imageUrls.slice(0, 3).map((url, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden">
                      <Image
                        src={url || "/placeholder.svg?height=80&width=80"}
                        alt={`Preview ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 pt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Upload Your Own Media</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload your own images and videos to create a personalized memorial.
              </p>

              <div className="space-y-6">
                <FileUploadField
                  label="Upload Images"
                  accept="image/*"
                  onChange={setSelectedImages}
                  multiple={true}
                  maxFiles={10}
                />

                <FileUploadField
                  label="Upload Videos"
                  accept="video/*"
                  onChange={setSelectedVideos}
                  multiple={true}
                  maxFiles={3}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthDate">Birth Date</Label>
              <Input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="deathDate">Death Date</Label>
              <Input id="deathDate" name="deathDate" type="date" value={formData.deathDate} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthLocation">Birth Location</Label>
              <Input id="birthLocation" name="birthLocation" value={formData.birthLocation} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="deathLocation">Death Location</Label>
              <Input id="deathLocation" name="deathLocation" value={formData.deathLocation} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Biography</Label>
            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={6} />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/login?redirect=/test-memorial">
            <Button type="button" variant="outline">
              Log In First
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || !!createdMemorialId}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Test Memorial"
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
