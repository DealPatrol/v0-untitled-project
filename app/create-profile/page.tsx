import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, Heart, Shield, Clock } from "lucide-react"

export default function CreateProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-2xl">Create Memorial Profile</CardTitle>
                    <p className="text-gray-600 mt-1">Step 1 of 2 - Tell us about your loved one</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <div className="flex-1 bg-blue-600 h-2 rounded"></div>
                  <div className="flex-1 bg-gray-200 h-2 rounded"></div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <form className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Enter first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Enter last name" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="birthDate">Date of Birth</Label>
                        <Input id="birthDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="deathDate">Date of Passing</Label>
                        <Input id="deathDate" type="date" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, State" />
                    </div>
                  </div>

                  {/* Biography */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Life Story</h3>
                    <div>
                      <Label htmlFor="biography">Biography</Label>
                      <Textarea
                        id="biography"
                        placeholder="Share their life story, achievements, passions, and what made them special..."
                        rows={6}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        This will be the main story displayed on the memorial page.
                      </p>
                    </div>
                  </div>

                  {/* Photos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Photos</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>Profile Photo *</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Upload main profile photo</p>
                          <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                          <Button variant="outline" className="mt-4 bg-transparent">
                            Choose File
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Cover Photo</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Upload cover photo</p>
                          <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                          <Button variant="outline" className="mt-4 bg-transparent">
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Additional Photos</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Upload additional photos</p>
                        <p className="text-sm text-gray-500">You can upload multiple photos at once</p>
                        <Button variant="outline" className="mt-4 bg-transparent">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-6 border-t">
                    <Link href="/">
                      <Button variant="outline">← Back to Home</Button>
                    </Link>
                    <Link href="/checkout">
                      <Button className="bg-blue-600 hover:bg-blue-700">Continue to Checkout →</Button>
                    </Link>
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
                  <div className="flex justify-between items-center">
                    <span>Memorial Package</span>
                    <span className="font-semibold">$119.99</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span>Limited Time Discount</span>
                    <span>-$80.00</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>$119.99</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Setup completed in 5 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Complete memorial website</li>
                    <li>• Custom QR code</li>
                    <li>• Unlimited photos & videos</li>
                    <li>• Family tree builder</li>
                    <li>• Guest book & condolences</li>
                    <li>• Lifetime hosting</li>
                    <li>• Mobile responsive design</li>
                    <li>• 24/7 support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Badge className="bg-blue-600 text-white mb-3">Limited Time</Badge>
                  <h3 className="font-semibold text-blue-900 mb-2">Save $80 Today!</h3>
                  <p className="text-sm text-blue-700">
                    This special pricing won't last long. Create your memorial now and save.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
