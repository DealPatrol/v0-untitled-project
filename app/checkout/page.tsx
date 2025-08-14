"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard, Shield, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface FormData {
  firstName: string
  lastName: string
  birthDate: string
  deathDate: string
  location: string
  email: string
  phone: string
  relationship: string
  biography: string
  keyMemories: string
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<FormData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load form data from localStorage
    const savedData = localStorage.getItem("memorialFormData")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const handleStripeCheckout = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would create a Stripe checkout session
      // For now, we'll simulate the process

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to Stripe (simulated)
      alert(
        "Redirecting to secure Stripe checkout...\n\nIn production, this would redirect to Stripe with your memorial information.",
      )

      // In production, you would redirect to Stripe:
      // window.location.href = stripeCheckoutUrl
    } catch (error) {
      console.error("Checkout error:", error)
      alert("There was an error processing your checkout. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Memorial Information Found</h1>
          <p className="text-gray-600 mb-8">Please fill out the memorial form first.</p>
          <Link href="/create-profile">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Form
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              🔥 SAVE $80 TODAY - Limited Time!
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Memorial</h1>
            <p className="text-xl text-gray-600">Review your information and complete your secure payment</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <Card className="shadow-xl border-2 border-gray-100 mb-6">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="text-xl text-gray-900">Memorial Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <p className="text-gray-600">
                        {formData.birthDate} {formData.deathDate && `- ${formData.deathDate}`}
                      </p>
                      {formData.location && <p className="text-gray-600">{formData.location}</p>}
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                      <p className="text-gray-600">{formData.email}</p>
                      {formData.phone && <p className="text-gray-600">{formData.phone}</p>}
                      <p className="text-gray-600">Relationship: {formData.relationship}</p>
                    </div>

                    {formData.biography && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Biography</h4>
                        <p className="text-gray-600 text-sm">{formData.biography}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Link href="/create-profile">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Edit Information
                </Button>
              </Link>
            </div>

            {/* Payment */}
            <div>
              <Card className="shadow-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Complete Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Badge className="bg-red-500 text-white px-3 py-1 mb-3">LIMITED TIME: Save $80</Badge>
                    <div className="text-gray-500 line-through text-xl">$199.99</div>
                    <div className="text-5xl font-bold text-gray-900 mb-2">$119.99</div>
                    <div className="text-gray-600">One-time payment • No monthly fees</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900">What's Included:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Weather-resistant QR plaque</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Beautiful memorial website</span>
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
                        <span>Guest book & timeline</span>
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
                  </div>

                  <Button
                    onClick={handleStripeCheckout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mb-4"
                  >
                    {isLoading ? (
                      "Processing..."
                    ) : (
                      <>
                        <Shield className="mr-2 h-5 w-5" />
                        Secure Checkout - $119.99
                      </>
                    )}
                  </Button>

                  <div className="text-center space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>SSL Secured</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>Instant Access</span>
                      </div>
                    </div>
                    <p>Powered by Stripe • All major cards accepted</p>
                    <p>✅ 30-day money-back guarantee</p>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span>Trusted by 10,000+ families</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
