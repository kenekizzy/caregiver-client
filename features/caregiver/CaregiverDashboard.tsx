"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { useToast } from "@/lib/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  Clock,
  TrendingUp,
  Bell,
  MessageCircle,
  Plus
} from "lucide-react";

interface CaregiverDashboardProps {
  caregiverId: string;
}

interface DashboardData {
  profile: {
    id: string;
    bio: string;
    experience: number;
    hourlyRate: number;
    rating: number;
    reviewCount: number;
    isVerified: boolean;
  };
  stats: {
    totalBookings: number;
    completedBookings: number;
    upcomingBookings: number;
    totalEarnings: number;
    monthlyEarnings: number;
    averageRating: number;
    profileCompletion: number;
    responseRate: number;
  };
  recentBookings: Array<{
    id: string;
    clientName: string;
    date: string;
    status: string;
    amount: number;
  }>;
}

export default function CaregiverDashboard({ caregiverId }: CaregiverDashboardProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { error: showError } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.getCaregiverDashboard(caregiverId);
        if (response.error) {
          setError(response.error);
          showError('Failed to load dashboard', response.error);
        } else {
          setDashboardData(response.data);
        }
      } catch (err) {
        const errorMessage = 'Failed to load dashboard data';
        setError(errorMessage);
        showError('Dashboard Error', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [caregiverId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { profile, stats, recentBookings } = dashboardData;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Caregiver Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your care service overview.
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Update Availability
          </Button>
        </div>
      </div>

      {/* Profile Completion Alert */}
      {stats.profileCompletion < 100 && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-yellow-800">Complete Your Profile</h3>
                <p className="text-yellow-700 text-sm">
                  Your profile is {stats.profileCompletion}% complete. Complete it to get more bookings!
                </p>
              </div>
              <Button variant="outline" size="sm">
                Complete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingBookings} upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            ₦
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyEarnings}</div>
            <p className="text-xs text-muted-foreground">
              ${stats.totalEarnings} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              {profile.reviewCount} reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.responseRate}%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Bookings</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <CardDescription>
                Your latest care service bookings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{booking.clientName}</p>
                        <Badge variant={
                          booking.status === 'COMPLETED' ? 'default' : 
                          booking.status === 'CONFIRMED' ? 'secondary' : 
                          'outline'
                        }>
                          {booking.status.toLowerCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${booking.amount}</p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No bookings yet. Complete your profile to start receiving bookings!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your caregiver services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Schedule</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Clients</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  {/* <DollarSign className="h-6 w-6" /> */}
                  ₦
                  <span className="text-sm">Earnings</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Star className="h-6 w-6" />
                  <span className="text-sm">Reviews</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Hourly Rate</span>
                <span className="font-medium">${profile.hourlyRate}/hr</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Experience</span>
                <span className="font-medium">{profile.experience} years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Verification</span>
                <Badge variant={profile.isVerified ? "default" : "secondary"}>
                  {profile.isVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Completion</span>
                <span className="font-medium">{stats.profileCompletion}%</span>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rate</span>
                <span className="font-medium">
                  {stats.totalBookings > 0 ? Math.round((stats.completedBookings / stats.totalBookings) * 100) : 0}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Rate</span>
                <span className="font-medium">{stats.responseRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{stats.averageRating.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips for Success</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Complete Your Profile</h4>
                  <p className="text-xs text-muted-foreground">
                    Clients are more likely to book caregivers with complete profiles and photos.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Respond Quickly</h4>
                  <p className="text-xs text-muted-foreground">
                    Fast response times improve your ranking in search results.
                  </p>
                </div>
                <Button variant="link" className="p-0 h-auto text-xs">
                  View All Tips →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}