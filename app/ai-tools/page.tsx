import { Header } from "@/components/header"
import { AiBiographyAssistant } from "@/components/ai-biography-assistant"
import { StoryEnhancer } from "@/components/story-enhancer"
import { GriefSupportTool } from "@/components/grief-support-tool"
import { PhotoRestorationTool } from "@/components/photo-restoration-tool"
import { CondolenceMessageGenerator } from "@/components/condolence-message-generator"
import { EulogyGenerator } from "@/components/eulogy-generator"
import { MemorialPoemGenerator } from "@/components/memorial-poem-generator"
import { TimelineGenerator } from "@/components/timeline-generator"
import { VirtualMemorialAssistant } from "@/components/virtual-memorial-assistant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Heart, Camera, MessageSquare, FileText, Sparkles, Clock, Bot, Lightbulb } from "lucide-react"

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Memorial Tools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI tools help you create meaningful, personalized memorials with ease. From writing biographies
            to generating poems, we're here to support you through every step.
          </p>
        </div>

        <Tabs defaultValue="biography" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 mb-8">
            <TabsTrigger value="biography" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Biography</span>
            </TabsTrigger>
            <TabsTrigger value="story" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Story</span>
            </TabsTrigger>
            <TabsTrigger value="grief" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Grief</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Photo</span>
            </TabsTrigger>
            <TabsTrigger value="condolence" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Message</span>
            </TabsTrigger>
            <TabsTrigger value="eulogy" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Eulogy</span>
            </TabsTrigger>
            <TabsTrigger value="poem" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Poem</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">Assistant</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biography">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Biography Assistant
                </CardTitle>
                <CardDescription>
                  Create a comprehensive life story with the help of AI. Answer a few questions and we'll help you craft
                  a beautiful biography.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AiBiographyAssistant />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="story">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Story Enhancer
                </CardTitle>
                <CardDescription>
                  Improve and expand existing stories or memories. Our AI will help make your stories more engaging and
                  complete.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StoryEnhancer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grief">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Grief Support Tool
                </CardTitle>
                <CardDescription>
                  Find personalized grief support resources based on your relationship and where you are in your
                  journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GriefSupportTool />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photo">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Photo Restoration Tool
                </CardTitle>
                <CardDescription>
                  Get guidance on restoring old or damaged photos for your memorial. Learn techniques to bring precious
                  memories back to life.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PhotoRestorationTool />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="condolence">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Condolence Message Generator
                </CardTitle>
                <CardDescription>
                  Generate thoughtful, personalized condolence messages for different relationships and situations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CondolenceMessageGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eulogy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Eulogy Generator
                </CardTitle>
                <CardDescription>
                  Create a meaningful eulogy that honors your loved one's life, achievements, and impact on others.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EulogyGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="poem">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Memorial Poem Generator
                </CardTitle>
                <CardDescription>
                  Generate beautiful, personalized poems to honor your loved one's memory and celebrate their life.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MemorialPoemGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timeline Generator
                </CardTitle>
                <CardDescription>
                  Create a chronological timeline of your loved one's life, highlighting important milestones and
                  achievements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TimelineGenerator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assistant">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Virtual Memorial Assistant
                </CardTitle>
                <CardDescription>
                  Get personalized help and guidance throughout your memorial creation process. Ask questions and get
                  instant support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VirtualMemorialAssistant />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
