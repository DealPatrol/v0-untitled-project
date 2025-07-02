"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Circle, AlertTriangle, Clock, Star, Zap } from "lucide-react"

interface ChecklistItem {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  category: "technical" | "content" | "marketing" | "legal" | "business"
  completed: boolean
  estimatedTime: string
}

const checklistItems: ChecklistItem[] = [
  // Technical Items
  {
    id: "stripe-setup",
    title: "Configure Stripe Payment Processing",
    description: "Set up Stripe payment links for all plans and test payment flow",
    priority: "high",
    category: "technical",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "database-setup",
    title: "Database Setup and Migration",
    description: "Ensure all database tables are created and properly configured",
    priority: "high",
    category: "technical",
    completed: false,
    estimatedTime: "1 hour",
  },
  {
    id: "ssl-certificate",
    title: "SSL Certificate Configuration",
    description: "Ensure HTTPS is properly configured for secure payments",
    priority: "high",
    category: "technical",
    completed: false,
    estimatedTime: "30 minutes",
  },
  {
    id: "error-pages",
    title: "Custom Error Pages",
    description: "Create custom 404, 500, and other error pages",
    priority: "medium",
    category: "technical",
    completed: false,
    estimatedTime: "1 hour",
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description: "Optimize images, implement caching, and improve load times",
    priority: "medium",
    category: "technical",
    completed: false,
    estimatedTime: "3 hours",
  },
  {
    id: "mobile-testing",
    title: "Mobile Responsiveness Testing",
    description: "Test all pages on various mobile devices and screen sizes",
    priority: "high",
    category: "technical",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "browser-testing",
    title: "Cross-Browser Testing",
    description: "Test website functionality across Chrome, Firefox, Safari, and Edge",
    priority: "medium",
    category: "technical",
    completed: false,
    estimatedTime: "1.5 hours",
  },
  {
    id: "backup-system",
    title: "Backup and Recovery System",
    description: "Set up automated backups for database and user data",
    priority: "high",
    category: "technical",
    completed: false,
    estimatedTime: "2 hours",
  },

  // Content Items
  {
    id: "sample-memorials",
    title: "Create Sample Memorial Pages",
    description: "Add 5-10 high-quality sample memorial pages to showcase features",
    priority: "high",
    category: "content",
    completed: false,
    estimatedTime: "4 hours",
  },
  {
    id: "help-documentation",
    title: "Help Documentation",
    description: "Create comprehensive help guides and FAQs",
    priority: "medium",
    category: "content",
    completed: false,
    estimatedTime: "3 hours",
  },
  {
    id: "pricing-page",
    title: "Pricing Page Content",
    description: "Finalize pricing page with clear plan comparisons",
    priority: "high",
    category: "content",
    completed: false,
    estimatedTime: "1 hour",
  },
  {
    id: "about-page",
    title: "About Us Page",
    description: "Create compelling about page with company story and mission",
    priority: "medium",
    category: "content",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "testimonials",
    title: "Customer Testimonials",
    description: "Collect and display customer testimonials and reviews",
    priority: "medium",
    category: "content",
    completed: false,
    estimatedTime: "2 hours",
  },

  // Marketing Items
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    description: "Optimize meta tags, descriptions, and implement structured data",
    priority: "high",
    category: "marketing",
    completed: false,
    estimatedTime: "3 hours",
  },
  {
    id: "google-analytics",
    title: "Google Analytics Setup",
    description: "Set up Google Analytics and conversion tracking",
    priority: "high",
    category: "marketing",
    completed: false,
    estimatedTime: "1 hour",
  },
  {
    id: "social-media",
    title: "Social Media Integration",
    description: "Add social sharing buttons and create social media accounts",
    priority: "medium",
    category: "marketing",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "email-marketing",
    title: "Email Marketing Setup",
    description: "Set up email sequences for onboarding and marketing",
    priority: "medium",
    category: "marketing",
    completed: false,
    estimatedTime: "3 hours",
  },
  {
    id: "launch-announcement",
    title: "Launch Announcement Strategy",
    description: "Plan and prepare launch announcement across all channels",
    priority: "low",
    category: "marketing",
    completed: false,
    estimatedTime: "2 hours",
  },

  // Legal Items
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    description: "Create comprehensive privacy policy compliant with GDPR/CCPA",
    priority: "high",
    category: "legal",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    description: "Draft clear terms of service and user agreements",
    priority: "high",
    category: "legal",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "refund-policy",
    title: "Refund and Return Policy",
    description: "Create clear refund policy and return procedures",
    priority: "medium",
    category: "legal",
    completed: false,
    estimatedTime: "1 hour",
  },
  {
    id: "cookie-policy",
    title: "Cookie Policy and Consent",
    description: "Implement cookie consent banner and policy",
    priority: "medium",
    category: "legal",
    completed: false,
    estimatedTime: "1.5 hours",
  },

  // Business Items
  {
    id: "customer-support",
    title: "Customer Support System",
    description: "Set up customer support channels and response procedures",
    priority: "high",
    category: "business",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "payment-processing",
    title: "Payment Processing Verification",
    description: "Test all payment methods and verify merchant account setup",
    priority: "high",
    category: "business",
    completed: false,
    estimatedTime: "1 hour",
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    description: "Set up system to track QR code inventory and fulfillment",
    priority: "medium",
    category: "business",
    completed: false,
    estimatedTime: "3 hours",
  },
  {
    id: "shipping-logistics",
    title: "Shipping and Fulfillment",
    description: "Set up shipping partners and fulfillment processes",
    priority: "high",
    category: "business",
    completed: false,
    estimatedTime: "2 hours",
  },
  {
    id: "launch-metrics",
    title: "Launch Success Metrics",
    description: "Define KPIs and success metrics for launch tracking",
    priority: "low",
    category: "business",
    completed: false,
    estimatedTime: "1 hour",
  },
]

export default function LaunchChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(checklistItems)
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<string>("all")

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("launch-checklist-progress")
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress)
        setItems((prevItems) =>
          prevItems.map((item) => ({
            ...item,
            completed: progress[item.id] || false,
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
    const priorityMatch = selectedPriority === "all" || item.priority === selectedPriority
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
    return priorityMatch && categoryMatch
  })

  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const priorityStats = {
    high: items.filter((item) => item.priority === "high"),
    medium: items.filter((item) => item.priority === "medium"),
    low: items.filter((item) => item.priority === "low"),
  }

  const categoryStats = {
    technical: items.filter((item) => item.category === "technical"),
    content: items.filter((item) => item.category === "content"),
    marketing: items.filter((item) => item.category === "marketing"),
    legal: items.filter((item) => item.category === "legal"),
    business: items.filter((item) => item.category === "business"),
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <Star className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-purple-100 text-purple-800"
      case "content":
        return "bg-green-100 text-green-800"
      case "marketing":
        return "bg-orange-100 text-orange-800"
      case "legal":
        return "bg-gray-100 text-gray-800"
      case "business":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Website Launch Checklist</h1>
          <p className="text-xl text-gray-600 mb-6">
            Complete these tasks to ensure a successful launch of your Memorial QR website.
          </p>

          {/* Progress Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Launch Progress</span>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {completedCount}/{totalCount} Complete
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-red-600">
                    {priorityStats.high.filter((item) => item.completed).length}/{priorityStats.high.length}
                  </div>
                  <div className="text-gray-600">High Priority</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-yellow-600">
                    {priorityStats.medium.filter((item) => item.completed).length}/{priorityStats.medium.length}
                  </div>
                  <div className="text-gray-600">Medium Priority</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-600">
                    {priorityStats.low.filter((item) => item.completed).length}/{priorityStats.low.length}
                  </div>
                  <div className="text-gray-600">Low Priority</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{progressPercentage}%</div>
                  <div className="text-gray-600">Complete</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-600">{totalCount - completedCount}</div>
                  <div className="text-gray-600">Remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="high" className="text-red-600">
              High Priority
            </TabsTrigger>
            <TabsTrigger value="medium" className="text-yellow-600">
              Medium Priority
            </TabsTrigger>
            <TabsTrigger value="low" className="text-blue-600">
              Low Priority
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="mb-4">
              <p className="text-sm text-gray-600">Showing all {items.length} checklist items</p>
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

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Categories
            </Button>
            {Object.entries(categoryStats).map(([category, categoryItems]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category} ({categoryItems.filter((item) => item.completed).length}/{categoryItems.length})
              </Button>
            ))}
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`transition-all duration-200 ${item.completed ? "bg-green-50" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Button variant="ghost" size="sm" onClick={() => toggleItem(item.id)} className="mt-1 p-0 h-6 w-6">
                    {item.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                  </Button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${item.completed ? "line-through text-gray-500" : ""}`}>
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge className={getPriorityColor(item.priority)} variant="outline">
                          {getPriorityIcon(item.priority)}
                          <span className="ml-1 capitalize">{item.priority}</span>
                        </Badge>
                        <Badge className={getCategoryColor(item.category)} variant="secondary">
                          {item.category}
                        </Badge>
                      </div>
                    </div>

                    <p className={`text-gray-600 mb-3 ${item.completed ? "line-through" : ""}`}>{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Estimated time: {item.estimatedTime}
                      </div>
                      {item.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No items match the current filters.</p>
            </CardContent>
          </Card>
        )}

        {/* Launch Readiness */}
        {progressPercentage >= 80 && (
          <Card className="mt-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Ready for Launch!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Congratulations! You've completed {progressPercentage}% of the launch checklist. Your website is ready
                to go live!
              </p>
              <Button className="bg-green-600 hover:bg-green-700">Launch Website</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
