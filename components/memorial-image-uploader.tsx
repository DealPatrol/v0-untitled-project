"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCloud, X, AlertCircle } from "lucide-react"
import { uploadMemorialImages } from "@/app/actions/upload-memorial-images"
import { useToast } from "@/components/ui/use-toast"

interface MemorialImageUploaderProps {
  memorialId: string
  onSuccess?: () => void
  maxFiles?: number
}

export function MemorialImageUploader({ memorialId, onSuccess, maxFiles = 5 }: MemorialImageUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (files.length === 0) return

    if (files.length + selectedFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} images at once.`)
      return
    }

    // Validate file types
    const invalidFiles = files.filter((file) => !file.type.startsWith("image/"))
    if (invalidFiles.length > 0) {
      setError("Only image files are allowed.")
      return
    }

    // Validate file sizes (max 5MB per file)
    const maxSize = 5 * 1024 * 1024 // 5MB
    const oversizedFiles = files.filter((file) => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      setError("Some files exceed the maximum size of 5MB.")
      return
    }

    // Clear errors
    setError(null)

    // Generate previews
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])
    setSelectedFiles([...selectedFiles, ...files])
  }

  const removeFile = (index: number) => {
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index])

    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)

    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)

    setError(null)
  }

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one image to upload.")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("memorialId", memorialId)

      selectedFiles.forEach((file, index) => {
        formData.append(`files`, file)
      })

      const result = await uploadMemorialImages(formData)

      if (result.error) {
        setError(result.error)
        toast({
          title: "Upload failed",
          description: result.error,
          variant: "destructive",
        })
      } else {
        // Clear the selected files and previews
        previews.forEach((preview) => URL.revokeObjectURL(preview))
        setSelectedFiles([])
        setPreviews([])

        toast({
          title: "Upload successful",
          description: `${result.uploads?.length || 0} images uploaded successfully.`,
        })

        if (onSuccess) {
          onSuccess()
        }
      }
    } catch (err) {
      console.error("Upload error:", err)
      setError("An unexpected error occurred during upload.")
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred during upload.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Memorial Images</CardTitle>
        <CardDescription>
          Upload photos to personalize the memorial. You can upload up to {maxFiles} images at once.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drag and drop / file selection area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors ${
            error ? "border-red-400 bg-red-50" : "border-gray-300"
          }`}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
            <UploadCloud className="h-10 w-10 text-gray-400" />
            <div className="text-lg font-medium">Drag photos here or click to browse</div>
            <p className="text-sm text-gray-500">Support for JPG, PNG, WEBP images up to 5MB each</p>
            {error && (
              <div className="flex items-center text-red-500 mt-2">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>

        {/* Preview of selected files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Selected Images ({selectedFiles.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={previews[index] || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="mt-1 text-xs text-gray-500 truncate text-center">
                    {file.name.length > 20 ? `${file.name.substring(0, 17)}...` : file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedFiles([])
            setPreviews([])
            setError(null)
          }}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          Clear
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={selectedFiles.length === 0 || isUploading}
          className="bg-navy-blue hover:bg-navy-blue/90 text-white"
        >
          {isUploading ? "Uploading..." : "Upload Images"}
        </Button>
      </CardFooter>
    </Card>
  )
}
