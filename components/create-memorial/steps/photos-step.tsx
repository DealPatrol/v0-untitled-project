"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ImageIcon, X, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MemorialFormData } from "../create-memorial-flow"

interface PhotosStepProps {
  data: MemorialFormData
  updateData: (data: Partial<MemorialFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function PhotosStep({ data, updateData, onNext, onPrevious }: PhotosStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const coverImageRef = useRef<HTMLInputElement>(null)
  const profileImageRef = useRef<HTMLInputElement>(null)
  const additionalPhotosRef = useRef<HTMLInputElement>(null)

  // Handle cover image change
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ cover_image: e.target.files[0] })
    }
  }

  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ profile_image: e.target.files[0] })
    }
  }

  // Handle additional photos change
  const handleAdditionalPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files)
      updateData({
        additional_photos: [...data.additional_photos, ...newPhotos],
      })
    }
  }

  // Remove an additional photo
  const removeAdditionalPhoto = (index: number) => {
    const updatedPhotos = [...data.additional_photos]
    updatedPhotos.splice(index, 1)
    updateData({ additional_photos: updatedPhotos })
  }

  // Handle form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Photos are optional, but we can add validation if needed

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
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors",
              data.cover_image ? "border-gray-300" : "border-gray-200",
            )}
            onClick={() => coverImageRef.current?.click()}
          >
            {data.cover_image ? (
              <div className="relative w-full h-48">
                <Image
                  src={URL.createObjectURL(data.cover_image) || "/placeholder.svg"}
                  alt="Cover preview"
                  fill
                  className="object-cover rounded"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    updateData({ cover_image: null })
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload a cover photo</p>
                <p className="text-xs text-gray-400 mt-1">Recommended size: 1200 x 400 pixels</p>
              </div>
            )}
            <Input
              ref={coverImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageChange}
            />
          </div>
        </div>

        {/* Profile Photo */}
        <div className="space-y-2">
          <Label>Profile Photo</Label>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors",
              data.profile_image ? "border-gray-300" : "border-gray-200",
            )}
            onClick={() => profileImageRef.current?.click()}
          >
            {data.profile_image ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={URL.createObjectURL(data.profile_image) || "/placeholder.svg"}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-0 right-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    updateData({ profile_image: null })
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Click to upload a profile photo</p>
                <p className="text-xs text-gray-400 mt-1">Recommended: Square image</p>
              </div>
            )}
            <Input
              ref={profileImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>

        {/* Additional Photos */}
        <div className="space-y-2">
          <Label>Additional Photos</Label>
          <div className="space-y-4">
            {/* Photo Grid */}
            {data.additional_photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.additional_photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`Additional photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeAdditionalPhoto(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <Button
              variant="outline"
              className="w-full py-8 flex flex-col items-center justify-center"
              onClick={() => additionalPhotosRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm">Upload Additional Photos</span>
              <span className="text-xs text-gray-400 mt-1">You can upload multiple photos at once</span>
            </Button>
            <Input
              ref={additionalPhotosRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleAdditionalPhotosChange}
            />
          </div>
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
