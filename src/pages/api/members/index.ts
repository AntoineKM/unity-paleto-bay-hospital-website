import type { NextApiRequest, NextApiResponse } from "next";

import { membersDoc } from "../../../services/google";
import { Member, MemberRowData } from "../../../types/members";
import { convertRowMemberToMember } from "../../../utils/members";

export type ResponseMembersData = {
  members: Member[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMembersData>,
) {
  await membersDoc.loadInfo();
  const membersSheet = membersDoc.sheetsByTitle["Liste employés"];
  const rows = await membersSheet.getRows<MemberRowData>();
  const members = rows.map((row) =>
    convertRowMemberToMember(row.toObject() as MemberRowData),
  );

  res.status(200).json({
    members,
  });
}
