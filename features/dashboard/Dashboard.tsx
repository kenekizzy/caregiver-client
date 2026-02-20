"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  MessageCircle, 
  Star, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  Heart,
  Bell,
  Plus,
  ArrowRight
} from "lucide-react"

// Mock data
const upcomingBookings = [
  {
    id: 1,
    caregiver: "Sarah Johnson",
    avatar: "/placeholder-avatar.jpg",
    service: "Elderly Care",
    date: "Today",
    time: "2:00 PM - 6:00 PM",
    status: "confirmed"
  },
  {
    id: 2,
    caregiver: "Michael Chen",
    avatar: "/placeholder-avatar.jpg",
    service: "Child Care",
    date: "Tomorrow",
    time: "8:00 AM - 12:00 PM",
    status: "pending"
  },
  {
    id: 3,
    caregiver: "Emily Rodriguez",
    avatar: "/placeholder-avatar.jpg",
    service: "Companion Care",
    date: "Friday",
    time: "10:00 AM - 2:00 PM",
    status: "confirmed"
  }
]

const recentMessages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    message: "I'll be arriving 10 minutes early today. See you soon!",
    time: "2 min ago",
    unread: true
  },
  {
    id: 2,
    sender: "Michael Chen",
    message: "Thank you for the booking. I'm looking forward to meeting your family.",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    sender: "Emily Rodriguez",
    message: "The session went great today. Your mother was wonderful to work with.",
    time: "Yesterday",
    unread: false
  }
]
const Dashboard = () => {
  const { user } = useAuth()
  
  return (
    <div className="px-12 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || 'User'}!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your care services today.
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Book New Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Spent</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            ₦
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$720</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Caregivers</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              In your favorites
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Bookings</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/bookings">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <CardDescription>
                Your scheduled care services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarImage src={booking.avatar} alt={booking.caregiver} />
                    <AvatarFallback>
                      {booking.caregiver.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{booking.caregiver}</p>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{booking.service}</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} • {booking.time}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Book Service</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Find Caregivers</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <MessageCircle className="h-6 w-6" />
                  <span className="text-sm">Messages</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Star className="h-6 w-6" />
                  <span className="text-sm">Leave Review</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/messages">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{message.sender}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                      {message.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.message}
                  </p>
                  {message.id < recentMessages.length && (
                    <div className="border-b"></div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Booking Confirmed</p>
                  <p className="text-xs text-muted-foreground">
                    Sarah Johnson confirmed your booking for today at 2:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Payment Due</p>
                  <p className="text-xs text-muted-foreground">
                    Payment for last week's services is due in 2 days
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Review Reminder</p>
                  <p className="text-xs text-muted-foreground">
                    Don't forget to review Emily Rodriguez's service
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Care Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Care Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Preparing for a New Caregiver</h4>
                  <p className="text-xs text-muted-foreground">
                    Create a care plan and share important information about your loved one&apos;s needs and preferences.
                  </p>
                </div>
                <Button variant="link" className="p-0 h-auto text-xs">
                  Read More Tips →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard