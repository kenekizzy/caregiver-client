"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "@/features/dashboard/Dashboard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on user role to their appropriate dashboard
      if (user.role === 'ADMIN') {
        router.push('/admin');
        return;
      } else if (user.role === 'CAREGIVER') {
        router.push('/caregiver-dashboard');
        return;
      }
      // CLIENT users stay on this dashboard
    }
  }, [user, isLoading, router]);

  return (
    <ProtectedRoute requiredRole="CLIENT" redirectTo="/login">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}