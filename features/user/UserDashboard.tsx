/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Heart,
  User,
  Bell,
  CreditCard,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"

// Mock user data
const userData = {
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  avatar: "/avatars/john.jpg",
  memberSince: "2023-06-15",
  totalBookings: 12,
  totalSpent: 2840,
  favoriteCaregiver: "Sarah Johnson"
}

// Mock bookings data
const bookings = [
  {
    id: "BK001",
    caregiver: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      rating: 4.9
    },
    service: "Personal Care",
    date: "2024-01-25",
    time: "9:00 AM - 1:00 PM",
    duration: "4 hours",
    status: "confirmed",
    amount: 100,
    location: "123 Main St, New York, NY",
    notes: "Help with morning routine and medication",
    bookingDate: "2024-01-20"
  },
  {
    id: "BK002",
    caregiver: {
      name: "Emily Rodriguez",
      avatar: "/avatars/emily.jpg",
      rating: 4.9
    },
    service: "Companionship",
    date: "2024-01-22",
    time: "2:00 PM - 6:00 PM",
    duration: "4 hours",
    status: "completed",
    amount: 112,
    location: "123 Main St, New York, NY",
    notes: "Social activities and conversation",
    bookingDate: "2024-01-18",
    review: {
      rating: 5,
      comment: "Emily was wonderful! Very caring and professional."
    }
  },
  {
    id: "BK003",
    caregiver: {
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
      rating: 4.8
    },
    service: "Transportation",
    date: "2024-01-28",
    time: "10:00 AM - 12:00 PM",
    duration: "2 hours",
    status: "pending",
    amount: 44,
    location: "Doctor's Office, Manhattan, NY",
    notes: "Transportation to medical appointment",
    bookingDate: "2024-01-21"
  },
  {
    id: "BK004",
    caregiver: {
      name: "Lisa Wang",
      avatar: "/avatars/lisa.jpg",
      rating: 4.7
    },
    service: "Personal Care",
    date: "2024-01-15",
    time: "8:00 AM - 12:00 PM",
    duration: "4 hours",
    status: "cancelled",
    amount: 96,
    location: "123 Main St, New York, NY",
    notes: "Morning care routine",
    bookingDate: "2024-01-10"
  }
]

// Mock favorite caregivers
const favoriteCaregiver = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 25,
    specialties: ["Personal Care", "Companionship"],
    totalBookings: 8
  },
  {
    id: "2",
    name: "Emily Rodriguez",
    avatar: "/avatars/emily.jpg",
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 28,
    specialties: ["Personal Care", "Medication Management"],
    totalBookings: 3
  }
]

export default function UserDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const upcomingBookings = bookings.filter(b => b.status === "confirmed" || b.status === "pending")
  const pastBookings = bookings.filter(b => b.status === "completed" || b.status === "cancelled")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {userData.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your bookings and find the perfect caregiver for your needs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Book Caregiver
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                Since {new Date(userData.memberSince).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
              ₦
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userData.totalSpent}</div>
              <p className="text-xs text-muted-foreground">
                Lifetime spending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingBookings.length}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled bookings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Caregiver</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{userData.favoriteCaregiver}</div>
              <p className="text-xs text-muted-foreground">
                Most booked
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Bookings
                  </CardTitle>
                  <CardDescription>
                    Your next scheduled appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingBookings.slice(0, 3).map((booking) => (
                      <Card key={booking.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={booking.caregiver.avatar} alt={booking.caregiver.name} />
                                <AvatarFallback>
                                  {booking.caregiver.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {booking.caregiver.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {booking.service}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{booking.date} at {booking.time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(booking.status)}
                              <div className="text-sm font-medium mt-1">${booking.amount}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {upcomingBookings.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No upcoming bookings</p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Book a Caregiver
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest bookings and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 4).map((booking) => (
                      <div key={booking.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.caregiver.avatar} alt={booking.caregiver.name} />
                          <AvatarFallback className="text-xs">
                            {booking.caregiver.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {booking.status === "completed" ? "Completed booking with" : 
                             booking.status === "confirmed" ? "Confirmed booking with" :
                             booking.status === "pending" ? "Pending booking with" :
                             "Cancelled booking with"} {booking.caregiver.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(booking.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    Book New Caregiver
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Heart className="h-6 w-6 mb-2" />
                    View Favorites
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageSquare className="h-6 w-6 mb-2" />
                    Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>
                  View and manage all your caregiver bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={booking.caregiver.avatar} alt={booking.caregiver.name} />
                              <AvatarFallback>
                                {booking.caregiver.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {booking.caregiver.name}
                                </h3>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{booking.caregiver.rating}</span>
                                </div>
                                {getStatusBadge(booking.status)}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {booking.service} • {booking.duration}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{booking.date} at {booking.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{booking.location}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {booking.notes}
                              </p>
                              {booking.review && (
                                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <div className="flex items-center gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < booking.review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-xs text-gray-500 ml-1">Your Review</span>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400">
                                    "{booking.review.comment}"
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                              ${booking.amount}
                            </div>
                            <div className="flex items-center gap-2">
                              {booking.status === "confirmed" && (
                                <>
                                  <Button variant="outline" size="sm">
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Message
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-1" />
                                    Modify
                                  </Button>
                                </>
                              )}
                              {booking.status === "completed" && !booking.review && (
                                <Button size="sm">
                                  <Star className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              )}
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Favorite Caregivers
                </CardTitle>
                <CardDescription>
                  Your preferred caregivers for quick booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteCaregiver.map((caregiver) => (
                    <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                            <AvatarFallback className="text-lg">
                              {caregiver.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {caregiver.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{caregiver.rating}</span>
                                <span className="text-sm text-gray-500">({caregiver.reviewCount})</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {caregiver.specialties.map((specialty, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-lg font-bold text-green-600">
                                  ${caregiver.hourlyRate}/hr
                                </div>
                                <div className="text-xs text-gray-500">
                                  {caregiver.totalBookings} bookings with you
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Book
                                </Button>
                                <Button variant="outline" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  Message
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment History
                </CardTitle>
                <CardDescription>
                  View your payment history and manage payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.filter(b => b.status === "completed").map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={booking.caregiver.avatar} alt={booking.caregiver.name} />
                          <AvatarFallback>
                            {booking.caregiver.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{booking.caregiver.name}</h4>
                          <p className="text-sm text-gray-600">{booking.service} • {booking.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${booking.amount}</div>
                        <div className="text-sm text-gray-500">Paid</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-2xl">
                      {userData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-bold">{userData.name}</h3>
                    <p className="text-gray-600">{userData.email}</p>
                    <p className="text-gray-600">{userData.phone}</p>
                    <p className="text-sm text-gray-500">
                      Member since {new Date(userData.memberSince).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Bookings:</span>
                        <span className="font-medium">{userData.totalBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Spent:</span>
                        <span className="font-medium">${userData.totalSpent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Favorite Caregiver:</span>
                        <span className="font-medium">{userData.favoriteCaregiver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Member Since:</span>
                        <span className="font-medium">{new Date(userData.memberSince).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Notification Preferences
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Payment Methods
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="h-4 w-4 mr-2" />
                        Addresses
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}