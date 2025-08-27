"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Upload, CheckCircle, Heart, Shield, Award, Star, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface FormData {
  // Basic Info
  firstName: string
  lastName: string
  birthDate: string
  passedDate: string

  // Biography
  biography: string
  achievements: string
  hobbies: string

  // Photos
  profilePhoto: File | null
  additionalPhotos: File[]

  // Family
  spouse: string
  children: string
  parents: string
}

export default function CreateProfilePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    birthDate: "",
    passedDate: "",
    biography: "",
    achievements: "",
    hobbies: "",
    profilePhoto: null,
    additionalPhotos: [],
    spouse: "",
    children: "",
    parents: "",
  })
  const { toast } = useToast()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: "profilePhoto" | "additionalPhotos", files: FileList | null) => {
    if (!files) return

    if (field === "profilePhoto") {
      setFormData((prev) => ({ ...prev, profilePhoto: files[0] }))
    } else {
      setFormData((prev) => ({
        ...prev,
        additionalPhotos: [...prev.additionalPhotos, ...Array.from(files)],
      }))
    }
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

  const handleSubmit = () => {
    toast({
      title: "Memorial Created!",
      description: "Your memorial has been submitted for creation. You'll receive an email confirmation shortly.",
    })
    // Redirect to checkout or confirmation
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Let's start with the essential details about your loved one.</p>
            </div>

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
                <Label htmlFor="passedDate">Date of Passing *</Label>
                <Input
                  id="passedDate"
                  type="date"
                  value={formData.passedDate}
                  onChange={(e) => handleInputChange("passedDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Writing Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Double-check dates for accuracy</li>
                <li>• Use the name they were most commonly known by</li>
                <li>• Include middle names if they used them regularly</li>
              </ul>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Their Story</h2>
              <p className="text-gray-600">Share the beautiful story of their life and what made them special.</p>
            </div>

            <div>
              <Label htmlFor="biography">Life Story & Biography *</Label>
              <Textarea
                id="biography"
                value={formData.biography}
                onChange={(e) => handleInputChange("biography", e.target.value)}
                placeholder="Tell us about their life, personality, and what made them special..."
                rows={6}
                required
              />
              <p className="text-sm text-gray-500 mt-1">{formData.biography.length}/1000 characters</p>
            </div>

            <div>
              <Label htmlFor="achievements">Achievements & Career</Label>
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => handleInputChange("achievements", e.target.value)}
                placeholder="Share their professional accomplishments, awards, or career highlights..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="hobbies">Hobbies & Interests</Label>
              <Textarea
                id="hobbies"
                value={formData.hobbies}
                onChange={(e) => handleInputChange("hobbies", e.target.value)}
                placeholder="What did they love to do? Hobbies, sports, activities, passions..."
                rows={4}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">✍️ Writing Tips</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Write in a warm, personal tone</li>
                <li>• Include specific examples and stories</li>
                <li>• Mention their impact on others</li>
                <li>• Focus on positive memories and qualities</li>
              </ul>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Photos & Memories</h2>
              <p className="text-gray-600">Upload photos that capture their spirit and precious moments.</p>
            </div>

            <div>
              <Label>Profile Photo *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload a main profile photo</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload("profilePhoto", e.target.files)}
                  className="hidden"
                  id="profile-photo"
                />
                <Label htmlFor="profile-photo" className="cursor-pointer">
                  <Button variant="outline" type="button">
                    Choose Photo
                  </Button>
                </Label>
                {formData.profilePhoto && <p className="text-sm text-green-600 mt-2">✓ {formData.profilePhoto.name}</p>}
              </div>
            </div>

            <div>
              <Label>Additional Photos (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload additional photos (up to 10)</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileUpload("additionalPhotos", e.target.files)}
                  className="hidden"
                  id="additional-photos"
                />
                <Label htmlFor="additional-photos" className="cursor-pointer">
                  <Button variant="outline" type="button">
                    Choose Photos
                  </Button>
                </Label>
                {formData.additionalPhotos.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.additionalPhotos.length} photos selected</p>
                )}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">📸 Photo Tips</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Choose high-quality, clear photos</li>
                <li>• Include photos from different life stages</li>
                <li>• Select images that show their personality</li>
                <li>• Family photos and special moments work great</li>
              </ul>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Family Information</h2>
              <p className="text-gray-600">Add family details to complete their memorial story.</p>
            </div>

            <div>
              <Label htmlFor="spouse">Spouse/Partner</Label>
              <Input
                id="spouse"
                value={formData.spouse}
                onChange={(e) => handleInputChange("spouse", e.target.value)}
                placeholder="Name of spouse or life partner"
              />
            </div>

            <div>
              <Label htmlFor="children">Children</Label>
              <Textarea
                id="children"
                value={formData.children}
                onChange={(e) => handleInputChange("children", e.target.value)}
                placeholder="Names of children (one per line or separated by commas)"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="parents">Parents</Label>
              <Input
                id="parents"
                value={formData.parents}
                onChange={(e) => handleInputChange("parents", e.target.value)}
                placeholder="Names of parents"
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">👨‍👩‍👧‍👦 Family Tips</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Include maiden names if relevant</li>
                <li>• You can add more family members later</li>
                <li>• Consider including close friends as "chosen family"</li>
              </ul>
            </div>

            {/* Review Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Review Your Memorial</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <span className="font-medium">Dates:</span> {formData.birthDate} - {formData.passedDate}
                </div>
                <div>
                  <span className="font-medium">Biography:</span> {formData.biography.substring(0, 100)}...
                </div>
                <div>
                  <span className="font-medium">Photos:</span>{" "}
                  {formData.profilePhoto ? "1 profile photo" : "No profile photo"}
                  {formData.additionalPhotos.length > 0 && `, ${formData.additionalPhotos.length} additional photos`}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">Create Memorial</CardTitle>
                    <p className="text-gray-600">
                      Step {currentStep} of {totalSteps}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-blue-600">
                    {Math.round(progress)}% Complete
                  </Badge>
                </div>
                <Progress value={progress} className="w-full" />
              </CardHeader>

              <CardContent>
                {renderStep()}

                <Separator className="my-8" />

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep}>
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Link href="/checkout">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Continue to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Package Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Memorial Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">$119.99</div>
                  <div className="text-sm text-gray-500 line-through">$149.99</div>
                  <Badge className="bg-green-100 text-green-800">Save $30</Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Digital memorial creation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Premium QR code keepsake</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Free shipping included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>1 year free updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>10-year durability guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-semibold text-sm">Secure & Private</div>
                      <div className="text-xs text-gray-600">Your data is protected</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-yellow-600" />
                    <div>
                      <div className="font-semibold text-sm">Quality Guaranteed</div>
                      <div className="text-xs text-gray-600">30-day money back</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-semibold text-sm">Family Approved</div>
                      <div className="text-xs text-gray-600">Trusted by thousands</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What Families Say</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    "Beautiful way to honor my father's memory. The quality exceeded our expectations."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">- Sarah M.</p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    "The process was so easy and the support team was incredibly helpful."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">- Michael J.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
