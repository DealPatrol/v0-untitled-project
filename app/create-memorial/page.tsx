"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MemorialOnboardingPhase1 } from "@/components/memorial-onboarding-phase1"
import { MemorialOnboardingPhase2, type FormData } from "@/components/memorial-onboarding-phase2"
import { MemorialOnboardingPhase3 } from "@/components/memorial-onboarding-phase3"
import { Button } from "@/components/ui/button"

type OnboardingPhase = 0 | 1 | 2 | 3

export default function CreateMemorialPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const [phase, setPhase] = useState<OnboardingPhase>(1)
  const [orderId, setOrderId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [memorialData, setMemorialData] = useState<FormData | null>(null)

  useEffect(() => {
    const order = searchParams.get("order")

    if (!order) {
      toast({
        title: "Access Denied",
        description: "Please complete your purchase first to create your memorial.",
        variant: "destructive",
      })
      router.push("/products")
      return
    }

    setOrderId(order)
    setPhase(1)
  }, [searchParams, router, toast])

  const handlePhase1Next = () => {
    setPhase(2)
  }

  const handlePhase2Next = (data: FormData) => {
    setMemorialData(data)
    handlePhase2Submit(data)
  }

  const handlePhase2Back = () => {
    setPhase(1)
  }

  const handlePhase2Submit = async (data: FormData) => {
    setIsSubmitting(true)

    // Simulate memorial creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const memorialId = `MEM-${Date.now()}`

    toast({
      title: "Memorial Created Successfully!",
      description: `${data.firstName} ${data.lastName}'s memorial is now live.`,
    })

    setIsSubmitting(false)
    setPhase(3)
  }

  const handlePhase3Complete = () => {
    const memorialId = `MEM-${Date.now()}`
    router.push(`/memorial/${memorialId}?order=${orderId}`)
  }

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center border-none shadow-lg">
          <CardContent className="p-8">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Purchase Required</h2>
            <p className="text-gray-600 mb-6">
              Please purchase a memorial product first to access the memorial creation form.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 w-full">
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Phase 1: Welcome
  if (phase === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <Header />
        <MemorialOnboardingPhase1 onNext={handlePhase1Next} />
      </div>
    )
  }

  // Phase 2: 3-Step Setup
  if (phase === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <MemorialOnboardingPhase2
          onNext={handlePhase2Next}
          onBack={handlePhase2Back}
          initialData={memorialData || undefined}
        />
      </div>
    )
  }

  // Phase 3: Confirmation
  if (phase === 3 && memorialData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <Header />
        <MemorialOnboardingPhase3
          memorialId={`MEM-${Date.now()}`}
          deceasedName={`${memorialData.firstName} ${memorialData.lastName}`}
          onComplete={handlePhase3Complete}
        />
      </div>
    )
  }

  return null
}
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Memorial QR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
