"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Server, Lock, Award, Clock, Users } from "lucide-react"

export function PreservationInfo() {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols protect your memories",
      color: "text-green-600",
    },
    {
      icon: Server,
      title: "Redundant Backups",
      description: "Multiple data centers ensure your memorial is always accessible",
      color: "text-blue-600",
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "You control who can view and contribute to the memorial",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Lifetime Guarantee",
      description: "Your memorial will be preserved for generations to come",
      color: "text-orange-600",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Professional design and ongoing maintenance included",
      color: "text-red-600",
    },
    {
      icon: Users,
      title: "Family Access",
      description: "Multiple family members can manage and update the memorial",
      color: "text-teal-600",
    },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Memories Are Safe With Us</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We use enterprise-grade technology to ensure your loved one's memorial is preserved securely and accessible
            forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreservationInfo
