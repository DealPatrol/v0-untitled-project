"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BasicInfoStep } from "./steps/basic-info-step"
import { BiographyStep } from "./steps/biography-step"
import { PhotosStep } from "./steps/photos-step"
import { FamilyStep } from "./steps/family-step"
import { ReviewStep } from "./steps/review-step"
import { ProgressBar } from "./progress-bar"
import { createMemorial } from "@/app/actions/create-memorial"
import { toast } from "@/components/ui/use-toast"

// Define the steps in the flow
const STEPS = [
  { id: "basic-info", title: "Basic Information" },
  { id: "biography", title: "Life Story" },
  { id: "photos", title: "Photos & Videos" },
  { id: "family", title: "Family Members" },
  { id: "review", title: "Review & Create" },
]

// Define the memorial data structure
export type MemorialFormData = {
  name: string
  birth_date: string | null
  death_date: string | null
  birth_location: string
  death_location: string
  bio: string
  cover_image: File | null
  profile_image: File | null
  additional_photos: File[]
  videos: File[]
  family_members: {
    id: string
    name: string
    relationship: string
    birth_date?: string
    death_date?: string
    photo?: File | null
  }[]
}

// Initial form data
const initialFormData: MemorialFormData = {
  name: "",
  birth_date: null,
  death_date: null,
  birth_location: "",
  death_location: "",
  bio: "",
  cover_image: null,
  profile_image: null,
  additional_photos: [],
  videos: [],
  family_members: [],
}

export function CreateMemorialFlow() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<MemorialFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate progress percentage
  const progress = ((currentStep + 1) / STEPS.length) * 100

  // Handle next step
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Handle form data updates
  const updateFormData = (data: Partial<MemorialFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Create FormData object for file uploads
      const formDataToSubmit = new FormData()

      // Add text fields
      formDataToSubmit.append("name", formData.name)
      if (formData.birth_date) formDataToSubmit.append("birth_date", formData.birth_date)
      if (formData.death_date) formDataToSubmit.append("death_date", formData.death_date)
      formDataToSubmit.append("birth_location", formData.birth_location)
      formDataToSubmit.append("death_location", formData.death_location)
      formDataToSubmit.append("bio", formData.bio)

      // Add files
      if (formData.cover_image) formDataToSubmit.append("cover_image", formData.cover_image)
      if (formData.profile_image) formDataToSubmit.append("profile_image", formData.profile_image)

      // Add additional photos
      formData.additional_photos.forEach((photo, index) => {
        formDataToSubmit.append(`additional_photos_${index}`, photo)
      })

      // Add videos
      formData.videos.forEach((video, index) => {
        formDataToSubmit.append(`videos_${index}`, video)
      })

      // Add family members
      formDataToSubmit.append("family_members", JSON.stringify(formData.family_members))

      // Submit the form
      const result = await createMemorial(formDataToSubmit)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Success - redirect to the new memorial
      toast({
        title: "Memorial Created",
        description: "Your memorial has been created successfully.",
      })

      router.push(`/memorial/${result.memorialId}`)
    } catch (error) {
      console.error("Error creating memorial:", error)
      toast({
        title: "Error",
        description: "There was a problem creating your memorial. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep data={formData} updateData={updateFormData} onNext={handleNext} />
      case 1:
        return (
          <BiographyStep data={formData} updateData={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 2:
        return (
          <PhotosStep data={formData} updateData={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 3:
        return (
          <FamilyStep data={formData} updateData={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />
        )
      case 4:
        return (
          <ReviewStep data={formData} onSubmit={handleSubmit} onPrevious={handlePrevious} isSubmitting={isSubmitting} />
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b">
        <ProgressBar steps={STEPS} currentStep={currentStep} progress={progress} />
      </div>

      <div className="p-6">{renderStep()}</div>
    </div>
  )
}
