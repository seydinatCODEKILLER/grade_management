import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { AdminDashboard } from "@/features/admin/dashboard/pages/AdminDashboard";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <PageWrapper>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" replace />
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
              <Navigate to="/admin/dashboard" replace />
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
