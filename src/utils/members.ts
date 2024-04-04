import { Member, MemberRowData } from "../types/members";

export const convertRowMemberToMember = (row: MemberRowData): Member => {
  return {
    discordId: row.Discord,
    discordAvatarUrl: "",
    firstName: row.Prénom.trim(),
    lastName: row.Nom.trim(),
    phoneNumber: row["Numéro de téléphone"],
    rib: row.RIB,
    grade: row.Grade,
    socialSecurityNumber: row["Numéro de Sécurité Social"],
    status: row.Statut,
    daysInCompany: row["Nombre de jours au sein de l'entreprise"],
  };
};
