"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMemorialAssistantResponse } from "@/app/actions/memorial-assistant"
import { Loader2, Send, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function VirtualMemorialAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Virtual Memorial Assistant. I can help you plan a meaningful memorial, answer questions about our services, or provide guidance on honoring your loved one. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await getMemorialAssistantResponse(input)
      if (response.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: response.response, timestamp: new Date() }])
      }
    } catch (error) {
      console.error("Error getting assistant response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team for assistance.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Suggested questions for the user
  const suggestedQuestions = [
    "How do I write a good biography?",
    "What photos should I include?",
    "How do I organize family information?",
    "Tell me about QR codes",
    "How do I create a timeline?",
    "What makes a memorial meaningful?",
  ]

  function handleSuggestedQuestion(question: string) {
    const userMessage: Message = { role: "user", content: question, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    getMemorialAssistantResponse(question)
      .then((response) => {
        if (response.success) {
          setMessages((prev) => [...prev, { role: "assistant", content: response.response, timestamp: new Date() }])
        }
      })
      .catch((error) => {
        console.error("Error getting assistant response:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm sorry, I'm having trouble connecting. Please try again or contact our support team for assistance.",
            timestamp: new Date(),
          },
        ])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden bg-background">
        <div className="h-[500px] overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.map((message, index) => (
            <div key={index} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                  }`}
                >
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-background border shadow-sm"
                  }`}
                >
                  <div className="whitespace-pre-line text-sm">{message.content}</div>
                  <div
                    className={`text-xs mt-2 opacity-70 ${
                      message.role === "user" ? "text-blue-100" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-background border shadow-sm rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="p-4 bg-muted/50 border-t">
            <p className="text-sm font-medium mb-3">Try asking me about:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="text-xs bg-background hover:bg-muted border rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2 bg-background">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about creating your memorial..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          I'm here to help you create a beautiful memorial. Ask me about photos, biographies, timelines, or any other
          aspect of memorial creation.
        </p>
      </div>
    </div>
  )
}
