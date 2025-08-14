"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Shield, Clock, Users, ArrowRight, User, Calendar, MapPin, Phone, Mail } from "lucide-react"

export default function CreateProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    deathDate: "",
    location: "",
    email: "",
    phone: "",
    relationship: "",
    biography: "",
    keyMemories: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.relationship.trim()) newErrors.relationship = "Relationship is required"

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Store form data in localStorage for checkout
      localStorage.setItem("memorialFormData", JSON.stringify(formData))

      // Redirect to Stripe checkout
      window.location.href = "/checkout"
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error processing your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              🔥 SAVE $80 TODAY - Limited Time!
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Create Their Memorial</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to create a beautiful, lasting memorial. Takes just 5 minutes to get started.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl border-2 border-gray-100">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                    <User className="h-6 w-6" />
                    Memorial Information
                  </CardTitle>
                  <p className="text-gray-600">Tell us about your loved one so we can create a beautiful memorial</p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.firstName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.lastName ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="inline h-4 w-4 mr-1" />
                          Birth Date *
                        </label>
                        <input
                          type="date"
                          id="birthDate"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.birthDate ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
                      </div>
                      <div>
                        <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="inline h-4 w-4 mr-1" />
                          Date of Passing
                        </label>
                        <input
                          type="date"
                          id="deathDate"
                          name="deathDate"
                          value={formData.deathDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Location (City, State)
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Springfield, IL"
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="inline h-4 w-4 mr-1" />
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="inline h-4 w-4 mr-1" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Relationship */}
                    <div>
                      <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Relationship *
                      </label>
                      <select
                        id="relationship"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.relationship ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select your relationship</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                        <option value="grandchild">Grandchild</option>
                        <option value="grandparent">Grandparent</option>
                        <option value="friend">Friend</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
                    </div>

                    {/* Biography */}
                    <div>
                      <label htmlFor="biography" className="block text-sm font-medium text-gray-700 mb-2">
                        Brief Biography (Optional)
                      </label>
                      <textarea
                        id="biography"
                        name="biography"
                        value={formData.biography}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us about their life, achievements, and what made them special..."
                      />
                    </div>

                    {/* Key Memories */}
                    <div>
                      <label htmlFor="keyMemories" className="block text-sm font-medium text-gray-700 mb-2">
                        Key Memories or Stories (Optional)
                      </label>
                      <textarea
                        id="keyMemories"
                        name="keyMemories"
                        value={formData.keyMemories}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Share special memories, favorite sayings, or stories that capture who they were..."
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          "Processing..."
                        ) : (
                          <>
                            Continue to Payment - $119.99
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      <p className="text-center text-sm text-gray-500 mt-3">
                        ✅ Secure payment • ✅ 30-day guarantee • ✅ Lifetime hosting
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing Card */}
                <Card className="border-2 border-orange-200 shadow-xl bg-gradient-to-br from-orange-50 to-red-50">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <Badge className="bg-red-500 text-white px-3 py-1 mb-3">LIMITED TIME: Save $80</Badge>
                      <div className="text-gray-500 line-through text-lg">$199.99</div>
                      <div className="text-4xl font-bold text-gray-900 mb-1">$119.99</div>
                      <div className="text-gray-600">One-time payment</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Weather-resistant QR plaque</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Unlimited photos & videos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Interactive family tree</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Lifetime hosting included</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>30-day money-back guarantee</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Indicators */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Why Families Choose Us</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <div>
                          <div className="font-semibold text-sm">4.9/5 Rating</div>
                          <div className="text-xs text-gray-600">From 2,847 families</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-semibold text-sm">10,000+ Memorials</div>
                          <div className="text-xs text-gray-600">Created worldwide</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="font-semibold text-sm">Secure & Private</div>
                          <div className="text-xs text-gray-600">Your data is protected</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="font-semibold text-sm">Setup in Minutes</div>
                          <div className="text-xs text-gray-600">Quick and easy process</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonial */}
                <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 text-sm mb-3 italic">
                      "The $119.99 was the best money I've ever spent. The memorial is beautiful and our whole family
                      can now share memories of Dad easily."
                    </blockquote>
                    <div className="text-xs text-gray-600">- Sarah M., Verified Customer</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
