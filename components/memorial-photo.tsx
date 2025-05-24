import Image from "next/image"

interface MemorialPhotoProps {
  src: string
  alt: string
  className?: string
}

export function MemorialPhoto({ src, alt, className = "" }: MemorialPhotoProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
    </div>
  )
}
