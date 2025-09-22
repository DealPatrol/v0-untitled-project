import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Users, Award } from "lucide-react"

export function PreservationInfo() {
  const features = [
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Military-grade encryption protects your precious memories with bank-level security.",
    },
    {
      icon: Clock,
      title: "Forever Preserved",
      description: "Automatic backups and redundant storage ensure your memorial lasts for generations.",
    },
    {
      icon: Users,
      title: "Family Access",
      description: "Grant access to family members so they can contribute and maintain the memorial together.",
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description: "Used by thousands of families worldwide and recommended by funeral professionals.",
    },
  ]

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Memories, Safely Preserved</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand how precious these memories are. That's why we've built the most secure and reliable platform
            for digital memorials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 bg-white">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="h-4 w-4" />
            <span>99.9% Uptime Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
