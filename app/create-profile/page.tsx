"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import {
  User,
  MapPin,
  Heart,
  Camera,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Check,
  Star,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  // Step 1: Basic Information
  firstName: string
  lastName: string
  middleName: string
  nickname: string
  birthDate: string
  deathDate: string
  birthPlace: string
  deathPlace: string
  age: string

  // Step 2: Photos
  profilePhoto: File | null
  additionalPhotos: File[]

  // Step 3: Life Story
  biography: string
  occupation: string
  education: string
  achievements: string[]
  hobbies: string[]
  favoriteQuote: string

  // Step 4: Family & Relationships
  spouse: string
  children: string[]
  parents: string
  siblings: string[]
  grandchildren: string[]

  // Step 5: Memorial Settings
  isPublic: boolean
  allowMessages: boolean
  moderateMessages: boolean
  notificationEmail: string

  // Step 6: Contact & Shipping
  contactName: string
  contactEmail: string
  contactPhone: string
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickname: "",
  birthDate: "",
  deathDate: "",
  birthPlace: "",
  deathPlace: "",
  age: "",
  profilePhoto: null,
  additionalPhotos: [],
  biography: "",
  occupation: "",
  education: "",
  achievements: [],
  hobbies: [],
  favoriteQuote: "",
  spouse: "",
  children: [],
  parents: "",
  siblings: [],
  grandchildren: [],
  isPublic: true,
  allowMessages: true,
  moderateMessages: true,
  notificationEmail: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  shippingAddress: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  },
}

export default function CreateProfilePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormData] as any),
        [field]: value,
      },
    }))
  }

  const addToArray = (field: string, value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field as keyof FormData] as string[]), value.trim()],
      }))
    }
  }

  const removeFromArray = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof FormData] as string[]).filter((_, i) => i !== index),
    }))
  }

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      if (field === "profilePhoto") {
        updateFormData(field, files[0])
      } else if (field === "additionalPhotos") {
        const newPhotos = Array.from(files)
        updateFormData(field, [...formData.additionalPhotos, ...newPhotos])
      }
    }
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalPhotos: prev.additionalPhotos.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
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
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast({
      title: "Memorial Created Successfully!",
      description: "Your memorial is being processed. You'll receive an email confirmation shortly.",
    })

    setIsSubmitting(false)
    // Redirect to success page or payment
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              <p className="text-gray-600">Tell us about your loved one</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => updateFormData("middleName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => updateFormData("nickname", e.target.value)}
                  placeholder="e.g., Bob, Grandma, Coach"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthDate">Birth Date *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateFormData("birthDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="deathDate">Death Date *</Label>
                <Input
                  id="deathDate"
                  type="date"
                  value={formData.deathDate}
                  onChange={(e) => updateFormData("deathDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthPlace">Birth Place</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => updateFormData("birthPlace", e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label htmlFor="deathPlace">Death Place</Label>
                <Input
                  id="deathPlace"
                  value={formData.deathPlace}
                  onChange={(e) => updateFormData("deathPlace", e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Camera className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
              <p className="text-gray-600">Share their most cherished moments</p>
            </div>

            {/* Profile Photo */}
            <div>
              <Label>Profile Photo *</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {formData.profilePhoto ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(formData.profilePhoto) || "/placeholder.svg"}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                    <Button variant="outline" onClick={() => updateFormData("profilePhoto", null)}>
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload their main profile photo</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload("profilePhoto", e.target.files)}
                      className="hidden"
                      id="profilePhoto"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="profilePhoto" className="cursor-pointer">
                        Choose Photo
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Photos */}
            <div>
              <Label>Additional Photos</Label>
              <p className="text-sm text-gray-600 mb-2">Add more photos to create a beautiful gallery</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.additionalPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`Additional ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload("additionalPhotos", e.target.files)}
                  className="hidden"
                  id="additionalPhotos"
                />
                <Button asChild variant="outline">
                  <label htmlFor="additionalPhotos" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Add More Photos
                  </label>
                </Button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Life Story</h2>
              <p className="text-gray-600">Share their journey and accomplishments</p>
            </div>

            <div>
              <Label htmlFor="biography">Biography *</Label>
              <Textarea
                id="biography"
                value={formData.biography}
                onChange={(e) => updateFormData("biography", e.target.value)}
                rows={6}
                placeholder="Tell their story... their passions, achievements, what made them special..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => updateFormData("occupation", e.target.value)}
                  placeholder="e.g., Teacher, Engineer, Homemaker"
                />
              </div>
              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => updateFormData("education", e.target.value)}
                  placeholder="e.g., Harvard University, Class of 1975"
                />
              </div>
            </div>

            <div>
              <Label>Achievements & Accomplishments</Label>
              <div className="space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-600" />
                    <span className="flex-1">{achievement}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFromArray("achievements", index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an achievement..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addToArray("achievements", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addToArray("achievements", input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Hobbies & Interests</Label>
              <div className="space-y-2">
                {formData.hobbies.map((hobby, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-orange-600" />
                    <span className="flex-1">{hobby}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFromArray("hobbies", index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a hobby or interest..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addToArray("hobbies", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addToArray("hobbies", input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="favoriteQuote">Favorite Quote or Saying</Label>
              <Textarea
                id="favoriteQuote"
                value={formData.favoriteQuote}
                onChange={(e) => updateFormData("favoriteQuote", e.target.value)}
                rows={3}
                placeholder="A meaningful quote, saying, or words they lived by..."
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Family & Relationships</h2>
              <p className="text-gray-600">Honor their connections and loved ones</p>
            </div>

            <div>
              <Label htmlFor="spouse">Spouse/Partner</Label>
              <Input
                id="spouse"
                value={formData.spouse}
                onChange={(e) => updateFormData("spouse", e.target.value)}
                placeholder="Name of spouse or life partner"
              />
            </div>

            <div>
              <Label htmlFor="parents">Parents</Label>
              <Input
                id="parents"
                value={formData.parents}
                onChange={(e) => updateFormData("parents", e.target.value)}
                placeholder="Names of parents"
              />
            </div>

            <div>
              <Label>Children</Label>
              <div className="space-y-2">
                {formData.children.map((child, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1">{child}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFromArray("children", index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a child's name..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addToArray("children", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addToArray("children", input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Siblings</Label>
              <div className="space-y-2">
                {formData.siblings.map((sibling, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1">{sibling}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFromArray("siblings", index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a sibling's name..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addToArray("siblings", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addToArray("siblings", input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Grandchildren</Label>
              <div className="space-y-2">
                {formData.grandchildren.map((grandchild, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1">{grandchild}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFromArray("grandchildren", index)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a grandchild's name..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addToArray("grandchildren", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addToArray("grandchildren", input.value)
                      input.value = ""
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Memorial Settings</h2>
              <p className="text-gray-600">Choose how visitors can interact with the memorial</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => updateFormData("isPublic", checked)}
                />
                <Label
                  htmlFor="isPublic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make memorial publicly accessible
                </Label>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                When enabled, anyone with the QR code or link can view the memorial
              </p>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowMessages"
                  checked={formData.allowMessages}
                  onCheckedChange={(checked) => updateFormData("allowMessages", checked)}
                />
                <Label
                  htmlFor="allowMessages"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Allow visitors to leave messages
                </Label>
              </div>
              <p className="text-sm text-gray-600 ml-6">Visitors can share condolences and memories</p>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="moderateMessages"
                  checked={formData.moderateMessages}
                  onCheckedChange={(checked) => updateFormData("moderateMessages", checked)}
                />
                <Label
                  htmlFor="moderateMessages"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Moderate messages before they appear
                </Label>
              </div>
              <p className="text-sm text-gray-600 ml-6">You'll review and approve messages before they're visible</p>

              <div>
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input
                  id="notificationEmail"
                  type="email"
                  value={formData.notificationEmail}
                  onChange={(e) => updateFormData("notificationEmail", e.target.value)}
                  placeholder="Email for memorial notifications"
                />
                <p className="text-sm text-gray-600 mt-1">
                  We'll send notifications about new messages and memorial activity
                </p>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Contact & Shipping</h2>
              <p className="text-gray-600">Where should we send your QR code plaque?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => updateFormData("contactName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData("contactEmail", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="contactPhone">Phone Number *</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="street">Shipping Address *</Label>
              <Input
                id="street"
                value={formData.shippingAddress.street}
                onChange={(e) => updateNestedFormData("shippingAddress", "street", e.target.value)}
                placeholder="Street address"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.shippingAddress.city}
                  onChange={(e) => updateNestedFormData("shippingAddress", "city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Select
                  value={formData.shippingAddress.state}
                  onValueChange={(value) => updateNestedFormData("shippingAddress", "state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="AR">Arkansas</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="CT">Connecticut</SelectItem>
                    <SelectItem value="DE">Delaware</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="HI">Hawaii</SelectItem>
                    <SelectItem value="ID">Idaho</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="IN">Indiana</SelectItem>
                    <SelectItem value="IA">Iowa</SelectItem>
                    <SelectItem value="KS">Kansas</SelectItem>
                    <SelectItem value="KY">Kentucky</SelectItem>
                    <SelectItem value="LA">Louisiana</SelectItem>
                    <SelectItem value="ME">Maine</SelectItem>
                    <SelectItem value="MD">Maryland</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="MI">Michigan</SelectItem>
                    <SelectItem value="MN">Minnesota</SelectItem>
                    <SelectItem value="MS">Mississippi</SelectItem>
                    <SelectItem value="MO">Missouri</SelectItem>
                    <SelectItem value="MT">Montana</SelectItem>
                    <SelectItem value="NE">Nebraska</SelectItem>
                    <SelectItem value="NV">Nevada</SelectItem>
                    <SelectItem value="NH">New Hampshire</SelectItem>
                    <SelectItem value="NJ">New Jersey</SelectItem>
                    <SelectItem value="NM">New Mexico</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="NC">North Carolina</SelectItem>
                    <SelectItem value="ND">North Dakota</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
                    <SelectItem value="OK">Oklahoma</SelectItem>
                    <SelectItem value="OR">Oregon</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                    <SelectItem value="RI">Rhode Island</SelectItem>
                    <SelectItem value="SC">South Carolina</SelectItem>
                    <SelectItem value="SD">South Dakota</SelectItem>
                    <SelectItem value="TN">Tennessee</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="UT">Utah</SelectItem>
                    <SelectItem value="VT">Vermont</SelectItem>
                    <SelectItem value="VA">Virginia</SelectItem>
                    <SelectItem value="WA">Washington</SelectItem>
                    <SelectItem value="WV">West Virginia</SelectItem>
                    <SelectItem value="WI">Wisconsin</SelectItem>
                    <SelectItem value="WY">Wyoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.shippingAddress.zipCode}
                onChange={(e) => updateNestedFormData("shippingAddress", "zipCode", e.target.value)}
                required
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 text-lg">
            Step {currentStep} of {totalSteps}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Create Memorial Profile</h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Honor your loved one with a beautiful digital memorial. We'll guide you through each step to create a
            lasting tribute that celebrates their life.
          </p>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <Progress value={progress} className="h-3 mb-4" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Basic Info</span>
              <span>Photos</span>
              <span>Life Story</span>
              <span>Family</span>
              <span>Settings</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8">
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep === totalSteps ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          Creating Memorial...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Create Memorial - $119.99
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button onClick={nextStep} className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="mt-8 border-2 border-orange-100">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our compassionate support team is here to help you create the perfect memorial.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link href="tel:1-800-MEMORIAL">Call 1-800-MEMORIAL</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Live Chat Support</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-gray-400 text-sm">Honoring memories with digital memorials that last forever.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="hover:text-white">
                    Sample Memorials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
