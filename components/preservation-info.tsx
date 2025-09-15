"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Server,
  Globe,
  Lock,
  Database,
  Cloud,
  CheckCircle,
  Award,
  Clock,
  Users,
  FileText,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function PreservationInfo() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Preservation Promise</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your loved one's digital memorial is protected with enterprise-grade security and guaranteed to last forever
        </p>
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <Shield className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="text-green-900">Enterprise Security</CardTitle>
            <CardDescription className="text-green-700">
              Bank-level encryption protects all memorial data
            </CardDescription>
          </CardHeader>
          <CardContent className="text-green-800">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                AES-256 encryption at rest
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                TLS 1.3 encryption in transit
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Multi-factor authentication
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Regular security audits
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <Database className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle className="text-blue-900">Redundant Backups</CardTitle>
            <CardDescription className="text-blue-700">Multiple backup systems ensure data safety</CardDescription>
          </CardHeader>
          <CardContent className="text-blue-800">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Real-time data replication
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Geographic distribution
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Daily automated backups
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                99.99% uptime guarantee
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <Globe className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle className="text-purple-900">Global CDN</CardTitle>
            <CardDescription className="text-purple-700">Fast access from anywhere in the world</CardDescription>
          </CardHeader>
          <CardContent className="text-purple-800">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                150+ global edge locations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Sub-second load times
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Automatic failover
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                DDoS protection
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-6 w-6" />
            Technical Specifications
          </CardTitle>
          <CardDescription>Enterprise-grade infrastructure powering your memorial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Cloud className="h-5 w-5 text-blue-600" />
                Infrastructure
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• AWS/Google Cloud multi-region deployment</li>
                <li>• Kubernetes orchestration for scalability</li>
                <li>• Load balancing across multiple servers</li>
                <li>• Automatic scaling based on demand</li>
                <li>• 24/7 monitoring and alerting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Security & Privacy
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Zero-knowledge architecture</li>
                <li>• End-to-end encryption</li>
                <li>• GDPR and CCPA compliant</li>
                <li>• Regular penetration testing</li>
                <li>• SOC 2 Type II certified</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Badges */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6" />
            Compliance & Certifications
          </CardTitle>
          <CardDescription>Trusted by families worldwide with industry-leading certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">
                SOC 2
              </Badge>
              <p className="text-xs text-gray-600">Type II Certified</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">
                GDPR
              </Badge>
              <p className="text-xs text-gray-600">Compliant</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <Lock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">
                ISO 27001
              </Badge>
              <p className="text-xs text-gray-600">Certified</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <Badge variant="secondary" className="mb-1">
                WCAG 2.1
              </Badge>
              <p className="text-xs text-gray-600">AA Compliant</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention Policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Lifetime Guarantee</CardTitle>
            <CardDescription>Your memorial will be preserved forever</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Perpetual Storage</p>
                  <p className="text-sm text-gray-600">
                    Your memorial data is stored permanently with no expiration date
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Future-Proof Technology</p>
                  <p className="text-sm text-gray-600">Regular updates ensure compatibility with new devices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Legacy Protection</p>
                  <p className="text-sm text-gray-600">
                    Legal framework ensures memorial preservation even if ownership changes
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Data Rights</CardTitle>
            <CardDescription>You maintain full control over your memorial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Full Ownership</p>
                  <p className="text-sm text-gray-600">You own all content and can export it anytime</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Privacy Controls</p>
                  <p className="text-sm text-gray-600">Set who can view and contribute to the memorial</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Transfer Rights</p>
                  <p className="text-sm text-gray-600">Memorial ownership can be transferred to family members</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Families Worldwide</h3>
            <p className="text-gray-600">Real performance metrics from our memorial platform</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">99.99%</span>
              </div>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">0.8s</span>
              </div>
              <p className="text-sm text-gray-600">Load Time</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">10K+</span>
              </div>
              <p className="text-sm text-gray-600">Families Served</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-orange-600" />
                <span className="text-2xl font-bold text-gray-900">150+</span>
              </div>
              <p className="text-sm text-gray-600">Countries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Separator className="mb-8" />
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Create a Lasting Memorial?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of families who trust Memorial QR to preserve their loved ones' memories with enterprise-grade
          security and lifetime preservation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/pricing">Start Creating Memorial</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
