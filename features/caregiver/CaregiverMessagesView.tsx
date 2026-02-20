"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Star,
  Clock
} from "lucide-react"

// Mock messages data
const conversations = [
  {
    id: "1",
    client: {
      name: "Margaret Smith",
      avatar: "/avatars/margaret.jpg",
      status: "online"
    },
    lastMessage: "Thank you for the wonderful care yesterday. See you tomorrow!",
    timestamp: "2 hours ago",
    unread: 0,
    messages: [
      {
        id: "1",
        sender: "client",
        content: "Hi Sarah, I wanted to thank you for yesterday's session. You were so patient and kind.",
        timestamp: "2024-01-20T14:30:00Z"
      },
      {
        id: "2",
        sender: "caregiver",
        content: "Thank you so much, Margaret! It was my pleasure. I'm glad I could help with your morning routine.",
        timestamp: "2024-01-20T14:35:00Z"
      },
      {
        id: "3",
        sender: "client",
        content: "Thank you for the wonderful care yesterday. See you tomorrow!",
        timestamp: "2024-01-20T16:20:00Z"
      }
    ]
  },
  {
    id: "2",
    client: {
      name: "Robert Johnson",
      avatar: "/avatars/robert.jpg",
      status: "offline"
    },
    lastMessage: "Could we reschedule tomorrow's session to 3 PM instead?",
    timestamp: "4 hours ago",
    unread: 2,
    messages: [
      {
        id: "1",
        sender: "client",
        content: "Hi Sarah, I hope you're doing well. I have a small request.",
        timestamp: "2024-01-20T12:00:00Z"
      },
      {
        id: "2",
        sender: "client",
        content: "Could we reschedule tomorrow's session to 3 PM instead? I have a doctor's appointment that got moved.",
        timestamp: "2024-01-20T12:05:00Z"
      }
    ]
  },
  {
    id: "3",
    client: {
      name: "Dorothy Williams",
      avatar: "/avatars/dorothy.jpg",
      status: "online"
    },
    lastMessage: "The doctor appointment has been moved to 7:30 PM",
    timestamp: "6 hours ago",
    unread: 1,
    messages: [
      {
        id: "1",
        sender: "client",
        content: "Hi Sarah, there's been a change to our appointment tomorrow.",
        timestamp: "2024-01-20T10:00:00Z"
      },
      {
        id: "2",
        sender: "client",
        content: "The doctor appointment has been moved to 7:30 PM. Can you still help with transportation?",
        timestamp: "2024-01-20T10:15:00Z"
      }
    ]
  },
  {
    id: "4",
    client: {
      name: "John Davis",
      avatar: "/avatars/john.jpg",
      status: "offline"
    },
    lastMessage: "Perfect! Looking forward to working with you.",
    timestamp: "1 day ago",
    unread: 0,
    messages: [
      {
        id: "1",
        sender: "caregiver",
        content: "Hi John, I'm Sarah, your assigned caregiver. I'm looking forward to helping you with your care needs.",
        timestamp: "2024-01-19T15:00:00Z"
      },
      {
        id: "2",
        sender: "client",
        content: "Hi Sarah! Thank you for reaching out. I'm excited to work with you too.",
        timestamp: "2024-01-19T15:30:00Z"
      },
      {
        id: "3",
        sender: "client",
        content: "Perfect! Looking forward to working with you.",
        timestamp: "2024-01-19T16:00:00Z"
      }
    ]
  }
]

export default function CaregiverMessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredConversations = conversations.filter(conv =>
    conv.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const getStatusIndicator = (status: string) => {
    return (
      <div className={`w-3 h-3 rounded-full ${
        status === "online" ? "bg-green-500" : "bg-gray-400"
      }`} />
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Messages
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Communicate with your clients and coordinate care
        </p>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selectedConversation.id === conversation.id 
                        ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500" 
                        : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.client.avatar} alt={conversation.client.name} />
                          <AvatarFallback>
                            {conversation.client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">
                          {getStatusIndicator(conversation.client.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {conversation.client.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {conversation.unread > 0 && (
                              <Badge className="bg-blue-600 text-white text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {conversation.timestamp}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.client.avatar} alt={selectedConversation.client.name} />
                      <AvatarFallback>
                        {selectedConversation.client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1">
                      {getStatusIndicator(selectedConversation.client.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedConversation.client.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedConversation.client.status === "online" ? "Online" : "Last seen 2 hours ago"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "caregiver" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === "caregiver"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "caregiver" 
                          ? "text-blue-100" 
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {formatTimestamp(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={1}
                    className="resize-none"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}