"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BasicImage } from "@/components/basic-image"

export default function ImageDebugPage() {
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toISOString()}: ${message}`])
  }

  const testImages = [
    {
      name: "Direct URL Placeholder",
      url: "https://placehold.co/600x400/e2e8f0/64748b?text=Test+Image",
    },
    {
      name: "Veteran Portrait",
      url: "/images/veteran-portrait.png",
    },
    {
      name: "Veteran Cover",
      url: "/images/veteran-cover.png",
    },
    {
      name: "Female Memorial Portrait",
      url: "/images/female-memorial-portrait.png",
    },
    {
      name: "Male Memorial Portrait",
      url: "/images/male-memorial-portrait.png",
    },
  ]

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Image Loading Debug Page</h1>

      <div className="mb-6">
        <Button onClick={clearLogs} variant="outline" className="mb-2">
          Clear Logs
        </Button>
        <Card className="p-4 bg-gray-100 h-40 overflow-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet. Test images to see loading results.</p>
          ) : (
            <pre className="text-xs">{logs.join("\n")}</pre>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testImages.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">{image.name}</h3>
              <p className="text-sm text-gray-500 truncate">{image.url}</p>
            </div>
            <div className="h-48 relative">
              <BasicImage
                src={image.url}
                alt={image.name}
                className="object-cover w-full h-full"
                fallbackSrc="https://placehold.co/600x400/f9a8d4/a21caf?text=Failed+to+Load"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-4">
              <Button
                onClick={() => {
                  addLog(`Testing image: ${image.name} (${image.url})`)
                  const img = new Image()
                  img.onload = () => addLog(`✅ Success: ${image.name} loaded successfully`)
                  img.onerror = () => addLog(`❌ Error: ${image.name} failed to load`)
                  img.src = image.url
                }}
                size="sm"
                variant="outline"
                className="w-full"
              >
                Test Load
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
