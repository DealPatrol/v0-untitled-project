"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { AlertCircle } from "lucide-react"
import type { MemorialFormData } from "../create-memorial-flow"

interface ReviewStepProps {
  data: MemorialFormData
  onSubmit: () => void
  onPrevious: () => void
  isSubmitting: boolean
}

export function ReviewStep({ data, onSubmit, onPrevious, isSubmitting }: ReviewStepProps) {
  // Format dates for display
  const formattedBirthDate = data.birth_date ? format(new Date(data.birth_date), "MMMM d, yyyy") : "Not specified"
  const formattedDeathDate = data.death_date ? format(new Date(data.death_date), "MMMM d, yyyy") : "Not specified"

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Review & Create</h2>
        <p className="text-gray-600 mb-6">Please review the information below before creating the memorial.</p>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{data.name || "Not specified"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{formattedBirthDate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Place of Birth</p>
              <p className="font-medium">{data.birth_location || "Not specified"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date of Death</p>
              <p className="font-medium">{formattedDeathDate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Place of Death</p>
              <p className="font-medium">{data.death_location || "Not specified"}</p>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Life Story</h3>

          {data.bio ? (
            <div className="bg-gray-50 p-4 rounded-md max-h-40 overflow-y-auto">
              <p className="whitespace-pre-line">{data.bio}</p>
            </div>
          ) : (
            <p className="text-gray-500 italic">No biography provided</p>
          )}
        </div>

        {/* Photos */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Photos</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Cover Photo</p>
              {data.cover_image ? (
                <div className="relative h-32 rounded-md overflow-hidden">
                  <Image
                    src={URL.createObjectURL(data.cover_image) || "/placeholder.svg"}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center text-amber-600">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">No cover photo selected</span>
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Profile Photo</p>
              {data.profile_image ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={URL.createObjectURL(data.profile_image) || "/placeholder.svg"}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center text-amber-600">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">No profile photo selected</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Additional Photos</p>
            {data.additional_photos.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {data.additional_photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`Additional photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No additional photos uploaded</p>
            )}
          </div>
        </div>

        {/* Family Members */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Family Members</h3>

          {data.family_members.length > 0 ? (
            <div className="space-y-2">
              {data.family_members.map((member) => (
                <div key={member.id} className="flex items-center p-2 border rounded-md">
                  {member.photo && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={URL.createObjectURL(member.photo) || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{member.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No family members added</p>
          )}
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <Button variant="outline" onClick={onPrevious} disabled={isSubmitting}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating Memorial..." : "Create Memorial"}
        </Button>
      </div>
    </div>
  )
}
