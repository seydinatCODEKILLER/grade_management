import { useAuthStore } from "@/stores/auth.store";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: user?.role === 'admin',
    isProfessor: user?.role === 'professor',
  };
};