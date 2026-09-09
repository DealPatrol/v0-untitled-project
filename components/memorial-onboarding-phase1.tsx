'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, ArrowRight } from 'lucide-react'

interface Phase1Props {
  onNext: () => void
}

export function MemorialOnboardingPhase1({ onNext }: Phase1Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900">Welcome Home</h1>
          <p className="text-xl text-slate-600 max-w-md mx-auto">
            Every life deserves to be remembered. Let&apos;s build a legacy that honors their memory.
          </p>
        </div>

        {/* Main Message Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1: Your Story */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-4xl">📖</div>
              <h2 className="text-2xl font-bold text-slate-900">Your Story</h2>
              <p className="text-slate-600">
                Share the moments, memories, and milestones that made their life extraordinary.
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Forever Connected */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8 text-center space-y-4">
              <div className="text-4xl">🌍</div>
              <h2 className="text-2xl font-bold text-slate-900">Forever Connected</h2>
              <p className="text-slate-600">
                Family and friends can share memories and tributes from anywhere in the world.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Benefits */}
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">What You'll Create:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-slate-700">
                  <strong>A Digital Memorial</strong> - A beautiful, permanent online tribute accessible by QR code
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-slate-700">
                  <strong>Shareable Memories</strong> - Photos, videos, and stories that celebrate their life
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <p className="text-slate-700">
                  <strong>Legacy Preserved</strong> - A timeless tribute that lives forever online
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="flex gap-4">
          <Button
            onClick={onNext}
            size="lg"
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg h-12"
          >
            Build a Legacy
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-sm text-slate-500">
          This will take just 3 simple steps. We&apos;re here to help every step of the way.
        </p>
      </div>
    </div>
  )
}
