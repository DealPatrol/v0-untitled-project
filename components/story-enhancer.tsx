"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { enhanceStory } from "@/app/actions/enhance-story"
import { Loader2, Sparkles, Copy, RotateCcw } from "lucide-react"

export function StoryEnhancer() {
  const [originalStory, setOriginalStory] = useState("")
  const [tone, setTone] = useState("heartfelt")
  const [enhancedStory, setEnhancedStory] = useState("")
  const [isEnhancing, setIsEnhancing] = useState(false)

  async function handleEnhance() {
    if (!originalStory.trim()) return

    setIsEnhancing(true)
    try {
      const formData = new FormData()
      formData.append("story", originalStory)
      formData.append("tone", tone)

      const result = await enhanceStory(formData)
      if (result.success) {
        setEnhancedStory(result.enhancedStory)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsEnhancing(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(enhancedStory)
  }

  function handleReset() {
    setOriginalStory("")
    setEnhancedStory("")
    setTone("heartfelt")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="originalStory">Original Story or Memory</Label>
          <Textarea
            id="originalStory"
            value={originalStory}
            onChange={(e) => setOriginalStory(e.target.value)}
            placeholder="Write your memory, story, or tribute here. It can be rough - our AI will help polish and enhance it..."
            rows={6}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone">Enhancement Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heartfelt">Heartfelt & Emotional</SelectItem>
              <SelectItem value="celebratory">Celebratory & Uplifting</SelectItem>
              <SelectItem value="peaceful">Peaceful & Comforting</SelectItem>
              <SelectItem value="inspiring">Inspiring & Motivational</SelectItem>
              <SelectItem value="nostalgic">Nostalgic & Reflective</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleEnhance} disabled={isEnhancing || !originalStory.trim()} className="w-full" size="lg">
          {isEnhancing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enhancing Story...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Enhance Story
            </>
          )}
        </Button>
      </div>

      {enhancedStory && (
        <div className="space-y-4 border-t pt-6">
          <Label className="text-lg font-semibold">Enhanced Story</Label>
          <div className="bg-muted/50 p-4 rounded-lg">
            <Textarea
              value={enhancedStory}
              onChange={(e) => setEnhancedStory(e.target.value)}
              rows={8}
              className="w-full bg-background"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy} className="flex-1 bg-transparent">
              <Copy className="mr-2 h-4 w-4" />
              Copy Enhanced Story
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
              <RotateCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            The enhanced story maintains your original meaning while improving flow and emotional impact. Feel free to
            edit it further to match your voice.
          </p>
        </div>
      )}
    </div>
  )
}
