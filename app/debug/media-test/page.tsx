"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Download, FileX } from "lucide-react"

interface MediaTest {
  path: string
  type: "image" | "video"
  status: "pending" | "success" | "error" | "not-found"
  error?: string
  size?: number
  loadTime?: number
  alternatives?: string[]
}

export default function MediaTestPage() {
  const [tests, setTests] = useState<MediaTest[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [summary, setSummary] = useState({ total: 0, success: 0, failed: 0, missing: 0 })

  const mediaFiles = [
    // Robert's Memorial Images
    {
      path: "/images/robert-vintage-uniform.jpeg",
      type: "image" as const,
      alternatives: ["/images/robert-military.jpg", "/images/robert-portrait.jpg"],
    },
    {
      path: "/images/robert-military-portrait.jpeg",
      type: "image" as const,
      alternatives: ["/images/robert-military.jpg", "/images/veteran-portrait.png"],
    },
    {
      path: "/images/robert-graduation.png",
      type: "image" as const,
      alternatives: ["/images/robert-portrait.jpg", "/images/male-memorial-portrait.png"],
    },
    {
      path: "/images/robert-wedding.png",
      type: "image" as const,
      alternatives: ["/images/robert-anniversary.jpg", "/images/robert-family.jpg"],
    },
    {
      path: "/images/robert-fishing.png",
      type: "image" as const,
      alternatives: ["/images/robert-fishing.jpg", "/images/veteran-fishing.png"],
    },
    {
      path: "/images/robert-woodworking.png",
      type: "image" as const,
      alternatives: ["/images/robert-workshop.jpg", "/images/veteran-workshop.png"],
    },
    {
      path: "/images/robert-ocean-view.png",
      type: "image" as const,
      alternatives: ["/images/robert-cover.jpg", "/images/veteran-cover.png"],
    },

    // Site Images
    {
      path: "/images/cemetery-hero.png",
      type: "image" as const,
      alternatives: ["/images/hero-image.png", "/placeholder.svg?height=400&width=800&text=Cemetery+Hero"],
    },
    {
      path: "/images/memorial-demo.jpg",
      type: "image" as const,
      alternatives: ["/images/memorial-1.jpg", "/placeholder.svg?height=300&width=400&text=Memorial+Demo"],
    },

    // Videos
    {
      path: "/videos/revolutionizing-remembrance-qr.mov",
      type: "video" as const,
      alternatives: ["/videos/revolutionizing-remembrance.mp4", "/videos/memorial-qr-demo.mp4"],
    },
    {
      path: "/videos/memorial-qr-demo.mp4",
      type: "video" as const,
      alternatives: ["/videos/revolutionizing-remembrance.mp4"],
    },
    {
      path: "/videos/revolutionizing-remembrance.mp4",
      type: "video" as const,
      alternatives: ["/videos/memorial-qr-demo.mp4"],
    },
  ]

  const testMedia = async () => {
    setIsRunning(true)
    const initialTests = mediaFiles.map((file) => ({
      ...file,
      status: "pending" as const,
    }))
    setTests(initialTests)

    let successCount = 0
    let failedCount = 0
    let missingCount = 0

    for (let i = 0; i < mediaFiles.length; i++) {
      const file = mediaFiles[i]
      const startTime = Date.now()

      try {
        if (file.type === "image") {
          await testImage(file.path)
        } else {
          await testVideo(file.path)
        }

        const loadTime = Date.now() - startTime
        setTests((prev) => prev.map((test, index) => (index === i ? { ...test, status: "success", loadTime } : test)))
        successCount++
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        const isNotFound = errorMessage.includes("404") || errorMessage.includes("not found")

        setTests((prev) =>
          prev.map((test, index) =>
            index === i
              ? {
                  ...test,
                  status: isNotFound ? "not-found" : "error",
                  error: errorMessage,
                }
              : test,
          ),
        )

        if (isNotFound) {
          missingCount++
        } else {
          failedCount++
        }
      }
    }

    setSummary({ total: mediaFiles.length, success: successCount, failed: failedCount, missing: missingCount })
    setIsRunning(false)
  }

  const testImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
      img.src = src
    })
  }

  const testVideo = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.onloadedmetadata = () => resolve()
      video.onerror = () => reject(new Error(`Failed to load video: ${src}`))
      video.src = src
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "not-found":
        return <FileX className="h-5 w-5 text-orange-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">✓ Loaded</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800">✗ Error</Badge>
      case "not-found":
        return <Badge className="bg-orange-100 text-orange-800">📁 Missing</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Testing...</Badge>
    }
  }

  const generateFixScript = () => {
    const missingFiles = tests.filter((test) => test.status === "not-found" || test.status === "error")

    if (missingFiles.length === 0) return null

    const script = `#!/bin/bash
# Auto-generated script to fix missing media files
# Run this in your project root directory

echo "Creating missing directories..."
mkdir -p public/images
mkdir -p public/videos

echo "Downloading placeholder images..."
${missingFiles
  .filter((file) => file.type === "image")
  .map(
    (file) =>
      `curl -o "public${file.path}" "https://placehold.co/800x600/cccccc/666666?text=${encodeURIComponent(file.path.split("/").pop()?.split(".")[0] || "Image")}"`,
  )
  .join("\n")}

echo "Creating placeholder videos..."
${missingFiles
  .filter((file) => file.type === "video")
  .map((file) => `echo "Video placeholder for ${file.path}" > "public${file.path}.txt"`)
  .join("\n")}

echo "Done! Re-run the media test to verify fixes."
`

    return script
  }

  // Auto-run test on page load
  useEffect(() => {
    testMedia()
  }, [])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-6 w-6" />
            Media File Diagnostic Tool
          </CardTitle>
          <p className="text-gray-600">
            Automatically testing all media files to identify loading issues and missing files.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary */}
            {summary.total > 0 && (
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{summary.total}</div>
                  <div className="text-sm text-blue-800">Total Files</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{summary.success}</div>
                  <div className="text-sm text-green-800">Working</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{summary.missing}</div>
                  <div className="text-sm text-orange-800">Missing</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{summary.failed}</div>
                  <div className="text-sm text-red-800">Failed</div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-2">
              <Button onClick={testMedia} disabled={isRunning} className="flex-1">
                {isRunning ? "Testing Media Files..." : "Re-run Media Test"}
              </Button>
              {tests.some((test) => test.status === "not-found" || test.status === "error") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    const script = generateFixScript()
                    if (script) {
                      const blob = new Blob([script], { type: "text/plain" })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = "fix-media-files.sh"
                      a.click()
                    }
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Fix Script
                </Button>
              )}
            </div>

            {/* Test Results */}
            {tests.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Detailed Results:</h3>
                {tests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(test.status)}
                      <div className="flex-1">
                        <p className="font-medium">{test.path}</p>
                        <p className="text-sm text-gray-500 capitalize">{test.type} file</p>
                        {test.error && <p className="text-sm text-red-600 mt-1">Error: {test.error}</p>}
                        {test.alternatives && test.status !== "success" && (
                          <p className="text-sm text-blue-600 mt-1">Alternatives: {test.alternatives.join(", ")}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.loadTime && <span className="text-sm text-gray-500">{test.loadTime}ms</span>}
                      {getStatusBadge(test.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Troubleshooting Guide */}
            {tests.length > 0 && !isRunning && (
              <div className="space-y-4">
                {summary.missing > 0 && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                      <FileX className="h-5 w-5" />
                      Missing Files Found ({summary.missing})
                    </h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Upload the missing files to your public/images or public/videos folder</li>
                      <li>• Check file names match exactly (case-sensitive)</li>
                      <li>• Use the "Download Fix Script" to create placeholders</li>
                    </ul>
                  </div>
                )}

                {summary.failed > 0 && (
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <XCircle className="h-5 w-5" />
                      Loading Errors Found ({summary.failed})
                    </h4>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Check file formats (use MP4 for videos, JPEG/PNG for images)</li>
                      <li>• Verify file sizes (keep videos under 50MB, images under 5MB)</li>
                      <li>• Ensure files aren't corrupted</li>
                    </ul>
                  </div>
                )}

                {summary.success === summary.total && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      All Media Files Working! 🎉
                    </h4>
                    <p className="text-sm text-green-800">
                      All your images and videos are loading correctly. Your memorial pages should display properly.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
