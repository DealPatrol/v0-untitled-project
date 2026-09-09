'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Copy, Share2, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface Phase3Props {
  memorialId: string
  deceasedName: string
  onComplete: () => void
}

export function MemorialOnboardingPhase3({
  memorialId,
  deceasedName,
  onComplete,
}: Phase3Props) {
  const [copied, setCopied] = useState(false)
  const memorialUrl = `https://lifememorialqr.vercel.app/memorial/${memorialId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(memorialUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Icon */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900">Their Legacy is Live</h1>
          <p className="text-xl text-slate-600 max-w-md mx-auto">
            {deceasedName}&apos;s memorial is now online and ready to be shared with loved ones around the world.
          </p>
        </div>

        {/* Memorial Card */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-8 space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-600">MEMORIAL ID</p>
                <p className="text-2xl font-bold text-slate-900 font-mono">{memorialId}</p>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm font-semibold text-slate-600 mb-3">MEMORIAL URL</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={memorialUrl}
                    readOnly
                    className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-700"
                  />
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-slate-900">What&apos;s Included:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Digital Memorial Page</strong> - Beautiful, permanent online tribute
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>QR Code</strong> - Easy sharing with printed memorial materials
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Tribute Wall</strong> - Family and friends can share messages and memories
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Photo Gallery</strong> - All memories organized beautifully
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-slate-700">
                    <strong>Forever Online</strong> - Preserved permanently for future generations
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 p-6 rounded-lg space-y-4 border-l-4 border-blue-600">
              <h4 className="font-semibold text-slate-900">Next Steps:</h4>
              <ol className="space-y-2 text-slate-700 text-sm">
                <li>
                  <span className="font-semibold">1. Share the Memorial</span> - Send the link to family and friends
                </li>
                <li>
                  <span className="font-semibold">2. Add Your QR Code</span> - Print it for funeral programs or flowers
                </li>
                <li>
                  <span className="font-semibold">3. Keep Adding Memories</span> - The memorial grows with shared tributes
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={onComplete}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg h-12"
          >
            View Memorial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button
            onClick={handleCopy}
            variant="outline"
            size="lg"
            className="text-lg h-12"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share with Family
          </Button>
        </div>

        {/* Testimonial */}
        <div className="text-center space-y-2 bg-white/50 backdrop-blur p-6 rounded-lg">
          <p className="text-slate-700 italic">
            &quot;We now have a place where family can gather to remember and honor their life, no matter where we are in the world.&quot;
          </p>
          <p className="text-sm text-slate-600">— A grateful family</p>
        </div>
      </div>
    </div>
  )
}
