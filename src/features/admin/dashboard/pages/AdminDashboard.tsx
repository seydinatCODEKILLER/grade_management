import {
  useClassStats,
  useTeacherStats,
  useStudentStats,
  useGlobalStats,
} from "../hooks/useStats";
import { StatsCardsGrid } from "../components/StatsCardsGrid";
import { AnalyticsSection } from "../components/AnalyticsSection";

export const AdminDashboard = () => {
  const { data: studentStats, isLoading: studentLoading } = useStudentStats();
  const { data: teacherStats, isLoading: teacherLoading } = useTeacherStats();
  const { data: classStats, isLoading: classLoading } = useClassStats();
  const { globalStats, isLoading: globalLoading } = useGlobalStats();

  return (
    <div className="space-y-8">
      <StatsCardsGrid
        studentStats={studentStats}
        teacherStats={teacherStats}
        classStats={classStats}
        studentLoading={studentLoading}
        teacherLoading={teacherLoading}
        classLoading={classLoading}
      />

      <AnalyticsSection
        isLoading={globalLoading}
        globalStats={globalStats}
      />
    </div>
  );
};
