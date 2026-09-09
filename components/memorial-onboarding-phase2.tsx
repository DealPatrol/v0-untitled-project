'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, ArrowLeft, User, ImageIcon, BookOpen } from 'lucide-react'

interface Phase2Props {
  onNext: (data: FormData) => void
  onBack: () => void
  initialData?: FormData
}

export interface FormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  dateOfDeath: string
  location: string
  profilePhoto?: File | null
  additionalPhotos?: File[]
  biography: string
  personalStory: string
}

const steps = [
  { id: 1, title: 'Essentials', icon: User, description: 'Name & key dates' },
  { id: 2, title: 'Media', icon: ImageIcon, description: 'Photos & memories' },
  { id: 3, title: 'Story', icon: BookOpen, description: 'Their legacy' },
]

export function MemorialOnboardingPhase2({
  onNext,
  onBack,
  initialData,
}: Phase2Props) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      dateOfDeath: '',
      location: '',
      profilePhoto: null,
      additionalPhotos: [],
      biography: '',
      personalStory: '',
    }
  )

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return
    if (field === 'additionalPhotos') {
      const newPhotos = Array.from(files)
      setFormData((prev) => ({
        ...prev,
        additionalPhotos: [...(prev.additionalPhotos || []), ...newPhotos],
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: files[0] }))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    onNext(formData)
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Header */}
        <div className="space-y-6 mb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Build a Legacy</h1>
            <p className="text-slate-600">Let&apos;s gather the essentials in 3 simple steps</p>
          </div>

          <Progress value={progress} className="h-2" />

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const StepIcon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg scale-110'
                        : isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-slate-500">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <Card className="border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
            <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Step 1: Essentials */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Their first name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Their last name"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfDeath">Date of Passing *</Label>
                    <Input
                      id="dateOfDeath"
                      type="date"
                      value={formData.dateOfDeath}
                      onChange={(e) => handleInputChange('dateOfDeath', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    These details form the foundation of the memorial. You can always update them later.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Media */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="profilePhoto">Profile Photo *</Label>
                  <p className="text-sm text-slate-600 mb-3">
                    This will be the main image on the memorial page
                  </p>
                  <Input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('profilePhoto', e.target.files)}
                    className="mt-2"
                  />
                  {formData.profilePhoto && (
                    <p className="text-sm text-green-600 mt-2">✓ Photo uploaded</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="additionalPhotos">Additional Photos</Label>
                  <p className="text-sm text-slate-600 mb-3">
                    Share more moments to celebrate their life
                  </p>
                  <Input
                    id="additionalPhotos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload('additionalPhotos', e.target.files)}
                    className="mt-2"
                  />
                  {formData.additionalPhotos && formData.additionalPhotos.length > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.additionalPhotos.length} photo{formData.additionalPhotos.length !== 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    High-quality photos help create a more meaningful memorial.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Story */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="biography">Their Story *</Label>
                  <p className="text-sm text-slate-600 mb-3">
                    Share their journey, accomplishments, and what made them special
                  </p>
                  <Textarea
                    id="biography"
                    value={formData.biography}
                    onChange={(e) => handleInputChange('biography', e.target.value)}
                    placeholder="Tell us about their life, career, passions, and the impact they had on others..."
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="personalStory">A Special Memory</Label>
                  <p className="text-sm text-slate-600 mb-3">
                    Share a meaningful moment that captures who they were
                  </p>
                  <Textarea
                    id="personalStory"
                    value={formData.personalStory}
                    onChange={(e) => handleInputChange('personalStory', e.target.value)}
                    placeholder="A favorite memory, a funny story, or a moment that defined them..."
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    These stories will help family and friends remember them as they truly were.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 mt-8">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onBack : prevStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 1 ? 'Back' : 'Previous'}
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Continue to Review
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
