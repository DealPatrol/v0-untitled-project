"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateCondolenceMessage } from "@/app/actions/generate-condolence"
import { Loader2, MessageSquare, Copy, RefreshCw } from "lucide-react"

export function CondolenceMessageGenerator() {
  const [relationship, setRelationship] = useState("")
  const [tone, setTone] = useState("warm")
  const [personalDetails, setPersonalDetails] = useState("")
  const [message, setMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!relationship) return

    setIsGenerating(true)
    try {
      const condolenceMessage = await generateCondolenceMessage({
        relationship,
        tone,
        personalDetails: personalDetails || undefined,
      })
      setMessage(condolenceMessage)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(message)
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-xl font-medium">Condolence Message Generator</h3>
        <p className="text-sm text-gray-500">Create a thoughtful message to share with the bereaved</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="relationship">Relationship to the deceased</Label>
          <Select value={relationship} onValueChange={setRelationship}>
            <SelectTrigger id="relationship">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spouse">Spouse/Partner</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="child">Child</SelectItem>
              <SelectItem value="sibling">Sibling</SelectItem>
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="grandparent">Grandparent</SelectItem>
              <SelectItem value="colleague">Colleague</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tone">Message tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="warm">Warm & Comforting</SelectItem>
              <SelectItem value="formal">Formal & Respectful</SelectItem>
              <SelectItem value="religious">Religious & Spiritual</SelectItem>
              <SelectItem value="personal">Personal & Heartfelt</SelectItem>
              <SelectItem value="supportive">Supportive & Encouraging</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="details">Personal details (optional)</Label>
          <Textarea
            id="details"
            value={personalDetails}
            onChange={(e) => setPersonalDetails(e.target.value)}
            placeholder="E.g., special memories, qualities of the deceased, or how you knew them"
            rows={3}
          />
        </div>

        <Button onClick={handleGenerate} disabled={isGenerating || !relationship} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Generate Message
            </>
          )}
        </Button>

        {message && (
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="italic">{message}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy} className="flex-1">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>

              <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
