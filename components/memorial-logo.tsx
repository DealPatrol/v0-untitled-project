import { cn } from "@/lib/utils"

interface MemorialLogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function MemorialLogo({ size = "medium", className }: MemorialLogoProps) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl md:text-8xl",
  }

  return <div className={cn("memorial-logo font-dancing font-bold", sizeClasses[size], className)}>Memorial QR</div>
}
