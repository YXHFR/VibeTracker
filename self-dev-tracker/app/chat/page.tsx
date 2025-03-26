"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { getChatMessages, sendChatMessage } from "@/app/actions"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const chatMessages = await getChatMessages()
      setMessages(chatMessages)
      setIsLoading(false)
    }
    fetchMessages()
  }, [])

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Optimistically update UI
    const tempMessage = {
      id: Date.now().toString(),
      user: {
        id: "1", // Always use the first user for the demo
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      message: newMessage,
      timestamp: "Just now",
    }

    setMessages((prev) => [...prev, tempMessage])
    setNewMessage("")

    // Submit to server
    const formData = new FormData()
    formData.append("message", newMessage)
    await sendChatMessage(formData)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="container py-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Community Chat</h1>
              </div>
              <div className="mt-8 h-64 animate-pulse rounded bg-muted"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight">Community Chat</h1>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="gap-2">
                  <ArrowRight className="h-4 w-4" /> Explore Blog
                </Button>
              </Link>
            </div>

            <Card className="mt-6">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <CardTitle>Share Ideas & Stay Consistent</CardTitle>
                <CardDescription>
                  Connect with others on your self-development journey. Ask questions, share tips, and stay motivated!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[500px] flex flex-col">
                  <div className="flex-1 overflow-auto p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="flex gap-3">
                          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={msg.user.avatar || "/placeholder.svg"}
                              alt={msg.user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{msg.user.name}</span>
                              <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                            </div>
                            <div className="mt-1 rounded-lg bg-muted p-3">{msg.message}</div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Send className="h-4 w-4 mr-2" /> Send
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
                This is a demonstration chat. In a real app, messages would persist on the server and be visible to all
                users.
              </CardFooter>
            </Card>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Join the Discussion</CardTitle>
                  <CardDescription>Popular conversation topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        1
                      </span>
                      <span>Morning routines for productivity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        2
                      </span>
                      <span>Building reading habits that stick</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        3
                      </span>
                      <span>Overcoming exercise resistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        4
                      </span>
                      <span>Mindfulness techniques for focus</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Chat Guidelines</CardTitle>
                  <CardDescription>For a positive community experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        ✓
                      </span>
                      <span>Be respectful and supportive of others' journeys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        ✓
                      </span>
                      <span>Share specific strategies that worked for you</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        ✓
                      </span>
                      <span>Ask questions that can benefit the community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        ✓
                      </span>
                      <span>Celebrate others' wins, no matter how small</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

