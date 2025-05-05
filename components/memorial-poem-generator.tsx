"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateMemorialPoem } from "@/app/actions/generate-memorial-poem"
import { Loader2, Copy, RefreshCw } from "lucide-react"

export function MemorialPoemGenerator() {
  const [name, setName] = useState("")
  const [personalTraits, setPersonalTraits] = useState("")
  const [style, setStyle] = useState("free verse")
  const [theme, setTheme] = useState("remembrance")
  const [poem, setPoem] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleGenerate() {
    if (!name || !personalTraits) return

    setIsGenerating(true)
    try {
      const generatedPoem = await generateMemorialPoem({
        name,
        personalTraits,
        style,
        theme,
      })
      setPoem(generatedPoem)
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
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-xl font-medium">Memorial Poem Generator</h3>
        <p className="text-sm text-gray-500">Create a beautiful poem to honor your loved one's memory</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name of Deceased</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" />
        </div>

        <div>
          <Label htmlFor="traits">Personal Traits & Characteristics</Label>
          <Textarea
            id="traits"
            value={personalTraits}
            onChange={(e) => setPersonalTraits(e.target.value)}
            placeholder="Gentle spirit, loved nature, had a contagious laugh, always helped others..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="style">Poem Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free verse">Free Verse</SelectItem>
                <SelectItem value="rhyming">Rhyming</SelectItem>
                <SelectItem value="sonnet">Sonnet</SelectItem>
                <SelectItem value="haiku">Haiku</SelectItem>
                <SelectItem value="narrative">Narrative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remembrance">Remembrance</SelectItem>
                <SelectItem value="legacy">Legacy</SelectItem>
                <SelectItem value="love">Love</SelectItem>
                <SelectItem value="peace">Peace & Rest</SelectItem>
                <SelectItem value="celebration">Celebration of Life</SelectItem>
                <SelectItem value="nature">Nature & Seasons</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleGenerate} disabled={isGenerating || !name || !personalTraits} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Poem...
            </>
          ) : (
            "Generate Poem"
          )}
        </Button>

        {poem && (
          <div className="mt-6 space-y-4">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="prose max-w-none text-center italic">
                <div className="whitespace-pre-line">{poem}</div>
              </div>
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
