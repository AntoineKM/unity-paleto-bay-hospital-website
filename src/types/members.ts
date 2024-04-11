export type MemberRowData = {
  Grade: string;
  Nom: string;
  Prénom: string;
  RIB: string;
  Discord: string;
  "Numéro de Sécurité Social": string;
  "Numéro de téléphone": string;
  Statut: "Employé" | "Refus de candidature" | "Licencié" | "Démission";
  "Nombre de jours au sein de l'entreprise": number;
};

export type Member = {
  grade: string;
  lastName: string;
  firstName: string;
  rib: string;
  discordId: string;
  socialSecurityNumber: string;
  phoneNumber: string;
  status: "Employé" | "Refus de candidature" | "Licencié" | "Démission";
  daysInCompany: number;
};
