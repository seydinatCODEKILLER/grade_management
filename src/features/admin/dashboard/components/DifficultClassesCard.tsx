import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';

export interface DifficultClass {
  id: number;
  nom: string;
  moyenne_classe: number;
}

interface DifficultClassesCardProps {
  classes: DifficultClass[];
  isLoading?: boolean;
}

export const DifficultClassesCard = ({ classes, isLoading }: DifficultClassesCardProps) => {
  if (isLoading) {
    return (
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Classes en difficulté
          </CardTitle>
          <CardDescription>Classes avec une moyenne inférieure à 10/20</CardDescription>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-destructive/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Classes en difficulté
        </CardTitle>
        <CardDescription>Classes avec une moyenne inférieure à 10/20</CardDescription>
      </CardHeader>
      <CardContent>
        {classes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Aucune classe en difficulté
          </p>
        ) : (
          classes.map((classe) => (
            <div key={classe.id} className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">{classe.nom}</span>
              <span className="text-sm font-bold text-destructive">
                {classe.moyenne_classe.toFixed(2)}/20
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
