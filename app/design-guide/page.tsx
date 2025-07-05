import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, FileText, Camera, Users, Eye, CreditCard, Clock, CheckCircle, Heart, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function DesignGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Memorial Design Guide</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Follow our simple 6-step process to create a beautiful memorial page. Design first, pay later - see exactly
            what you're creating before you purchase.
          </p>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Heart className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Design First, Pay Later</h3>
              <p className="text-sm text-gray-600">See your complete memorial before purchasing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Clock className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Take Your Time</h3>
              <p className="text-sm text-gray-600">Save your progress and return anytime</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Users className="h-8 w-8 text-rose-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Family Collaboration</h3>
              <p className="text-sm text-gray-600">Share with family members for input</p>
            </div>
          </div>

          <Link href="/create-memorial">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg">
              Start Creating Your Memorial
            </Button>
          </Link>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Step-by-Step Process</h2>
            <p className="text-lg text-gray-600">Complete all steps in about 15-30 minutes</p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <CardHeader className="pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-6 w-6 text-rose-600" />
                  <CardTitle className="text-xl">Basic Information</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    3-5 min
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Start with essential details about your loved one
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Full name and dates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Profile photo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Location and basic details</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Have a favorite photo ready - this will be the main image visitors see
                      first.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <CardHeader className="pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-6 w-6 text-rose-600" />
                  <CardTitle className="text-xl">Life Story & Biography</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    5-10 min
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Share their story, achievements, and what made them special
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Personal biography</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Career and achievements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Hobbies and interests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Special memories and stories</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Our AI assistant can help you write a beautiful biography if you're not sure
                      where to start.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <CardHeader className="pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <Camera className="h-6 w-6 text-rose-600" />
                  <CardTitle className="text-xl">Photos & Videos</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    5-10 min
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Upload cherished photos and videos to create a visual story
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Family photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Special moments and events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Video memories (optional)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Photo captions and dates</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> You can upload photos from your phone, computer, or even scan old printed
                      photos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <CardHeader className="pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-6 w-6 text-rose-600" />
                  <CardTitle className="text-xl">Family Members</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    3-5 min
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Add family members to create a beautiful family tree
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Spouse and children</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Parents and siblings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Grandchildren (if applicable)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Family relationships</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> You can add as many or as few family members as you'd like - this is
                      completely optional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <CardHeader className="pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-6 w-6 text-rose-600" />
                  <CardTitle className="text-xl">Preview & Review</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    2-3 min
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  See exactly how your memorial will look before you buy
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Full memorial preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Mobile and desktop views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Make final edits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Share with family for feedback</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> This is your chance to make sure everything looks perfect before purchasing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 6 */}
            <Card className="relative">
              <div className="absolute -left-4 top-6 bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <CardHeader className="pl-8">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="h-6 w-6 text-rose-600" />
                  <CardTitle className="text-xl">Choose Package & Pay</CardTitle>
                  <Badge variant="secondary" className="ml-auto">
                    <Clock className="h-3 w-3 mr-1" />
                    2-3 min
                  </Badge>
                </div>
                <CardDescription className="text-base">Select your package and complete your purchase</CardDescription>
              </CardHeader>
              <CardContent className="pl-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Choose Premium, Deluxe, or Legacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">Instant memorial activation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-gray-700">QR code generation and delivery</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Your memorial goes live immediately after payment, and your QR code ships
                      within 24 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Create your memorial in just 15-30 minutes. No commitment until you're completely satisfied with the
            preview.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-memorial">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3">
                Start Creating Memorial
              </Button>
            </Link>
            <Link href="/memorials">
              <Button size="lg" variant="outline" className="px-8 py-3 bg-transparent">
                View Sample Memorials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
