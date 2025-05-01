"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { MemorialFormData } from "../create-memorial-flow"

interface BiographyStepProps {
  data: MemorialFormData
  updateData: (data: Partial<MemorialFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

export function BiographyStep({ data, updateData, onNext, onPrevious }: BiographyStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Biography is optional, but if provided, should be at least 10 characters
    if (data.bio && data.bio.trim().length < 10) {
      newErrors.bio = "Biography should be at least 10 characters"
    }

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
        <h2 className="text-2xl font-semibold mb-4">Life Story</h2>
        <p className="text-gray-600 mb-6">
          Share the story of your loved one's life. You can include details about their childhood, career, hobbies,
          achievements, and the impact they had on others.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio">Biography</Label>
          <Textarea
            id="bio"
            placeholder="Write about your loved one's life, achievements, passions, and the legacy they left behind..."
            value={data.bio}
            onChange={(e) => updateData({ bio: e.target.value })}
            className={cn("min-h-[200px]", errors.bio ? "border-rose-500" : "")}
          />
          {errors.bio && <p className="text-sm text-rose-500">{errors.bio}</p>}

          <p className="text-sm text-gray-500 mt-2">
            Tip: Include personal stories, quotes, or memories that capture their personality and spirit.
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={handleNext}>Continue to Photos</Button>
      </div>
    </div>
  )
}
