"use client"

import { useState, useRef } from "react"

interface ReliableVideoProps {
  src: string
  title: string
  poster?: string
  className?: string
  controls?: boolean
  autoPlay?: boolean
  muted?: boolean
  width?: number
  height?: number
}

export function ReliableVideo({
  src,
  title,
  poster,
  className = "",
  controls = true,
  autoPlay = false,
  muted = true,
  width = 800,
  height = 450,
}: ReliableVideoProps) {
  const [videoError, setVideoError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleError = () => {
    setVideoError(true)
    setIsLoading(false)
  }

  const handleLoadStart = () => {
    setIsLoading(false)
  }

  if (videoError) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🎬</div>
          <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
          <p className="text-sm text-gray-500">Video not available</p>
          <p className="text-xs text-gray-400 mt-2">File: {src}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10"
          style={{ width, height }}
        >
          <span className="text-gray-400">Loading video...</span>
        </div>
      )}

      <video
        ref={videoRef}
        className={`w-full h-full ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        poster={poster}
        onError={handleError}
        onLoadStart={handleLoadStart}
        style={{ width, height }}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/mov" />
        <source src={src} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
