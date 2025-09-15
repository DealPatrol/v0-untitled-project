import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle, Phone, Mail } from "lucide-react"

const faqs = [
  {
    question: "How does Memorial QR work?",
    answer:
      "Memorial QR creates a digital memorial page for your loved one that can be accessed by scanning a QR code. You upload photos, videos, and stories to create a beautiful tribute, and we provide a custom QR code that links directly to the memorial page.",
  },
  {
    question: "What's included in the $149 package?",
    answer:
      "Our complete memorial package includes: a custom digital memorial page, unlimited photo and video uploads, a personalized QR code, a physical memorial plaque with the QR code, family message board, lifetime hosting, and free shipping anywhere in the US.",
  },
  {
    question: "How long does it take to create a memorial?",
    answer:
      "You can create your digital memorial immediately after purchase. The physical memorial plaque is custom-made and typically ships within 5-7 business days. Rush delivery options are available for an additional fee.",
  },
  {
    question: "Can family members contribute to the memorial?",
    answer:
      "Yes! You can invite family members and friends to contribute photos, videos, and memories to the memorial page. You control who has access and what they can add.",
  },
  {
    question: "Is the memorial page hosted forever?",
    answer:
      "Yes, we provide lifetime hosting for your memorial page. There are no monthly fees or recurring charges. Your memorial will remain accessible as long as Memorial QR exists.",
  },
  {
    question: "What if I need help setting up my memorial?",
    answer:
      "We offer free setup assistance for all customers. Our support team can help you upload content, customize your memorial, and answer any questions. Contact us at support@memorialqr.com or call 1-800-MEMORIAL.",
  },
  {
    question: "Can I customize the design of my memorial?",
    answer:
      "Yes, you can choose from several beautiful templates and customize colors, fonts, and layouts to match your loved one's personality. You can also add custom backgrounds and themes.",
  },
  {
    question: "What happens if the QR code gets damaged?",
    answer:
      "If your physical QR code plaque gets damaged, we'll replace it free of charge within the first year. After that, replacement plaques are available for a small fee.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use enterprise-grade security to protect your memorial data. You control who can view your memorial - it can be public, private, or accessible only to people you invite.",
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with your memorial, contact us within 30 days for a full refund.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we offer free shipping within the United States. International shipping is available for an additional fee. Contact us for international shipping rates and delivery times.",
  },
  {
    question: "Can I add more content to my memorial later?",
    answer:
      "Yes, you can continue adding photos, videos, and stories to your memorial at any time. There's no limit to how much content you can add, and it's all included in your one-time payment.",
  },
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Find answers to common questions about Memorial QR and our digital memorial services
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border shadow-sm">
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help you create the perfect memorial for your loved one
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-center">Live Chat</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">Chat with our support team in real-time</p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-center">Phone Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">Call us Monday-Friday, 9am-6pm EST</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    1-800-MEMORIAL
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Mail className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <CardTitle className="text-center">Email Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">Get help via email within 24 hours</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Link href="mailto:support@memorialqr.com">Send Email</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
