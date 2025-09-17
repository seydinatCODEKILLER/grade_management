import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Medal } from 'lucide-react';

export interface TopStudent {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  moyenne: number;
}

interface TopStudentsCardProps {
  students: TopStudent[];
  isLoading?: boolean;
}

export const TopStudentsCard = ({ students, isLoading }: TopStudentsCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5" />
            Top 5 des élèves
          </CardTitle>
          <CardDescription>Les meilleurs élèves de l'établissement</CardDescription>
        </CardHeader>
        <CardContent>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="h-5 w-5" />
          Top 5 des élèves
        </CardTitle>
        <CardDescription>Les meilleurs élèves de l'établissement</CardDescription>
      </CardHeader>
      <CardContent>
        {students.map((student, index) => (
          <div key={student.id} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{student.nom} {student.prenom}</p>
                <p className="text-xs text-muted-foreground">{student.classe}</p>
              </div>
            </div>
            <div className="text-sm font-bold">{student.moyenne.toFixed(2)}/20</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
