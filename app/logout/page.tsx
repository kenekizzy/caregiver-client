"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LogoutPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout(false); // Don't show toast, we'll show success page instead
    // Small delay to show the loading state
    setTimeout(() => {
      router.push('/logout/success');
    }, 1000);
  };

  const handleCancel = () => {
    router.back();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Sign Out</CardTitle>
          <CardDescription>
            Are you sure you want to sign out of your account?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {user && (
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-muted-foreground">You are currently signed in as:</p>
              <p className="font-medium">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize mt-1">
                {user.role?.toLowerCase()} account
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Yes, Sign Out
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isLoggingOut}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              You can always sign back in anytime at{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                careconnect.com/login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}