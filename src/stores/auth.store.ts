import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ApiUser, LoginResponse } from "@/api/types/auth.type";
import { authApi } from "@/api/endpoints/auth";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { AuthState } from "@/features/auth/types/auth.types";

interface AuthStore extends AuthState {
  setUser: (data: LoginResponse) => void;
  updateTokens: (tokens: {
    token: string;
    refreshToken: string;
    user?: ApiUser;
  }) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: true,
      isAuthenticated: false,
      isRefreshing: false,

      setUser: (data: LoginResponse) => {
        set({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      updateTokens: ({ token, refreshToken, user }) => {
        set((state) => ({
          token,
          refreshToken,
          user: user || state.user,
        }));
      },

      logout: async (reason?: string) => {
  try {
    const { refreshToken } = get();
    if (refreshToken) {
      await authApi.logout(refreshToken);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
    if (!reason) {
      toast.info("Déconnexion réussie");
    } else {
      toast.error(reason);
    }
  }
},


      setLoading: (loading: boolean) => set({ isLoading: loading }),

      initializeAuth: async () => {
        const { token } = get();

        if (!token) {
          set({ isLoading: false });
          return;
        }

        try {
          const user = await authApi.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          const error = err as AxiosError<{ message?: string }>;
          console.error("Failed to initialize auth:", error);

          if (error.response?.status === 401) {
            get().logout();
          } else {
            toast.warning("Problème de connexion", {
              description: "Impossible de rafraîchir les données utilisateur",
            });
            set({ isLoading: false });
          }
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Auth rehydration error", error);
          toast.error("Erreur de restauration de session");
        }
        if (state?.token) {
          state.isAuthenticated = true;
          state.isLoading = false;
        }
      },
    }
  )
);