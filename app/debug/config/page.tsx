"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, RefreshCw, Settings, Database, CreditCard, Globe, Bot, Package } from "lucide-react"

interface ConfigData {
  environment_variables: Record<
    string,
    {
      present: boolean
      value: string | null
      required: boolean
      category: string
    }
  >
  categories: Record<
    string,
    {
      name: string
      required: number
      present: number
    }
  >
  overall_status: "good" | "partial" | "missing"
  recommendations: Array<{
    type: string
    message: string
    action: string
  }>
  timestamp: string
  node_env: string
}

const categoryIcons = {
  database: Database,
  stripe: CreditCard,
  site: Globe,
  ai: Bot,
  other: Package,
}

export default function ConfigDebugPage() {
  const [config, setConfig] = useState<ConfigData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/debug/config")
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setConfig(data)
    } catch (err) {
      console.error("Failed to fetch config:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          Loading configuration...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <p className="font-medium text-red-800">Configuration Check Failed</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
            <Button onClick={fetchConfig} className="mt-4 bg-transparent" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!config) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p>No configuration data available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 bg-green-50 border-green-200"
      case "partial":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "missing":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "missing":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Settings className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Settings className="h-8 w-8 mr-3 text-blue-600" />
          Environment Configuration
        </h1>
        <p className="text-gray-600">Check your environment variables and system configuration</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>Environment: {config.node_env}</span>
          <span>Last checked: {new Date(config.timestamp).toLocaleString()}</span>
        </div>
      </div>

      {/* Overall Status */}
      <Card className={`mb-6 border ${getStatusColor(config.overall_status)}`}>
        <CardHeader>
          <CardTitle className="flex items-center">
            {getStatusIcon(config.overall_status)}
            <span className="ml-2">Overall Status</span>
          </CardTitle>
          <CardDescription>
            {config.overall_status === "good" && "All required environment variables are configured"}
            {config.overall_status === "partial" && "Some required environment variables are missing"}
            {config.overall_status === "missing" && "Most required environment variables are missing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant={config.overall_status === "good" ? "default" : "destructive"}>
                {config.overall_status.toUpperCase()}
              </Badge>
            </div>
            <Button onClick={fetchConfig} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(config.categories).map(([key, category]) => {
          const Icon = categoryIcons[key as keyof typeof categoryIcons]
          const isComplete = category.present >= category.required
          const hasAny = category.present > 0

          return (
            <Card
              key={key}
              className={`border ${isComplete ? "border-green-200 bg-green-50" : hasAny ? "border-yellow-200 bg-yellow-50" : "border-gray-200"}`}
            >
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon
                      className={`h-5 w-5 mr-2 ${isComplete ? "text-green-600" : hasAny ? "text-yellow-600" : "text-gray-400"}`}
                    />
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-gray-600">
                        {category.present}/
                        {category.required + (category.present - Math.min(category.present, category.required))}{" "}
                        configured
                      </p>
                    </div>
                  </div>
                  {isComplete ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : hasAny ? (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Environment Variables by Category */}
      {Object.entries(config.categories).map(([categoryKey, category]) => {
        const categoryVars = Object.entries(config.environment_variables).filter(
          ([, varConfig]) => varConfig.category === categoryKey,
        )

        if (categoryVars.length === 0) return null

        const Icon = categoryIcons[categoryKey as keyof typeof categoryIcons]

        return (
          <Card key={categoryKey} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon className="h-5 w-5 mr-2" />
                {category.name}
              </CardTitle>
              <CardDescription>
                {categoryKey === "database" && "Database connection and authentication"}
                {categoryKey === "stripe" && "Payment processing configuration"}
                {categoryKey === "site" && "Site URL and domain settings"}
                {categoryKey === "ai" && "AI service API keys"}
                {categoryKey === "other" && "Additional service configurations"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryVars.map(([key, varConfig]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      {varConfig.present ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-3" />
                      )}
                      <div>
                        <div className="font-medium">{key}</div>
                        <div className="text-sm text-gray-500">
                          {varConfig.required ? "Required" : "Optional"} • {varConfig.present ? "Present" : "Missing"}
                        </div>
                        {varConfig.value && (
                          <div className="text-xs text-gray-400 mt-1 font-mono">{varConfig.value}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {varConfig.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                      <Badge variant={varConfig.present ? "default" : "destructive"} className="text-xs">
                        {varConfig.present ? "Set" : "Missing"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Recommendations */}
      {config.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Actions to improve your configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {config.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    rec.type === "error"
                      ? "bg-red-50 border-red-200"
                      : rec.type === "warning"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-start">
                    <AlertCircle
                      className={`h-5 w-5 mr-2 mt-0.5 ${
                        rec.type === "error"
                          ? "text-red-600"
                          : rec.type === "warning"
                            ? "text-yellow-600"
                            : "text-blue-600"
                      }`}
                    />
                    <div>
                      <div
                        className={`font-medium ${
                          rec.type === "error"
                            ? "text-red-800"
                            : rec.type === "warning"
                              ? "text-yellow-800"
                              : "text-blue-800"
                        }`}
                      >
                        {rec.message}
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          rec.type === "error"
                            ? "text-red-700"
                            : rec.type === "warning"
                              ? "text-yellow-700"
                              : "text-blue-700"
                        }`}
                      >
                        {rec.action}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
