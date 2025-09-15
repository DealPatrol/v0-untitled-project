import { Heart, Sparkles } from "lucide-react"

interface MemorialLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "light" | "dark" | "gradient"
  showDecorations?: boolean
  className?: string
}

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

export function MemorialLogo({
  size = "md",
  variant = "default",
  showDecorations = true,
  className = "",
}: MemorialLogoProps) {
  const baseClasses = `memorial-logo memorial-logo-text font-dancing font-semibold ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  return (
    <div className="relative inline-flex items-center">
      {showDecorations && <Heart className={`${iconSizes[size]} text-pink-400 animate-gentle-pulse mr-2`} />}
      <span className={baseClasses}>
        Memorial QR
        <div className="memorial-logo-underline"></div>
      </span>
      {showDecorations && <Sparkles className={`${iconSizes[size]} text-purple-400 animate-gentle-pulse ml-2`} />}
    </div>
  )
}

export default MemorialLogo
