import AdminDashboardWithAPI from "@/features/admin/AdminDashboardWithAPI";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminDashboardWithAPI />
    </ProtectedRoute>
  );
}