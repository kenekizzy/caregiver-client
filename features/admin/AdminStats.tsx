import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Clock, 
  UserCheck, 
  Star, 
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: string
    type: 'up' | 'down' | 'neutral'
  }
  description?: string
}

function StatCard({ title, value, icon, trend, description }: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend?.type) {
      case 'up':
        return <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
      case 'down':
        return <TrendingDown className="inline h-3 w-3 mr-1 text-red-600" />
      default:
        return <Minus className="inline h-3 w-3 mr-1 text-gray-400" />
    }
  }

  const getTrendColor = () => {
    switch (trend?.type) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        {trend && (
          <p className={`text-xs ${getTrendColor()}`}>
            {getTrendIcon()}
            {trend.value}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

interface AdminStatsProps {
  stats: {
    totalCaregivers: number
    pendingApprovals: number
    approvedThisMonth: number
    rejectedThisMonth: number
    averageRating: number
    activeBookings: number
  }
}

export default function AdminStats({ stats }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Caregivers"
        value={stats.totalCaregivers}
        icon={<Users className="h-4 w-4" />}
        trend={{ value: "+12% from last month", type: "up" }}
      />
      
      <StatCard
        title="Pending Approvals"
        value={stats.pendingApprovals}
        icon={<Clock className="h-4 w-4" />}
        description="Requires immediate attention"
      />
      
      <StatCard
        title="Approved This Month"
        value={stats.approvedThisMonth}
        icon={<UserCheck className="h-4 w-4" />}
        trend={{ value: "+8 from last month", type: "up" }}
      />
      
      <StatCard
        title="Average Rating"
        value={stats.averageRating}
        icon={<Star className="h-4 w-4" />}
        description="Across all caregivers"
      />
    </div>
  )
}