// src/features/admin/components/StatsCards.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserCheck, UserX } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type StatsCardProps = {
  title: string;
  total: number;
  active: number;
  inactive: number;
  icon?: React.ReactNode;
};

export const StatsCard = ({ title, total, active, inactive, icon }: StatsCardProps) => {
  const activeRate = total > 0 ? (active / total) * 100 : 0;

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {icon && <div className="text-xl">{icon}</div>}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Total */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            {icon ?? null}
            <span className="text-sm font-medium">Total</span>
          </div>
          <span className="font-bold">{total}</span>
        </div>

        {/* Actifs */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium">Actifs</span>
          </div>
          <span className="font-semibold text-green-600 dark:text-green-400">{active}</span>
        </div>

        {/* Inactifs */}
        <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <UserX className="h-5 w-5 text-red-500" />
            <span className="text-sm font-medium">Inactifs</span>
          </div>
          <span className="font-semibold text-red-600 dark:text-red-400">{inactive}</span>
        </div>

        {/* Progress bar */}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Taux d’activité</p>
          <Progress value={activeRate} className="h-2" />
          <p className="text-right text-xs mt-1">{activeRate.toFixed(1)}%</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton pour le chargement
export const StatsCardSkeleton = () => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-5" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(4)].map((_, idx) => (
          <Skeleton key={idx} className="h-8 w-full rounded-lg" />
        ))}
      </CardContent>
    </Card>
  );
};
