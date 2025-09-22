import { Card, CardContent } from "@/components/ui/card"
import { Shield, Server, Clock, Lock } from "lucide-react"

export function PreservationInfo() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Military-Grade Security",
      description: "Your memories are protected with 256-bit encryption and secure cloud storage.",
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "99.9% Uptime Guarantee",
      description: "Hosted on enterprise-grade servers with redundant backups across multiple data centers.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "100+ Year Preservation",
      description: "We guarantee your memorial will be preserved and accessible for over 100 years.",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Privacy Controls",
      description: "You control who can view and contribute to each memorial with granular privacy settings.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built to Last Forever</h2>
          <p className="text-gray-300 text-lg">Enterprise-grade infrastructure ensures your memories are safe</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 text-center p-6">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
