"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Mail, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface CallPrep {
  supplier: string
  phone: string
  email: string
  keyQuestions: string[]
  negotiationPoints: string[]
  requiredInfo: string[]
}

interface CallLog {
  id: string
  supplier: string
  date: string
  duration: string
  contact_person: string
  outcome: string
  notes: string
  follow_up_required: boolean
  follow_up_date?: string
}

export default function SupplierContactPage() {
  const [activeTab, setActiveTab] = useState("prep")
  const [callLogs, setCallLogs] = useState<CallLog[]>([])
  const [newCallLog, setNewCallLog] = useState({
    supplier: "QR Code Labels",
    contact_person: "",
    duration: "",
    outcome: "",
    notes: "",
    follow_up_required: false,
    follow_up_date: "",
  })

  const qrCodeLabelsPrep: CallPrep = {
    supplier: "QR Code Labels",
    phone: "1-800-750-7764",
    email: "sales@qrcodelabels.com",
    keyQuestions: [
      "What are your volume pricing tiers for weatherproof QR labels?",
      "Do you offer drop shipping services directly to customers?",
      "What's your minimum order quantity for custom QR codes?",
      "Can you integrate with our ordering system via API?",
      "What's the typical turnaround time for orders?",
      "Do you provide tracking numbers for shipments?",
      "What materials do you recommend for outdoor memorial use?",
      "Can you handle custom engraving with QR codes?",
      "What are your payment terms for business accounts?",
      "Do you offer any exclusivity agreements for our market?",
    ],
    negotiationPoints: [
      "Volume discounts for 100+ units per month",
      "Reduced pricing for annual commitments",
      "Free setup fees for initial orders",
      "Priority processing for rush orders",
      "Custom packaging with our branding",
      "Extended payment terms (Net 30)",
      "Exclusive territory rights for memorial market",
      "Co-marketing opportunities",
    ],
    requiredInfo: [
      "Detailed pricing sheet for all QR label sizes",
      "Material specifications and durability ratings",
      "Drop shipping process and requirements",
      "API documentation for order integration",
      "Sample products for quality evaluation",
      "References from other memorial/cemetery clients",
      "Insurance and liability coverage details",
      "Return/refund policy for defective products",
    ],
  }

  const handleSaveCallLog = () => {
    const newLog: CallLog = {
      id: `call-${Date.now()}`,
      ...newCallLog,
      date: new Date().toISOString(),
    }
    setCallLogs([newLog, ...callLogs])
    setNewCallLog({
      supplier: "QR Code Labels",
      contact_person: "",
      duration: "",
      outcome: "",
      notes: "",
      follow_up_required: false,
      follow_up_date: "",
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Supplier Contact Management</h1>
        <p className="text-gray-600">Prepare for and track all supplier communications</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="prep">Call Preparation</TabsTrigger>
          <TabsTrigger value="script">Call Script</TabsTrigger>
          <TabsTrigger value="log">Log Call</TabsTrigger>
          <TabsTrigger value="history">Call History</TabsTrigger>
        </TabsList>

        <TabsContent value="prep">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  QR Code Labels - Contact Info
                </CardTitle>
                <CardDescription>Primary contact for premium QR label supplier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">1-800-750-7764</p>
                    <p className="text-sm text-blue-700">Main sales line</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">sales@qrcodelabels.com</p>
                    <p className="text-sm text-gray-600">Sales inquiries</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <ExternalLink className="h-5 w-5 text-gray-600" />
                  <div>
                    <a
                      href="https://www.qrcodelabels.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      www.qrcodelabels.com
                    </a>
                    <p className="text-sm text-gray-600">Company website</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Best Time to Call</h4>
                  <p className="text-sm text-yellow-700">Monday-Friday, 9:00 AM - 5:00 PM MST (Phoenix, AZ timezone)</p>
                  <p className="text-sm text-yellow-700">Ask for: Sales Manager or Business Development</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Business Information</CardTitle>
                <CardDescription>Information to share about your memorial QR business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Business: Memorial QR Solutions</p>
                  <p className="text-sm text-gray-600">QR codes for cemetery memorials and grave markers</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Expected Volume: 50-200 units/month</p>
                  <p className="text-sm text-gray-600">Starting small, scaling to high volume</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Target Market: Cemetery/Memorial Industry</p>
                  <p className="text-sm text-gray-600">Families, funeral homes, cemetery operators</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Requirements: Outdoor durability, custom engraving</p>
                  <p className="text-sm text-gray-600">5+ year weather resistance essential</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="font-semibold">Drop Shipping: Required</p>
                  <p className="text-sm text-gray-600">Direct shipping to customers nationwide</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Questions to Ask</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {qrCodeLabelsPrep.keyQuestions.map((question, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{question}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Negotiation Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {qrCodeLabelsPrep.negotiationPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Information to Request</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {qrCodeLabelsPrep.requiredInfo.map((info, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{info}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="script">
          <Card>
            <CardHeader>
              <CardTitle>Call Script Template</CardTitle>
              <CardDescription>Professional script for your initial supplier contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Opening (30 seconds)</h4>
                <p className="text-sm text-blue-800">
                  "Hi, this is [Your Name] from Memorial QR Solutions. I'm calling to discuss a potential partnership
                  for QR code labels for the memorial and cemetery industry. We're looking for a reliable supplier who
                  can provide weatherproof QR labels with drop shipping capabilities. Do you have a few minutes to
                  discuss our requirements?"
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Business Overview (1 minute)</h4>
                <p className="text-sm text-green-800">
                  "We provide digital memorial solutions where families can create online memorials linked to QR codes
                  placed on grave markers. We're expecting to process 50-200 orders per month initially, scaling up
                  significantly. Each QR code needs to withstand outdoor conditions for 5+ years. We need a partner who
                  can handle drop shipping directly to customers across the US."
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Key Requirements (2 minutes)</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Weatherproof materials suitable for outdoor memorial use</li>
                  <li>• Custom QR code printing with optional text engraving</li>
                  <li>• Drop shipping capabilities with tracking</li>
                  <li>• Competitive pricing for volume orders</li>
                  <li>• Fast turnaround times (3-5 business days preferred)</li>
                  <li>• API integration for automated ordering</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Closing & Next Steps (1 minute)</h4>
                <p className="text-sm text-purple-800">
                  "Based on what we've discussed, this sounds like a great fit. Could you send me a detailed pricing
                  sheet and some samples? I'd also like to schedule a follow-up call to discuss the technical
                  integration. What's the best way to move forward?"
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Important Notes</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Take detailed notes during the call</li>
                  <li>• Ask for the contact person's direct email and phone</li>
                  <li>• Confirm next steps and timeline</li>
                  <li>• Request references from similar clients</li>
                  <li>• Get samples shipped ASAP for evaluation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Log Your Call</CardTitle>
              <CardDescription>Record details from your conversation with QR Code Labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_person">Contact Person</Label>
                  <Input
                    id="contact_person"
                    value={newCallLog.contact_person}
                    onChange={(e) => setNewCallLog({ ...newCallLog, contact_person: e.target.value })}
                    placeholder="Name and title"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Call Duration</Label>
                  <Input
                    id="duration"
                    value={newCallLog.duration}
                    onChange={(e) => setNewCallLog({ ...newCallLog, duration: e.target.value })}
                    placeholder="e.g., 15 minutes"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="outcome">Call Outcome</Label>
                <Input
                  id="outcome"
                  value={newCallLog.outcome}
                  onChange={(e) => setNewCallLog({ ...newCallLog, outcome: e.target.value })}
                  placeholder="e.g., Positive - sending samples and pricing"
                />
              </div>

              <div>
                <Label htmlFor="notes">Detailed Notes</Label>
                <Textarea
                  id="notes"
                  value={newCallLog.notes}
                  onChange={(e) => setNewCallLog({ ...newCallLog, notes: e.target.value })}
                  placeholder="Record key points, pricing discussed, next steps, etc."
                  rows={6}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="follow_up"
                  checked={newCallLog.follow_up_required}
                  onChange={(e) => setNewCallLog({ ...newCallLog, follow_up_required: e.target.checked })}
                />
                <Label htmlFor="follow_up">Follow-up required</Label>
              </div>

              {newCallLog.follow_up_required && (
                <div>
                  <Label htmlFor="follow_up_date">Follow-up Date</Label>
                  <Input
                    id="follow_up_date"
                    type="date"
                    value={newCallLog.follow_up_date}
                    onChange={(e) => setNewCallLog({ ...newCallLog, follow_up_date: e.target.value })}
                  />
                </div>
              )}

              <Button onClick={handleSaveCallLog} className="w-full">
                Save Call Log
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Call History</CardTitle>
              <CardDescription>Track all supplier communications and follow-ups</CardDescription>
            </CardHeader>
            <CardContent>
              {callLogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Phone className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No calls logged yet. Make your first call and record the details!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {callLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{log.supplier}</h4>
                          <p className="text-sm text-gray-600">
                            {log.contact_person} • {new Date(log.date).toLocaleDateString()} • {log.duration}
                          </p>
                        </div>
                        {log.follow_up_required && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            Follow-up needed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm mb-2">
                        <strong>Outcome:</strong> {log.outcome}
                      </p>
                      <p className="text-sm text-gray-700">{log.notes}</p>
                      {log.follow_up_date && (
                        <p className="text-sm text-blue-600 mt-2">
                          <strong>Follow-up:</strong> {new Date(log.follow_up_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
