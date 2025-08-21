"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPhotoRestorationGuidance, restorePhoto } from "@/app/actions/photo-restoration"
import { Loader2, Camera, Upload, Download, Info } from "lucide-react"

export function PhotoRestorationTool() {
  const [issueType, setIssueType] = useState("")
  const [guidance, setGuidance] = useState<any>(null)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [restoredImage, setRestoredImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoadingGuidance, setIsLoadingGuidance] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleGetGuidance() {
    if (!issueType) return

    setIsLoadingGuidance(true)
    try {
      const formData = new FormData()
      formData.append("issueType", issueType)

      const result = await getPhotoRestorationGuidance(formData)
      if (result.success) {
        setGuidance(result.guidance)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoadingGuidance(false)
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be less than 10MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setRestoredImage(null)
    }
    reader.readAsDataURL(file)
  }

  async function handleRestorePhoto() {
    if (!originalImage) return

    setIsProcessing(true)
    try {
      const restored = await restorePhoto(originalImage)
      setRestoredImage(restored)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to restore photo. Please try again.")
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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="issueType">What type of photo restoration do you need?</Label>
          <Select value={issueType} onValueChange={setIssueType}>
            <SelectTrigger id="issueType">
              <SelectValue placeholder="Select photo issue type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="faded">Faded or Discolored Photos</SelectItem>
              <SelectItem value="torn">Torn or Damaged Photos</SelectItem>
              <SelectItem value="stained">Stained or Spotted Photos</SelectItem>
              <SelectItem value="scratched">Scratched Photos</SelectItem>
              <SelectItem value="blurry">Blurry or Out of Focus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGetGuidance}
          disabled={isLoadingGuidance || !issueType}
          className="w-full bg-transparent"
          variant="outline"
        >
          {isLoadingGuidance ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Guidance...
            </>
          ) : (
            <>
              <Info className="mr-2 h-4 w-4" />
              Get Restoration Guidance
            </>
          )}
        </Button>
      </div>

      {guidance && (
        <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">{guidance.title}</h3>
          <div>
            <h4 className="font-medium mb-2">Step-by-step process:</h4>
            <ol className="space-y-2">
              {guidance.steps.map((step: string, index: number) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded">
            <p className="text-sm">
              <strong>Pro Tip:</strong> {guidance.tips}
            </p>
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">AI Photo Restoration (Demo)</h3>
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full max-w-sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo to Restore
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>

          {originalImage && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-center block">Original Photo</Label>
                  <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-center block">Restored Photo</Label>
                  <div className="aspect-square relative bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    {isProcessing ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mt-2">Processing...</p>
                      </div>
                    ) : restoredImage ? (
                      <img
                        src={restoredImage || "/placeholder.svg"}
                        alt="Restored"
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">Restored photo will appear here</p>
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
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Restore Photo
                    </>
                  )}
                </Button>

                {restoredImage && (
                  <Button variant="outline" onClick={handleDownload} className="flex-1 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                )}
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> This is a demonstration of AI photo restoration. In production, this would
                  connect to advanced AI restoration services for real photo enhancement.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
