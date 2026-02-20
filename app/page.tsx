"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import Homepage from "@/features/home/Homepage";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  console.log("User:", user);

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect authenticated users to their appropriate dashboard
      switch (user.role) {
        case 'ADMIN':
          router.push('/admin');
          break;
        case 'CAREGIVER':
          router.push('/caregiver-dashboard');
          break;
        case 'CLIENT':
          router.push('/dashboard');
          break;
        default:
          // Stay on home page for unknown roles
          break;
      }
    }
  }, [user, isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show original homepage with header and footer for non-authenticated users
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Homepage />
      </main>
      <Footer />
    </div>
  );
}