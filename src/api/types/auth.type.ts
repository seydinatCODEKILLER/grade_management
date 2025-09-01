// src/api/types/auth.types.ts

export interface ApiUser {
  id: string;
  email: string;
  prenom: string;
  nom: string;
  adresse?: string;
  telephone?: string;
  role: 'admin' | 'professor';
  avatar?: string;
  statut: 'active' | 'inactive';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: ApiUser;
  token: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  user?: ApiUser;
}
