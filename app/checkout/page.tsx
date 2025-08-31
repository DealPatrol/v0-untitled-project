"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Check, CreditCard, Shield, Lock, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const plans = {
  basic: {
    name: "Basic Memorial",
    price: 149,
    features: [
      "5GB Storage",
      "Up to 10 Photos",
      "Up to 3 Videos",
      "5 Year Hosting Guarantee",
      "Basic QR Plaque",
      "Guest Message Board",
      "Standard Shipping",
    ],
  },
  premium: {
    name: "Premium Memorial",
    price: 299,
    features: [
      "20GB Storage",
      "Unlimited Photos",
      "Up to 10 Videos",
      "25 Year Hosting Guarantee",
      "Premium Granite QR Stone",
      "Custom Design Options",
      "Priority Support",
      "Express Shipping",
    ],
  },
  family: {
    name: "Family Memorial",
    price: 499,
    features: [
      "50GB Storage",
      "Unlimited Photos & Videos",
      "Lifetime Hosting Guarantee",
      "Large Granite QR Monument",
      "Multiple Family Profiles",
      "Custom Design & Installation",
      "White-Glove Service",
      "Priority Support",
    ],
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  useEffect(() => {
    const plan = searchParams.get("plan")
    if (plan && plans[plan as keyof typeof plans]) {
      setSelectedPlan(plan)
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate order ID
    const orderId = `MQR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    setIsProcessing(false)

    toast({
      title: "Payment Successful!",
      description: `Order ${orderId} has been processed. Redirecting to memorial creation...`,
    })

    // Redirect to memorial creation with order ID
    setTimeout(() => {
      router.push(`/create-profile?order=${orderId}&plan=${selectedPlan}`)
    }, 2000)
  }

  const currentPlan = plans[selectedPlan as keyof typeof plans]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100">
      <Header />

      {/* Header Section */}
      <section className="py-12 bg-gradient-to-br from-slate-100 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button asChild variant="ghost" size="sm">
                <Link href="/pricing">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Pricing
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <Badge className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-lg">
                <Shield className="w-4 h-4 mr-2" />
                Secure Checkout
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Complete Your Order</h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                You're just one step away from creating a beautiful memorial for your loved one
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Plan Selection */}
                    <div className="space-y-3">
                      <Label>Select Plan:</Label>
                      <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Memorial - $149</SelectItem>
                          <SelectItem value="premium">Premium Memorial - $299</SelectItem>
                          <SelectItem value="family">Family Memorial - $499</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* Selected Plan Details */}
                    <div>
                      <h3 className="font-semibold text-lg mb-3">{currentPlan.name}</h3>
                      <ul className="space-y-2 text-sm">
                        {currentPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Pricing Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${currentPlan.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span className="text-green-600">FREE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>$0</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span>${currentPlan.price}</span>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                        <Shield className="w-4 h-4" />
                        30-Day Money Back Guarantee
                      </div>
                      <ul className="text-sm text-green-600 space-y-1">
                        <li>✓ SSL Encrypted Payment</li>
                        <li>✓ No Hidden Fees</li>
                        <li>✓ One-Time Payment</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Billing Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Select onValueChange={(value) => handleInputChange("state", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="AL">Alabama</SelectItem>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              {/* Add more states as needed */}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5" />
                        Payment Information
                      </CardTitle>
                      <p className="text-sm text-slate-600">Your payment information is encrypted and secure</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card *</Label>
                        <Input
                          id="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5 mr-2" />
                          Complete Order - ${currentPlan.price}
                        </>
                      )}
                    </Button>

                    <p className="text-sm text-slate-600 mt-4">
                      By completing your order, you agree to our{" "}
                      <Link href="/terms-of-service" className="text-purple-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Memorial QR</h3>
              <p className="text-slate-400 text-sm">Honoring memories with digital memorials that last forever.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/browse-memorials" className="hover:text-white">
                    Sample Memorials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
