"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home, LogIn } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  const { user, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'ADMIN':
        return '/admin';
      case 'CAREGIVER':
        return '/caregiver-dashboard';
      case 'CLIENT':
        return '/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
          <CardDescription>
            You don&apos;t have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                You are logged in as: <strong>{user.email}</strong> ({user.role})
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href={getDashboardLink()}>
                    <Home className="mr-2 h-4 w-4" />
                    Go to My Dashboard
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={logout}
                  className="w-full"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Switch Account
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Please log in to access this page.
              </p>
              <Button asChild className="w-full">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log In
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}