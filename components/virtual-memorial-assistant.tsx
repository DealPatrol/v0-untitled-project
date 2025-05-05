"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getMemorialAssistantResponse, type MemorialAssistantMessage } from "@/app/actions/memorial-assistant"
import { Loader2, Send } from "lucide-react"

export function VirtualMemorialAssistant() {
  const [messages, setMessages] = useState<MemorialAssistantMessage[]>([
    {
      role: "assistant",
      content:
        "Hello, I'm your Virtual Memorial Assistant. I can help you plan a meaningful memorial, answer questions about our services, or provide guidance on honoring your loved one. How can I assist you today?",
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

    const userMessage: MemorialAssistantMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await getMemorialAssistantResponse([...messages, userMessage])
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error getting assistant response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting. Please try again or contact our support team for assistance.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Suggested questions for the user
  const suggestedQuestions = [
    "How do I plan a meaningful memorial service?",
    "What are some unique ways to honor a loved one?",
    "How can I help children cope with grief?",
    "What should I include in a memorial page?",
    "How can I create a lasting tribute?",
  ]

  function handleSuggestedQuestion(question: string) {
    const userMessage: MemorialAssistantMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    getMemorialAssistantResponse([...messages, userMessage])
      .then((response) => {
        setMessages((prev) => [...prev, { role: "assistant", content: response }])
      })
      .catch((error) => {
        console.error("Error getting assistant response:", error)
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I'm sorry, I'm having trouble connecting. Please try again or contact our support team for assistance.",
          },
        ])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="space-y-4 p-6">
      <div>
        <h3 className="text-xl font-medium">Virtual Memorial Assistant</h3>
        <p className="text-sm text-gray-500">Get personalized guidance for memorial planning and remembrance</p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${message.role === "user" ? "bg-rose-100" : "bg-white border"}`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-white border">
                <div className="flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <p className="text-sm text-gray-500">Typing...</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="p-4 bg-white border-t">
            <p className="text-sm font-medium mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
