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

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6",
  }

  const variantClasses = {
    default: "text-slate-800",
    light: "text-white",
    dark: "text-slate-900",
    gradient: "gradient-text",
  }

  return (
    <div className={cn("memorial-logo flex items-center gap-2", className)}>
      {showDecorations && <Heart className={cn(iconSizes[size], "text-rose-400 animate-gentle-pulse")} />}

      <span
        className={cn(
          "memorial-logo-text font-dancing font-semibold tracking-wide relative",
          sizeClasses[size],
          variantClasses[variant],
        )}
      >
        Memorial QR
      </span>

      {showDecorations && (
        <Sparkles
          className={cn(iconSizes[size], "text-purple-400 animate-gentle-pulse")}
          style={{ animationDelay: "1s" }}
        />
      )}
    </div>
  )
}
