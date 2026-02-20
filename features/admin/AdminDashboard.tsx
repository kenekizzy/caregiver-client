/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Users,
    UserCheck,
    Clock,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    CheckCircle,
    XCircle,
    Star,
    MapPin,
    Calendar,
    DollarSign,
    TrendingUp,
    AlertTriangle,
    Shield
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
import CaregiverDetailModal from "./CaregiverDetailModal"

// Mock data for demonstration
const mockCaregivers = [
    {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        experience: 5,
        hourlyRate: 25,
        rating: 4.8,
        reviewCount: 127,
        status: "pending",
        joinDate: "2024-01-15",
        avatar: "/avatars/sarah.jpg",
        services: ["Personal Care", "Companionship", "Medication Management"],
        certifications: ["CPR Certified", "First Aid", "CNA License"],
        bio: "Experienced caregiver with 5 years of experience in elderly care. Passionate about providing compassionate and professional care.",
        availability: "Full-time",
        backgroundCheck: "Completed",
        references: 3
    },
    {
        id: "2",
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 234-5678",
        location: "Los Angeles, CA",
        experience: 3,
        hourlyRate: 22,
        rating: 4.6,
        reviewCount: 89,
        status: "approved",
        joinDate: "2024-01-10",
        avatar: "/avatars/michael.jpg",
        services: ["Personal Care", "Transportation", "Light Housekeeping"],
        certifications: ["CPR Certified", "Defensive Driving"],
        bio: "Dedicated caregiver specializing in mobility assistance and transportation services.",
        availability: "Part-time",
        backgroundCheck: "Completed",
        references: 2
    },
    {
        id: "3",
        name: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        phone: "+1 (555) 345-6789",
        location: "Chicago, IL",
        experience: 7,
        hourlyRate: 28,
        rating: 4.9,
        reviewCount: 203,
        status: "approved",
        joinDate: "2024-01-08",
        avatar: "/avatars/emily.jpg",
        services: ["Personal Care", "Companionship", "Meal Preparation", "Medication Management"],
        certifications: ["CPR Certified", "First Aid", "RN License", "Dementia Care"],
        bio: "Registered nurse with extensive experience in home healthcare and dementia care.",
        availability: "Full-time",
        backgroundCheck: "Completed",
        references: 4
    },
    {
        id: "4",
        name: "David Thompson",
        email: "david.thompson@email.com",
        phone: "+1 (555) 456-7890",
        location: "Houston, TX",
        experience: 2,
        hourlyRate: 20,
        rating: 0,
        reviewCount: 0,
        status: "pending",
        joinDate: "2024-01-20",
        avatar: "/avatars/david.jpg",
        services: ["Personal Care", "Companionship"],
        certifications: ["CPR Certified"],
        bio: "New to professional caregiving but passionate about helping others. Recently completed caregiver training program.",
        availability: "Full-time",
        backgroundCheck: "In Progress",
        references: 2
    },
    {
        id: "5",
        name: "Lisa Wang",
        email: "lisa.wang@email.com",
        phone: "+1 (555) 567-8901",
        location: "Seattle, WA",
        experience: 4,
        hourlyRate: 24,
        rating: 4.7,
        reviewCount: 156,
        status: "rejected",
        joinDate: "2024-01-12",
        avatar: "/avatars/lisa.jpg",
        services: ["Personal Care", "Light Housekeeping"],
        certifications: ["CPR Certified", "First Aid"],
        bio: "Experienced caregiver with a focus on maintaining client independence and dignity.",
        availability: "Part-time",
        backgroundCheck: "Issues Found",
        references: 1
    }
]

const stats = {
    totalCaregivers: 1247,
    pendingApprovals: 23,
    approvedThisMonth: 45,
    rejectedThisMonth: 8,
    averageRating: 4.7,
    activeBookings: 892
}

export default function AdminDashboard() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedCaregiver, setSelectedCaregiver] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const filteredCaregivers = mockCaregivers.filter(caregiver => {
        const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            caregiver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            caregiver.location.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || caregiver.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Approved</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
            case "rejected":
                return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Rejected</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Dashboard Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Monitor platform activity and manage caregiver applications
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Caregivers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCaregivers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.pendingApprovals}</div>
                        <p className="text-xs text-muted-foreground">
                            Requires immediate attention
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.approvedThisMonth}</div>
                        <p className="text-xs text-muted-foreground">
                            +8 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.averageRating}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all caregivers
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="caregivers" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="caregivers">All Caregivers</TabsTrigger>
                    <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="caregivers" className="space-y-6">
                    {/* Search and Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Caregiver Management</CardTitle>
                            <CardDescription>
                                Search, filter, and manage caregiver applications
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search caregivers..."
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
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Caregivers List */}
                            <div className="space-y-4">
                                {filteredCaregivers.map((caregiver) => (
                                    <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                                                        <AvatarFallback>
                                                            {caregiver.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                                {caregiver.name}
                                                            </h3>
                                                            {getStatusBadge(caregiver.status)}
                                                            {caregiver.backgroundCheck === "Issues Found" && (
                                                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                            {caregiver.email} • {caregiver.phone}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="h-3 w-3" />
                                                                {caregiver.location}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {caregiver.experience} years exp.
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                {/* <DollarSign className="h-3 w-3" /> */}
                                                                ₦
                                                                ${caregiver.hourlyRate}/hr
                                                            </div>
                                                            {caregiver.rating > 0 && (
                                                                <div className="flex items-center gap-1">
                                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                                    {caregiver.rating} ({caregiver.reviewCount})
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 mb-3">
                                                            {caregiver.services.slice(0, 3).map((service, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs">
                                                                    {service}
                                                                </Badge>
                                                            ))}
                                                            {caregiver.services.length > 3 && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    +{caregiver.services.length - 3} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                            {caregiver.bio}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {caregiver.status === "pending" && (
                                                        <>
                                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                                Approve
                                                            </Button>
                                                            <Button size="sm" variant="destructive">
                                                                <XCircle className="h-4 w-4 mr-1" />
                                                                Reject
                                                            </Button>
                                                        </>
                                                    )}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => {
                                                                setSelectedCaregiver(caregiver)
                                                                setIsModalOpen(true)
                                                            }}>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Shield className="h-4 w-4 mr-2" />
                                                                Background Check
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-red-600">
                                                                Suspend Account
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pending" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-yellow-600" />
                                Pending Approvals ({mockCaregivers.filter(c => c.status === 'pending').length})
                            </CardTitle>
                            <CardDescription>
                                Review and approve caregiver applications requiring attention
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockCaregivers.filter(c => c.status === 'pending').map((caregiver) => (
                                    <Card key={caregiver.id} className="border-l-4 border-l-yellow-500">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start space-x-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                                                        <AvatarFallback>
                                                            {caregiver.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                            {caregiver.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                            Applied on {new Date(caregiver.joinDate).toLocaleDateString()}
                                                        </p>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="font-medium">Experience:</span> {caregiver.experience} years
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Rate:</span> ${caregiver.hourlyRate}/hour
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Background Check:</span> {caregiver.backgroundCheck}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">References:</span> {caregiver.references}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Approve
                                                    </Button>
                                                    <Button size="sm" variant="destructive">
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Reject
                                                    </Button>
                                                    <Button size="sm" variant="outline" onClick={() => {
                                                        setSelectedCaregiver(caregiver)
                                                        setIsModalOpen(true)
                                                    }}>
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Review
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Approval Statistics</CardTitle>
                                <CardDescription>Monthly approval trends</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span>Approved</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">75%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Pending</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">15%</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Rejected</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div className="bg-red-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                                            </div>
                                            <span className="text-sm font-medium">10%</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quality Metrics</CardTitle>
                                <CardDescription>Platform quality indicators</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Average Rating</span>
                                        <span className="font-semibold">{stats.averageRating}/5.0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Background Check Pass Rate</span>
                                        <span className="font-semibold">94%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Active Bookings</span>
                                        <span className="font-semibold">{stats.activeBookings}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Client Satisfaction</span>
                                        <span className="font-semibold">96%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Caregiver Detail Modal */}
            <CaregiverDetailModal
                caregiver={selectedCaregiver}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedCaregiver(null)
                }}
            />
        </div>
    )
}