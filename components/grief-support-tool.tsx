"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getGriefSupportResources } from "@/app/actions/grief-support"
import { Loader2, Heart } from "lucide-react"

export function GriefSupportTool() {
  const [relationship, setRelationship] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [specificConcerns, setSpecificConcerns] = useState("")
  const [supportResources, setSupportResources] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleGetSupport() {
    if (!relationship || !timeframe) return

    setIsLoading(true)
    try {
      const resources = await getGriefSupportResources({
        relationship,
        timeframe,
        specificConcerns,
      })
      setSupportResources(resources)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-xl font-medium">Grief Support Resources</h3>
        <p className="text-sm text-gray-500">Get personalized coping strategies and support resources</p>
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
              <SelectItem value="other">Other Family Member</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="timeframe">When did the loss occur?</Label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recently (within days)">Recently (within days)</SelectItem>
              <SelectItem value="within the past month">Within the past month</SelectItem>
              <SelectItem value="1-6 months ago">1-6 months ago</SelectItem>
              <SelectItem value="6-12 months ago">6-12 months ago</SelectItem>
              <SelectItem value="over a year ago">Over a year ago</SelectItem>
              <SelectItem value="several years ago">Several years ago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="concerns">Specific concerns or challenges (optional)</Label>
          <Textarea
            id="concerns"
            value={specificConcerns}
            onChange={(e) => setSpecificConcerns(e.target.value)}
            placeholder="E.g., trouble sleeping, feeling isolated, helping children cope, etc."
            rows={3}
          />
        </div>

        <Button onClick={handleGetSupport} disabled={isLoading || !relationship || !timeframe} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding Resources...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-4 w-4" />
              Get Support Resources
            </>
          )}
        </Button>

        {supportResources && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-lg font-medium mb-4">Your Support Resources</h4>
            <div className="prose max-w-none">
              <div className="whitespace-pre-line">{supportResources}</div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Remember: These resources are meant to provide general guidance. For personalized support, please consider
              speaking with a grief counselor or mental health professional.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
