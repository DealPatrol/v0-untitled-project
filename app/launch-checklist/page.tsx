"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Rocket,
  Settings,
  Globe,
  CreditCard,
  Shield,
  Users,
  BarChart3,
} from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: string
  testUrl?: string
  completed: boolean
}

const checklistItems: ChecklistItem[] = [
  // Core Functionality - High Priority
  {
    id: "stripe-config",
    title: "Configure Stripe Payment Processing",
    description: "Set up Stripe API keys and webhook for payment processing",
    priority: "high",
    category: "payments",
    testUrl: "/debug/stripe",
    completed: false,
  },
  {
    id: "test-checkout",
    title: "Test Complete Checkout Flow",
    description: "Complete a full test purchase from start to finish",
    priority: "high",
    category: "payments",
    testUrl: "/checkout",
    completed: false,
  },
  {
    id: "memorial-pages",
    title: "Verify Memorial Pages Load",
    description: "Check that all memorial pages display correctly",
    priority: "high",
    category: "functionality",
    testUrl: "/memorials",
    completed: false,
  },
  {
    id: "qr-codes",
    title: "Test QR Code Generation",
    description: "Verify QR codes are generated and scan correctly",
    priority: "high",
    category: "functionality",
    testUrl: "/memorial/sample-1",
    completed: false,
  },
  {
    id: "mobile-responsive",
    title: "Test Mobile Responsiveness",
    description: "Verify site works on phones and tablets",
    priority: "high",
    category: "design",
    completed: false,
  },

  // Content & Design - Medium Priority
  {
    id: "footer-links",
    title: "Verify All Footer Links",
    description: "Check privacy policy, terms, contact, and other footer links",
    priority: "medium",
    category: "content",
    testUrl: "/test-footer-links",
    completed: false,
  },
  {
    id: "contact-forms",
    title: "Test Contact Forms",
    description: "Verify contact and support forms work properly",
    priority: "medium",
    category: "functionality",
    testUrl: "/contact",
    completed: false,
  },
  {
    id: "image-loading",
    title: "Check Image Loading",
    description: "Ensure all images load properly across the site",
    priority: "medium",
    category: "performance",
    testUrl: "/debug/images",
    completed: false,
  },
  {
    id: "video-playback",
    title: "Test Video Playback",
    description: "Verify memorial videos play correctly",
    priority: "medium",
    category: "functionality",
    testUrl: "/memorial/sample-1",
    completed: false,
  },

  // Technical & Performance - Medium Priority
  {
    id: "ssl-certificate",
    title: "Verify SSL Certificate",
    description: "Ensure HTTPS is working properly",
    priority: "medium",
    category: "security",
    completed: false,
  },
  {
    id: "page-speed",
    title: "Test Page Loading Speed",
    description: "Check site performance with Google PageSpeed",
    priority: "medium",
    category: "performance",
    testUrl: "https://pagespeed.web.dev/",
    completed: false,
  },
  {
    id: "cross-browser",
    title: "Cross-Browser Testing",
    description: "Test in Chrome, Firefox, Safari, and Edge",
    priority: "medium",
    category: "compatibility",
    completed: false,
  },
  {
    id: "database-backup",
    title: "Create Database Backup",
    description: "Back up all data before launch",
    priority: "high",
    category: "security",
    completed: false,
  },

  // SEO & Analytics - Low Priority
  {
    id: "meta-tags",
    title: "Check Meta Tags",
    description: "Verify page titles and descriptions",
    priority: "low",
    category: "seo",
    completed: false,
  },
  {
    id: "analytics-setup",
    title: "Set Up Analytics",
    description: "Install and verify Google Analytics",
    priority: "low",
    category: "analytics",
    completed: false,
  },
  {
    id: "sitemap",
    title: "Generate Sitemap",
    description: "Ensure sitemap.xml is accessible",
    priority: "low",
    category: "seo",
    testUrl: "/sitemap.xml",
    completed: false,
  },
  {
    id: "search-console",
    title: "Set Up Search Console",
    description: "Configure Google Search Console",
    priority: "low",
    category: "seo",
    testUrl: "https://search.google.com/search-console",
    completed: false,
  },

  // Business Operations - Medium Priority
  {
    id: "customer-support",
    title: "Set Up Customer Support",
    description: "Configure support channels and responses",
    priority: "medium",
    category: "business",
    completed: false,
  },
  {
    id: "order-fulfillment",
    title: "Test Order Fulfillment",
    description: "Verify the complete order processing workflow",
    priority: "medium",
    category: "business",
    testUrl: "/dashboard/orders",
    completed: false,
  },
  {
    id: "email-notifications",
    title: "Test Email Notifications",
    description: "Verify transactional emails are sent",
    priority: "medium",
    category: "business",
    completed: false,
  },
  {
    id: "pricing-accuracy",
    title: "Verify Pricing",
    description: "Double-check all pricing is accurate",
    priority: "high",
    category: "business",
    testUrl: "/pricing",
    completed: false,
  },
]

export default function LaunchChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(checklistItems)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("launch-checklist-progress")
    if (saved) {
      try {
        const savedProgress = JSON.parse(saved)
        setItems((prevItems) =>
          prevItems.map((item) => ({
            ...item,
            completed: savedProgress[item.id] || false,
          })),
        )
      } catch (error) {
        console.error("Error loading saved progress:", error)
      }
    }
  }, [])

  // Handle tab changes
  useEffect(() => {
    if (activeTab !== "all") {
      setSelectedPriority(activeTab)
      setSelectedCategory("all")
    } else {
      setSelectedPriority("all")
    }
  }, [activeTab])

  // Save progress to localStorage
  const saveProgress = (updatedItems: ChecklistItem[]) => {
    const progress = updatedItems.reduce(
      (acc, item) => {
        acc[item.id] = item.completed
        return acc
      },
      {} as Record<string, boolean>,
    )
    localStorage.setItem("launch-checklist-progress", JSON.stringify(progress))
  }

  const toggleItem = (id: string) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    setItems(updatedItems)
    saveProgress(updatedItems)
  }

  const filteredItems = items.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    const priorityMatch = selectedPriority === "all" || item.priority === selectedPriority
    return categoryMatch && priorityMatch
  })

  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const highPriorityCompleted = items.filter((item) => item.priority === "high" && item.completed).length
  const highPriorityTotal = items.filter((item) => item.priority === "high").length

  const categories = [
    { id: "all", name: "All Categories", icon: Globe },
    { id: "payments", name: "Payments", icon: CreditCard },
    { id: "functionality", name: "Functionality", icon: Settings },
    { id: "design", name: "Design", icon: Users },
    { id: "performance", name: "Performance", icon: BarChart3 },
    { id: "security", name: "Security", icon: Shield },
    { id: "content", name: "Content", icon: Globe },
    { id: "seo", name: "SEO", icon: Globe },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "business", name: "Business", icon: Users },
    { id: "compatibility", name: "Compatibility", icon: Settings },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isReadyToLaunch = highPriorityCompleted === highPriorityTotal && progressPercentage >= 80

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            <Rocket className="h-8 w-8 mr-3 text-blue-600" />
            Launch Readiness Checklist
          </h1>
          <p className="text-gray-600">Complete these tasks to ensure your Memorial QR website is ready for launch.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">{progressPercentage}%</span>
                <span className="text-sm text-gray-500">
                  {completedCount}/{totalCount} completed
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">
                  {highPriorityCompleted}/{highPriorityTotal}
                </span>
                <Badge variant={highPriorityCompleted === highPriorityTotal ? "default" : "destructive"}>
                  {highPriorityCompleted === highPriorityTotal ? "Complete" : "Pending"}
                </Badge>
              </div>
              <Progress value={(highPriorityCompleted / highPriorityTotal) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Launch Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                {isReadyToLaunch ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <Badge className="bg-green-100 text-green-800">Ready to Launch!</Badge>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                    <Badge variant="outline">Not Ready</Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {isReadyToLaunch
                  ? "All critical tasks completed"
                  : `${highPriorityTotal - highPriorityCompleted} high priority tasks remaining`}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="high">High Priority</TabsTrigger>
            <TabsTrigger value="medium">Medium Priority</TabsTrigger>
            <TabsTrigger value="low">Low Priority</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="high">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {items.filter((item) => item.priority === "high").length} high priority items
              </p>
            </div>
          </TabsContent>

          <TabsContent value="medium">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {items.filter((item) => item.priority === "medium").length} medium priority items
              </p>
            </div>
          </TabsContent>

          <TabsContent value="low">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {items.filter((item) => item.priority === "low").length} low priority items
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Checklist Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`transition-all ${item.completed ? "bg-green-50 border-green-200" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                        {item.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                    </div>
                    <p className={`text-gray-600 mb-3 ${item.completed ? "line-through" : ""}`}>{item.description}</p>
                    {item.testUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (item.testUrl?.startsWith("http")) {
                            window.open(item.testUrl, "_blank")
                          } else {
                            window.location.href = item.testUrl
                          }
                        }}
                      >
                        {item.testUrl.startsWith("http") ? (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open External Tool
                          </>
                        ) : (
                          "Test This Feature"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Launch Button */}
        {isReadyToLaunch && (
          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">Ready to Launch! 🚀</h2>
              <p className="text-green-700 mb-4">
                Congratulations! You've completed all critical tasks and your Memorial QR website is ready to go live.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Rocket className="h-5 w-5 mr-2" />
                Launch Your Website
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
