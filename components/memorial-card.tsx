import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Database } from "@/types/supabase"

type Memorial = Database["public"]["Tables"]["memorials"]["Row"]

interface MemorialCardProps {
  memorial: Memorial
}

export function MemorialCard({ memorial }: MemorialCardProps) {
  const birthYear = memorial.birth_date ? new Date(memorial.birth_date).getFullYear() : null
  const deathYear = memorial.death_date ? new Date(memorial.death_date).getFullYear() : null
  const yearsText = birthYear && deathYear ? `${birthYear} - ${deathYear}` : ""

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={memorial.cover_image_url || "/images/memorial-1.jpg"}
          alt={memorial.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{memorial.name}</CardTitle>
        {yearsText && <CardDescription>{yearsText}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">
          {memorial.bio || "A beautiful memorial celebrating the life and legacy of a loved one."}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/memorial/${memorial.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Memorial
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
