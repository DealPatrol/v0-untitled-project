"use client"

import { Heart, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemorialLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "light" | "dark" | "gradient"
  showDecorations?: boolean
  className?: string
}

export function MemorialLogo({
  size = "md",
  variant = "default",
  showDecorations = true,
  className,
}: MemorialLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  }

  const variantClasses = {
    default: "text-slate-800",
    light: "text-white",
    dark: "text-slate-900",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent",
  }

  const decorationSize = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  }

  return (
    <div className={cn("relative inline-flex items-center gap-2", className)}>
      {showDecorations && <Heart className={cn(decorationSize[size], "text-rose-400 animate-pulse")} />}

      <span
        className={cn(
          "font-dancing tracking-wide relative transition-all duration-300 hover:scale-105",
          sizeClasses[size],
          variantClasses[variant],
        )}
      >
        Memorial QR
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-50"></span>
      </span>

      {showDecorations && (
        <Sparkles
          className={cn(decorationSize[size], "text-amber-400 animate-pulse")}
          style={{ animationDelay: "0.5s" }}
        />
      )}
    </div>
  )
}
