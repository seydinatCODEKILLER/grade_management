import { Users, GraduationCap, School } from "lucide-react";
import { StatsCard, StatsCardSkeleton } from "./StatsCards";
import type { BaseStats } from "../types/stats";

interface StatsCardsGridProps {
  studentStats?: BaseStats;
  teacherStats?: BaseStats;
  classStats?: BaseStats;
  studentLoading: boolean;
  teacherLoading: boolean;
  classLoading: boolean;
}

export const StatsCardsGrid = ({
  studentStats,
  teacherStats,
  classStats,
  studentLoading,
  teacherLoading,
  classLoading,
}: StatsCardsGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {studentLoading ? (
        <StatsCardSkeleton />
      ) : (
        <StatsCard
          title="Élèves"
          total={studentStats?.total ?? 0}
          active={studentStats?.active ?? 0}
          inactive={studentStats?.inactive ?? 0}
          icon={<Users className="h-5 w-5 text-blue-500" />}
        />
      )}

      {teacherLoading ? (
        <StatsCardSkeleton />
      ) : (
        <StatsCard
          title="Enseignants"
          total={teacherStats?.total ?? 0}
          active={teacherStats?.active ?? 0}
          inactive={teacherStats?.inactive ?? 0}
          icon={<GraduationCap className="h-5 w-5 text-purple-500" />}
        />
      )}

      {classLoading ? (
        <StatsCardSkeleton />
      ) : (
        <StatsCard
          title="Classes"
          total={classStats?.total ?? 0}
          active={classStats?.active ?? 0}
          inactive={classStats?.inactive ?? 0}
          icon={<School className="h-5 w-5 text-orange-500" />}
        />
      )}
    </div>
  );
};