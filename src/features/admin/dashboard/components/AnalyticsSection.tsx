import { TopStudentsCard } from "./TopStudentsCard";
import { DifficultClassesCard } from "./DifficultClassesCard";
import type { GlobalStats } from "@/api/types/stats.type";


interface AnalyticsSectionProps {
  globalStats?: GlobalStats;
  isLoading: boolean;
}

export const AnalyticsSection = ({ globalStats, isLoading }: AnalyticsSectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <TopStudentsCard
        students={
          globalStats?.top5_eleves.map((student, idx) => ({
            id: idx,
            nom: student.nom ?? "",
            prenom: student.prenom ?? "",
            classe: student.classe,
            moyenne: student.moyenne,
          })) ?? []
        }
        isLoading={isLoading}
      />

      <DifficultClassesCard
        classes={
          globalStats?.classes_en_difficulte.map((classe) => ({
            id: classe.id,
            nom: classe.classe,
            moyenne_classe: classe.moyenne_classe,
          })) ?? []
        }
        isLoading={isLoading}
      />
    </div>
  );
};