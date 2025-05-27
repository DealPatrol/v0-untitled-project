"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface SimpleVideoPlayerProps {
  src: string
  title: string
  description?: string
  poster?: string
}

export function SimpleVideoPlayer({ src, title, description, poster }: SimpleVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleError = () => {
    setHasError(true)
    console.error("Video failed to load:", src)
  }

  if (hasError) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <div className="text-gray-500">
            <p className="mb-2">Video temporarily unavailable</p>
            <p className="text-sm">Please check back later</p>
          </div>
        </div>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    )
  }

  return (
    <div className="bg-gray-100 rounded-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{title}</h3>

      <div className="aspect-video rounded-lg overflow-hidden bg-gray-900 relative mb-4">
        {!isPlaying ? (
          <div className="relative w-full h-full">
            {poster ? (
              <img
                src={poster || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
                onError={() => console.log("Poster image failed to load")}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🎥</div>
                  <p className="text-sm">Memorial QR Demo</p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <button
                onClick={handlePlay}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 transform hover:scale-110"
                aria-label="Play video"
              >
                <Play className="h-8 w-8 text-gray-900 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            onError={handleError}
            onLoadStart={() => console.log("Video loading started")}
          >
            <source src={src} type="video/quicktime" />
            <source src={src.replace(".mov", ".mp4")} type="video/mp4" />
            <source src="/videos/memorial-qr-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {description && <p className="text-sm text-gray-600 text-center">{description}</p>}
    </div>
  )
}
