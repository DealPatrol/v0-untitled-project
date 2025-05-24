"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIBiographyAssistant } from "@/components/ai-biography-assistant"
import { StoryEnhancer } from "@/components/story-enhancer"
import { GriefSupportTool } from "@/components/grief-support-tool"
import { PhotoRestorationTool } from "@/components/photo-restoration-tool"
import { CondolenceMessageGenerator } from "@/components/condolence-message-generator"
import { EulogyGenerator } from "@/components/eulogy-generator"
import { MemorialPoemGenerator } from "@/components/memorial-poem-generator"
import { TimelineGenerator } from "@/components/timeline-generator"
import { VirtualMemorialAssistant } from "@/components/virtual-memorial-assistant"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState("biography")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif mb-2">Memorial QR AI Tools</h1>
          <p className="text-lg text-rose-600 font-light mb-2">Tradition meets innovation</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered tools help you create meaningful memorials, enhance photos, and find support during difficult
            times.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 overflow-x-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-9 gap-2 min-w-max">
                <TabsTrigger value="biography">Biography</TabsTrigger>
                <TabsTrigger value="story">Story Enhancer</TabsTrigger>
                <TabsTrigger value="support">Grief Support</TabsTrigger>
                <TabsTrigger value="photo">Photo Restoration</TabsTrigger>
                <TabsTrigger value="condolence">Condolence</TabsTrigger>
                <TabsTrigger value="eulogy">Eulogy</TabsTrigger>
                <TabsTrigger value="poem">Memorial Poem</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="assistant">Virtual Assistant</TabsTrigger>
              </TabsList>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-1">
              <TabsContent value="biography" className="mt-0">
                <AIBiographyAssistant />
              </TabsContent>

              <TabsContent value="story" className="mt-0">
                <StoryEnhancer />
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <GriefSupportTool />
              </TabsContent>

              <TabsContent value="photo" className="mt-0">
                <PhotoRestorationTool />
              </TabsContent>

              <TabsContent value="condolence" className="mt-0">
                <CondolenceMessageGenerator />
              </TabsContent>

              <TabsContent value="eulogy" className="mt-0">
                <EulogyGenerator />
              </TabsContent>

              <TabsContent value="poem" className="mt-0">
                <MemorialPoemGenerator />
              </TabsContent>

              <TabsContent value="timeline" className="mt-0">
                <TimelineGenerator />
              </TabsContent>

              <TabsContent value="assistant" className="mt-0">
                <VirtualMemorialAssistant />
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              These AI tools are designed to help you create and enhance your memorial pages. For more assistance,
              please contact our support team.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
