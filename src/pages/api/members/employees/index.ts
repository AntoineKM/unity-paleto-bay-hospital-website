import type { NextApiRequest, NextApiResponse } from "next";

import { membersDoc } from "../../../../services/google";
import { Member, MemberRowData } from "../../../../types/members";
import { convertRowMemberToMember } from "../../../../utils/members";

export type ResponseMembersEmployeesData = {
  employees: Member[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMembersEmployeesData>,
) {
  await membersDoc.loadInfo();
  const membersSheet = membersDoc.sheetsByTitle["Liste employés"];
  const rows = await membersSheet.getRows<MemberRowData>();
  const employees = rows
    .filter((row) => row.get("Statut") === "Employé")
    .map((row) => convertRowMemberToMember(row.toObject() as MemberRowData));

  res.status(200).json({
    employees,
  });
}
