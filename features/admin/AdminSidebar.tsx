"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  FileText,
  BarChart3,
  Shield,
  UserCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
  Heart,
  LogOut
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: "Caregivers",
    href: "/admin/caregivers",
    icon: Users,
    badge: null
  },
  {
    title: "Pending Approvals",
    href: "/admin/approvals",
    icon: UserCheck,
    badge: 23
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
    badge: null
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
    badge: 5
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
    badge: null
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    badge: 12
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    badge: null
  }
]

export default function AdminSidebar() {
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">CareHomes</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group",
                isActive 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}>
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                )} />
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "default" : "secondary"} 
                        className="ml-auto text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="text-xs text-gray-500 dark:text-gray-400 px-3">
              Admin Tools
            </div>
            <Link href="/admin/audit-logs">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm">Audit Logs</span>
              </div>
            </Link>
            <Link href="/admin/security">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm">Security</span>
              </div>
            </Link>
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20",
              isCollapsed ? "px-2" : "px-3"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-3">Sign Out</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}