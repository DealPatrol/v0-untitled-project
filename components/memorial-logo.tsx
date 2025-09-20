"use client"

import { cn } from "@/lib/utils"

interface MemorialLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function MemorialLogo({ size = "md", className }: MemorialLogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
        </div>
      </div>
      <span
        className={cn(
          "font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
          "font-dancing-script",
          sizeClasses[size],
        )}
      >
        Memorial QR
      </span>
    </div>
  )
}
