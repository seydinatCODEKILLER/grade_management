import type {
  LoginCredentials,
  LoginResponse,
  ApiUser as User,
  RefreshTokenResponse,
} from "@/api/types/auth.type";
import { apiClient, type ApiResponse } from "@/api/client";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      credentials
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors de la connexion");
    }

    return response.data.data;
  },

  logout: async (): Promise<void> => {
    const response = await apiClient.post<ApiResponse>("/auth/logout");

    if (!response.data.success) {
      throw new Error(response.data.message || "Erreur lors de la déconnexion");
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me");

    if (!response.data.success)
      throw new Error(
        response.data.message || "Erreur lors de la récupération du profil"
      );
    return response.data.data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
      "/auth/refreshToken",
      { refreshToken }
    );

    if (!response.data.success)
      throw new Error(
        response.data.message || "Erreur lors du rafraîchissement du token"
      );

    return response.data.data;
  },
};
