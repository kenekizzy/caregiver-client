"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Star,
  Download,
  Filter,
  RefreshCw,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin
} from "lucide-react"

// Mock data for reports
const reportStats = {
  totalRevenue: 125430,
  totalBookings: 1247,
  activeUsers: 892,
  averageRating: 4.7,
  completionRate: 94.2,
  responseTime: 2.3
}

const monthlyData = [
  { month: "Jan", bookings: 89, revenue: 8900, caregivers: 45 },
  { month: "Feb", bookings: 97, revenue: 9700, caregivers: 52 },
  { month: "Mar", bookings: 112, revenue: 11200, caregivers: 58 },
  { month: "Apr", bookings: 125, revenue: 12500, caregivers: 63 },
  { month: "May", bookings: 134, revenue: 13400, caregivers: 67 },
  { month: "Jun", bookings: 142, revenue: 14200, caregivers: 71 }
]

const topCaregivers = [
  { id: 1, name: "Emily Rodriguez", bookings: 45, rating: 4.9, revenue: 4500 },
  { id: 2, name: "Michael Chen", bookings: 38, rating: 4.8, revenue: 3800 },
  { id: 3, name: "Sarah Johnson", bookings: 35, rating: 4.7, revenue: 3500 },
  { id: 4, name: "David Thompson", bookings: 32, rating: 4.6, revenue: 3200 },
  { id: 5, name: "Lisa Wang", bookings: 29, rating: 4.5, revenue: 2900 }
]

const recentBookings = [
  {
    id: "BK001",
    client: "John Smith",
    caregiver: "Emily Rodriguez",
    service: "Personal Care",
    date: "2024-01-20",
    duration: "4 hours",
    status: "completed",
    amount: 120
  },
  {
    id: "BK002",
    client: "Mary Johnson",
    caregiver: "Michael Chen",
    service: "Companionship",
    date: "2024-01-20",
    duration: "6 hours",
    status: "in-progress",
    amount: 180
  },
  {
    id: "BK003",
    client: "Robert Davis",
    caregiver: "Sarah Johnson",
    service: "Medication Management",
    date: "2024-01-19",
    duration: "2 hours",
    status: "completed",
    amount: 80
  }
]

export default function AdminReportsView() {
  const [dateRange, setDateRange] = useState("30d")
  const [reportType, setReportType] = useState("overview")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive insights into platform performance and metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            ₦
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${reportStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +0.2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1 text-red-500" />
              -1.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.responseTime}h</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1 text-green-500" />
              -0.5h from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Bookings and revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-sm font-medium">{data.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span>{data.bookings} bookings</span>
                            <span className="text-gray-500">•</span>
                            <span>${data.revenue.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(data.bookings / 150) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Caregivers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Caregivers</CardTitle>
                <CardDescription>Based on bookings and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCaregivers.map((caregiver, index) => (
                    <div key={caregiver.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-sm font-medium">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{caregiver.name}</div>
                          <div className="text-sm text-gray-500">
                            {caregiver.bookings} bookings • ⭐ {caregiver.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${caregiver.revenue}</div>
                        <div className="text-sm text-gray-500">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-medium">{booking.id}</div>
                        <div className="text-sm text-gray-500">{booking.date}</div>
                      </div>
                      <div>
                        <div className="font-medium">{booking.client}</div>
                        <div className="text-sm text-gray-500">with {booking.caregiver}</div>
                      </div>
                      <div>
                        <div className="text-sm">{booking.service}</div>
                        <div className="text-sm text-gray-500">{booking.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-medium">${booking.amount}</div>
                        {getStatusBadge(booking.status)}
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Personal Care</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium">$81,530</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Companionship</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm font-medium">$56,440</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Transportation</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm font-medium">$31,360</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Medication Management</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm font-medium">$25,100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Preferred payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Credit Card</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bank Transfer</span>
                    <span className="font-semibold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Digital Wallet</span>
                    <span className="font-semibold">8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash</span>
                    <span className="font-semibold">2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Quality Metrics</CardTitle>
                <CardDescription>Performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>On-time Arrival Rate</span>
                    <span className="font-semibold text-green-600">96.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Completion Rate</span>
                    <span className="font-semibold text-green-600">94.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Satisfaction</span>
                    <span className="font-semibold text-green-600">4.7/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Repeat Booking Rate</span>
                    <span className="font-semibold text-blue-600">78.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cancellation Rate</span>
                    <span className="font-semibold text-yellow-600">5.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
                <CardDescription>Average response metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Booking Confirmation</span>
                    <span className="font-semibold">2.3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Support</span>
                    <span className="font-semibold">15 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Caregiver Assignment</span>
                    <span className="font-semibold">4.1 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issue Resolution</span>
                    <span className="font-semibold">1.2 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>User base breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Age 18-35</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Age 36-50</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Age 51-65</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Age 65+</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Users by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>New York</span>
                    </div>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>California</span>
                    </div>
                    <span className="font-semibold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>Texas</span>
                    </div>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>Florida</span>
                    </div>
                    <span className="font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>Other States</span>
                    </div>
                    <span className="font-semibold">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}