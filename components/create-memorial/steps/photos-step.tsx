"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileUploadField } from "@/components/file-upload-field"
import type { MemorialFormData } from "../create-memorial-flow"

interface PhotosStepProps {
  data: MemorialFormData
  updateData: (data: Partial<MemorialFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function PhotosStep({ data, updateData, onNext, onPrevious }: PhotosStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isUploading, setIsUploading] = useState(false)

  // Handle cover image change
  const handleCoverImageChange = (files: File[]) => {
    if (files.length > 0) {
      updateData({ cover_image: files[0] })
    }
  }

  // Handle profile image change
  const handleProfileImageChange = (files: File[]) => {
    if (files.length > 0) {
      updateData({ profile_image: files[0] })
    }
  }

  // Handle additional photos change
  const handleAdditionalPhotosChange = (files: File[]) => {
    updateData({ additional_photos: files })
  }

  // Handle form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Photos are optional, but we can add validation if needed
    // For example, we could check file sizes or types

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next button click
  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Photos</h2>
        <p className="text-gray-600 mb-6">
          Upload photos to personalize the memorial. A cover photo will be displayed at the top of the memorial page,
          and a profile photo will be used as the main image.
        </p>
      </div>

      <div className="space-y-8">
        {/* Cover Photo */}
        <div className="space-y-2">
          <Label>Cover Photo</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadField
              label="Select Cover Photo"
              accept="image/*"
              onChange={handleCoverImageChange}
              multiple={false}
              maxFiles={1}
            />

            {data.cover_image && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={URL.createObjectURL(data.cover_image) || "/placeholder.svg"}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Recommended size: 1200 x 400 pixels</p>
        </div>

        {/* Profile Photo */}
        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadField
              label="Select Profile Photo"
              accept="image/*"
              onChange={handleProfileImageChange}
              multiple={false}
              maxFiles={1}
            />

            {data.profile_image && (
              <div className="flex justify-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border border-gray-200">
                  <Image
                    src={URL.createObjectURL(data.profile_image) || "/placeholder.svg"}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Recommended: Square image</p>
        </div>

        {/* Additional Photos */}
        <div className="space-y-2">
          <Label>Additional Photos</Label>
          <FileUploadField
            label="Select Additional Photos"
            accept="image/*"
            onChange={handleAdditionalPhotosChange}
            multiple={true}
            maxFiles={10}
          />
          <p className="text-xs text-gray-500 mt-1">You can upload up to 10 additional photos</p>
        </div>

        {/* Video Upload */}
        <div className="space-y-2">
          <Label>Memorial Videos</Label>
          <FileUploadField
            label="Select Videos"
            accept="video/*"
            onChange={(files) => updateData({ videos: files })}
            multiple={true}
            maxFiles={3}
          />
          <p className="text-xs text-gray-500 mt-1">You can upload up to 3 videos (max 100MB each)</p>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={handleNext}>Continue to Family Members</Button>
      </div>
    </div>
  )
}
