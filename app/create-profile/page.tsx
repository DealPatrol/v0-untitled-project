"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { User, Heart, Camera, FileText, ArrowRight, ArrowLeft, Upload, Plus, X } from "lucide-react"

const steps = [
  { id: 1, title: "Basic Information", icon: User },
  { id: 2, title: "Life Details", icon: Heart },
  { id: 3, title: "Photos & Media", icon: Camera },
  { id: 4, title: "Story & Biography", icon: FileText },
]

export default function CreateProfile() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([])
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    firstName: "",
    lastName: "",
    birthDate: "",
    deathDate: "",
    birthPlace: "",
    deathPlace: "",

    // Step 2: Life Details
    occupation: "",
    education: "",
    militaryService: "",
    hobbies: "",
    achievements: "",
    familyMembers: [""],

    // Step 3: Photos & Media
    profilePhoto: null as File | null,
    additionalPhotos: [] as File[],

    // Step 4: Story & Biography
    biography: "",
    favoriteMemories: "",
    personalityTraits: "",
    legacyMessage: "",

    // Privacy Settings
    isPublic: true,
    allowComments: true,
    allowPhotoUploads: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFamilyMemberChange = (index: number, value: string) => {
    const newFamilyMembers = [...formData.familyMembers]
    newFamilyMembers[index] = value
    setFormData((prev) => ({ ...prev, familyMembers: newFamilyMembers }))
  }

  const addFamilyMember = () => {
    setFormData((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, ""],
    }))
  }

  const removeFamilyMember = (index: number) => {
    const newFamilyMembers = formData.familyMembers.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, familyMembers: newFamilyMembers }))
  }

  const handlePhotoUpload = (files: FileList | null, isProfile = false) => {
    if (!files) return

    const newFiles = Array.from(files)

    if (isProfile && newFiles.length > 0) {
      setFormData((prev) => ({ ...prev, profilePhoto: newFiles[0] }))
    } else {
      setFormData((prev) => ({
        ...prev,
        additionalPhotos: [...prev.additionalPhotos, ...newFiles],
      }))
      setUploadedPhotos((prev) => [...prev, ...newFiles])
    }

    toast({
      title: "Photos Uploaded",
      description: `${newFiles.length} photo(s) added successfully.`,
    })
  }

  const removePhoto = (index: number, isProfile = false) => {
    if (isProfile) {
      setFormData((prev) => ({ ...prev, profilePhoto: null }))
    } else {
      const newPhotos = formData.additionalPhotos.filter((_, i) => i !== index)
      setFormData((prev) => ({ ...prev, additionalPhotos: newPhotos }))
      setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Memorial Profile Created!",
      description: "Your memorial profile has been created successfully. You can now view and share it.",
    })

    // Redirect to memorial page or dashboard
    setTimeout(() => {
      router.push("/memorial/sample-memorial")
    }, 1500)
  }

  const progress = (currentStep / steps.length) * 100
  const CurrentStepIcon = steps[currentStep - 1].icon

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Create Memorial Profile</h1>
              <span className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </span>
            </div>

            <Progress value={progress} className="mb-4" />

            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                return (
                  <div key={step.id} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        currentStep >= step.id
                          ? "bg-purple-600 border-purple-600 text-white"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        currentStep >= step.id ? "text-purple-600" : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.id ? "bg-purple-600" : "bg-gray-300"}`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrentStepIcon className="w-5 h-5" />
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="birthDate">Birth Date *</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="deathDate">Date of Passing *</Label>
                      <Input
                        id="deathDate"
                        type="date"
                        value={formData.deathDate}
                        onChange={(e) => handleInputChange("deathDate", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="birthPlace">Place of Birth</Label>
                      <Input
                        id="birthPlace"
                        value={formData.birthPlace}
                        onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deathPlace">Place of Passing</Label>
                      <Input
                        id="deathPlace"
                        value={formData.deathPlace}
                        onChange={(e) => handleInputChange("deathPlace", e.target.value)}
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Life Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={formData.occupation}
                        onChange={(e) => handleInputChange("occupation", e.target.value)}
                        placeholder="Primary occupation or career"
                      />
                    </div>
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        placeholder="Schools attended, degrees earned"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="militaryService">Military Service</Label>
                    <Input
                      id="militaryService"
                      value={formData.militaryService}
                      onChange={(e) => handleInputChange("militaryService", e.target.value)}
                      placeholder="Branch, rank, years of service (if applicable)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hobbies">Hobbies & Interests</Label>
                    <Textarea
                      id="hobbies"
                      value={formData.hobbies}
                      onChange={(e) => handleInputChange("hobbies", e.target.value)}
                      placeholder="What did they love to do in their free time?"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="achievements">Notable Achievements</Label>
                    <Textarea
                      id="achievements"
                      value={formData.achievements}
                      onChange={(e) => handleInputChange("achievements", e.target.value)}
                      placeholder="Awards, accomplishments, things they were proud of"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Family Members</Label>
                    <div className="space-y-3">
                      {formData.familyMembers.map((member, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={member}
                            onChange={(e) => handleFamilyMemberChange(index, e.target.value)}
                            placeholder="Name and relationship (e.g., John Smith - Son)"
                            className="flex-1"
                          />
                          {formData.familyMembers.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              onClick={() => removeFamilyMember(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addFamilyMember}
                        className="w-full bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Family Member
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Photos & Media */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label>Profile Photo *</Label>
                    <p className="text-sm text-gray-600 mb-3">Choose a main photo that will represent your loved one</p>

                    {formData.profilePhoto ? (
                      <div className="relative inline-block">
                        <img
                          src={URL.createObjectURL(formData.profilePhoto) || "/placeholder.svg"}
                          alt="Profile"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 w-6 h-6"
                          onClick={() => removePhoto(0, true)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <Label htmlFor="profilePhoto" className="cursor-pointer">
                          <span className="text-purple-600 hover:text-purple-700 font-medium">
                            Click to upload profile photo
                          </span>
                          <Input
                            id="profilePhoto"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(e.target.files, true)}
                          />
                        </Label>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Additional Photos</Label>
                    <p className="text-sm text-gray-600 mb-3">Add more photos to create a beautiful gallery</p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <Label htmlFor="additionalPhotos" className="cursor-pointer">
                        <span className="text-purple-600 hover:text-purple-700 font-medium">
                          Click to upload photos
                        </span>
                        <Input
                          id="additionalPhotos"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => handlePhotoUpload(e.target.files)}
                        />
                      </Label>
                      <p className="text-sm text-gray-500 mt-2">Select multiple photos at once</p>
                    </div>

                    {formData.additionalPhotos.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.additionalPhotos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo) || "/placeholder.svg"}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 w-6 h-6"
                              onClick={() => removePhoto(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Story & Biography */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="biography">Life Story & Biography</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Tell the story of their life - their journey, accomplishments, and what made them special
                    </p>
                    <Textarea
                      id="biography"
                      value={formData.biography}
                      onChange={(e) => handleInputChange("biography", e.target.value)}
                      placeholder="Share their life story, from childhood to their final days..."
                      rows={6}
                    />
                  </div>

                  <div>
                    <Label htmlFor="favoriteMemories">Favorite Memories</Label>
                    <p className="text-sm text-gray-600 mb-3">Share some of your favorite memories with them</p>
                    <Textarea
                      id="favoriteMemories"
                      value={formData.favoriteMemories}
                      onChange={(e) => handleInputChange("favoriteMemories", e.target.value)}
                      placeholder="What are some of your most cherished memories together?"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="personalityTraits">Personality & Character</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Describe their personality, character traits, and what made them unique
                    </p>
                    <Textarea
                      id="personalityTraits"
                      value={formData.personalityTraits}
                      onChange={(e) => handleInputChange("personalityTraits", e.target.value)}
                      placeholder="What kind of person were they? What made them special?"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="legacyMessage">Legacy Message</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      A final message about their legacy and how they'll be remembered
                    </p>
                    <Textarea
                      id="legacyMessage"
                      value={formData.legacyMessage}
                      onChange={(e) => handleInputChange("legacyMessage", e.target.value)}
                      placeholder="How do you want them to be remembered? What legacy did they leave behind?"
                      rows={4}
                    />
                  </div>

                  {/* Privacy Settings */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isPublic"
                          checked={formData.isPublic}
                          onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                        />
                        <Label htmlFor="isPublic" className="text-sm">
                          Make this memorial public (anyone with the QR code can view it)
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowComments"
                          checked={formData.allowComments}
                          onCheckedChange={(checked) => handleInputChange("allowComments", checked)}
                        />
                        <Label htmlFor="allowComments" className="text-sm">
                          Allow visitors to leave comments and messages
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowPhotoUploads"
                          checked={formData.allowPhotoUploads}
                          onCheckedChange={(checked) => handleInputChange("allowPhotoUploads", checked)}
                        />
                        <Label htmlFor="allowPhotoUploads" className="text-sm">
                          Allow family and friends to upload additional photos
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    {isSubmitting ? "Creating Memorial..." : "Create Memorial"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
