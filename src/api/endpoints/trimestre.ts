import { apiClient, type ApiResponse } from "../client";
import type { Trimestre } from "../types/trimestre.type";

export const trimestresAPI = {
  getCurrentTrimestre: async (): Promise<Trimestre> => {
    const response = await apiClient.get<ApiResponse<Trimestre>>(
      "/trimestres/current"
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Erreur lors du recuperation du trimestre active"
      );
    }
    return response.data.data;
  },
};
