"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Shield, Clock, Heart, Star, QrCode } from 'lucide-react'

interface FormData {
  fullName: string
  dateOfDeath: string
  placeOfBirth: string
}

interface FormErrors {
  fullName?: string
  dateOfDeath?: string
  placeOfBirth?: string
}

export default function CreateProfilePage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfDeath: "",
    placeOfBirth: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const stripePaymentLink = "https://buy.stripe.com/test_3cIfZa9EC6WG0ng37U8og02"

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.dateOfDeath.trim()) {
      newErrors.dateOfDeath = "Date of death is required"
    }

    if (!formData.placeOfBirth.trim()) {
      newErrors.placeOfBirth = "Place of birth is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Save form data to localStorage for later use
      localStorage.setItem('memorialProfileData', JSON.stringify(formData))
      
      // Redirect to Stripe payment
      window.location.href = stripePaymentLink
    } catch (error) {
      console.error('Error saving profile data:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-rose-100 text-rose-800 px-4 py-2 text-sm font-medium">
              Step 1 of 2
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Create Your Memorial Profile
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let's start with some basic information about your loved one. This will help us create a beautiful memorial page.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Section */}
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-gray-900">Memorial Information</CardTitle>
                <p className="text-gray-600">Please provide the following details to get started.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter their full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfDeath" className="text-sm font-medium text-gray-700">
                      Date of Death *
                    </Label>
                    <Input
                      id="dateOfDeath"
                      type="date"
                      value={formData.dateOfDeath}
                      onChange={(e) => handleInputChange('dateOfDeath', e.target.value)}
                      className={`h-12 ${errors.dateOfDeath ? 'border-red-500' : ''}`}
                    />
                    {errors.dateOfDeath && (
                      <p className="text-sm text-red-600">{errors.dateOfDeath}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="placeOfBirth" className="text-sm font-medium text-gray-700">
                      Place of Birth *
                    </Label>
                    <Input
                      id="placeOfBirth"
                      type="text"
                      placeholder="City, State/Country"
                      value={formData.placeOfBirth}
                      onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                      className={`h-12 ${errors.placeOfBirth ? 'border-red-500' : ''}`}
                    />
                    {errors.placeOfBirth && (
                      <p className="text-sm text-red-600">{errors.placeOfBirth}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? 'Processing...' : 'Continue to Payment - $119.99'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-500">
                      Secure payment powered by Stripe • SSL encrypted
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="space-y-8">
              {/* What's Included */}
              <Card className="border-2 border-rose-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <QrCode className="h-6 w-6 text-rose-600" />
                    What's Included - $119.99
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Weather-resistant QR code plaque</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Beautiful memorial website</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited photo & video uploads</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Interactive family tree</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Guest condolence messages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Lifetime hosting (no monthly fees)</span>
                  </div>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete Payment</h4>
                      <p className="text-sm text-gray-600">Secure one-time payment of $119.99</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Build Memorial</h4>
                      <p className="text-sm text-gray-600">Add photos, stories, and family details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-rose-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Receive QR Code</h4>
                      <p className="text-sm text-gray-600">Physical QR code shipped to your address</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card className="bg-green-50 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">30-Day Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-800 font-medium">Setup in Minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-600" />
                      <span className="text-rose-800 font-medium">Lifetime Access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "The process was so simple and the memorial turned out beautiful. It's brought our family comfort during this difficult time."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <span className="text-rose-600 font-semibold text-sm">SM</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">Sarah M.</div>
                      <div className="text-xs text-gray-600">Verified Customer</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA for Mobile */}
          <div className="lg:hidden mt-12 text-center">
            <Link href="/memorial/sample">
              <Button variant="outline" className="mb-4">
                View Sample Memorial
              </Button>
            </Link>
            <p className="text-sm text-gray-600">
              See what your memorial will look like before you purchase
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
