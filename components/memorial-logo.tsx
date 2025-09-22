import Link from "next/link"

interface MemorialLogoProps {
  className?: string
}

export function MemorialLogo({ className = "" }: MemorialLogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <span className="memorial-logo text-2xl font-bold">Memorial QR</span>
    </Link>
  )
}
