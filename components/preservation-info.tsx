import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Server, Clock, Lock } from "lucide-react"

export function PreservationInfo() {
  const features = [
    {
      icon: Shield,
      title: "Secure Hosting",
      description: "Your memorial pages are hosted on enterprise-grade servers with 99.9% uptime guarantee",
    },
    {
      icon: Server,
      title: "Multiple Backups",
      description: "All content is automatically backed up across multiple data centers for maximum protection",
    },
    {
      icon: Clock,
      title: "Forever Preserved",
      description: "Memorial pages are maintained indefinitely, ensuring your loved one's memory lives on",
    },
    {
      icon: Lock,
      title: "Privacy Protected",
      description: "Advanced privacy controls let you decide who can view and contribute to each memorial",
    },
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Built to Last Forever</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your memorial pages are protected by enterprise-grade security and hosting infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-gold-400" />
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
