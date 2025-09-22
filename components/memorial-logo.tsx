import { cn } from "@/lib/utils"

interface MemorialLogoProps {
  className?: string
}

export function MemorialLogo({ className }: MemorialLogoProps) {
  return <span className={cn("font-dancing font-bold text-gold-600", className)}>Memorial QR</span>
}
