import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminDashboard } from "@/features/admin/dashboard/pages/AdminDashboard";
import { pathToDashboardForUser, type UserRole } from "@/utils/rolePathUtils";

export const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();
  const dashboardPath = user ? pathToDashboardForUser(user.role as UserRole) : "/";

  return (
    <PageWrapper>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={dashboardPath} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginForm />
            ) : (
              <Navigate to={dashboardPath} replace />
            )
          }
        />
        {/* Routes protégées */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};
