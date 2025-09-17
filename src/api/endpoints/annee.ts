import { apiClient, type ApiResponse } from "../client";
import type { AnneeScolaire } from "../types/annee.type";

export const anneesAPI = {
  getActiveAnnee: async (): Promise<AnneeScolaire> => {
    const response = await apiClient.get<ApiResponse<AnneeScolaire>>(
      "/annees/active"
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Erreur lors du recuperation de l'anne scolaire active"
      );
    }
    return response.data.data;
  },
};
