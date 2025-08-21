"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { generateCondolenceMessage } from "@/app/actions/generate-condolence"
import { Loader2, MessageSquare, Copy, RefreshCw, User } from "lucide-react"

export function CondolenceMessageGenerator() {
  const [relationship, setRelationship] = useState("")
  const [tone, setTone] = useState("formal")
  const [personName, setPersonName] = useState("")
  const [message, setMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!relationship) return

    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append("relationship", relationship)
      formData.append("tone", tone)
      formData.append("personName", personName || "your loved one")

      const result = await generateCondolenceMessage(formData)
      if (result.success) {
        setMessage(result.message)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(message)
  }

  function handleReset() {
    setMessage("")
    setPersonName("")
    setRelationship("")
    setTone("formal")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="personName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Name of the deceased (optional)
          </Label>
          <Input
            id="personName"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="relationship">Your relationship to the deceased</Label>
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
                <SelectItem value="colleague">Colleague</SelectItem>
                <SelectItem value="neighbor">Neighbor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Message tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal & Respectful</SelectItem>
                <SelectItem value="warm">Warm & Personal</SelectItem>
                <SelectItem value="brief">Brief & Sincere</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleGenerate} disabled={isGenerating || !relationship} className="w-full" size="lg">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Message...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Generate Condolence Message
            </>
          )}
        </Button>
      </div>

      {message && (
        <div className="space-y-4 border-t pt-6">
          <Label className="text-lg font-semibold">Generated Message</Label>
          <div className="bg-muted/50 p-6 rounded-lg">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full bg-background border-0 resize-none"
              readOnly={false}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy} className="flex-1 bg-transparent">
              <Copy className="mr-2 h-4 w-4" />
              Copy Message
            </Button>
            <Button
              variant="outline"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 bg-transparent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
              Reset
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Feel free to personalize this message further. Adding specific memories or details will make it even more
            meaningful.
          </p>
        </div>
      )}
    </div>
  )
}
