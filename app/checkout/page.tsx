"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertCircle, CheckCircle, Lock, Building, Truck, CreditCard, ExternalLink, Minus, Plus } from 'lucide-react'
import { createFallbackOrder } from "../actions/fallback-payment"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("stripe")

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("United States")

  // Check for canceled payment
  useEffect(() => {
    if (searchParams.get("canceled")) {
      setError("Payment was canceled. Please try again.")
    }
  }, [searchParams])

  // Product details - Single price point
  const productPrice = 119.99
  const subtotal = productPrice * quantity
  const tax = subtotal * 0.08 // 8% tax
  const shipping = 9.99
  const total = subtotal + tax + shipping

  // Stripe payment link
  const stripeLink = "https://buy.stripe.com/test_aFa14geYWep85HAeQC8og00"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsProcessing(true)

    try {
      console.log("Starting checkout process...")
      console.log("Payment method:", paymentMethod)

      // If credit card payment, redirect to Stripe
      if (paymentMethod === "stripe") {
        console.log("Redirecting to Stripe payment link:", stripeLink)
        setTimeout(() => {
          window.location.href = stripeLink
        }, 500)
        return
      }

      // Handle alternative payment methods
      if (!firstName || !lastName || !email || !address || !city || !state || !zipCode) {
        setError("Please fill in all required fields")
        setIsProcessing(false)
        return
      }

      // Prepare items for checkout
      const items = [
        {
          name: "Memorial QR Code",
          description: `${quantity} Memorial QR Code${quantity > 1 ? "s" : ""}`,
          price: productPrice,
          quantity,
          product_type: "memorial_qr",
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
        plan: "memorial_qr",
        email: email,
        quantity: quantity.toString(),
        product_type: "memorial_qr",
        payment_method: paymentMethod,
      }

      console.log("Creating order with:", { items, shippingInfo, orderMetadata })

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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Product Info */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
                <div className="text-center mb-8">
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    <Image
                      src="/images/qr-code-gravestone.png"
                      alt="Memorial QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Memorial QR Code</h1>
                  <p className="text-xl text-gray-600 mb-4">A lasting digital memorial for your loved one</p>
                  <div className="text-4xl font-bold text-gray-900">${productPrice.toFixed(2)}</div>
                  <p className="text-sm text-gray-500 mt-1">Before tax and shipping</p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <Label className="text-lg font-medium mb-4 block">Quantity</Label>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg mb-4">What's Included:</h3>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Weather-resistant QR code plaque</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Beautiful digital memorial page</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited photos and videos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Interactive family tree</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Guest book for memories</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">Lifetime hosting included</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Checkout Form */}
            <div>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Complete Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-6">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Payment Method */}
                    <div>
                      <Label className="text-lg font-medium mb-4 block">Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                        <div
                          className={`border-2 ${paymentMethod === "stripe" ? "border-blue-500 bg-blue-50" : "border-gray-200"} rounded-lg p-4`}
                        >
                          <RadioGroupItem value="stripe" id="stripe" className="sr-only" />
                          <Label htmlFor="stripe" className="flex items-start cursor-pointer">
                            <CreditCard className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                            <div className="flex-1">
                              <span className="font-medium">Credit Card</span>
                              <p className="text-sm text-gray-500 mt-1">Pay securely with your credit or debit card</p>
                            </div>
                            {paymentMethod === "stripe" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                          </Label>
                        </div>

                        <div
                          className={`border-2 ${paymentMethod === "bank_transfer" ? "border-blue-500 bg-blue-50" : "border-gray-200"} rounded-lg p-4`}
                        >
                          <RadioGroupItem value="bank_transfer" id="bank_transfer" className="sr-only" />
                          <Label htmlFor="bank_transfer" className="flex items-start cursor-pointer">
                            <Building className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                            <div className="flex-1">
                              <span className="font-medium">Bank Transfer</span>
                              <p className="text-sm text-gray-500 mt-1">
                                Direct bank transfer (instructions provided after order)
                              </p>
                            </div>
                            {paymentMethod === "bank_transfer" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                          </Label>
                        </div>

                        <div
                          className={`border-2 ${paymentMethod === "pay_on_delivery" ? "border-blue-500 bg-blue-50" : "border-gray-200"} rounded-lg p-4`}
                        >
                          <RadioGroupItem value="pay_on_delivery" id="pay_on_delivery" className="sr-only" />
                          <Label htmlFor="pay_on_delivery" className="flex items-start cursor-pointer">
                            <Truck className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
                            <div className="flex-1">
                              <span className="font-medium">Pay on Delivery</span>
                              <p className="text-sm text-gray-500 mt-1">Pay when your QR code arrives</p>
                            </div>
                            {paymentMethod === "pay_on_delivery" && <CheckCircle className="h-5 w-5 text-blue-500" />}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Shipping Information - Only show for non-Stripe payments */}
                    {paymentMethod !== "stripe" && (
                      <div>
                        <Label className="text-lg font-medium mb-4 block">Shipping Information</Label>
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
                            <Label htmlFor="country">Country *</Label>
                            <select
                              id="country"
                              className="w-full border rounded-md px-3 py-2 mt-1"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              required
                            >
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Australia">Australia</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Memorial QR Code × {quantity}</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-3 flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center text-sm text-gray-500">
                      <Lock size={16} className="mr-2" />
                      Your information is secure and encrypted
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {paymentMethod === "stripe" ? "Redirecting to Payment..." : "Processing Order..."}
                        </div>
                      ) : paymentMethod === "stripe" ? (
                        <div className="flex items-center justify-center">
                          Continue to Payment - ${total.toFixed(2)}
                          <ExternalLink className="h-5 w-5 ml-2" />
                        </div>
                      ) : (
                        `Complete Order - $${total.toFixed(2)}`
                      )}
                    </Button>

                    {/* Money Back Guarantee */}
                    <div className="text-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 inline mr-1 text-green-500" />
                      30-day money-back guarantee
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
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
