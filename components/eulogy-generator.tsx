"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateEulogy } from "@/app/actions/generate-eulogy"
import { Loader2, Copy } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function EulogyGenerator() {
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [personalQualities, setPersonalQualities] = useState("")
  const [specialMemories, setSpecialMemories] = useState("")
  const [tone, setTone] = useState("heartfelt")
  const [length, setLength] = useState<"short" | "medium" | "long">("medium")
  const [eulogy, setEulogy] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!name || !relationship || !personalQualities || !specialMemories) return

    setIsGenerating(true)
    try {
      const generatedEulogy = await generateEulogy({
        name,
        relationship,
        personalQualities,
        specialMemories,
        tone,
        length,
      })
      setEulogy(generatedEulogy)
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
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-xl font-medium">Eulogy Generator</h3>
        <p className="text-sm text-gray-500">Create a meaningful eulogy to honor your loved one</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name of Deceased</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
          </div>
          <div>
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
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="grandchild">Grandchild</SelectItem>
                <SelectItem value="colleague">Colleague</SelectItem>
                <SelectItem value="other family member">Other Family Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="qualities">Personal Qualities & Characteristics</Label>
          <Textarea
            id="qualities"
            value={personalQualities}
            onChange={(e) => setPersonalQualities(e.target.value)}
            placeholder="Kind-hearted, passionate about gardening, always made people laugh, dedicated to family..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="memories">Special Memories & Moments</Label>
          <Textarea
            id="memories"
            value={specialMemories}
            onChange={(e) => setSpecialMemories(e.target.value)}
            placeholder="Annual fishing trips, how they helped during difficult times, their favorite sayings..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heartfelt">Heartfelt & Emotional</SelectItem>
                <SelectItem value="celebratory">Celebratory of Life</SelectItem>
                <SelectItem value="reflective">Thoughtful & Reflective</SelectItem>
                <SelectItem value="religious">Religious & Spiritual</SelectItem>
                <SelectItem value="humorous">Warm & Humorous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Length</Label>
            <RadioGroup
              value={length}
              onValueChange={(value) => setLength(value as "short" | "medium" | "long")}
              className="flex space-x-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="short" />
                <Label htmlFor="short" className="cursor-pointer">
                  Short
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="long" />
                <Label htmlFor="long" className="cursor-pointer">
                  Long
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !name || !relationship || !personalQualities || !specialMemories}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Eulogy...
            </>
          ) : (
            "Generate Eulogy"
          )}
        </Button>

        {eulogy && (
          <div className="mt-6 space-y-4">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="prose max-w-none">
                <div className="whitespace-pre-line">{eulogy}</div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              This eulogy is a starting point. We recommend personalizing it further with your own memories and
              feelings.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
