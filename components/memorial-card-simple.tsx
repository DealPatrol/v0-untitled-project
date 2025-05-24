import Link from "next/link"
import { SafeImage } from "./safe-image"
import { Card, CardContent } from "@/components/ui/card"

interface MemorialCardProps {
  id: string
  name: string
  birthDate?: string
  deathDate?: string
  imageUrl?: string
  gender?: "male" | "female" | "other"
}

export function MemorialCardSimple({ id, name, birthDate, deathDate, imageUrl, gender = "other" }: MemorialCardProps) {
  // Determine fallback image based on gender
  let fallbackImage = "/images/neutral-profile-placeholder.png"
  if (gender === "male") {
    fallbackImage = "/images/male-profile-placeholder.png"
  } else if (gender === "female") {
    fallbackImage = "/images/female-profile-placeholder.png"
  }

  return (
    <Link href={`/memorial/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-[4/3] relative overflow-hidden">
          <SafeImage
            src={imageUrl || fallbackImage}
            alt={`Memorial for ${name}`}
            fill
            className="object-cover"
            fallbackSrc={fallbackImage}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <p className="text-sm text-gray-500">
            {birthDate && deathDate ? (
              <>
                {new Date(birthDate).getFullYear()} - {new Date(deathDate).getFullYear()}
              </>
            ) : (
              "In loving memory"
            )}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
