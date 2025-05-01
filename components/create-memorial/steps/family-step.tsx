"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Plus, X, UserPlus, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"
import type { MemorialFormData } from "../create-memorial-flow"

interface FamilyStepProps {
  data: MemorialFormData
  updateData: (data: Partial<MemorialFormData>) => void
  onNext: () => void
  onPrevious: () => void
}

// Define the family member form data structure
interface FamilyMemberForm {
  id: string
  name: string
  relationship: string
  birth_date?: string
  death_date?: string
  photo?: File | null
}

export function FamilyStep({ data, updateData, onNext, onPrevious }: FamilyStepProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentFamilyMember, setCurrentFamilyMember] = useState<FamilyMemberForm>({
    id: "",
    name: "",
    relationship: "",
  })
  const [birthDate, setBirthDate] = useState<Date | undefined>()
  const [deathDate, setDeathDate] = useState<Date | undefined>()
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle form validation
  const validateFamilyMemberForm = () => {
    const newErrors: Record<string, string> = {}

    if (!currentFamilyMember.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!currentFamilyMember.relationship.trim()) {
      newErrors.relationship = "Relationship is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Open dialog to add a new family member
  const openAddFamilyMemberDialog = () => {
    setCurrentFamilyMember({
      id: uuidv4(),
      name: "",
      relationship: "",
    })
    setBirthDate(undefined)
    setDeathDate(undefined)
    setErrors({})
    setIsDialogOpen(true)
  }

  // Open dialog to edit an existing family member
  const openEditFamilyMemberDialog = (member: MemorialFormData["family_members"][0]) => {
    setCurrentFamilyMember({
      ...member,
    })
    setBirthDate(member.birth_date ? new Date(member.birth_date) : undefined)
    setDeathDate(member.death_date ? new Date(member.death_date) : undefined)
    setErrors({})
    setIsDialogOpen(true)
  }

  // Handle save family member
  const handleSaveFamilyMember = () => {
    if (validateFamilyMemberForm()) {
      const isEditing = data.family_members.some((member) => member.id === currentFamilyMember.id)

      if (isEditing) {
        // Update existing family member
        const updatedFamilyMembers = data.family_members.map((member) =>
          member.id === currentFamilyMember.id ? currentFamilyMember : member,
        )
        updateData({ family_members: updatedFamilyMembers })
      } else {
        // Add new family member
        updateData({
          family_members: [...data.family_members, currentFamilyMember],
        })
      }

      setIsDialogOpen(false)
    }
  }

  // Handle remove family member
  const handleRemoveFamilyMember = (id: string) => {
    const updatedFamilyMembers = data.family_members.filter((member) => member.id !== id)
    updateData({ family_members: updatedFamilyMembers })
  }

  // Handle photo change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentFamilyMember({
        ...currentFamilyMember,
        photo: e.target.files[0],
      })
    }
  }

  // Handle birth date change
  const handleBirthDateChange = (date: Date | undefined) => {
    setBirthDate(date)
    setCurrentFamilyMember({
      ...currentFamilyMember,
      birth_date: date ? format(date, "yyyy-MM-dd") : undefined,
    })
  }

  // Handle death date change
  const handleDeathDateChange = (date: Date | undefined) => {
    setDeathDate(date)
    setCurrentFamilyMember({
      ...currentFamilyMember,
      death_date: date ? format(date, "yyyy-MM-dd") : undefined,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Family Members</h2>
        <p className="text-gray-600 mb-6">
          Add family members to create a family tree for your loved one. This will help visitors understand their family
          connections.
        </p>
      </div>

      <div className="space-y-4">
        {/* Family Members List */}
        {data.family_members.length > 0 ? (
          <div className="space-y-4">
            {data.family_members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {member.photo ? (
                      <Image
                        src={URL.createObjectURL(member.photo) || "/placeholder.svg"}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-500">{member.relationship}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEditFamilyMemberDialog(member)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveFamilyMember(member.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-md bg-gray-50">
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No family members added yet</p>
            <p className="text-sm text-gray-400">Click the button below to add family members</p>
          </div>
        )}

        {/* Add Family Member Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center py-2"
          onClick={openAddFamilyMemberDialog}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Family Member
        </Button>
      </div>

      <div className="pt-4 flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onNext}>Continue to Review</Button>
      </div>

      {/* Add/Edit Family Member Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentFamilyMember.id && data.family_members.some((m) => m.id === currentFamilyMember.id)
                ? "Edit Family Member"
                : "Add Family Member"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="family-name">
                Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="family-name"
                placeholder="Enter name"
                value={currentFamilyMember.name}
                onChange={(e) => setCurrentFamilyMember({ ...currentFamilyMember, name: e.target.value })}
                className={errors.name ? "border-rose-500" : ""}
              />
              {errors.name && <p className="text-sm text-rose-500">{errors.name}</p>}
            </div>

            {/* Relationship */}
            <div className="space-y-2">
              <Label htmlFor="relationship">
                Relationship <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={currentFamilyMember.relationship}
                onValueChange={(value) => setCurrentFamilyMember({ ...currentFamilyMember, relationship: value })}
              >
                <SelectTrigger className={errors.relationship ? "border-rose-500" : ""}>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="grandparent">Grandparent</SelectItem>
                  <SelectItem value="grandchild">Grandchild</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.relationship && <p className="text-sm text-rose-500">{errors.relationship}</p>}
            </div>

            {/* Birth Date */}
            <div className="space-y-2">
              <Label htmlFor="family-birth-date">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="family-birth-date"
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

            {/* Death Date */}
            <div className="space-y-2">
              <Label htmlFor="family-death-date">Date of Death</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="family-death-date"
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

            {/* Photo */}
            <div className="space-y-2">
              <Label>Photo</Label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {currentFamilyMember.photo ? (
                    <Image
                      src={URL.createObjectURL(currentFamilyMember.photo) || "/placeholder.svg"}
                      alt={currentFamilyMember.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <Input type="file" accept="image/*" onChange={handlePhotoChange} className="max-w-xs" />
                  <p className="text-xs text-gray-400 mt-1">Optional</p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFamilyMember}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
