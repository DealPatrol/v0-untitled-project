"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateMemorialPoem } from "@/app/actions/generate-memorial-poem"
import { Loader2, Copy, RefreshCw, Lightbulb, User } from "lucide-react"

export function MemorialPoemGenerator() {
  const [name, setName] = useState("")
  const [personalTraits, setPersonalTraits] = useState("")
  const [style, setStyle] = useState("free-verse")
  const [theme, setTheme] = useState("remembrance")
  const [poem, setPoem] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!name || !personalTraits) return

    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("style", style)
      formData.append("theme", theme)

      const result = await generateMemorialPoem(formData)
      if (result.success) {
        setPoem(result.poem)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(poem)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Name of Deceased
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="traits">Personal Traits & Characteristics</Label>
          <Textarea
            id="traits"
            value={personalTraits}
            onChange={(e) => setPersonalTraits(e.target.value)}
            placeholder="Gentle spirit, loved nature, had a contagious laugh, always helped others, passionate about music, brought joy to everyone..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="style">Poem Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free-verse">Free Verse</SelectItem>
                <SelectItem value="rhyming">Rhyming</SelectItem>
                <SelectItem value="haiku">Haiku</SelectItem>
                <SelectItem value="sonnet">Sonnet</SelectItem>
                <SelectItem value="narrative">Narrative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remembrance">Remembrance</SelectItem>
                <SelectItem value="celebration">Celebration of Life</SelectItem>
                <SelectItem value="legacy">Legacy & Impact</SelectItem>
                <SelectItem value="love">Love & Connection</SelectItem>
                <SelectItem value="peace">Peace & Rest</SelectItem>
                <SelectItem value="nature">Nature & Seasons</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !name || !personalTraits}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Poem...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Generate Memorial Poem
            </>
          )}
        </Button>
      </div>

      {poem && (
        <div className="space-y-4 border-t pt-6">
          <Label className="text-lg font-semibold">Generated Memorial Poem</Label>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8 rounded-lg">
            <div className="text-center">
              <Textarea
                value={poem}
                onChange={(e) => setPoem(e.target.value)}
                rows={12}
                className="w-full bg-transparent border-0 text-center italic text-lg leading-relaxed resize-none focus:ring-0"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy} className="flex-1 bg-transparent">
              <Copy className="mr-2 h-4 w-4" />
              Copy Poem
            </Button>
            <Button
              variant="outline"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 bg-transparent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Version
            </Button>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>Usage Ideas:</strong> This poem can be included in funeral programs, memorial cards, headstone
              inscriptions, or shared during memorial services. Feel free to modify it to better reflect your loved
              one's unique spirit.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
