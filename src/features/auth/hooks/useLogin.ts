import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";
import type { LoginCredentials, LoginResponse } from "@/api/types/auth.type";
import { authApi } from "@/api/endpoints/auth";
import { apiUtils } from "@/utils/apiUtils";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<LoginResponse, unknown, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),

    onSuccess: (data) => {
      setUser(data);
      toast.success("Connexion réussie", {
        description: `Bienvenue ${data.user.prenom} !`,
      });
    },

    onError: (error: unknown) => {
      const errorMessage = apiUtils.handleApiError(error);
      toast.error("Erreur de connexion", {
        description: errorMessage,
      });
    },
  });
};
