import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "How long does it take to create my memorial?",
      answer:
        "Once you submit your memorial information, we typically complete your digital memorial within 2-3 business days. Your physical QR code keepsake will be shipped within 5-7 business days and arrives via priority mail.",
    },
    {
      question: "What materials are the QR codes printed on?",
      answer:
        "Our QR codes are laser-engraved on premium materials including brushed aluminum, natural stone, and weather-resistant acrylic. All materials come with a 10-year durability guarantee and are designed to withstand outdoor conditions.",
    },
    {
      question: "Can I update the memorial information after it's created?",
      answer:
        "Yes! You can update photos, stories, and information anytime through your memorial dashboard. Changes are reflected immediately on the digital memorial. There's no additional cost for updates during the first year.",
    },
    {
      question: "How do people access the memorial?",
      answer:
        "Anyone can scan the QR code with their smartphone camera or QR code reader app. No special app download is required. The memorial opens directly in their web browser, making it accessible to everyone.",
    },
    {
      question: "Is there a limit to how many photos I can upload?",
      answer:
        "You can upload up to 50 high-resolution photos per memorial. We also accept videos up to 5 minutes long. If you need more storage space, premium plans are available with unlimited uploads.",
    },
    {
      question: "What if the QR code gets damaged?",
      answer:
        "All our QR codes come with a 10-year replacement guarantee. If your QR code becomes damaged or unreadable, we'll send you a replacement at no cost. Just contact our support team with your order number.",
    },
    {
      question: "Can family members contribute to the memorial?",
      answer:
        "You can invite family members and friends to contribute photos, stories, and memories. They'll receive a secure link to add their contributions, which you can review and approve before they're added to the memorial.",
    },
    {
      question: "How secure is the memorial information?",
      answer:
        "Your memorial data is stored securely with enterprise-grade encryption. You control who can view the memorial - it can be public, private with a password, or accessible only to invited family members. We never share your personal information.",
    },
    {
      question: "Do you offer different sizes and styles?",
      answer:
        "Yes! We offer various sizes from small keepsake tags to large memorial plaques. Styles include modern, traditional, and custom designs. You can preview different options during the ordering process.",
    },
    {
      question: "What's included in the $119.99 price?",
      answer:
        "The complete package includes: digital memorial creation, QR code generation, premium physical QR code keepsake, free shipping, 1 year of free updates, customer support, and our 10-year durability guarantee.",
    },
    {
      question: "Can I order multiple QR codes for the same memorial?",
      answer:
        "Yes! Additional QR codes for the same memorial are available at a discounted rate. This is perfect for sharing among family members or placing at multiple locations like home and gravesite.",
    },
    {
      question: "What happens if I'm not satisfied?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not completely satisfied with your memorial, contact us within 30 days for a full refund. We also provide unlimited revisions during the creation process.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-8">Find answers to common questions about Memorial QR</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button>
            </Link>
            <Link href="/create-profile">
              <Button variant="outline">Create Memorial</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border">
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
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-xl text-gray-600">Our support team is here to help you every step of the way</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Speak with our memorial specialists</p>
                <a href="tel:256-595-3354" className="text-blue-600 font-semibold hover:underline">
                  (256) 595-3354
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon-Fri 9AM-6PM EST</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get detailed help via email</p>
                <a href="mailto:support@memorialqr.com" className="text-green-600 font-semibold hover:underline">
                  support@memorialqr.com
                </a>
                <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Chat with us in real-time</p>
                <Button className="bg-purple-600 hover:bg-purple-700">Start Chat</Button>
                <p className="text-sm text-gray-500 mt-2">Available during business hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
