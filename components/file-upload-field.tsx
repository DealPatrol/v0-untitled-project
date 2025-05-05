"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import Image from "next/image"

interface FileUploadFieldProps {
  label: string
  accept: string
  onChange: (files: File[]) => void
  multiple?: boolean
  maxFiles?: number
}

export function FileUploadField({ label, accept, onChange, multiple = false, maxFiles = 5 }: FileUploadFieldProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const newFiles = Array.from(e.target.files)
    const totalFiles = [...selectedFiles, ...newFiles]

    // Check if we're exceeding the max files limit
    if (totalFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`)
      return
    }

    // Update selected files
    setSelectedFiles(totalFiles)

    // Generate previews for the new files
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file))
    setPreviews([...previews, ...newPreviews])

    // Call the onChange handler with all selected files
    onChange(totalFiles)
  }

  const removeFile = (index: number) => {
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index])

    // Remove the file and its preview
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)

    const newPreviews = [...previews]
    newPreviews.splice(index, 1)
    setPreviews(newPreviews)

    // Call the onChange handler with the updated files
    onChange(newFiles)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={handleButtonClick} className="w-full">
            Select {multiple ? "Files" : "File"}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            accept={accept}
            onChange={handleFileChange}
            multiple={multiple}
            className="hidden"
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={previews[index] || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <span className="text-xs text-center p-2 break-all">{file.name}</span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedFiles.length > 0 && (
          <p className="text-xs text-gray-500">
            {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"} selected
            {maxFiles && ` (max ${maxFiles})`}
          </p>
        )}
      </div>
    </div>
  )
}
