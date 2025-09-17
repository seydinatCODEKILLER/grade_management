import { apiUtils } from "@/utils/apiUtils";
import { apiClient, type ApiResponse } from "../client";
import type {
  ClassStats,
  GlobalStats,
  StudentStats,
  TeacherStats,
} from "../types/stats.type";

export const statsAPI = {
  getClassStats: async (): Promise<ClassStats> => {
    const response = await apiClient.get<ApiResponse<ClassStats>>(
      "/classes/stats"
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Erreur lors du recuperation des stats"
      );
    }
    return response.data.data;
  },

  getTeacherStats: async (): Promise<TeacherStats> => {
    const response = await apiClient.get<ApiResponse<TeacherStats>>(
      "/teachers/stats"
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Erreur lors du recuperation des stats"
      );
    }
    return response.data.data;
  },

  getStudentStats: async (): Promise<StudentStats> => {
    const response = await apiClient.get<ApiResponse<StudentStats>>(
      "/students/stats"
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Erreur lors du recuperation des stats"
      );
    }
    return response.data.data;
  },

  getGlobalStats: async (
    anneeScolaireId?: number,
    trimestreId?: number
  ): Promise<GlobalStats> => {
    const query = apiUtils.buildQueryParams({ anneeScolaireId, trimestreId });

    const response = await apiClient.get<ApiResponse<GlobalStats>>(
      `/statistic/global${query ? `?${query}` : ""}`
    );
    if (!response.data.success) {
      throw new Error(
        response.data.message || "Erreur lors du recuperation des stats"
      );
    }

    return response.data.data;
  },
};
