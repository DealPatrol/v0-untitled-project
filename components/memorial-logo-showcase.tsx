"use client"

import { MemorialLogo } from "./memorial-logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Sparkles } from "lucide-react"

export function MemorialLogoShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">Memorial QR Logo Design</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Elegant cursive typography with subtle decorative elements, designed for memorial contexts
          </p>
        </div>

        {/* Size Variations */}
        <Card>
          <CardHeader>
            <CardTitle>Size Variations</CardTitle>
            <CardDescription>Different sizes for various applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-2">Extra Large (XL)</p>
                <MemorialLogo size="xl" />
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-2">Large (LG)</p>
                <MemorialLogo size="lg" />
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-2">Medium (MD)</p>
                <MemorialLogo size="md" />
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-2">Small (SM)</p>
                <MemorialLogo size="sm" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Variations */}
        <Card>
          <CardHeader>
            <CardTitle>Color Variations</CardTitle>
            <CardDescription>Different color schemes for various contexts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Default */}
              <div className="text-center p-6 bg-white rounded-lg border">
                <p className="text-sm text-slate-500 mb-4">Default</p>
                <MemorialLogo size="lg" variant="default" />
              </div>

              {/* Gradient */}
              <div className="text-center p-6 bg-white rounded-lg border">
                <p className="text-sm text-slate-500 mb-4">Gradient</p>
                <MemorialLogo size="lg" variant="gradient" />
              </div>

              {/* Light (on dark background) */}
              <div className="text-center p-6 bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-300 mb-4">Light</p>
                <MemorialLogo size="lg" variant="light" />
              </div>

              {/* Dark */}
              <div className="text-center p-6 bg-slate-100 rounded-lg border">
                <p className="text-sm text-slate-500 mb-4">Dark</p>
                <MemorialLogo size="lg" variant="dark" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Application Examples</CardTitle>
            <CardDescription>How the logo appears in different contexts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Header Example */}
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-white p-4 border-b flex items-center justify-between">
                <MemorialLogo size="sm" showDecorations={false} />
                <div className="flex space-x-4 text-sm text-slate-600">
                  <span>Home</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
              </div>
              <div className="p-4 text-center text-sm text-slate-500">Website Header Example</div>
            </div>

            {/* Hero Section Example */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-12 text-center">
              <MemorialLogo size="xl" variant="light" />
              <p className="text-white/80 mt-6 text-lg">Preserving memories with dignity and grace</p>
            </div>

            {/* Business Card Example */}
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 max-w-sm mx-auto">
              <div className="text-center">
                <MemorialLogo size="md" showDecorations={false} />
                <div className="mt-4 space-y-1 text-sm text-slate-600">
                  <p className="font-semibold">John Smith</p>
                  <p>Memorial Services Coordinator</p>
                  <p>contact@memorialqr.com</p>
                  <p>(555) 123-4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Design Features */}
        <Card>
          <CardHeader>
            <CardTitle>Design Features</CardTitle>
            <CardDescription>Key elements that make this logo elegant and memorable</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-dancing text-xl">Aa</span>
                </div>
                <h3 className="font-semibold mb-2">Cursive Typography</h3>
                <p className="text-sm text-slate-600">Dancing Script font provides elegant, readable cursive styling</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="font-semibold mb-2">Subtle Decorations</h3>
                <p className="text-sm text-slate-600">Heart and sparkle icons add warmth without overwhelming</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                </div>
                <h3 className="font-semibold mb-2">Elegant Underline</h3>
                <p className="text-sm text-slate-600">Gradient underline adds sophistication and balance</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold mb-2">Gentle Animation</h3>
                <p className="text-sm text-slate-600">Subtle pulse animation brings life to the design</p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-green-600 rounded"></div>
                    <div className="w-2 h-2 bg-green-400 rounded"></div>
                    <div className="w-2 h-2 bg-green-400 rounded"></div>
                    <div className="w-2 h-2 bg-green-600 rounded"></div>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Scalable Design</h3>
                <p className="text-sm text-slate-600">
                  Works beautifully at any size from business cards to billboards
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded"></div>
                </div>
                <h3 className="font-semibold mb-2">Versatile Colors</h3>
                <p className="text-sm text-slate-600">Multiple color variants for different backgrounds and contexts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
