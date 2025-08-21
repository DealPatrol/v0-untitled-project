"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateBiography } from "@/app/actions/ai-biography-generator"
import { Loader2, User, Calendar, FileText } from "lucide-react"

export function AiBiographyAssistant() {
  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [deathDate, setDeathDate] = useState("")
  const [keyFacts, setKeyFacts] = useState("")
  const [biography, setBiography] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!name || !birthDate || !deathDate || !keyFacts) return

    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("birthDate", birthDate)
      formData.append("deathDate", deathDate)
      formData.append("keyDetails", keyFacts)

      const result = await generateBiography(formData)
      if (result.success) {
        setBiography(result.biography)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthDate" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Birth Date
          </Label>
          <Input
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="January 1, 1950"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deathDate" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Death Date
          </Label>
          <Input
            id="deathDate"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
            placeholder="December 31, 2022"
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keyFacts" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Key Life Details (one per line)
        </Label>
        <Textarea
          id="keyFacts"
          value={keyFacts}
          onChange={(e) => setKeyFacts(e.target.value)}
          placeholder="Born in Chicago, IL
Served in the Navy for 20 years
Worked as a teacher for 30 years
Married to Sarah for 45 years
Had 3 children and 7 grandchildren
Loved gardening and woodworking
Volunteered at local food bank"
          rows={6}
          className="w-full"
        />
      </div>

      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !name || !birthDate || !deathDate || !keyFacts}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Biography...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Generate Biography
          </>
        )}
      </Button>

      {biography && (
        <div className="space-y-4">
          <Label htmlFor="biography" className="text-lg font-semibold">
            Generated Biography
          </Label>
          <Textarea
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            rows={12}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(biography)} className="flex-1">
              Copy to Clipboard
            </Button>
            <Button variant="outline" onClick={() => setBiography("")} className="flex-1">
              Clear
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            You can edit this biography before using it in your memorial. The AI has created a foundation that you can
            personalize further.
          </p>
        </div>
      )}
    </div>
  )
}
