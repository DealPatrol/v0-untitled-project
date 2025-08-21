"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateEulogy } from "@/app/actions/generate-eulogy"
import { Loader2, Copy, FileText, User, Heart } from "lucide-react"

export function EulogyGenerator() {
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [keyMemories, setKeyMemories] = useState("")
  const [personalityTraits, setPersonalityTraits] = useState("")
  const [eulogy, setEulogy] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!name || !relationship || !keyMemories || !personalityTraits) return

    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("relationship", relationship)
      formData.append("keyMemories", keyMemories)
      formData.append("personalityTraits", personalityTraits)

      const result = await generateEulogy(formData)
      if (result.success) {
        setEulogy(result.eulogy)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(eulogy)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name of Deceased
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationship">Your Relationship</Label>
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger id="relationship">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse/Partner</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="friend">Close Friend</SelectItem>
                <SelectItem value="grandchild">Grandchild</SelectItem>
                <SelectItem value="colleague">Colleague</SelectItem>
                <SelectItem value="other">Other Family Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="personalityTraits" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Personality Traits & Characteristics
          </Label>
          <Textarea
            id="personalityTraits"
            value={personalityTraits}
            onChange={(e) => setPersonalityTraits(e.target.value)}
            placeholder="Kind-hearted, generous, had a great sense of humor, passionate about helping others, loved gardening, always put family first..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyMemories">Special Memories & Stories</Label>
          <Textarea
            id="keyMemories"
            value={keyMemories}
            onChange={(e) => setKeyMemories(e.target.value)}
            placeholder="Annual family fishing trips, how they helped neighbors during difficult times, their famous Sunday dinners, the way they always had time to listen, their love of old movies..."
            rows={4}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !name || !relationship || !keyMemories || !personalityTraits}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Eulogy...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate Eulogy
            </>
          )}
        </Button>
      </div>

      {eulogy && (
        <div className="space-y-4 border-t pt-6">
          <Label className="text-lg font-semibold">Generated Eulogy</Label>
          <div className="bg-muted/50 p-6 rounded-lg">
            <Textarea
              value={eulogy}
              onChange={(e) => setEulogy(e.target.value)}
              rows={15}
              className="w-full bg-background"
            />
          </div>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
            <p className="text-sm text-muted-foreground">
              Word count: {eulogy.split(" ").length} words (approximately {Math.ceil(eulogy.split(" ").length / 150)}{" "}
              minutes to read)
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Tips for delivery:</strong> Practice reading this aloud beforehand. It's okay to pause if you
              become emotional. Consider having a backup person ready to continue if needed. Remember, this eulogy is a
              starting point - feel free to add your own personal touches and memories.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
