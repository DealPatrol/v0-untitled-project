"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send, X, ChevronDown, Loader2, AlertTriangle } from "lucide-react"
import { getChatResponse, type ChatMessage } from "@/app/actions/ai-chat"
import { cn } from "@/lib/utils"

export function AiChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! How can I help you with Memorial QR today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLimitedMode, setIsLimitedMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await getChatResponse([...messages, userMessage])
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error getting chat response:", error)
      setIsLimitedMode(true)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting. Please try again or contact our support team at support@memorialqr.com.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const commonQuestions = [
    "How do Memorial QR codes work?",
    "What are your pricing plans?",
    "How long do the QR codes last?",
    "Can family members add content to a memorial?",
    "How do I create a memorial?",
  ]

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-700 shadow-lg"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-[350px] md:w-[400px] shadow-xl border-rose-200">
          <CardHeader className="bg-rose-600 text-white rounded-t-lg py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Memorial QR Assistant
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-rose-700 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-rose-700 rounded-full"
                onClick={() => {
                  setMessages([{ role: "assistant", content: "Hello! How can I help you with Memorial QR today?" }])
                  setIsLimitedMode(false)
                  setIsOpen(false)
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLimitedMode && (
              <div className="bg-amber-50 p-2 border-b border-amber-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-amber-700">
                  Running in limited mode. Some features may be restricted.
                </span>
              </div>
            )}
            <div className="h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col max-w-[80%] rounded-lg p-3",
                    message.role === "user" ? "bg-rose-100 ml-auto" : "bg-gray-100 mr-auto",
                  )}
                >
                  <span className="text-sm">{message.content}</span>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col max-w-[80%] rounded-lg p-3 bg-gray-100 mr-auto">
                  <span className="flex items-center text-sm text-gray-500">
                    <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                    Typing...
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Common questions:</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {commonQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-2 border-t">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-rose-600 hover:bg-rose-700"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
