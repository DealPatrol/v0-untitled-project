"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MemorialFormData } from "../create-memorial-flow"

interface BasicInfoStepProps {
  data: MemorialFormData
  updateData: (data: Partial<MemorialFormData>) => void
  onNext: () => void
}

export function BasicInfoStep({ data, updateData, onNext }: BasicInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Convert string dates to Date objects for the calendar
  const [birthDate, setBirthDate] = useState<Date | undefined>(data.birth_date ? new Date(data.birth_date) : undefined)
  const [deathDate, setDeathDate] = useState<Date | undefined>(data.death_date ? new Date(data.death_date) : undefined)

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

  // Handle birth date change
  const handleBirthDateChange = (date: Date | undefined) => {
    setBirthDate(date)
    updateData({ birth_date: date ? format(date, "yyyy-MM-dd") : null })
  }

  // Handle death date change
  const handleDeathDateChange = (date: Date | undefined) => {
    setDeathDate(date)
    updateData({ death_date: date ? format(date, "yyyy-MM-dd") : null })
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="birth-date"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !birthDate && "text-gray-400")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate ? format(birthDate, "MMMM d, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={birthDate} onSelect={handleBirthDateChange} initialFocus />
            </PopoverContent>
          </Popover>
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="death-date"
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !deathDate && "text-gray-400")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deathDate ? format(deathDate, "MMMM d, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={deathDate} onSelect={handleDeathDateChange} initialFocus />
            </PopoverContent>
          </Popover>
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
