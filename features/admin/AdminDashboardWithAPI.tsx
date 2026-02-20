"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { apiClient } from "@/lib/api"
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
    Shield,
    Loader2
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
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Caregiver {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    experience?: number;
    hourlyRate?: number;
    rating?: number;
    reviewCount?: number;
    status: 'pending' | 'approved' | 'rejected';
    joinDate: string;
    avatar?: string;
    services?: string[];
    certifications?: string[];
    bio?: string;
    availability?: string;
    backgroundCheck?: string;
    references?: number;
}

const stats = {
    totalCaregivers: 1247,
    pendingApprovals: 23,
    approvedThisMonth: 45,
    rejectedThisMonth: 8,
    averageRating: 4.7,
    activeBookings: 892
}

export default function AdminDashboardWithAPI() {
    const { user } = useAuth()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [caregivers, setCaregivers] = useState<Caregiver[]>([])
    const [pendingCaregivers, setPendingCaregivers] = useState<Caregiver[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        loadPendingCaregivers()
    }, [])

    const loadPendingCaregivers = async () => {
        setIsLoading(true)
        setError("")
        
        try {
            const response = await apiClient.getPendingCaregivers()
            
            if (response.error) {
                setError(response.error)
            } else if (response.data) {
                setPendingCaregivers(response.data)
                // For now, use pending caregivers as all caregivers
                setCaregivers(response.data)
            }
        } catch (err) {
            setError("Failed to load caregivers")
        } finally {
            setIsLoading(false)
        }
    }

    const handleApproveCaregiver = async (caregiverId: string) => {
        try {
            const response = await apiClient.approveCaregiver(caregiverId)
            
            if (response.error) {
                setError(response.error)
            } else {
                // Refresh the list
                await loadPendingCaregivers()
            }
        } catch (err) {
            setError("Failed to approve caregiver")
        }
    }

    const handleRejectCaregiver = async (caregiverId: string) => {
        try {
            const response = await apiClient.rejectCaregiver(caregiverId)
            
            if (response.error) {
                setError(response.error)
            } else {
                // Refresh the list
                await loadPendingCaregivers()
            }
        } catch (err) {
            setError("Failed to reject caregiver")
        }
    }

    const filteredCaregivers = caregivers.filter(caregiver => {
        const matchesSearch = caregiver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            caregiver.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            caregiver.location?.toLowerCase().includes(searchTerm.toLowerCase())

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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        )
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

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

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
                        <div className="text-2xl font-bold text-yellow-600">{pendingCaregivers.length}</div>
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
            <Tabs defaultValue="pending" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pending">Pending Approval ({pendingCaregivers.length})</TabsTrigger>
                    <TabsTrigger value="caregivers">All Caregivers</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-yellow-600" />
                                Pending Approvals ({pendingCaregivers.length})
                            </CardTitle>
                            <CardDescription>
                                Review and approve caregiver applications requiring attention
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {pendingCaregivers.length === 0 ? (
                                <div className="text-center py-8">
                                    <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400">No pending approvals</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {pendingCaregivers.map((caregiver) => (
                                        <Card key={caregiver.id} className="border-l-4 border-l-yellow-500">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                                                            <AvatarFallback>
                                                                {caregiver.name?.split(' ').map(n => n[0]).join('') || 'CG'}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                                {caregiver.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                                {caregiver.email}
                                                            </p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                                Applied on {new Date(caregiver.joinDate).toLocaleDateString()}
                                                            </p>
                                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                                <div>
                                                                    <span className="font-medium">Experience:</span> {caregiver.experience || 0} years
                                                                </div>
                                                                <div>
                                                                    <span className="font-medium">Rate:</span> ${caregiver.hourlyRate || 0}/hour
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <Button 
                                                            size="sm" 
                                                            className="bg-green-600 hover:bg-green-700"
                                                            onClick={() => handleApproveCaregiver(caregiver.id)}
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                        <Button 
                                                            size="sm" 
                                                            variant="destructive"
                                                            onClick={() => handleRejectCaregiver(caregiver.id)}
                                                        >
                                                            <XCircle className="h-4 w-4 mr-1" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="caregivers" className="space-y-6">
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

                            <div className="space-y-4">
                                {filteredCaregivers.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 dark:text-gray-400">No caregivers found</p>
                                    </div>
                                ) : (
                                    filteredCaregivers.map((caregiver) => (
                                        <Card key={caregiver.id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-4">
                                                        <Avatar className="h-12 w-12">
                                                            <AvatarImage src={caregiver.avatar} alt={caregiver.name} />
                                                            <AvatarFallback>
                                                                {caregiver.name?.split(' ').map(n => n[0]).join('') || 'CG'}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                                    {caregiver.name}
                                                                </h3>
                                                                {getStatusBadge(caregiver.status)}
                                                            </div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                                {caregiver.email}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                                {caregiver.location && (
                                                                    <div className="flex items-center gap-1">
                                                                        <MapPin className="h-3 w-3" />
                                                                        {caregiver.location}
                                                                    </div>
                                                                )}
                                                                {caregiver.experience && (
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="h-3 w-3" />
                                                                        {caregiver.experience} years exp.
                                                                    </div>
                                                                )}
                                                                {caregiver.hourlyRate && (
                                                                    <div className="flex items-center gap-1">
                                                                        {/* <DollarSign className="h-3 w-3" /> */}
                                                                        ₦
                                                                        ${caregiver.hourlyRate}/hr
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {caregiver.bio && (
                                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                                    {caregiver.bio}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
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
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analytics Dashboard</CardTitle>
                            <CardDescription>Platform statistics and insights</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">Analytics coming soon...</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}