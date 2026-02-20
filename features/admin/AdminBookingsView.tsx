"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Phone,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock bookings data
const mockBookings = [
  {
    id: "BK001",
    clientName: "Margaret Smith",
    clientAvatar: "/avatars/margaret.jpg",
    caregiverName: "Sarah Johnson",
    caregiverAvatar: "/avatars/sarah.jpg",
    service: "Personal Care",
    date: "2024-01-25",
    time: "09:00 - 17:00",
    duration: 8,
    hourlyRate: 25,
    totalAmount: 200,
    status: "confirmed",
    location: "New York, NY",
    notes: "Regular daily care appointment",
    createdAt: "2024-01-20"
  },
  {
    id: "BK002",
    clientName: "Robert Johnson",
    clientAvatar: "/avatars/robert.jpg",
    caregiverName: "Michael Chen",
    caregiverAvatar: "/avatars/michael.jpg",
    service: "Transportation",
    date: "2024-01-24",
    time: "14:00 - 16:00",
    duration: 2,
    hourlyRate: 22,
    totalAmount: 44,
    status: "in_progress",
    location: "Los Angeles, CA",
    notes: "Medical appointment transportation",
    createdAt: "2024-01-22"
  },
  {
    id: "BK003",
    clientName: "Eleanor Davis",
    clientAvatar: "/avatars/eleanor.jpg",
    caregiverName: "Emily Rodriguez",
    caregiverAvatar: "/avatars/emily.jpg",
    service: "Companionship",
    date: "2024-01-23",
    time: "10:00 - 14:00",
    duration: 4,
    hourlyRate: 28,
    totalAmount: 112,
    status: "completed",
    location: "Chicago, IL",
    notes: "Weekly companionship visit",
    createdAt: "2024-01-18"
  },
  {
    id: "BK004",
    clientName: "William Brown",
    clientAvatar: "/avatars/william.jpg",
    caregiverName: "David Thompson",
    caregiverAvatar: "/avatars/david.jpg",
    service: "Personal Care",
    date: "2024-01-26",
    time: "08:00 - 12:00",
    duration: 4,
    hourlyRate: 20,
    totalAmount: 80,
    status: "pending",
    location: "Houston, TX",
    notes: "Morning care routine",
    createdAt: "2024-01-23"
  },
  {
    id: "BK005",
    clientName: "Dorothy Wilson",
    clientAvatar: "/avatars/dorothy.jpg",
    caregiverName: "Sarah Johnson",
    caregiverAvatar: "/avatars/sarah.jpg",
    service: "Medication Management",
    date: "2024-01-22",
    time: "18:00 - 20:00",
    duration: 2,
    hourlyRate: 25,
    totalAmount: 50,
    status: "cancelled",
    location: "New York, NY",
    notes: "Evening medication assistance",
    createdAt: "2024-01-19"
  }
]

const stats = {
  totalBookings: 1456,
  activeBookings: 234,
  completedToday: 45,
  totalRevenue: 125000,
  averageBookingValue: 86
}

export default function AdminBookingsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Confirmed</Badge>
      case "in_progress":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">In Progress</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.caregiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesTab = selectedTab === "all" || booking.status === selectedTab
    
    return matchesSearch && matchesStatus && matchesTab
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bookings Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor and manage all platform bookings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.activeBookings}</div>
            <p className="text-xs text-gray-500">Currently in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Completed Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
            <p className="text-xs text-gray-500">+8 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg. Booking Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageBookingValue}</div>
            <p className="text-xs text-gray-500">Per booking</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search & Filter Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by booking ID, client, or caregiver..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="in_progress">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4 mt-6">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.clientAvatar} alt={booking.clientName} />
                        <AvatarFallback>
                          {booking.clientName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                        Client
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Booking #{booking.id}
                        </h3>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <p className="text-sm">
                            <strong>Client:</strong> {booking.clientName}
                          </p>
                          <p className="text-sm">
                            <strong>Caregiver:</strong> {booking.caregiverName}
                          </p>
                          <p className="text-sm">
                            <strong>Service:</strong> {booking.service}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {booking.time} ({booking.duration}h)
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3" />
                            {booking.location}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            {/* <DollarSign className="h-4 w-4 text-green-600" /> */}
                            ₦
                            <span className="font-semibold text-green-600">
                              ${booking.totalAmount}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            ${booking.hourlyRate}/hour
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={booking.caregiverAvatar} alt={booking.caregiverName} />
                            <AvatarFallback className="text-xs">
                              {booking.caregiverName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {booking.caregiverName}
                          </span>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {booking.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === "in_progress" && (
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Report Issue
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}