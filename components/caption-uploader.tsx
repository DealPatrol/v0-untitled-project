"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, FileText } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CaptionUploaderProps {
  videoId: string
  onCaptionsAdded: () => void
}

export function CaptionUploader({ videoId, onCaptionsAdded }: CaptionUploaderProps) {
  const [transcript, setTranscript] = useState("")
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleTranscriptSubmit = async () => {
    if (!transcript.trim()) {
      toast({
        title: "Error",
        description: "Please enter a transcript",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      // In a real app, this would save to the database
      console.log("Saving transcript for video:", videoId, transcript)

      toast({
        title: "Success",
        description: "Transcript added successfully",
      })

      onCaptionsAdded()
      setTranscript("")
    } catch (error) {
      console.error("Error saving transcript:", error)
      toast({
        title: "Error",
        description: "Failed to save transcript",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".vtt") && !file.name.endsWith(".srt")) {
      toast({
        title: "Error",
        description: "Please upload a .vtt or .srt caption file",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const text = await file.text()
      console.log("Caption file uploaded:", file.name, text)

      toast({
        title: "Success",
        description: "Caption file uploaded successfully",
      })

      onCaptionsAdded()
    } catch (error) {
      console.error("Error uploading caption file:", error)
      toast({
        title: "Error",
        description: "Failed to upload caption file",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Add Accessibility Features
        </CardTitle>
        <CardDescription>Add captions and transcripts to make videos accessible to all visitors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transcript Input */}
        <div>
          <Label htmlFor="transcript">Video Transcript</Label>
          <Textarea
            id="transcript"
            placeholder="Enter the full transcript of what is said in the video..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={6}
            className="mt-2"
          />
          <p className="text-sm text-gray-500 mt-2">This helps screen readers and provides searchable content</p>
          <Button onClick={handleTranscriptSubmit} disabled={uploading || !transcript.trim()} className="mt-3">
            {uploading ? "Saving..." : "Save Transcript"}
          </Button>
        </div>

        {/* Caption File Upload */}
        <div className="border-t pt-6">
          <Label htmlFor="caption-file">Upload Caption File (Optional)</Label>
          <div className="mt-2">
            <input id="caption-file" type="file" accept=".vtt,.srt" onChange={handleFileUpload} className="hidden" />
            <Button
              variant="outline"
              onClick={() => document.getElementById("caption-file")?.click()}
              disabled={uploading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload .VTT or .SRT File
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">For precise timing, upload a professionally created caption file</p>
        </div>

        {/* Accessibility Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Accessibility Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include speaker names in transcripts</li>
            <li>• Describe important visual elements</li>
            <li>• Note background sounds or music</li>
            <li>• Use clear, simple language</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
