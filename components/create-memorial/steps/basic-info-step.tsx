"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { MemorialFormData } from "../create-memorial-flow"

interface BasicInfoStepProps {
  data: MemorialFormData
  updateData: (data: Partial<MemorialFormData>) => void
  onNext: () => void
}

export function BasicInfoStep({ data, updateData, onNext }: BasicInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.name.trim()) {
      newErrors.name = "Name is required"
    }

    // Optional validation for other fields if needed

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
        <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
        <p className="text-gray-600 mb-6">Please provide the basic information about your loved one.</p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter full name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            className={errors.name ? "border-rose-500" : ""}
          />
          {errors.name && <p className="text-sm text-rose-500">{errors.name}</p>}
        </div>

        {/* Birth Date */}
        <div className="space-y-2">
          <Label htmlFor="birth-date">Date of Birth</Label>
          <Input
            id="birth-date"
            type="text"
            placeholder="e.g., March 15, 1945 or 03/15/1945"
            value={data.birth_date || ""}
            onChange={(e) => updateData({ birth_date: e.target.value })}
          />
          <p className="text-sm text-gray-500">Enter in any format you prefer (e.g., March 15, 1945)</p>
        </div>

        {/* Birth Location */}
        <div className="space-y-2">
          <Label htmlFor="birth-location">Place of Birth</Label>
          <Input
            id="birth-location"
            placeholder="City, State/Province, Country"
            value={data.birth_location}
            onChange={(e) => updateData({ birth_location: e.target.value })}
          />
        </div>

        {/* Death Date */}
        <div className="space-y-2">
          <Label htmlFor="death-date">Date of Death</Label>
          <Input
            id="death-date"
            type="text"
            placeholder="e.g., January 8, 2024 or 01/08/2024"
            value={data.death_date || ""}
            onChange={(e) => updateData({ death_date: e.target.value })}
          />
          <p className="text-sm text-gray-500">Enter in any format you prefer (e.g., January 8, 2024)</p>
        </div>

        {/* Death Location */}
        <div className="space-y-2">
          <Label htmlFor="death-location">Place of Death</Label>
          <Input
            id="death-location"
            placeholder="City, State/Province, Country"
            value={data.death_location}
            onChange={(e) => updateData({ death_location: e.target.value })}
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={handleNext}>Continue to Life Story</Button>
      </div>
    </div>
  )
}
