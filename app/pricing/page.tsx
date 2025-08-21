import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, Clock, Users, Heart } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { StarRating } from "@/components/star-rating"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">🔥 Limited Time Offer - Save $80</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Create a Lasting Memorial Today</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Honor your loved one with a beautiful digital memorial. One-time payment, lifetime hosting, no hidden fees.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <StarRating rating={5} />
            <span className="text-gray-600">4.9/5 from 2,847 reviews</span>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-blue-200 shadow-2xl">
              <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                <Badge className="bg-blue-600 text-white mb-4 mx-auto">Most Popular</Badge>
                <CardTitle className="text-2xl font-bold">Complete Memorial Package</CardTitle>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-blue-600">$119.99</div>
                  <div className="text-gray-500 line-through text-xl">$199.99</div>
                  <div className="text-green-600 font-semibold text-lg">Save $80 - Limited Time!</div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-center">⏰ Offer expires in:</h3>
                  <CountdownTimer />
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="font-semibold text-lg">Everything included:</h3>
                  {[
                    "Complete memorial website with custom design",
                    "Unique QR code for easy sharing",
                    "Unlimited photo and video uploads",
                    "Interactive family tree builder",
                    "Guest book for condolences and memories",
                    "Timeline of life events and milestones",
                    "Mobile-responsive design",
                    "Privacy controls and content moderation",
                    "Lifetime hosting - no recurring fees",
                    "24/7 customer support",
                    "30-day money-back guarantee",
                    "SSL security and data protection",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/create-profile">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg mb-6">
                    Create Memorial Now - $119.99
                  </Button>
                </Link>

                <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-500 border-t pt-6">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-5 h-5" />
                    <span>30-day guarantee</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>Setup in 5 minutes</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Users className="w-5 h-5" />
                    <span>10,000+ families</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Memorial QR?</h2>
            <p className="text-xl text-gray-600">The most trusted platform for digital memorials</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Easy to Create</h3>
                <p className="text-gray-600">
                  Our intuitive interface makes it simple to create a beautiful memorial in just minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Lifetime Hosting</h3>
                <p className="text-gray-600">
                  Your memorial will be hosted forever with our lifetime guarantee. No recurring fees.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Trusted by Thousands</h3>
                <p className="text-gray-600">
                  Over 10,000 families have chosen us to honor their loved ones with dignity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How long does it take to create a memorial?
                </h3>
                <p className="text-gray-600">
                  Most memorials can be created in 5-10 minutes. You can always add more content later.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a limit on photos and videos?</h3>
                <p className="text-gray-600">No, you can upload unlimited photos and videos to your memorial.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can family members add their own memories?</h3>
                <p className="text-gray-600">
                  Yes, visitors can leave condolences and share their own memories through the guest book feature.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What if I need help setting up the memorial?
                </h3>
                <p className="text-gray-600">
                  Our support team is available 24/7 to help you create the perfect memorial for your loved one.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data secure?</h3>
                <p className="text-gray-600">
                  Yes, we use SSL encryption and follow industry best practices to keep your memorial data safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">Memorials Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50,000+</div>
              <div className="text-gray-600">Stories Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">4.9/5</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Honor Their Memory?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Create a beautiful, lasting tribute that will preserve their legacy forever.
            </p>
            <Link href="/create-profile">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Create Memorial Now - $119.99
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-blue-200">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
