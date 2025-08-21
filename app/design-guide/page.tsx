import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users, Camera, FileText, QrCode, Share2 } from "lucide-react"
import Link from "next/link"

export default function DesignGuidePage() {
  const steps = [
    {
      number: 1,
      title: "Gather Information",
      description: "Collect photos, stories, and important details about your loved one's life",
      icon: FileText,
      timeEstimate: "30-60 minutes",
      tasks: [
        "Collect high-quality photos from different life stages",
        "Gather birth/death dates and important milestones",
        "Write down favorite memories and stories",
        "List family members and close relationships",
        "Note hobbies, achievements, and personality traits",
      ],
    },
    {
      number: 2,
      title: "Choose Your Photos",
      description: "Select the best images that tell their life story",
      icon: Camera,
      timeEstimate: "20-30 minutes",
      tasks: [
        "Choose a main portrait photo",
        "Select family photos showing relationships",
        "Include photos from different decades",
        "Add images of hobbies and interests",
        "Ensure photos are clear and high-resolution",
      ],
    },
    {
      number: 3,
      title: "Write Their Story",
      description: "Create a meaningful biography using our AI tools",
      icon: Users,
      timeEstimate: "45-90 minutes",
      tasks: [
        "Use our AI Biography Assistant for guidance",
        "Include early life and family background",
        "Describe their career and achievements",
        "Share personal qualities and values",
        "Highlight their impact on others",
      ],
    },
    {
      number: 4,
      title: "Add Family Details",
      description: "Include information about family members and relationships",
      icon: Users,
      timeEstimate: "15-30 minutes",
      tasks: [
        "List immediate family members",
        "Add spouse and children details",
        "Include parents and siblings",
        "Note special relationships",
        "Add family photos and stories",
      ],
    },
    {
      number: 5,
      title: "Generate QR Code",
      description: "Create a QR code that links to the memorial",
      icon: QrCode,
      timeEstimate: "5 minutes",
      tasks: [
        "Generate your unique QR code",
        "Download high-resolution version",
        "Test the QR code with your phone",
        "Save backup copies",
        "Plan where to use the QR code",
      ],
    },
    {
      number: 6,
      title: "Share & Preserve",
      description: "Share the memorial with family and friends",
      icon: Share2,
      timeEstimate: "10-20 minutes",
      tasks: [
        "Share the memorial link with family",
        "Add QR code to funeral programs",
        "Consider engraving QR code on headstone",
        "Print memorial cards with QR code",
        "Set up memorial notifications",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Memorial Design Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our step-by-step guide to create a beautiful, lasting memorial. We'll walk you through each stage of
            the process with helpful tips and AI assistance.
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="text-sm">
              <Clock className="h-4 w-4 mr-1" />
              Total time: 2-4 hours
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={step.number} className="relative">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Icon className="h-5 w-5" />
                        {step.title}
                      </CardTitle>
                      <CardDescription className="text-base mt-1">{step.description}</CardDescription>
                      <Badge variant="outline" className="mt-2">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.timeEstimate}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="ml-16">
                    <h4 className="font-medium mb-3">What you'll do:</h4>
                    <ul className="space-y-2">
                      {step.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                {/* Connection line to next step */}
                {index < steps.length - 1 && <div className="absolute left-6 -bottom-4 w-0.5 h-8 bg-border"></div>}
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>
                Begin creating your memorial now, or explore our AI tools to help with the process.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/create-profile">Start Creating Memorial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/ai-tools">Explore AI Tools</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our AI assistant is available 24/7 to help you through the memorial creation process.
          </p>
          <Button variant="outline" asChild>
            <Link href="/ai-tools?tab=assistant">Chat with AI Assistant</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
