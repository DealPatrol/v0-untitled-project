"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateBiography } from "@/app/actions/ai-biography-generator"
import { Loader2 } from "lucide-react"

export function AIBiographyAssistant() {
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
      const facts = keyFacts.split("\n").filter((fact) => fact.trim() !== "")
      const generatedBio = await generateBiography(name, birthDate, deathDate, facts)
      setBiography(generatedBio)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-xl font-medium">AI Biography Assistant</h3>
        <p className="text-sm text-gray-500">Let AI help you write a beautiful memorial biography</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="birthDate">Birth Date</Label>
            <Input
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="January 1, 1950"
            />
          </div>
          <div>
            <Label htmlFor="deathDate">Death Date</Label>
            <Input
              id="deathDate"
              value={deathDate}
              onChange={(e) => setDeathDate(e.target.value)}
              placeholder="December 31, 2022"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="keyFacts">Key Facts (one per line)</Label>
          <Textarea
            id="keyFacts"
            value={keyFacts}
            onChange={(e) => setKeyFacts(e.target.value)}
            placeholder="Born in Chicago, IL
Served in the Navy for 20 years
Loved gardening and woodworking
Had 3 children and 7 grandchildren"
            rows={5}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !name || !birthDate || !deathDate || !keyFacts}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Biography"
          )}
        </Button>

        {biography && (
          <div className="mt-4">
            <Label htmlFor="biography">Generated Biography</Label>
            <Textarea
              id="biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              rows={10}
              className="mt-2"
            />
            <p className="text-xs text-gray-500 mt-2">You can edit this text before adding it to the memorial.</p>
          </div>
        )}
      </div>
    </div>
  )
}
