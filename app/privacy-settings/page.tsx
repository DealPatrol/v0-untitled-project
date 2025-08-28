import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Users, MessageCircle, AlertTriangle, CheckCircle } from "lucide-react"

export default function PrivacySettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Privacy & Content Settings</h1>
            <p className="text-xl text-gray-600">Control who can view your memorial and manage content moderation</p>
          </div>

          <div className="grid gap-8">
            {/* Memorial Visibility */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Memorial Visibility</CardTitle>
                    <CardDescription>Control who can view and access your memorial</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="public-memorial">Public Memorial</Label>
                      <p className="text-sm text-gray-600">Anyone with the link can view the memorial</p>
                    </div>
                    <Switch id="public-memorial" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="search-indexing">Search Engine Indexing</Label>
                      <p className="text-sm text-gray-600">Allow search engines to find this memorial</p>
                    </div>
                    <Switch id="search-indexing" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="password-protection">Password Protection</Label>
                      <p className="text-sm text-gray-600">Require a password to view the memorial</p>
                    </div>
                    <Switch id="password-protection" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Memorial Password (Optional)</Label>
                  <Input type="password" placeholder="Enter password for private access" disabled />
                  <p className="text-sm text-gray-500">Only enabled when password protection is turned on</p>
                </div>
              </CardContent>
            </Card>

            {/* Guest Book Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Guest Book & Comments</CardTitle>
                    <CardDescription>Manage how visitors can leave messages and memories</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="allow-comments">Allow Guest Book Entries</Label>
                      <p className="text-sm text-gray-600">Let visitors leave condolences and memories</p>
                    </div>
                    <Switch id="allow-comments" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="moderate-comments">Moderate All Entries</Label>
                      <p className="text-sm text-gray-600">Review entries before they appear publicly</p>
                    </div>
                    <Switch id="moderate-comments" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="require-approval">Require Name for Entries</Label>
                      <p className="text-sm text-gray-600">Visitors must provide their name to leave a message</p>
                    </div>
                    <Switch id="require-approval" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Blocked Words (Optional)</Label>
                  <Textarea
                    placeholder="Enter words to automatically filter from guest book entries (one per line)"
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">
                    Entries containing these words will be automatically flagged for review
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Family Tree Access */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Family Tree Access</CardTitle>
                    <CardDescription>Control who can view and edit family information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="family-tree-public">Public Family Tree</Label>
                      <p className="text-sm text-gray-600">Allow visitors to view the family tree</p>
                    </div>
                    <Switch id="family-tree-public" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="family-edit-permissions">Family Edit Permissions</Label>
                      <p className="text-sm text-gray-600">Allow family members to add/edit family tree entries</p>
                    </div>
                    <Switch id="family-edit-permissions" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Authorized Family Editors</Label>
                  <div className="space-y-2">
                    <Input placeholder="Enter email address to grant editing access" />
                    <Button variant="outline" size="sm">
                      Add Editor
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2">
                      john.doe@email.com
                      <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                    </Badge>
                    <Badge variant="secondary">
                      sarah.smith@email.com
                      <button className="ml-2 text-gray-500 hover:text-gray-700">×</button>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Moderation */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Shield className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Content Moderation</CardTitle>
                    <CardDescription>Automatic and manual content filtering options</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="auto-moderation">Automatic Content Filtering</Label>
                      <p className="text-sm text-gray-600">Use AI to detect inappropriate content automatically</p>
                    </div>
                    <Switch id="auto-moderation" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="profanity-filter">Profanity Filter</Label>
                      <p className="text-sm text-gray-600">Block messages containing inappropriate language</p>
                    </div>
                    <Switch id="profanity-filter" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="spam-protection">Spam Protection</Label>
                      <p className="text-sm text-gray-600">Prevent spam and promotional content</p>
                    </div>
                    <Switch id="spam-protection" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Moderation Level</Label>
                  <Select defaultValue="moderate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strict">Strict - Review all content</SelectItem>
                      <SelectItem value="moderate">Moderate - Review flagged content</SelectItem>
                      <SelectItem value="lenient">Lenient - Minimal filtering</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Choose how strictly content should be moderated</p>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose when and how you want to be notified</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="new-messages">New Guest Book Entries</Label>
                      <p className="text-sm text-gray-600">Get notified when someone leaves a message</p>
                    </div>
                    <Switch id="new-messages" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="moderation-needed">Content Needs Moderation</Label>
                      <p className="text-sm text-gray-600">Get notified when content is flagged for review</p>
                    </div>
                    <Switch id="moderation-needed" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="family-updates">Family Tree Updates</Label>
                      <p className="text-sm text-gray-600">Get notified when family members are added or edited</p>
                    </div>
                    <Switch id="family-updates" />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <Label>Notification Email</Label>
                  <Input type="email" placeholder="your-email@example.com" defaultValue="user@example.com" />
                  <p className="text-sm text-gray-500">We'll send notifications to this email address</p>
                </div>
              </CardContent>
            </Card>

            {/* Save Settings */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
