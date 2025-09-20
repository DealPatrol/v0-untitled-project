import { MemorialLogo } from "./memorial-logo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MemorialLogoShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Memorial QR Logo Design System</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Elegant cursive typography with subtle decorative elements, designed for dignity and remembrance.
          </p>
        </div>

        {/* Size Variants */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Size Variants
              <Badge variant="secondary">4 Options</Badge>
            </CardTitle>
            <CardDescription>Different sizes for various applications, from headers to hero sections.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Small (SM)</div>
              <MemorialLogo size="sm" />
              <p className="text-xs text-slate-400">Perfect for headers and navigation</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Medium (MD)</div>
              <MemorialLogo size="md" />
              <p className="text-xs text-slate-400">Default size for most applications</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Large (LG)</div>
              <MemorialLogo size="lg" />
              <p className="text-xs text-slate-400">Great for hero sections</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Extra Large (XL)</div>
              <MemorialLogo size="xl" />
              <p className="text-xs text-slate-400">Maximum impact for main branding</p>
            </div>
          </CardContent>
        </Card>

        {/* Color Variants */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Color Variants
              <Badge variant="secondary">4 Options</Badge>
            </CardTitle>
            <CardDescription>Adaptable colors for different backgrounds and contexts.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Default</div>
              <MemorialLogo variant="default" />
              <p className="text-xs text-slate-400 text-center">Professional dark gray for light backgrounds</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-slate-800 rounded-lg">
              <div className="text-sm font-medium text-slate-300 uppercase tracking-wide">Light</div>
              <MemorialLogo variant="light" />
              <p className="text-xs text-slate-300 text-center">Clean white for dark backgrounds</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-slate-100 rounded-lg">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Dark</div>
              <MemorialLogo variant="dark" />
              <p className="text-xs text-slate-400 text-center">Deep black for maximum contrast</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-slate-50 rounded-lg">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Gradient</div>
              <MemorialLogo variant="gradient" />
              <p className="text-xs text-slate-400 text-center">Modern gradient for contemporary appeal</p>
            </div>
          </CardContent>
        </Card>

        {/* Decoration Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Decoration Options
              <Badge variant="secondary">With/Without</Badge>
            </CardTitle>
            <CardDescription>Optional heart and sparkle decorations for enhanced warmth.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">With Decorations</div>
              <MemorialLogo showDecorations={true} />
              <p className="text-xs text-slate-400 text-center">Hearts and sparkles for warmth and reverence</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Without Decorations</div>
              <MemorialLogo showDecorations={false} />
              <p className="text-xs text-slate-400 text-center">Clean typography for professional contexts</p>
            </div>
          </CardContent>
        </Card>

        {/* Real-world Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Real-world Applications
              <Badge variant="secondary">Examples</Badge>
            </CardTitle>
            <CardDescription>How the logo appears in different contexts and applications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Header Example */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">Website Header</h3>
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <MemorialLogo size="sm" showDecorations={false} />
                  <div className="hidden md:flex items-center space-x-6 text-sm text-slate-600">
                    <span>How It Works</span>
                    <span>Products</span>
                    <span>Pricing</span>
                  </div>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded text-sm">Create Memorial</button>
                </div>
              </div>
            </div>

            {/* Hero Example */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">Hero Section</h3>
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-8 text-center">
                <MemorialLogo size="lg" variant="light" />
                <p className="text-slate-300 mt-4 max-w-md mx-auto">
                  Honor their memory with a lasting digital tribute
                </p>
              </div>
            </div>

            {/* Business Card Example */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">Business Card</h3>
              <div className="bg-white border-2 border-slate-200 rounded-lg p-6 max-w-sm">
                <MemorialLogo size="md" showDecorations={false} />
                <div className="mt-4 text-sm text-slate-600">
                  <p className="font-medium">Digital Memorial Services</p>
                  <p>Creating lasting tributes</p>
                  <p className="mt-2">memorialqr.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Specifications */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Technical Specifications</CardTitle>
            <CardDescription>Font and styling details for consistent implementation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Typography</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Font Family: Dancing Script</li>
                  <li>Font Weight: 600 (Semi-bold)</li>
                  <li>Letter Spacing: 0.05em</li>
                  <li>Text Shadow: Subtle depth</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Colors</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>Default: #1e293b (slate-800)</li>
                  <li>Light: #ffffff (white)</li>
                  <li>Dark: #0f172a (slate-900)</li>
                  <li>Gradient: Purple to Blue</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MemorialLogoShowcase
