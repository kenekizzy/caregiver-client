"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  redirectTo?: string;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ 
  children, 
  requiredRole,
  redirectTo,
  allowedRoles
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to appropriate login based on current path
        const currentPath = window.location.pathname;
        let loginPath = '/login';
        
        if (currentPath.startsWith('/admin')) {
          loginPath = '/admin/login';
        } else if (currentPath.startsWith('/caregiver')) {
          loginPath = '/login';
        }
        
        router.push(redirectTo || loginPath);
        return;
      }

      // Check role requirements
      if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(user?.role || '')) {
          // Redirect based on user role
          if (user?.role === 'ADMIN') {
            router.push('/admin');
          } else if (user?.role === 'CAREGIVER') {
            router.push('/caregiver-dashboard');
          } else if (user?.role === 'CLIENT') {
            router.push('/dashboard');
          } else {
            router.push('/unauthorized');
          }
          return;
        }
      }

      // Check allowed roles
      if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Check role requirements
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user?.role || '')) {
      return null;
    }
  }

  // Check allowed roles
  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    return null;
  }

  return <>{children}</>;
}