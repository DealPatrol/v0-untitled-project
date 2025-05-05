"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { enhanceStory } from "@/app/actions/enhance-story"
import { Loader2, Sparkles } from "lucide-react"

export function StoryEnhancer() {
  const [originalStory, setOriginalStory] = useState("")
  const [enhancedStory, setEnhancedStory] = useState("")
  const [isEnhancing, setIsEnhancing] = useState(false)

  async function handleEnhance() {
    if (!originalStory) return

    setIsEnhancing(true)
    try {
      const enhanced = await enhanceStory(originalStory)
      setEnhancedStory(enhanced)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <div className="space-y-4 p-6">
      <div>
        <h3 className="text-xl font-medium">Story Enhancer</h3>
        <p className="text-sm text-gray-500">Let AI help polish your memory or tribute</p>
      </div>

      <Textarea
        value={originalStory}
        onChange={(e) => setOriginalStory(e.target.value)}
        placeholder="Write your memory or tribute here..."
        rows={6}
      />

      <Button onClick={handleEnhance} disabled={isEnhancing || !originalStory} className="w-full">
        {isEnhancing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enhancing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Enhance Story
          </>
        )}
      </Button>

      {enhancedStory && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Enhanced Version</h4>
          <Textarea value={enhancedStory} onChange={(e) => setEnhancedStory(e.target.value)} rows={6} />
          <div className="flex justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(enhancedStory)
              }}
            >
              Copy to Clipboard
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
