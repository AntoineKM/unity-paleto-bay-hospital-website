import type { NextApiRequest, NextApiResponse } from "next";

import { MemberController } from "@/src/controllers/member";
import { Member } from "@/src/types/members";

export type ResponseMembersData = {
  employees: Member[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMembersData>,
) {
  const memberController = new MemberController();
  const employees = await memberController.getAll();

  res.status(200).json({
    employees,
  });
}
