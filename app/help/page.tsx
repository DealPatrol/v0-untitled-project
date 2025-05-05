import Link from "next/link"
import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Help Center - Memorial QR",
  description: "Find answers to frequently asked questions about Memorial QR services and products.",
}

export default function HelpPage() {
  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is Memorial QR?",
          answer:
            "Memorial QR provides durable QR codes that link to digital memorial pages. When placed on headstones, urns, or memorial plaques, these QR codes allow visitors to access photos, stories, and memories of your loved ones using any smartphone.",
        },
        {
          question: "How long do the QR codes last?",
          answer:
            "Our QR codes are made with weather-resistant materials designed to withstand outdoor conditions for decades. They're UV-resistant, waterproof, and can handle temperature extremes.",
        },
        {
          question: "Do I need technical knowledge to create a memorial?",
          answer:
            "Not at all! Our step-by-step memorial creation process guides you through each stage, from uploading photos to writing life stories. The interface is designed to be user-friendly for people of all technical abilities.",
        },
      ],
    },
    {
      category: "Products & Pricing",
      questions: [
        {
          question: "What plans do you offer?",
          answer:
            "We offer three plans: Essential ($99), Premium ($199), and Legacy ($299). Each plan includes a durable QR code and digital memorial page, with additional features available in the higher-tier plans.",
        },
        {
          question: "What's included in each plan?",
          answer:
            "All plans include a weather-resistant QR code and digital memorial page. Premium adds unlimited photo storage, family tree functionality, and guest book features. Legacy includes everything in Premium plus video hosting and priority support.",
        },
        {
          question: "Can I upgrade my plan later?",
          answer:
            "Yes, you can upgrade from Essential to Premium or Legacy at any time. You'll only pay the difference between your current plan and the new plan.",
        },
      ],
    },
    {
      category: "Creating & Managing Memorials",
      questions: [
        {
          question: "How do I create a memorial?",
          answer:
            "Click on the 'Create Memorial' button on our website, then follow the step-by-step process. You'll provide basic information, upload photos, write a life story, add family members, and review before publishing.",
        },
        {
          question: "Can family members add content to a memorial?",
          answer:
            "Yes, you can invite family members to contribute stories, photos, and memories to the memorial. As the memorial owner, you'll have control over what content is approved and published.",
        },
        {
          question: "How do I edit a memorial after it's published?",
          answer:
            "Log in to your account, go to your dashboard, and select the memorial you want to edit. You can make changes to any section and publish the updates immediately.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What if my QR code gets damaged?",
          answer:
            "If your QR code becomes damaged, contact our support team. We offer replacement codes at a reduced cost for existing customers.",
        },
        {
          question: "How do visitors scan the QR code?",
          answer:
            "Most modern smartphones can scan QR codes directly through the camera app. Simply open the camera, point it at the QR code, and tap the notification that appears to visit the memorial page.",
        },
        {
          question: "Is my memorial data secure?",
          answer:
            "Yes, we take data security seriously. Your memorial data is stored securely, and you control who can view and contribute to the memorial.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif mb-4">Help Center</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about Memorial QR services and products.
            </p>
          </div>

          <div className="grid gap-8">
            {faqs.map((category, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                  <CardDescription>Common questions about {category.category.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, j) => (
                      <AccordionItem key={j} value={`item-${i}-${j}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-serif mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">Our support team is ready to help you with any questions or concerns.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="rose">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="mailto:support@memorialqr.com">Email Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
