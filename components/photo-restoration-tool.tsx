"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { restorePhoto } from "@/app/actions/photo-restoration"
import { Loader2, ImagePlus, Download } from "lucide-react"

export function PhotoRestorationTool() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [restoredImage, setRestoredImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset states
    setError(null)
    setRestoredImage(null)

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be less than 10MB")
      return
    }

    // Read and display the file
    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  async function handleRestorePhoto() {
    if (!originalImage) return

    setIsProcessing(true)
    setError(null)

    try {
      const restored = await restorePhoto(originalImage)
      setRestoredImage(restored)
    } catch (err) {
      setError("Failed to restore photo. Please try again.")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  function handleDownload() {
    if (!restoredImage) return

    const link = document.createElement("a")
    link.href = restoredImage
    link.download = "restored-photo.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-xl font-medium">Photo Restoration</h3>
        <p className="text-sm text-gray-500">Enhance and restore old or damaged photos</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>

        {error && <div className="text-sm text-red-500 text-center">{error}</div>}

        {originalImage && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-center">Original Photo</p>
                <div className="aspect-square relative bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-center">Restored Photo</p>
                <div className="aspect-square relative bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                  {isProcessing ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                      <p className="text-sm text-gray-500 mt-2">Processing...</p>
                    </div>
                  ) : restoredImage ? (
                    <img
                      src={restoredImage || "/placeholder.svg"}
                      alt="Restored"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <p className="text-sm text-gray-400">Restored photo will appear here</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleRestorePhoto} disabled={isProcessing || !originalImage} className="flex-1">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Restore Photo"
                )}
              </Button>

              {restoredImage && (
                <Button variant="outline" onClick={handleDownload} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center">
              Note: This is a demonstration of the photo restoration feature. In a production environment, this would
              connect to an AI photo restoration service.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
