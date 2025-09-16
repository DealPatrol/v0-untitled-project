import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Cloud, Clock, Award, CheckCircle } from "lucide-react"

export default function PreservationInfo() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption protects all memorial content and personal information",
    },
    {
      icon: Cloud,
      title: "Cloud Backup",
      description: "Multiple redundant backups ensure your memories are never lost",
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "You control who can view and contribute to your loved one's memorial",
    },
    {
      icon: Clock,
      title: "Lifetime Hosting",
      description: "Your memorial will remain accessible forever with 99.9% uptime guarantee",
    },
  ]

  const complianceFeatures = [
    "GDPR Compliant",
    "SOC 2 Certified",
    "ISO 27001 Certified",
    "HIPAA Compliant",
    "PCI DSS Compliant",
    "CCPA Compliant",
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
          <Award className="w-4 h-4 mr-2" />
          Trusted & Secure
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your Memories Are Safe With Us</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          We use enterprise-grade security and compliance standards to protect your family's precious memories and
          ensure they're preserved for generations.
        </p>
      </div>

      {/* Security Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {securityFeatures.map((feature, index) => (
          <Card key={index} className="memorial-card text-center h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Section */}
      <div className="bg-slate-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Industry Compliance & Certifications</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We maintain the highest standards of data protection and privacy compliance to ensure your family's
            information is secure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {complianceFeatures.map((compliance, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg border border-slate-200"
            >
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-slate-700">{compliance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Retention Policy */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Forever Guarantee</h3>
          <p className="text-lg text-slate-700 mb-6">
            We guarantee that your memorial will remain accessible forever. Our redundant infrastructure and lifetime
            commitment ensure your loved one's memory is preserved for future generations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-slate-600">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
              <div className="text-slate-600">Lifetime Access</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-slate-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Rights Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Your Data Rights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600">
          <div className="flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Right to Access
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Right to Portability
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Right to Correction
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
            Right to Deletion
          </div>
        </div>
      </div>
    </div>
  )
}
