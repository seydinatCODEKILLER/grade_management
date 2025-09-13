import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { authApi } from '@/api/endpoints/auth';
import { toast } from 'sonner';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshSubscribers: ((token: string) => void)[] = [];
let isRefreshing = false;

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
}

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { status, data } = error.response || {};

    if (status === 401 && originalRequest.url.includes('/auth/login')) {
      return Promise.reject(error);
    }

    if (status === 401 && originalRequest.url === '/auth/refreshToken') {
       useAuthStore.getState().logout("Session expirée");
      if (!window.location.pathname.includes('/login')) {
         window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { refreshToken } = useAuthStore.getState();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await authApi.refreshToken(refreshToken);
        
        useAuthStore.getState().updateTokens({
          token: response.token,
          refreshToken: response.refreshToken,
          user: response.user
        });

        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        onRefreshed(response.token);
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {
      const errorMessage = data?.message || 'Vous n\'avez pas les permissions nécessaires';
      toast.error('Accès refusé', {
        description: errorMessage
      });
    }

    if (status === 422 && data?.errors) {
      const errorMessages = Object.values(data.errors).flat().join(', ');
      toast.error('Erreur de validation', {
        description: errorMessages
      });
    }

    if (status >= 500) {
      const errorMessage = data?.message || 'Une erreur est survenue côté serveur';
      toast.error('Erreur serveur', {
        description: errorMessage
      });
    }

    return Promise.reject(error);
  }
);

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}