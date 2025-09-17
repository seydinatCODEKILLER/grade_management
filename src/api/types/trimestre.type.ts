export interface Trimestre {
  id: number;
  libelle: string;
  statut: "actif" | "inactif";
  anneeScolaireId: number;
}