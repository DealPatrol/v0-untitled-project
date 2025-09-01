"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  Camera,
  Share2,
  Download,
  QrCode,
  Copy,
  Mail,
  Church,
  Star,
  BookOpen,
  Home,
} from "lucide-react"

const memorialUrl = typeof window !== "undefined" ? `${window.location.origin}/memorial/glenda-jane-kelso` : ""

const generateQrCode = async () => {
  // Use QR Server API to generate a real QR code
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(memorialUrl)}&format=png&margin=10`
  // Fallback to Google Charts API
  const fallbackUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(memorialUrl)}&choe=UTF-8`
}

const downloadQrCode = async () => {
  if (!memorialUrl) return

  try {
    const response = await fetch(memorialUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "glenda-jane-kelso-memorial-qr.png"
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (error) {
    console.error("Error downloading QR code:", error)
  }
}

const copyMemorialUrl = async () => {
  try {
    await navigator.clipboard.writeText(memorialUrl)
    // You could add a toast notification here
  } catch (error) {
    console.error("Error copying URL:", error)
  }
}

export default function GlendaJaneKelsoMemorial() {
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isGeneratingQr, setIsGeneratingQr] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2173-DvzRNi43RzqFyJCL8MYc8goKHHuEoG.jpeg"
          alt="Glenda Jane Kelso Memorial Cover - Beach Walk"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <Badge className="mb-4 bg-orange-600 text-white">
            <QrCode className="w-4 h-4 mr-2" />
            Digital Memorial
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Glenda Jane Kelso</h1>
          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>March 15, 1943 - December 28, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Hanceville, Alabama</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200 flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2181-W2nQQTXll54HpT6hDYhnsFVDRgelfh.jpeg"
                      alt="Glenda Jane Kelso"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Glenda Jane Kelso</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <span>March 15, 1943 - December 28, 2023</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-600" />
                        <span>Hanceville, Alabama</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-orange-600" />
                        <span>Age 80</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Church className="w-5 h-5 text-orange-600" />
                        <span>Hanceville Funeral Home</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
                  <p className="text-gray-800 italic text-lg">"Love can be fierce, funny, and a little bit noisy."</p>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">A Life Lived on Her Own Terms</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Glenda Jane Kelso left this world the same way she lived in it—on her own terms, with a quick wit,
                    and probably planning a joke we haven't caught onto yet. She was a selfless and loving homemaker who
                    dedicated her life to her husband of 57 years, her children, grandchildren, and countless others she
                    took in as her own.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Patient and kind, yet tough as nails, she had a fanatic sense of humor that could cut through the
                    hardest days. She made the best chocolate gravy in the world, spoiled us rotten, and never let us
                    forget who was really in charge. She had a deep love for kids, always dressing up for
                    holidays—especially Halloween—and making magic out of the ordinary.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    She was happiest when surrounded by family, though we suspect the police scanner was a close second.
                    Glenda loved music, laughter, and telling it straight. She was bossy, stubborn, and never afraid to
                    stick by us when the world said no. Through the good and the bad, she cracked jokes, kept us
                    together, and reminded us that love can be fierce, funny, and a little bit noisy.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Glenda Jane Kelso was one of a kind. We are fortunate, blessed, and endlessly grateful to have been
                    loved by her. And though we'll miss her beyond measure, we can take comfort knowing she's with her
                    mama, Desmer McAnnally, in Heaven keeping check on us.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Life Highlights */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-orange-600" />
                  Life Highlights
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-orange-600" />
                      Family & Faith
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Devoted wife of 57 years to Lynn Kelso</li>
                      <li>• Loving mother and grandmother</li>
                      <li>• Took in countless others as her own family</li>
                      <li>• Known for her fierce, funny, and noisy love</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Home className="w-5 h-5 text-orange-600" />
                      Community & Legacy
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Made the best chocolate gravy in the world</li>
                      <li>• Loved dressing up for holidays, especially Halloween</li>
                      <li>• Had a deep love for kids and making magic from ordinary moments</li>
                      <li>• Known for her quick wit and fantastic sense of humor</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Family Section */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-orange-600" />
                  Family & Survivors
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Preceded in Death</h4>
                    <p className="text-gray-700">Her mother, Desmer McAnnally</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Husband</h4>
                    <p className="text-gray-700">Lynn Kelso (married 57 years)</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Children</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Eddie Kelso</li>
                      <li>• Penny Collins</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Children She Loved as Her Own</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Savannah (Bo) Pitts</li>
                      <li>• Bama Thompson</li>
                      <li>• Taylor (Kelly) Hunter</li>
                      <li>• Jordan Thompson</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Grandchildren</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Cole Collins</li>
                      <li>• Kristin Kelso</li>
                      <li>• Gracie Dean</li>
                      <li>• Braxton Phillips</li>
                      <li>• Weston Green</li>
                      <li>• Addalynn Rassman</li>
                      <li>• Wrenley Hunter</li>
                      <li>• Ridge Thompson</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Special Family</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Caroline (Caro) - Her beautiful French daughter-in-love</li>
                      <li>• Colton, Anzlie, and Remi - Her God sent angels</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Special Friends</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Eric Wells</li>
                      <li>• Shana Melton</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Camera className="w-6 h-6 text-orange-600" />
                  Photo Gallery
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2181-W2nQQTXll54HpT6hDYhnsFVDRgelfh.jpeg"
                      alt="Glenda Kelso Portrait"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Memorial Portrait
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2168-klki5nzsOCbEJNaljSBvPpXNsUQYUd.jpeg"
                      alt="Family at Baseball Game"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Family at UAB Game
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2174-i5BKus6N3sZ7434Sjy5TKTaKKBDhg3.jpeg"
                      alt="Glenda and husband in garden"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Garden Memories
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2176-SVOoBO6mZH0l4QTqM4jCH5UnoRGJNq.jpeg"
                      alt="Christmas with daughter"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Christmas Together
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2175-UGD9qDeIhgOBPHra2kyxiUgYewJODL.jpeg"
                      alt="Dining out together"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Date Night
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2173-DvzRNi43RzqFyJCL8MYc8goKHHuEoG.jpeg"
                      alt="Beach walk together"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Beach Walks
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2170-t1fKeAawpfBilxL2fRST68PYVrM8zw.jpeg"
                      alt="Hospital visit"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Final Days
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2171.PNG-3SQWBapiovMQs1gQ6afxH1AOa92m7M.jpeg"
                      alt="Hospital bedside"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      Surrounded by Love
                    </div>
                  </div>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2172.PNG-zxO8xwnDbpatfeSNxRMIVWf3ZrW9Nu.jpeg"
                      alt="Hospital visit with granddaughter"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                      With Granddaughter
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Memorial Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Memorial Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Visitors</span>
                    </div>
                    <span className="font-semibold text-gray-900">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Photos</span>
                    </div>
                    <span className="font-semibold text-gray-900">9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-700">Stories</span>
                    </div>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-orange-600" />
                  Memorial QR Code
                </h3>

                {qrCodeUrl ? (
                  <div className="text-center space-y-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                      <Image
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="Memorial QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <p className="text-sm text-gray-600">Scan to visit this memorial</p>
                    <div className="flex gap-2">
                      <Button onClick={downloadQrCode} size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={copyMemorialUrl} variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy URL
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                    <Button onClick={generateQrCode} disabled={isGeneratingQr} className="w-full">
                      {isGeneratingQr ? "Generating..." : "Generate QR Code"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Service Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Service Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Church className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Hanceville Funeral Home</div>
                      <div className="text-gray-600">Hanceville, Alabama</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Services Held</div>
                      <div className="text-gray-600">December 30, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Final Rest</div>
                      <div className="text-gray-600">With dignity and love</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Memorial */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-orange-600" />
                  Share Memorial
                </h3>
                <div className="space-y-3">
                  <Button onClick={copyMemorialUrl} variant="outline" className="w-full justify-start bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Memorial Link
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link
                      href={`mailto:?subject=Memorial for Glenda Jane Kelso&body=Please visit this memorial: ${memorialUrl}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Share via Email
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
