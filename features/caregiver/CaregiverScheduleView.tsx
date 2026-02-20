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
  MapPin,
  Phone,
  MessageSquare,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2
} from "lucide-react"

// Mock calendar data
const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

const appointments = [
  {
    id: "1",
    client: "Margaret Smith",
    service: "Personal Care",
    date: "2024-01-20",
    startTime: "09:00",
    endTime: "13:00",
    location: "123 Oak Street, New York",
    status: "confirmed",
    avatar: "/avatars/margaret.jpg",
    phone: "+1 (555) 123-4567",
    notes: "Needs help with morning routine and medication",
    color: "blue"
  },
  {
    id: "2",
    client: "Robert Johnson",
    service: "Companionship",
    date: "2024-01-20",
    startTime: "14:00",
    endTime: "18:00",
    location: "456 Pine Avenue, New York",
    status: "confirmed",
    avatar: "/avatars/robert.jpg",
    phone: "+1 (555) 234-5678",
    notes: "Enjoys reading and light conversation",
    color: "green"
  },
  {
    id: "3",
    client: "Dorothy Williams",
    service: "Transportation",
    date: "2024-01-21",
    startTime: "10:00",
    endTime: "12:00",
    location: "789 Maple Drive, New York",
    status: "pending",
    avatar: "/avatars/dorothy.jpg",
    phone: "+1 (555) 345-6789",
    notes: "Doctor appointment pickup",
    color: "yellow"
  },
  {
    id: "4",
    client: "John Davis",
    service: "Personal Care",
    date: "2024-01-22",
    startTime: "08:00",
    endTime: "12:00",
    location: "321 Elm Street, New York",
    status: "confirmed",
    avatar: "/avatars/john.jpg",
    phone: "+1 (555) 456-7890",
    notes: "Morning care routine",
    color: "blue"
  },
  {
    id: "5",
    client: "Mary Wilson",
    service: "Companionship",
    date: "2024-01-23",
    startTime: "15:00",
    endTime: "19:00",
    location: "654 Cedar Lane, New York",
    status: "confirmed",
    avatar: "/avatars/mary.jpg",
    phone: "+1 (555) 567-8901",
    notes: "Social activities and conversation",
    color: "green"
  }
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export default function CaregiverScheduleView() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [currentMonthView, setCurrentMonthView] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return appointments.filter(apt => apt.date === dateString)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentMonthView)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentMonthView(newDate)
  }

  const selectedDateAppointments = getAppointmentsForDate(selectedDate)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Schedule
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your appointments and availability
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Block Time
            </Button>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "month" | "week" | "day")} className="mb-6">
        <TabsList>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="day">Day</TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {months[currentMonthView.getMonth()]} {currentMonthView.getFullYear()}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {weekDays.map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonthView).map((day, index) => {
                      if (!day) {
                        return <div key={index} className="p-2 h-24"></div>
                      }
                      
                      const dayAppointments = getAppointmentsForDate(day)
                      const isSelected = selectedDate.toDateString() === day.toDateString()
                      const isToday = new Date().toDateString() === day.toDateString()
                      
                      return (
                        <div
                          key={index}
                          className={`p-2 h-24 border rounded-lg cursor-pointer transition-colors ${
                            isSelected 
                              ? "bg-blue-100 dark:bg-blue-900 border-blue-500" 
                              : isToday
                              ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => setSelectedDate(day)}
                        >
                          <div className={`text-sm font-medium mb-1 ${
                            isSelected ? "text-blue-700 dark:text-blue-300" : "text-gray-900 dark:text-white"
                          }`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayAppointments.slice(0, 2).map((apt) => (
                              <div
                                key={apt.id}
                                className={`text-xs p-1 rounded text-white ${
                                  apt.color === "blue" ? "bg-blue-500" :
                                  apt.color === "green" ? "bg-green-500" :
                                  apt.color === "yellow" ? "bg-yellow-500" : "bg-gray-500"
                                }`}
                              >
                                {apt.startTime} {apt.client.split(' ')[0]}
                              </div>
                            ))}
                            {dayAppointments.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayAppointments.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Day Details */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardTitle>
                  <CardDescription>
                    {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedDateAppointments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No appointments scheduled</p>
                        <Button variant="outline" className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Appointment
                        </Button>
                      </div>
                    ) : (
                      selectedDateAppointments.map((appointment) => (
                        <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={appointment.avatar} alt={appointment.client} />
                                  <AvatarFallback className="text-sm">
                                    {appointment.client.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {appointment.client}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {appointment.service}
                                  </p>
                                </div>
                              </div>
                              {getStatusBadge(appointment.status)}
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {appointment.startTime} - {appointment.endTime}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {appointment.location}
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {appointment.notes}
                            </p>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Week View</CardTitle>
              <CardDescription>Weekly schedule overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Week view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Day View</CardTitle>
              <CardDescription>Detailed daily schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Day view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}