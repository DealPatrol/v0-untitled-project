"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle, Lock, Building, Truck, CreditCard } from "lucide-react"
import { createFallbackOrder } from "../actions/fallback-payment"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [notification, setNotification] = useState<string | null>(null)

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("United States")

  // Check for plan parameter in URL
  useEffect(() => {
    const planParam = searchParams.get("plan")
    if (planParam && ["premium", "deluxe", "legacy"].includes(planParam)) {
      setSelectedPlan(planParam)
    }
  }, [searchParams])

  // Check for canceled payment
  useEffect(() => {
    if (searchParams.get("canceled")) {
      setError("Payment was canceled. Please try again.")
    }
  }, [searchParams])

  // Show notification when plan changes
  useEffect(() => {
    // Skip initial render
    const planParam = searchParams.get("plan")
    if (planParam && planParam !== selectedPlan) {
      // Plan was changed by the user
      const planNames = {
        premium: "Premium",
        deluxe: "Deluxe",
        legacy: "Legacy",
      }
      setNotification(`Plan changed to ${planNames[selectedPlan as keyof typeof planNames]}`)

      // Clear notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [selectedPlan])

  // Calculate prices based on quantity and plan
  const prices = {
    premium: 79.99,
    deluxe: 99.99,
    legacy: 249.99,
  }

  const basePrice = prices[selectedPlan as keyof typeof prices]
  const discount = quantity > 1 ? (quantity === 2 ? 0.2 : 0.25) : 0
  const subtotal = basePrice * quantity
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount
  const shipping = 4.99

  // Stripe payment links for different plans
  const stripeLinks = {
    premium: "https://buy.stripe.com/7sIaIb5sydOxgCc144",
    deluxe: "https://buy.stripe.com/7sIaIb5sydOxgCc144", // You'll need to provide the deluxe link
    legacy: "https://buy.stripe.com/7sIaIb5sydOxgCc144", // You'll need to provide the legacy link
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsProcessing(true)

    try {
      console.log("Starting checkout process...")

      // If credit card payment is selected, redirect to Stripe payment link
      if (paymentMethod === "stripe") {
        console.log("Redirecting to Stripe payment link for", selectedPlan)

        // For premium plan, use the provided Stripe link
        if (selectedPlan === "premium") {
          window.location.href = stripeLinks.premium
          return
        } else {
          // For other plans, show message that links are not configured yet
          setError(
            `Stripe payment link for ${selectedPlan} plan is not configured yet. Please contact support or use an alternative payment method.`,
          )
          setIsProcessing(false)
          return
        }
      }

      // Handle alternative payment methods (bank transfer, pay on delivery)
      if (!firstName || !lastName || !email || !address || !city || !state || !zipCode) {
        setError("Please fill in all required fields")
        setIsProcessing(false)
        return
      }

      // Prepare items for checkout
      const items = [
        {
          name: `${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Memorial QR`,
          description: `${quantity} QR code${quantity > 1 ? "s" : ""} for memorial`,
          price: basePrice * (1 - discount),
          quantity,
          product_type: selectedPlan,
        },
      ]

      // Prepare shipping info
      const shippingInfo = {
        name: `${firstName} ${lastName}`.trim(),
        address: {
          line1: address,
          city: city,
          state: state,
          postal_code: zipCode,
          country: country,
        },
      }

      // Prepare metadata
      const orderMetadata = {
        plan: selectedPlan,
        email: email,
        quantity: quantity.toString(),
        product_type: selectedPlan,
      }

      console.log("Creating fallback order with:", { items, shippingInfo, paymentMethod, orderMetadata })

      const result = await createFallbackOrder(items, shippingInfo, orderMetadata)

      if (!result || !result.redirectUrl) {
        throw new Error("Order was created but no redirect URL was provided")
      }

      console.log("Redirecting to:", result.redirectUrl)
      router.push(result.redirectUrl)
    } catch (err: any) {
      console.error("Checkout error:", err)
      setError(err.message || "Order processing failed. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-2xl font-serif flex items-center justify-center">
            Memorial QR
            <span className="text-yellow-400 ml-1">★</span>
          </Link>
        </div>
      </header>

      {/* Checkout Steps */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center">1</div>
            <div className="text-gray-900 font-medium ml-2">Payment</div>
            <div className="w-16 h-1 bg-gray-300 mx-2"></div>
            <div className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">2</div>
            <div className="text-gray-600 ml-2">Account</div>
            <div className="w-16 h-1 bg-gray-300 mx-2"></div>
            <div className="bg-gray-300 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center">3</div>
            <div className="text-gray-600 ml-2">Confirmation</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Purchase</CardTitle>
                <CardDescription>Select your plan and payment method</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-6">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Select Your Plan</h3>
                  <p className="text-gray-600 mb-4">You can change your plan here before completing your purchase.</p>
                  <RadioGroup
                    defaultValue="premium"
                    value={selectedPlan}
                    onValueChange={setSelectedPlan}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div
                      className={`border-2 ${selectedPlan === "premium" ? "border-rose-500" : "border-gray-200"} rounded-lg p-4 relative`}
                    >
                      {selectedPlan === "premium" && (
                        <div className="absolute -top-3 right-3 bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                          BASIC
                        </div>
                      )}
                      <RadioGroupItem value="premium" id="premium" className="sr-only" />
                      <Label htmlFor="premium" className="flex flex-col cursor-pointer">
                        <span className="font-medium">Premium</span>
                        <span className="text-2xl font-bold mt-1">$79.99</span>
                        <span className="text-sm text-gray-500 mt-2">
                          Standard memorial page with basic features
                          {selectedPlan === "premium" && <span className="block text-rose-500 mt-1">✓ Selected</span>}
                        </span>
                      </Label>
                    </div>

                    <div
                      className={`border-2 ${selectedPlan === "deluxe" ? "border-rose-500" : "border-gray-200"} rounded-lg p-4 relative`}
                    >
                      {selectedPlan === "deluxe" && (
                        <div className="absolute -top-3 right-3 bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                          POPULAR
                        </div>
                      )}
                      <RadioGroupItem value="deluxe" id="deluxe" className="sr-only" />
                      <Label htmlFor="deluxe" className="flex flex-col cursor-pointer">
                        <span className="font-medium">Deluxe</span>
                        <span className="text-2xl font-bold mt-1">$99.99</span>
                        <span className="text-sm text-gray-500 mt-2">
                          Enhanced memorial page with additional features
                          {selectedPlan === "deluxe" && <span className="block text-rose-500 mt-1">✓ Selected</span>}
                        </span>
                      </Label>
                    </div>

                    <div
                      className={`border-2 ${selectedPlan === "legacy" ? "border-rose-500" : "border-gray-200"} rounded-lg p-4`}
                    >
                      <RadioGroupItem value="legacy" id="legacy" className="sr-only" />
                      <Label htmlFor="legacy" className="flex flex-col cursor-pointer">
                        <span className="font-medium">Legacy</span>
                        <span className="text-2xl font-bold mt-1">$249.99</span>
                        <span className="text-sm text-gray-500 mt-2">
                          Full-service memorial creation by our team
                          {selectedPlan === "legacy" && <span className="block text-rose-500 mt-1">✓ Selected</span>}
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                  {notification && (
                    <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{notification}</span>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-4">Select Quantity</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((qty) => (
                      <div
                        key={qty}
                        onClick={() => setQuantity(qty)}
                        className={`border-2 ${quantity === qty ? "border-rose-500" : "border-gray-200"} rounded-lg p-4 text-center cursor-pointer`}
                      >
                        <div className="font-medium">Buy {qty}</div>
                        <div className="relative w-full h-16 my-2">
                          <Image
                            src="/images/qr-code-gravestone.png"
                            alt="QR Code on Gravestone"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="font-bold">
                          ${(basePrice * qty * (1 - (qty > 1 ? (qty === 2 ? 0.2 : 0.25) : 0))).toFixed(2)}
                        </div>
                        {qty > 1 && (
                          <div className="bg-rose-800 text-white text-xs rounded-full py-1 px-2 mt-1">
                            Save {qty === 2 ? "20%" : "25%"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-medium mb-4">Select Payment Method</h3>
                  <RadioGroup
                    defaultValue="stripe"
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div
                      className={`border-2 ${paymentMethod === "stripe" ? "border-rose-500" : "border-gray-200"} rounded-lg p-4 relative`}
                    >
                      <RadioGroupItem value="stripe" id="stripe" className="sr-only" />
                      <Label htmlFor="stripe" className="flex items-start cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Credit Card</span>
                          <p className="text-sm text-gray-500 mt-1">
                            Pay securely with your credit or debit card via Stripe.
                          </p>
                          {selectedPlan === "premium" && (
                            <p className="text-sm text-green-600 mt-1">✓ Available for Premium plan</p>
                          )}
                          {selectedPlan !== "premium" && (
                            <p className="text-sm text-orange-600 mt-1">⚠ Payment link not configured for this plan</p>
                          )}
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`border-2 ${paymentMethod === "bank_transfer" ? "border-rose-500" : "border-gray-200"} rounded-lg p-4 relative`}
                    >
                      <RadioGroupItem value="bank_transfer" id="bank_transfer" className="sr-only" />
                      <Label htmlFor="bank_transfer" className="flex items-start cursor-pointer">
                        <Building className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Bank Transfer</span>
                          <p className="text-sm text-gray-500 mt-1">
                            Make a direct transfer to our bank account. We'll send you the details after you place your
                            order.
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`border-2 ${paymentMethod === "pay_on_delivery" ? "border-rose-500" : "border-gray-200"} rounded-lg p-4 relative`}
                    >
                      <RadioGroupItem value="pay_on_delivery" id="pay_on_delivery" className="sr-only" />
                      <Label htmlFor="pay_on_delivery" className="flex items-start cursor-pointer">
                        <Truck className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Pay on Delivery</span>
                          <p className="text-sm text-gray-500 mt-1">
                            Pay with cash or card when your QR code is delivered to your address.
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {paymentMethod !== "stripe" && (
                    <div>
                      <h3 className="font-medium mb-4">Shipping Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="mt-1"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            className="mt-1"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="mt-1"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Address *</Label>
                          <Input
                            id="address"
                            placeholder="123 Main St"
                            className="mt-1"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            placeholder="New York"
                            className="mt-1"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            placeholder="10001"
                            className="mt-1"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            placeholder="NY"
                            className="mt-1"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            className="mt-1"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "stripe" && (
                    <div>
                      <h3 className="font-medium mb-4">Credit Card Payment</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <CreditCard className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-blue-800">Secure Stripe Checkout</p>
                            <p className="text-blue-700 text-sm mt-1">
                              You'll be redirected to Stripe's secure payment page to complete your purchase.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500 mt-4">
                    <Lock size={16} className="mr-2" />
                    Your information is secure and encrypted
                  </div>

                  <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : paymentMethod === "stripe" ? (
                      `Continue to Stripe - $${(total + shipping).toFixed(2)}`
                    ) : (
                      `Complete Order - $${(total + shipping).toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span className="font-medium capitalize">{selectedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount * 100}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(total + shipping).toFixed(2)}</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">100% Money-Back Guarantee</p>
                      <p className="text-sm text-gray-600">
                        If you're not satisfied, we'll refund your purchase within 30 days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative w-full h-40 mt-6">
                  <Image
                    src="/images/qr-code-gravestone.png"
                    alt="QR Code on Gravestone"
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                <div className="text-sm text-center text-gray-600">
                  Need help?{" "}
                  <Link href="/contact" className="text-rose-600 hover:text-rose-800">
                    Contact Support
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Memorial QR. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-gray-700">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
