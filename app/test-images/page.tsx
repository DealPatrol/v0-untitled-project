"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SimpleImage } from "@/components/simple-image"

export default function TestImagesPage() {
  const [status, setStatus] = useState<Record<string, string>>({})

  const testImages = [
    {
      name: "Placeholder.co Image",
      url: "https://placehold.co/600x400?text=Test+Image",
    },
    {
      name: "Placeholder.com Image",
      url: "https://via.placeholder.com/600x400?text=Test+Image",
    },
    {
      name: "Dummyimage.com Image",
      url: "https://dummyimage.com/600x400/000/fff&text=Test+Image",
    },
    {
      name: "Picsum Image",
      url: "https://picsum.photos/600/400",
    },
  ]

  const testImage = (name: string, url: string) => {
    setStatus((prev) => ({ ...prev, [name]: "Loading..." }))

    const img = new Image()
    img.onload = () => {
      setStatus((prev) => ({ ...prev, [name]: "✅ Loaded successfully" }))
    }
    img.onerror = () => {
      setStatus((prev) => ({ ...prev, [name]: "❌ Failed to load" }))
    }
    img.src = url
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Image Loading Test Page</h1>
      <p className="mb-4">This page tests different image services to see which ones work in your browser.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {testImages.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">{image.name}</h3>
              <p className="text-xs text-gray-500 truncate">{image.url}</p>
            </div>
            <div className="h-48 relative">
              <SimpleImage
                src={image.url}
                alt={image.name}
                className="object-cover w-full h-full"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-4">
              <div className="mb-2 h-6 text-sm">
                {status[image.name] ? (
                  <span className={status[image.name].includes("✅") ? "text-green-600" : "text-red-600"}>
                    {status[image.name]}
                  </span>
                ) : (
                  <span className="text-gray-400">Not tested yet</span>
                )}
              </div>
              <Button onClick={() => testImage(image.name, image.url)} size="sm" variant="outline" className="w-full">
                Test Load
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click "Test Load" on each image to check if it loads in your browser</li>
          <li>The images that show "✅ Loaded successfully" are compatible with your browser</li>
          <li>Use the image service that works best for your site</li>
        </ol>
      </div>
    </div>
  )
}
