"use client";

import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CaregiverDashboard from "@/features/caregiver/CaregiverDashboard";
import { Loader2 } from "lucide-react";

export default function CaregiverDashboardPage() {
  const { user, getCaregiverDashboardAccess } = useAuth();
  const router = useRouter();
  const [caregiverId, setCaregiverId] = useState<string | null>(null);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (user?.role === 'CAREGIVER') {
        const access = await getCaregiverDashboardAccess();
        if (access.hasAccess && access.caregiverId) {
          setCaregiverId(access.caregiverId);
        } else {
          setAccessError(access.error || 'No caregiver profile found');
          // Redirect to profile setup if no caregiver profile exists
          router.push('/caregiver/setup');
        }
      }
      setIsCheckingAccess(false);
    };

    if (user) {
      checkAccess();
    }
  }, [user, getCaregiverDashboardAccess, router]);

  if (isCheckingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Checking caregiver access...</p>
        </div>
      </div>
    );
  }

  if (accessError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Error</h2>
          <p className="text-gray-600 mb-4">{accessError}</p>
          <button
            onClick={() => router.push('/caregiver/setup')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Set Up Caregiver Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="CAREGIVER" redirectTo="/login">
      {caregiverId && <CaregiverDashboard caregiverId={caregiverId} />}
    </ProtectedRoute>
  );
}