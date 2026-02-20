"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { 
  Search,
  Send,
  MoreHorizontal,
  Phone,
  Video,
  Paperclip,
  Smile,
  Archive,
  Flag,
  Trash2
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock conversations data
const conversations = [
  {
    id: "1",
    participant: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      role: "Caregiver",
      status: "online"
    },
    lastMessage: "Thank you for approving my application! When can I start taking bookings?",
    timestamp: "2 minutes ago",
    unread: true,
    priority: "normal"
  },
  {
    id: "2",
    participant: {
      name: "Margaret Smith",
      avatar: "/avatars/margaret.jpg",
      role: "Client",
      status: "offline"
    },
    lastMessage: "I need to report an issue with my recent booking. The caregiver was late.",
    timestamp: "1 hour ago",
    unread: true,
    priority: "high"
  },
  {
    id: "3",
    participant: {
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
      role: "Caregiver",
      status: "online"
    },
    lastMessage: "Could you help me update my availability schedule?",
    timestamp: "3 hours ago",
    unread: false,
    priority: "normal"
  },
  {
    id: "4",
    participant: {
      name: "Robert Johnson",
      avatar: "/avatars/robert.jpg",
      role: "Client",
      status: "away"
    },
    lastMessage: "The service was excellent. How do I leave a review?",
    timestamp: "1 day ago",
    unread: false,
    priority: "low"
  },
  {
    id: "5",
    participant: {
      name: "Emily Rodriguez",
      avatar: "/avatars/emily.jpg",
      role: "Caregiver",
      status: "online"
    },
    lastMessage: "I have a question about the payment schedule.",
    timestamp: "2 days ago",
    unread: true,
    priority: "normal"
  }
]

// Mock messages for selected conversation
const mockMessages = [
  {
    id: "1",
    sender: "Margaret Smith",
    content: "Hello, I need to report an issue with my recent booking.",
    timestamp: "2:30 PM",
    isAdmin: false
  },
  {
    id: "2",
    sender: "Margaret Smith",
    content: "The caregiver was 30 minutes late and didn't notify me in advance.",
    timestamp: "2:31 PM",
    isAdmin: false
  },
  {
    id: "3",
    sender: "Admin",
    content: "I'm sorry to hear about this issue. Let me look into this right away. Can you provide me with the booking ID?",
    timestamp: "2:45 PM",
    isAdmin: true
  },
  {
    id: "4",
    sender: "Margaret Smith",
    content: "The booking ID is BK001. This happened yesterday morning.",
    timestamp: "2:46 PM",
    isAdmin: false
  },
  {
    id: "5",
    sender: "Admin",
    content: "Thank you for providing the booking ID. I've reviewed the details and will contact the caregiver about this issue. We take punctuality very seriously.",
    timestamp: "3:00 PM",
    isAdmin: true
  }
]

export default function AdminMessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[1])
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/20"
      case "normal":
        return "border-l-blue-500"
      case "low":
        return "border-l-gray-300"
      default:
        return "border-l-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Messages & Support
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Communicate with users and handle support requests
        </p>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Conversations
              <Badge variant="secondary">
                {conversations.filter(c => c.unread).length} unread
              </Badge>
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
            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-l-4 ${getPriorityColor(conversation.priority)} ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                        <AvatarFallback>
                          {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.participant.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {conversation.participant.name}
                        </p>
                        <div className="flex items-center space-x-1">
                          {conversation.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <span className="text-xs text-gray-500">
                            {conversation.timestamp}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">
                        {conversation.participant.role}
                      </p>
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

        {/* Chat Interface */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} />
                        <AvatarFallback>
                          {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedConversation.participant.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {selectedConversation.participant.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedConversation.participant.role} • {selectedConversation.participant.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Flag className="h-4 w-4 mr-2" />
                          Flag as Important
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isAdmin 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isAdmin ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp}
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
                      className="min-h-[40px] max-h-[120px] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8" />
                </div>
                <p>Select a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}