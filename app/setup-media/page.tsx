"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, CheckCircle, FolderOpen } from "lucide-react"

export default function SetupMediaPage() {
  const [step, setStep] = useState(1)

  const downloadSampleImages = () => {
    // Create a script to download sample images
    const script = `#!/bin/bash
# Memorial QR Media Setup Script
echo "Setting up media files for Memorial QR website..."

# Create directories
mkdir -p public/images
mkdir -p public/videos

# Download sample images
echo "Downloading sample images..."
curl -o "public/images/cemetery-hero.png" "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
curl -o "public/images/male-memorial-portrait.png" "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
curl -o "public/images/female-memorial-portrait.png" "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
curl -o "public/images/robert-cover.jpg" "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"

# Download sample videos (placeholder)
echo "Creating video placeholders..."
echo "Sample memorial video content" > "public/videos/memorial-demo.txt"
echo "Sample remembrance video content" > "public/videos/revolutionizing-remembrance.txt"

echo "✅ Media setup complete!"
echo "Your images and videos are now ready to use."
`

    const blob = new Blob([script], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "setup-media.sh"
    a.click()
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-6 w-6" />
            Media Setup Guide - Fix Images & Videos
          </CardTitle>
          <p className="text-gray-600">Follow these steps to get your images and videos working properly.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Step 1 */}
            <div className={`p-4 border rounded-lg ${step >= 1 ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? "bg-blue-500" : "bg-gray-400"}`}
                >
                  1
                </div>
                <h3 className="text-lg font-semibold">Download Sample Media Files</h3>
              </div>
              <p className="text-gray-600 mb-4">Get working sample images and videos to test your memorial pages.</p>
              <Button onClick={downloadSampleImages} className="mb-4">
                <Download className="h-4 w-4 mr-2" />
                Download Setup Script
              </Button>
              <div className="text-sm text-gray-500">
                <p>This downloads a script that will:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Create proper directory structure</li>
                  <li>Download sample images from Unsplash</li>
                  <li>Set up placeholder videos</li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`p-4 border rounded-lg ${step >= 2 ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? "bg-blue-500" : "bg-gray-400"}`}
                >
                  2
                </div>
                <h3 className="text-lg font-semibold">Run the Setup Script</h3>
              </div>
              <p className="text-gray-600 mb-4">Execute the downloaded script in your project root directory.</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <p># In your project root directory:</p>
                <p>chmod +x setup-media.sh</p>
                <p>./setup-media.sh</p>
              </div>
              <Button variant="outline" onClick={() => setStep(2)} className="mt-4">
                Mark as Complete
              </Button>
            </div>

            {/* Step 3 */}
            <div className={`p-4 border rounded-lg ${step >= 3 ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 3 ? "bg-blue-500" : "bg-gray-400"}`}
                >
                  3
                </div>
                <h3 className="text-lg font-semibold">Test Your Memorial Pages</h3>
              </div>
              <p className="text-gray-600 mb-4">Visit your memorial pages to verify images and videos are loading.</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" asChild>
                  <a href="/memorial/sample-1" target="_blank" rel="noreferrer">
                    Test Sample Memorial
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="/debug/media-test" target="_blank" rel="noreferrer">
                    Run Media Diagnostic
                  </a>
                </Button>
              </div>
              <Button variant="outline" onClick={() => setStep(3)} className="mt-4">
                Mark as Complete
              </Button>
            </div>

            {/* Step 4 */}
            <div className={`p-4 border rounded-lg ${step >= 4 ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${step >= 4 ? "bg-green-500" : "bg-gray-400"}`}
                >
                  4
                </div>
                <h3 className="text-lg font-semibold">Add Your Own Media</h3>
              </div>
              <p className="text-gray-600 mb-4">Replace sample files with your own images and videos.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Images</Badge>
                  <span className="text-sm">
                    Place in <code>public/images/</code>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Videos</Badge>
                  <span className="text-sm">
                    Place in <code>public/videos/</code>
                  </span>
                </div>
              </div>
              <Button onClick={() => setStep(4)} className="mt-4 bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Setup
              </Button>
            </div>

            {step >= 4 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Setup Complete!</span>
                </div>
                <p className="text-green-700 mt-2">
                  Your images and videos should now be working properly. The reliable components will automatically show
                  placeholders for any missing files.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
