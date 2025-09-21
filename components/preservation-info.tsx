import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Server, Clock, Lock } from "lucide-react"

export function PreservationInfo() {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption protects all memorial content and personal information.",
    },
    {
      icon: Server,
      title: "Reliable Hosting",
      description: "99.9% uptime guarantee with redundant backups across multiple data centers.",
    },
    {
      icon: Clock,
      title: "Permanent Preservation",
      description: "Your memorial will be maintained and accessible for at least 100 years.",
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "You control who can view and contribute to each memorial page.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built to Last Forever</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We understand the importance of preserving memories. That's why we've built our platform with the highest
            standards of security and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Promise to You</h3>
            <p className="text-gray-600 leading-relaxed">
              We commit to maintaining your memorial for generations to come. In the unlikely event that our service is
              discontinued, we will provide at least 12 months notice and help you migrate your content to ensure no
              memories are ever lost.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
