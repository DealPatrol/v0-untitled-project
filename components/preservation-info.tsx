import { Card, CardContent } from "@/components/ui/card"
import { Shield, Cloud, Lock, Clock } from "lucide-react"

export function PreservationInfo() {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your memories are protected with bank-level encryption and security protocols",
    },
    {
      icon: Cloud,
      title: "Cloud Backup",
      description: "Multiple redundant backups ensure your memorial will never be lost",
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "You control who can view and contribute to each memorial page",
    },
    {
      icon: Clock,
      title: "Forever Guarantee",
      description: "We guarantee your memorial will be preserved for generations to come",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Memories Are Safe With Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We use the latest technology to ensure your digital memorials are secure, private, and preserved forever
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
