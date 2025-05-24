import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MemorialPhoto } from "@/components/memorial-photo"

export const metadata: Metadata = {
  title: "Memorial Examples | Memorial QR",
  description:
    "Browse our collection of memorial examples to see how Memorial QR can help preserve memories of your loved ones.",
}

// Single sample memorial for focused development
const sampleMemorials = [
  {
    id: "sample-1",
    name: "Robert James Anderson",
    gender: "male",
    birth_date: "1945-03-11",
    death_date: "2022-08-23",
    bio: "Robert was a beloved father, grandfather, and veteran who served his country with honor. His passion for woodworking and storytelling brought joy to everyone who knew him.",
    cover_image_url: "",
  },
]

export default function MemorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="container mx-auto py-6 flex justify-center items-center border-b bg-white">
        <Link href="/" className="text-2xl font-serif flex flex-col items-center">
          <div className="flex items-center">
            <span className="mr-2">MEMORIAL</span>
            <span className="text-yellow-400">★</span>
            <span className="ml-1">QR</span>
          </div>
          <span className="text-xs text-rose-600 font-light tracking-wide">Tradition meets innovation</span>
        </Link>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-2">Memorial Examples</h1>
          <p className="text-lg text-rose-600 font-light mb-4">Tradition meets innovation</p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our collection of memorial examples to see how Memorial QR can help preserve and share the memories
            of your loved ones for generations to come.
          </p>
        </div>

        {/* Featured Memorial */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <MemorialPhoto src="/images/robert-wwi-uniform.jpeg" alt="Robert's grandfather in military uniform" />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Featured Memorial</div>
              <h2 className="mt-2 text-2xl font-serif leading-tight">Robert James Anderson</h2>
              <p className="text-gray-500">1945 - 2022</p>
              <p className="mt-4 text-gray-600">
                Robert was a beloved father, grandfather, and veteran who served his country with honor. His passion for
                woodworking and storytelling brought joy to everyone who knew him.
              </p>
              <div className="mt-6">
                <h3 className="font-medium text-gray-900">Memorial Features:</h3>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Photo gallery with 45+ memories</li>
                  <li>• 12 video tributes from family and friends</li>
                  <li>• Interactive family tree with 3 generations</li>
                  <li>• Timeline of life achievements</li>
                </ul>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/memorial/sample-1">View This Memorial</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Memorial Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleMemorials.map((memorial) => (
            <div key={memorial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <MemorialPhoto src="/images/robert-military-portrait.jpeg" alt="Robert in military uniform" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">{memorial.name}</h3>
                <p className="text-gray-500 text-sm mb-3">
                  {new Date(memorial.birth_date).getFullYear()} - {new Date(memorial.death_date).getFullYear()}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3">{memorial.bio}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/memorial/${memorial.id}`}>View Memorial</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Your Own CTA */}
        <div className="mt-16 text-center bg-gray-800 text-white rounded-xl p-8">
          <h2 className="text-3xl font-serif mb-4">Create Your Own Memorial</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Honor your loved one with a beautiful digital memorial that can be accessed through a durable QR code. Share
            photos, videos, stories, and more.
          </p>
          <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500" asChild>
            <Link href="/checkout">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
