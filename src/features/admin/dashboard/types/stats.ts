export interface BaseStats {
  total: number;
  active: number;
  inactive: number;
}

export interface TopStudent {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  moyenne: number;
}

export interface DifficultClass {
  id: number;
  nom: string;
  moyenne_classe: number;
}

export interface GlobalStats {
  top5_eleves: TopStudent[];
  classes_en_difficulte: DifficultClass[];
}