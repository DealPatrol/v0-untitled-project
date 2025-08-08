"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, MapPin, Users, Camera, MessageCircle, ArrowRight, Star, Share2 } from 'lucide-react'

export default function SampleMemorialPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Cover Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">In Loving Memory</h1>
            <p className="text-xl opacity-90">A life well lived, a legacy that endures</p>
          </div>
        </div>
      </section>

      {/* Memorial Header */}
      <section className="relative -mt-20 z-10">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-2xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Birth Info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-gray-900">BORN</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">March 15, 1945</div>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Chicago, Illinois</span>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
                      <Image
                        src="/images/elderly-person-portrait.png"
                        alt="Robert Johnson"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                      Beloved Father
                    </Badge>
                  </div>
                </div>

                {/* Death Info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span className="font-bold text-gray-900">PASSED</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">August 12, 2023</div>
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>Phoenix, Arizona</span>
                  </div>
                </div>
              </div>

              {/* Name and Dates */}
              <div className="text-center mt-8 mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Robert Johnson</h2>
                <p className="text-xl text-gray-600">March 15, 1945 - August 12, 2023</p>
                <p className="text-lg text-gray-500 mt-2">Age 78 • Loving Husband, Father, and Grandfather</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Heart className="mr-2 h-4 w-4" />
                  Leave Condolence
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Memorial
                </Button>
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Add Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Life Story */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Life Story</h3>
                  <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                    <p>
                      Robert Johnson was born on March 15, 1945, in Chicago, Illinois, to loving parents Mary and William Johnson. 
                      From an early age, Robert showed a passion for woodworking and craftsmanship that would define much of his life.
                    </p>
                    <p>
                      After graduating from high school, Robert served his country proudly in the United States Army during the Vietnam War. 
                      His service instilled in him values of honor, duty, and sacrifice that he carried throughout his life.
                    </p>
                    <p>
                      Upon returning home, Robert met the love of his life, Margaret, at a local dance in 1968. They married two years later 
                      and built a beautiful life together, raising three wonderful children: Michael, Sarah, and David.
                    </p>
                    <p>
                      Robert worked as a master carpenter for over 40 years, building homes and furniture that still stand today as 
                      testaments to his skill and dedication. He took great pride in his work and mentored many young craftsmen over the years.
                    </p>
                    <p>
                      In his retirement, Robert enjoyed fishing, spending time with his seven grandchildren, and volunteering at the local 
                      veterans' center. He was known for his warm smile, generous heart, and the way he could fix anything with his hands.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Photo Gallery */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Memories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { src: "/images/robert-family-photo.png", alt: "Family Photo", caption: "Family Reunion 2020" },
                      { src: "/images/robert-woodworking.png", alt: "Woodworking", caption: "In his workshop" },
                      { src: "/images/robert-fishing.png", alt: "Fishing", caption: "Favorite fishing spot" },
                      { src: "/images/robert-graduation.png", alt: "Graduation", caption: "Son's graduation" },
                      { src: "/images/robert-medal.png", alt: "Military Medal", caption: "Military service" },
                      { src: "/images/robert-wedding.png", alt: "Wedding", caption: "Wedding day 1970" },
                    ].map((photo, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 shadow-md group-hover:shadow-lg transition-shadow">
                          <Image
                            src={photo.src || "/placeholder.svg"}
                            alt={photo.alt}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">{photo.caption}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Guest Messages */}
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Messages of Love</h3>
                  <div className="space-y-6">
                    {[
                      {
                        name: "Sarah Johnson",
                        relationship: "Daughter",
                        message: "Dad, you were the strongest man I knew. Thank you for teaching me the value of hard work and kindness. Your memory will live on in all of us.",
                        date: "2 days ago"
                      },
                      {
                        name: "Mike Thompson",
                        relationship: "Friend & Neighbor",
                        message: "Bob was always there to lend a helping hand. He fixed my fence, taught my son woodworking, and was a true friend for over 30 years. Rest in peace, buddy.",
                        date: "3 days ago"
                      },
                      {
                        name: "Emily Johnson",
                        relationship: "Granddaughter",
                        message: "Grandpa, thank you for all the fishing trips and bedtime stories. You made every moment special. I love you and miss you so much.",
                        date: "1 week ago"
                      }
                    ].map((message, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              {message.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{message.name}</div>
                            <div className="text-sm text-gray-600">{message.relationship}</div>
                          </div>
                          <div className="ml-auto text-sm text-gray-500">{message.date}</div>
                        </div>
                        <p className="text-gray-700 italic">"{message.message}"</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Share Your Memory</h4>
                    <p className="text-gray-600 mb-4">Leave a message of love and remembrance for the family</p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Write a Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Family Tree */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Family Tree
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-pink-600 font-semibold">MJ</span>
                      </div>
                      <div className="font-semibold text-gray-900">Margaret Johnson</div>
                      <div className="text-sm text-gray-600">Beloved Wife</div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Children</h4>
                      <div className="space-y-3">
                        {['Michael Johnson', 'Sarah Mitchell', 'David Johnson'].map((child, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-sm font-semibold">
                                {child.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="text-gray-700">{child}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Grandchildren</h4>
                      <div className="text-sm text-gray-600">
                        7 grandchildren • 2 great-grandchildren
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Memorial Stats */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Memorial Activity</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Visitors</span>
                      <span className="font-semibold text-gray-900">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Messages</span>
                      <span className="font-semibold text-gray-900">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Photos</span>
                      <span className="font-semibold text-gray-900">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Memories Shared</span>
                      <span className="font-semibold text-gray-900">15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Create Your Own CTA */}
              <Card className="shadow-lg border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your Own Memorial</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Honor your loved one with a beautiful digital memorial like this one
                  </p>
                  <div className="text-2xl font-bold text-rose-600 mb-2">$119.99</div>
                  <p className="text-sm text-gray-500 mb-4">One-time payment • Lifetime hosting</p>
                  <Link href="/create-profile">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full">
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>4.9/5 Rating</span>
                    </div>
                    <div>30-Day Guarantee</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
