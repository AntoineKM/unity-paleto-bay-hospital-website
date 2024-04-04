import type { NextApiRequest, NextApiResponse } from "next";

import { membersDoc } from "../../../services/google";
import { MemberRowData } from "../../../types/members";

export type ResponseCountsData = {
  players: number;
  members: number;
  workingMembers: number;
};

export type CfxData = {
  Data: {
    clients: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseCountsData>,
) {
  const cfxDataRes = await fetch(
    "https://servers-frontend.fivem.net/api/servers/single/q8538p",
  );
  const cfxData: CfxData = await cfxDataRes.json();

  await membersDoc.loadInfo();
  const membersSheet = membersDoc.sheetsByTitle["Liste employés"];
  const rows = await membersSheet.getRows<MemberRowData>();
  const employees = rows.filter((row) => row.get("Statut") === "Employé");

  res.status(200).json({
    players: cfxData.Data.clients,
    members: employees.length,
    workingMembers: 0,
  });
}
