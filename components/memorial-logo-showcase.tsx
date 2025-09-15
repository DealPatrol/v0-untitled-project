"use client"

import { MemorialLogo } from "./memorial-logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MemorialLogoShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Memorial QR Logo Showcase</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Elegant cursive typography designed for memorial contexts with various size and color options
          </p>
        </div>

        {/* Size Variations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Size Variations
              <Badge variant="secondary">4 Options</Badge>
            </CardTitle>
            <CardDescription>
              Different sizes for various applications, from business cards to billboards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Small (SM)</div>
              <MemorialLogo size="sm" />
              <p className="text-xs text-slate-400">Perfect for headers and navigation</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Medium (MD)</div>
              <MemorialLogo size="md" />
              <p className="text-xs text-slate-400">Default size for most applications</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Large (LG)</div>
              <MemorialLogo size="lg" />
              <p className="text-xs text-slate-400">Great for hero sections</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Extra Large (XL)</div>
              <MemorialLogo size="xl" />
              <p className="text-xs text-slate-400">Maximum impact for main branding</p>
            </div>
          </CardContent>
        </Card>

        {/* Color Variations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Color Variations
              <Badge variant="secondary">4 Options</Badge>
            </CardTitle>
            <CardDescription>Adaptable colors for different backgrounds and contexts</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Default</div>
              <MemorialLogo variant="default" />
              <p className="text-xs text-slate-400 text-center">Professional slate gray for light backgrounds</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-slate-800 rounded-lg border">
              <div className="text-sm font-medium text-slate-300 uppercase tracking-wide">Light</div>
              <MemorialLogo variant="light" />
              <p className="text-xs text-slate-300 text-center">Clean white for dark backgrounds</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-slate-100 rounded-lg border">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Dark</div>
              <MemorialLogo variant="dark" />
              <p className="text-xs text-slate-400 text-center">Deep black for maximum contrast</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Gradient</div>
              <MemorialLogo variant="gradient" />
              <p className="text-xs text-slate-400 text-center">Modern purple-to-blue gradient</p>
            </div>
          </CardContent>
        </Card>

        {/* Application Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Application Examples
              <Badge variant="secondary">Real Usage</Badge>
            </CardTitle>
            <CardDescription>How the logo appears in different contexts and applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Header Example */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                <MemorialLogo size="sm" showDecorations={false} />
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span>Home</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 text-xs text-slate-500">Website Header Example</div>
            </div>

            {/* Hero Section Example */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-8 text-center">
              <MemorialLogo size="xl" variant="light" />
              <p className="text-slate-300 mt-4 text-sm">Hero Section Example</p>
            </div>

            {/* Business Card Example */}
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 max-w-sm mx-auto">
              <div className="text-center">
                <MemorialLogo size="md" />
                <div className="mt-4 text-sm text-slate-600">
                  <p className="font-medium">John Smith</p>
                  <p>Memorial Services</p>
                  <p>555-0123</p>
                </div>
              </div>
              <div className="text-xs text-slate-400 text-center mt-4">Business Card Example</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
