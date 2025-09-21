import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, Lock, Globe, Heart, Users } from "lucide-react"

export function PreservationInfo() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Memories Are <span className="gradient-text">Safe Forever</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand how precious these memories are. That's why we've built the most secure and reliable memorial
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="memorial-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Bank-Level Security</CardTitle>
              <CardDescription>
                Your memorial data is protected with enterprise-grade encryption and security protocols.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="memorial-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Lifetime Guarantee</CardTitle>
              <CardDescription>
                We guarantee your memorial will be accessible for as long as the internet exists. Forever.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="memorial-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Privacy Controls</CardTitle>
              <CardDescription>
                You control who can view and contribute to the memorial. Public, private, or family-only options.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="memorial-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Global Accessibility</CardTitle>
              <CardDescription>
                Your memorial is accessible from anywhere in the world, on any device, at any time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="memorial-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Unlimited Storage</CardTitle>
              <CardDescription>
                Upload unlimited photos, videos, and memories. No storage limits, no additional fees.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="memorial-card">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Family Collaboration</CardTitle>
              <CardDescription>
                Invite family members to contribute photos, stories, and memories to create a complete tribute.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Promise to You</h3>
            <p className="text-lg text-gray-600 mb-6">
              We've helped over 10,000 families preserve their most precious memories. Your trust means everything to
              us, and we're committed to keeping your loved one's legacy safe and accessible forever.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-600" />
                <span>99.9% Uptime Guarantee</span>
              </div>
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-600" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreservationInfo
