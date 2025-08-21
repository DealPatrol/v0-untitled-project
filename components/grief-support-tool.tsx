"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getGriefSupportResources } from "@/app/actions/grief-support"
import { Loader2, Heart, Phone } from "lucide-react"

export function GriefSupportTool() {
  const [relationship, setRelationship] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [specificConcerns, setSpecificConcerns] = useState("")
  const [supportResources, setSupportResources] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleGetSupport() {
    if (!relationship || !timeframe) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("relationship", relationship)
      formData.append("timeframe", timeframe)
      if (specificConcerns) {
        formData.append("specificConcerns", specificConcerns)
      }

      const result = await getGriefSupportResources(formData)
      if (result.success) {
        setSupportResources(result.resources)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="relationship">Your relationship to the deceased</Label>
          <Select value={relationship} onValueChange={setRelationship}>
            <SelectTrigger id="relationship">
              <SelectValue placeholder="Select your relationship" />
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

        <div className="space-y-2">
          <Label htmlFor="timeframe">When did the loss occur?</Label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Recently (within days)</SelectItem>
              <SelectItem value="months">Within the past few months</SelectItem>
              <SelectItem value="years">Over a year ago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="concerns">Specific concerns or challenges (optional)</Label>
          <Textarea
            id="concerns"
            value={specificConcerns}
            onChange={(e) => setSpecificConcerns(e.target.value)}
            placeholder="E.g., trouble sleeping, feeling isolated, helping children cope, returning to work, anniversary dates..."
            rows={3}
          />
        </div>

        <Button
          onClick={handleGetSupport}
          disabled={isLoading || !relationship || !timeframe}
          className="w-full"
          size="lg"
        >
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
      </div>

      {supportResources && (
        <div className="space-y-6 border-t pt-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-600" />
              {supportResources.title}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Recommended Resources:</h4>
                <ul className="space-y-1">
                  {supportResources.resources.map((resource: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-sm">{resource}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {supportResources.helplines && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Crisis Support Helplines:
                  </h4>
                  <ul className="space-y-1">
                    {supportResources.helplines.map((helpline: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        <span className="text-sm font-mono">{helpline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> These resources provide general guidance. If you're experiencing thoughts of
              self-harm or suicide, please contact emergency services (911) or the National Suicide Prevention Lifeline
              (988) immediately.
            </p>
          </div>

          <div className="text-center">
            <Button variant="outline" onClick={() => setSupportResources(null)}>
              Get Different Resources
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
