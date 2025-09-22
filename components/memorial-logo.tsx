import Link from "next/link"
import { QrCode } from "lucide-react"

export function MemorialLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <QrCode className="h-8 w-8 text-yellow-600" />
      <span className="text-2xl font-dancing font-bold memorial-logo-gradient">Memorial QR</span>
    </Link>
  )
}
