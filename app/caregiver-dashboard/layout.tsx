"use client"

import { ReactNode } from "react"
import CaregiverSidebar from "@/features/caregiver/CaregiverSidebar"
import CaregiverNavbar from "@/features/caregiver/CaregiverNavbar"

export default function CaregiverDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <CaregiverSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <CaregiverNavbar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}