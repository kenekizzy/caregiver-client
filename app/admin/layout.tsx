"use client"

import { ReactNode } from "react"
import { useAuth } from "@/lib/auth-context"
import AdminSidebar from "@/features/admin/AdminSidebar"
import AdminNavbar from "@/features/admin/AdminNavbar"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}