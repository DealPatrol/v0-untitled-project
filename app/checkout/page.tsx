import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Lock, Heart } from "lucide-react"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-2xl">Complete Your Order</CardTitle>
                    <p className="text-gray-600 mt-1">Step 2 of 2 - Payment and contact information</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="flex-1 bg-blue-600 h-2 rounded"></div>
                  <div className="flex-1 bg-blue-600 h-2 rounded"></div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <form className="space-y-8">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactFirstName">First Name *</Label>
                        <Input id="contactFirstName" placeholder="Your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="contactLastName">Last Name *</Label>
                        <Input id="contactLastName" placeholder="Your last name" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                      <p className="text-sm text-gray-500 mt-1">
                        We'll send your memorial details and QR code to this email
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                    <p className="text-sm text-gray-600">For your physical QR code keepsake (optional)</p>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="State" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input id="zipCode" placeholder="12345" />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" placeholder="United States" defaultValue="United States" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </h3>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input id="expiryDate" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input id="cardName" placeholder="Full name as shown on card" required />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="marketing" />
                      <Label htmlFor="marketing" className="text-sm leading-relaxed">
                        I would like to receive updates and special offers via email
                      </Label>
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <Lock className="w-5 h-5" />
                      <span className="font-semibold">Secure Payment</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Your payment information is encrypted and secure. We never store your credit card details.
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-6 border-t">
                    <Link href="/create-profile">
                      <Button variant="outline">← Back to Profile</Button>
                    </Link>
                    <Button className="bg-blue-600 hover:bg-blue-700 px-8">Complete Order - $119.99</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Memorial Package</span>
                      <span>$199.99</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span>Limited Time Discount</span>
                      <span>-$80.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span>$119.99</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total</span>
                      <span>$119.99</span>
                    </div>
                  </div>

                  <Badge className="w-full justify-center bg-green-100 text-green-800 border-green-200">
                    Save $80 Today!
                  </Badge>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Your Memorial Includes:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Complete memorial website
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Custom QR code
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Unlimited photos & videos
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Family tree builder
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Guest book & condolences
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Lifetime hosting
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      Mobile responsive design
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      24/7 customer support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900">Our Guarantee</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• 30-day money-back guarantee</li>
                    <li>• Lifetime hosting included</li>
                    <li>• SSL security & encryption</li>
                    <li>• 24/7 customer support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
