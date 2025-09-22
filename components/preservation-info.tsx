import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Server, Clock, Lock } from "lucide-react"

export function PreservationInfo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Memories Are Safe</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We use enterprise-grade security and reliable infrastructure to ensure your memorials are preserved for
            generations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">SSL Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                All data is encrypted in transit and at rest using industry-standard SSL certificates
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg">Cloud Hosting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Hosted on reliable cloud infrastructure with 99.9% uptime guarantee
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Daily Backups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">Automatic daily backups ensure your memories are never lost</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Privacy Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Flexible privacy settings let you control who can view and contribute
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
