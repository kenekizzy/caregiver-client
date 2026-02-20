/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bell,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Star,
  AlertTriangle,
  Info
} from "lucide-react"

// Mock booking requests data
const bookingRequests = [
  {
    id: "1",
    client: {
      name: "John Davis",
      avatar: "/avatars/john.jpg",
      rating: 4.8,
      reviewCount: 23
    },
    service: "Personal Care",
    date: "Jan 25, 2024",
    time: "10:00 AM - 2:00 PM",
    duration: "4 hours",
    hourlyRate: 25,
    totalAmount: 100,
    location: "Brooklyn, NY",
    distance: "2.3 miles",
    urgency: "high",
    status: "pending",
    postedTime: "2 hours ago",
    description: "Looking for experienced caregiver for elderly father with mobility issues. Need help with personal care, medication management, and light housekeeping.",
    requirements: ["CPR Certified", "Experience with mobility issues", "Medication management"],
    clientNotes: "My father is 78 years old and recently had hip surgery. He needs assistance with daily activities and someone patient and kind."
  },
  {
    id: "2",
    client: {
      name: "Mary Wilson",
      avatar: "/avatars/mary.jpg",
      rating: 4.9,
      reviewCount: 45
    },
    service: "Companionship",
    date: "Jan 26, 2024",
    time: "3:00 PM - 7:00 PM",
    duration: "4 hours",
    hourlyRate: 22,
    totalAmount: 88,
    location: "Manhattan, NY",
    distance: "5.1 miles",
    urgency: "normal",
    status: "pending",
    postedTime: "4 hours ago",
    description: "Seeking friendly companion for social activities and light conversation. My mother enjoys reading, puzzles, and talking about her garden.",
    requirements: ["Good conversational skills", "Patient and kind", "Experience with elderly"],
    clientNotes: "Mom is quite social but gets lonely. She loves talking about her travels and would enjoy someone who can engage in meaningful conversation."
  },
  {
    id: "3",
    client: {
      name: "James Brown",
      avatar: "/avatars/james.jpg",
      rating: 4.7,
      reviewCount: 12
    },
    service: "Medication Management",
    date: "Jan 27, 2024",
    time: "8:00 AM - 12:00 PM",
    duration: "4 hours",
    hourlyRate: 28,
    totalAmount: 112,
    location: "Queens, NY",
    distance: "8.2 miles",
    urgency: "urgent",
    status: "pending",
    postedTime: "30 minutes ago",
    description: "Need certified caregiver for complex medication schedule management. Multiple medications with specific timing requirements.",
    requirements: ["Certified Medication Aide", "Experience with complex schedules", "Detail-oriented"],
    clientNotes: "This is for my wife who has multiple chronic conditions. Very important that medications are given exactly on time."
  },
  {
    id: "4",
    client: {
      name: "Linda Garcia",
      avatar: "/avatars/linda.jpg",
      rating: 4.6,
      reviewCount: 18
    },
    service: "Transportation",
    date: "Jan 28, 2024",
    time: "1:00 PM - 3:00 PM",
    duration: "2 hours",
    hourlyRate: 20,
    totalAmount: 40,
    location: "Bronx, NY",
    distance: "12.5 miles",
    urgency: "normal",
    status: "pending",
    postedTime: "1 day ago",
    description: "Need transportation to and from medical appointment. Assistance getting in and out of vehicle required.",
    requirements: ["Valid driver's license", "Clean driving record", "Physical assistance capability"],
    clientNotes: "I use a walker and need help getting in and out of the car. The appointment is at Mount Sinai Hospital."
  }
]

export default function CaregiverRequestsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  const filteredRequests = bookingRequests.filter(request => {
    const matchesSearch = request.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesService = serviceFilter === "all" || request.service === serviceFilter
    const matchesUrgency = urgencyFilter === "all" || request.urgency === urgencyFilter

    return matchesSearch && matchesService && matchesUrgency
  })

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">High</Badge>
      case "normal":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Normal</Badge>
      default:
        return <Badge variant="secondary">{urgency}</Badge>
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Requests
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and respond to new caregiving opportunities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {filteredRequests.length} Available
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Requests</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Available today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {bookingRequests.filter(r => r.urgency === 'urgent').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need immediate response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rate</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            ₦
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(bookingRequests.reduce((sum, r) => sum + r.hourlyRate, 0) / bookingRequests.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            ₦
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${bookingRequests.reduce((sum, r) => sum + r.totalAmount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              If all accepted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter Requests</CardTitle>
          <CardDescription>
            Find the perfect caregiving opportunities for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by client, service, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Personal Care">Personal Care</SelectItem>
                <SelectItem value="Companionship">Companionship</SelectItem>
                <SelectItem value="Medication Management">Medication Management</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={request.client.avatar} alt={request.client.name} />
                    <AvatarFallback className="text-lg">
                      {request.client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {request.client.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{request.client.rating}</span>
                            <span className="text-sm text-gray-500">({request.client.reviewCount})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{request.service}</Badge>
                          {getUrgencyBadge(request.urgency)}
                          <span className="text-sm text-gray-500">{request.postedTime}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">${request.hourlyRate}/hr</div>
                        <div className="text-sm text-gray-500">${request.totalAmount} total</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{request.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{request.time} ({request.duration})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{request.location} ({request.distance})</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {request.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {request.requirements.map((req, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">Client Notes:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {request.clientNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  {getUrgencyIcon(request.urgency)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {request.urgency === 'urgent' ? 'Urgent response needed' : 
                     request.urgency === 'high' ? 'High priority request' : 
                     'Standard request'}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Accept Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No requests found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters to see more booking requests.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}