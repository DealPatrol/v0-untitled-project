"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight, Heart, Quote } from "lucide-react"
import { useAnalytics } from "@/lib/analytics"

interface Testimonial {
  id: string
  name: string
  relationship: string
  location: string
  rating: number
  text: string
  memorialName: string
  avatar?: string
  verified: boolean
  date: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    relationship: "Daughter",
    location: "Birmingham, AL",
    rating: 5,
    text: "Memorial QR helped us create a beautiful tribute to my father. The QR code on his headstone allows visitors to see his life story, photos from his military service, and messages from family. It's brought so much comfort to our family knowing his memory lives on digitally.",
    memorialName: "Robert Johnson",
    avatar: "/testimonial-sarah.jpg",
    verified: true,
    date: "2024-01-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    relationship: "Son",
    location: "Huntsville, AL",
    rating: 5,
    text: "The process was so easy and the support team was incredibly helpful. Our family can now share memories and photos of mom in one place. Friends from across the country have been able to contribute their own stories and photos. It's like having a living memorial.",
    memorialName: "Linda Chen",
    avatar: "/testimonial-michael.jpg",
    verified: true,
    date: "2024-02-03",
  },
  {
    id: "3",
    name: "Lisa Rodriguez",
    relationship: "Daughter",
    location: "Mobile, AL",
    rating: 5,
    text: "What a wonderful way to keep mom's memory alive. Friends and family love being able to access her photos and stories anytime by scanning the QR code. We've received so many beautiful messages from people who knew her. The customization options made it feel truly personal.",
    memorialName: "Maria Rodriguez",
    avatar: "/testimonial-lisa.jpg",
    verified: true,
    date: "2024-01-28",
  },
  {
    id: "4",
    name: "David Thompson",
    relationship: "Husband",
    location: "Montgomery, AL",
    rating: 5,
    text: "After losing my wife, I wanted a way to share her story with future generations. Memorial QR made it possible to create a comprehensive digital memorial with photos, videos, and stories spanning 45 years of marriage. The QR code on her grave marker connects visitors to her beautiful life story.",
    memorialName: "Margaret Thompson",
    avatar: "/testimonial-david.jpg",
    verified: true,
    date: "2024-02-10",
  },
  {
    id: "5",
    name: "Jennifer Williams",
    relationship: "Sister",
    location: "Tuscaloosa, AL",
    rating: 5,
    text: "My brother was only 34 when he passed. Memorial QR helped us create a space where all his friends could share memories, photos, and videos. The analytics show that people visit his memorial regularly, which brings us so much comfort. It's like he's still bringing people together.",
    memorialName: "James Williams",
    avatar: "/testimonial-jennifer.jpg",
    verified: true,
    date: "2024-01-20",
  },
  {
    id: "6",
    name: "Robert Davis",
    relationship: "Son",
    location: "Dothan, AL",
    rating: 5,
    text: "Dad was a Vietnam veteran and we wanted to honor his service properly. Memorial QR allowed us to include his military photos, service records, and stories from fellow veterans. The QR code at the veterans cemetery has been scanned hundreds of times. It's exactly what dad would have wanted.",
    memorialName: "William Davis",
    avatar: "/testimonial-robert.jpg",
    verified: true,
    date: "2024-02-05",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { trackEvent } = useAnalytics()

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    trackEvent("testimonial_navigation", { direction: "previous", index: currentIndex })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    trackEvent("testimonial_navigation", { direction: "next", index: currentIndex })
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    trackEvent("testimonial_navigation", { direction: "dot", index })
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Families Say</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Hear from Alabama families who have honored their loved ones with Memorial QR
        </p>
      </div>

      {/* Main Testimonial Carousel */}
      <div className="relative max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 shadow-xl">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center md:text-left">
                <Avatar className="w-20 h-20 mx-auto md:mx-0 mb-4 border-4 border-white shadow-lg">
                  <AvatarImage src={currentTestimonial.avatar || "/placeholder.svg"} alt={currentTestimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-xl font-bold">
                    {currentTestimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h4 className="font-semibold text-gray-900">{currentTestimonial.name}</h4>
                    {currentTestimonial.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{currentTestimonial.relationship}</p>
                  <p className="text-sm text-gray-500">{currentTestimonial.location}</p>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                  "{currentTestimonial.text}"
                </blockquote>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Memorial for {currentTestimonial.memorialName}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-purple-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,247</div>
            <p className="text-blue-800 font-medium">Families Served</p>
            <p className="text-sm text-blue-600 mt-1">Across Alabama and beyond</p>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-green-800 font-medium">Average Rating</p>
            <p className="text-sm text-green-600 mt-1">From verified customers</p>
          </CardContent>
        </Card>

        <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <p className="text-purple-800 font-medium">Would Recommend</p>
            <p className="text-sm text-purple-600 mt-1">To other families</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-4">{testimonial.text}</p>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Heart className="w-3 h-3 text-red-500" />
                <span>Memorial for {testimonial.memorialName}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
