export interface ClassStats {
  total: number;
  active: number;
  inactive: number;
}

export interface TeacherStats {
  total: number;
  active: number;
  inactive: number;
}

export interface StudentStats {
  total: number;
  active: number;
  inactive: number;
}

export interface GlobalStats {
  moyenne_generale_globale: number;
  top5_eleves: Array<{
    nom: string;
    prenom: string;
    classe: string;
    moyenne: number;
  }>;
  classes_en_difficulte: Array<{
    id: number;
    classe: string;
    moyenne_classe: number;
  }>;
}
