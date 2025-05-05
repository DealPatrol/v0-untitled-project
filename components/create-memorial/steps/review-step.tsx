"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import { FileImage, FileVideo } from "lucide-react"
import type { MemorialFormData } from "../create-memorial-flow"

interface ReviewStepProps {
  data: MemorialFormData
  onSubmit: () => void
  onPrevious: () => void
  isSubmitting: boolean
}

export function ReviewStep({ data, onSubmit, onPrevious, isSubmitting }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Review & Create</h2>
        <p className="text-gray-600 mb-6">
          Please review the information below before creating the memorial. You can go back to make changes if needed.
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-medium mb-2">Basic Information</h3>
          <Separator className="mb-4" />
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1">{data.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Birth Date</dt>
              <dd className="mt-1">{data.birth_date ? formatDate(data.birth_date) : "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Death Date</dt>
              <dd className="mt-1">{data.death_date ? formatDate(data.death_date) : "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Birth Location</dt>
              <dd className="mt-1">{data.birth_location || "Not specified"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Death Location</dt>
              <dd className="mt-1">{data.death_location || "Not specified"}</dd>
            </div>
          </dl>
        </div>

        {/* Biography */}
        <div>
          <h3 className="text-lg font-medium mb-2">Life Story</h3>
          <Separator className="mb-4" />
          <div className="prose prose-sm max-w-none">
            <p>{data.bio || "No biography provided."}</p>
          </div>
        </div>

        {/* Photos */}
        <div>
          <h3 className="text-lg font-medium mb-2">Photos</h3>
          <Separator className="mb-4" />
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Cover Photo</h4>
                {data.cover_image ? (
                  <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100 border">
                    <Image
                      src={URL.createObjectURL(data.cover_image) || "/placeholder.svg"}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 bg-gray-100 rounded-md border">
                    <p className="text-gray-500 text-sm">No cover photo selected</p>
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Profile Photo</h4>
                {data.profile_image ? (
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 border">
                      <Image
                        src={URL.createObjectURL(data.profile_image) || "/placeholder.svg"}
                        alt="Profile preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 bg-gray-100 rounded-md border">
                    <p className="text-gray-500 text-sm">No profile photo selected</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Additional Photos ({data.additional_photos.length})
              </h4>
              {data.additional_photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {data.additional_photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-gray-100 border">
                      <Image
                        src={URL.createObjectURL(photo) || "/placeholder.svg"}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No additional photos selected</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Videos ({data.videos?.length || 0})</h4>
              {data.videos && data.videos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {data.videos.map((video, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-md overflow-hidden bg-gray-100 border flex items-center justify-center"
                    >
                      <FileVideo className="h-8 w-8 text-gray-400" />
                      <p className="text-xs text-gray-500 mt-2 px-2 text-center">{video.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No videos selected</p>
              )}
            </div>
          </div>
        </div>

        {/* Family Members */}
        <div>
          <h3 className="text-lg font-medium mb-2">Family Members ({data.family_members.length})</h3>
          <Separator className="mb-4" />
          {data.family_members.length > 0 ? (
            <div className="space-y-4">
              {data.family_members.map((member, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    {member.photo ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={URL.createObjectURL(member.photo) || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <FileImage className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-500">{member.relationship}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No family members added</p>
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating Memorial..." : "Create Memorial"}
        </Button>
      </div>
    </div>
  )
}
