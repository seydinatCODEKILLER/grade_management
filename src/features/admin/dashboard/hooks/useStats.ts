import { useQueries, useQuery, type UseQueryResult } from '@tanstack/react-query';
import { statsAPI } from '@/api/endpoints/stats';
import { anneesAPI } from '@/api/endpoints/annee';
import { trimestresAPI } from '@/api/endpoints/trimestre';
import type { AnneeScolaire } from '@/api/types/annee.type';
import type { Trimestre } from '@/api/types/trimestre.type';

export const useClassStats = () => {
  return useQuery({
    queryKey: ['classes', 'stats'],
    queryFn: () => statsAPI.getClassStats(),
  });
};

export const useTeacherStats = () => {
  return useQuery({
    queryKey: ['teachers', 'stats'],
    queryFn: () => statsAPI.getTeacherStats(),
  });
};

export const useStudentStats = () => {
  return useQuery({
    queryKey: ['students', 'stats'],
    queryFn: () => statsAPI.getStudentStats(),
  });
};

export const useGlobalStats = () => {
  const [
  { data: activeAnnee, isLoading: isLoadingAnnee },
  { data: currentTrimestre, isLoading: isLoadingTrimestre },
] = useQueries({
  queries: [
    {
      queryKey: ["anneeActive"],
      queryFn: anneesAPI.getActiveAnnee,
    },
    {
      queryKey: ["trimestreActif"],
      queryFn: trimestresAPI.getCurrentTrimestre,
    },
  ],
}) as [UseQueryResult<AnneeScolaire>, UseQueryResult<Trimestre>];


  const areDependenciesReady = Boolean(activeAnnee && currentTrimestre);

  const { data: globalStats, isLoading: isLoadingStats, error } = useQuery({
    queryKey: ["statistic", "global", activeAnnee?.id, currentTrimestre?.id],
    queryFn: () => statsAPI.getGlobalStats(activeAnnee!.id, currentTrimestre!.id),
    enabled: areDependenciesReady,
  });

  return {
    globalStats,
    isLoading: isLoadingAnnee || isLoadingTrimestre || isLoadingStats,
    error,
    areDependenciesReady,
  };
};