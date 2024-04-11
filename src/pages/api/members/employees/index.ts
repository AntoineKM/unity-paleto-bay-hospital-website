import type { NextApiRequest, NextApiResponse } from "next";

import { Member } from "../../../../types/members";

import { MemberController } from "@/src/controllers/member";

export type ResponseMembersEmployeesData = {
  employees: Member[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMembersEmployeesData>,
) {
  const memberController = new MemberController();
  const employees = await memberController.getEmployees();

  res.status(200).json({
    employees,
  });
}
