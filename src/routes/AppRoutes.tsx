import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};
