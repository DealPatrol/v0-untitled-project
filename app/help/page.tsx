import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Settings,
  CreditCard,
  Truck,
  Shield,
} from "lucide-react"

const helpCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    description: "Learn how to create your first memorial",
    articles: [
      "How to create a memorial account",
      "Uploading your first photos and videos",
      "Customizing your memorial design",
      "Understanding QR codes",
    ],
  },
  {
    title: "Account & Settings",
    icon: Settings,
    description: "Manage your account and memorial settings",
    articles: [
      "Updating your account information",
      "Privacy and sharing settings",
      "Inviting family members",
      "Changing memorial themes",
    ],
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    description: "Questions about payments and billing",
    articles: [
      "Understanding our pricing",
      "Payment methods accepted",
      "Refund policy and process",
      "Billing questions and receipts",
    ],
  },
  {
    title: "Shipping & Delivery",
    icon: Truck,
    description: "Information about your memorial plaque",
    articles: [
      "Shipping times and tracking",
      "International shipping options",
      "Plaque customization options",
      "Replacement and warranty",
    ],
  },
  {
    title: "Technical Support",
    icon: Shield,
    description: "Technical issues and troubleshooting",
    articles: [
      "QR code not working",
      "Upload issues and solutions",
      "Browser compatibility",
      "Mobile app troubleshooting",
    ],
  },
  {
    title: "Memorial Management",
    icon: FileText,
    description: "Managing your memorial content",
    articles: [
      "Adding and organizing photos",
      "Creating photo albums",
      "Managing family contributions",
      "Editing memorial information",
    ],
  },
]

const popularArticles = [
  "How to create your first memorial",
  "Understanding QR code technology",
  "Inviting family members to contribute",
  "Customizing your memorial design",
  "Shipping and delivery information",
  "Privacy settings and controls",
  "Troubleshooting QR code issues",
  "Managing memorial content",
]

export default function Help() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            Find answers to your questions and get the help you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for help articles..."
                className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-white/70"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Video className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Watch step-by-step video guides</p>
              <Button className="w-full">Watch Videos</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Live Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Phone Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Call us for immediate help</p>
              <Button variant="outline" className="w-full bg-transparent">
                1-800-MEMORIAL
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse Help Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <category.icon className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <p className="text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <Link href="#" className="text-purple-600 hover:text-purple-800 text-sm hover:underline">
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Articles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Articles</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {popularArticles.map((article, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700 hover:text-purple-600">{article}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </Button>

            <Button variant="outline" size="lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
