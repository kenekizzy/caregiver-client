"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertTriangle,
  FileText,
  Shield,
  User,
  Calendar,
  MapPin,
  DollarSign
} from "lucide-react"

// Mock pending applications
const pendingApplications = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    experience: 5,
    hourlyRate: 25,
    appliedDate: "2024-01-15",
    avatar: "/avatars/sarah.jpg",
    services: ["Personal Care", "Companionship", "Medication Management"],
    certifications: ["CPR Certified", "First Aid", "CNA License"],
    backgroundCheck: "Completed",
    references: 3,
    priority: "high",
    completeness: 95
  },
  {
    id: "2",
    name: "David Thompson",
    email: "david.thompson@email.com",
    phone: "+1 (555) 456-7890",
    location: "Houston, TX",
    experience: 2,
    hourlyRate: 20,
    appliedDate: "2024-01-20",
    avatar: "/avatars/david.jpg",
    services: ["Personal Care", "Companionship"],
    certifications: ["CPR Certified"],
    backgroundCheck: "In Progress",
    references: 2,
    priority: "medium",
    completeness: 78
  },
  {
    id: "3",
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 789-0123",
    location: "Miami, FL",
    experience: 8,
    hourlyRate: 30,
    appliedDate: "2024-01-18",
    avatar: "/avatars/maria.jpg",
    services: ["Personal Care", "Medical Care", "Companionship"],
    certifications: ["RN License", "CPR Certified", "First Aid"],
    backgroundCheck: "Issues Found",
    references: 4,
    priority: "urgent",
    completeness: 92
  }
]

export default function AdminApprovalsView() {
  const [selectedTab, setSelectedTab] = useState("pending")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Medium</Badge>
      default:
        return <Badge variant="secondary">Low</Badge>
    }
  }

  const getBackgroundCheckStatus = (status: string) => {
    switch (status) {
      case "Completed":
        return <span className="flex items-center text-green-600"><CheckCircle className="h-4 w-4 mr-1" />Completed</span>
      case "Issues Found":
        return <span className="flex items-center text-red-600"><AlertTriangle className="h-4 w-4 mr-1" />Issues Found</span>
      case "In Progress":
        return <span className="flex items-center text-yellow-600"><Clock className="h-4 w-4 mr-1" />In Progress</span>
      default:
        return <span className="flex items-center text-gray-500"><Clock className="h-4 w-4 mr-1" />Pending</span>
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Caregiver Approvals
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and approve pending caregiver applications
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">23</div>
            <p className="text-xs text-gray-500">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Urgent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-gray-500">Needs immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Approved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-gray-500">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Average Review Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3</div>
            <p className="text-xs text-gray-500">days</p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="recent">Recently Processed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6 mt-6">
          <div className="space-y-4">
            {pendingApplications.map((application) => (
              <Card key={application.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={application.avatar} alt={application.name} />
                        <AvatarFallback className="text-lg">
                          {application.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {application.name}
                          </h3>
                          {getPriorityBadge(application.priority)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>Email:</strong> {application.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>Phone:</strong> {application.phone}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="h-3 w-3" />
                              {application.location}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="h-3 w-3" />
                              Applied: {new Date(application.appliedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <User className="h-3 w-3" />
                              {application.experience} years experience
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              {/* <DollarSign className="h-3 w-3" /> */}
                              ₦
                              ${application.hourlyRate}/hour
                            </div>
                          </div>
                        </div>
                        
                        {/* Application Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Background Check
                            </p>
                            {getBackgroundCheckStatus(application.backgroundCheck)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              References
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {application.references} provided
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Profile Completeness
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{width: `${application.completeness}%`}}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {application.completeness}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Services Offered
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {application.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Certifications */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Certifications
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {application.certifications.map((cert, index) => (
                              <Badge key={index} className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                <Shield className="h-3 w-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 ml-4">
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Documents
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-6 mt-6">
          <div className="space-y-4">
            {pendingApplications.filter(app => app.priority === "urgent").map((application) => (
              <Card key={application.id} className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                        Urgent Review Required
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-300">
                        Background check issues found for {application.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={application.avatar} alt={application.name} />
                        <AvatarFallback>
                          {application.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{application.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Review Details
                      </Button>
                      <Button variant="destructive" size="sm">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Processed Applications</CardTitle>
              <CardDescription>
                Applications that have been approved or rejected in the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recently processed applications to display</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}