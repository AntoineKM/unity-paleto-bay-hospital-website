import { membersDoc } from "../services/google";
import { MemberRowData } from "../types/members";
import { convertRowMemberToMember } from "../utils/members";

export class MemberController {
  public async getAll() {
    await membersDoc.loadInfo();
    const membersSheet = membersDoc.sheetsByTitle["Liste employés"];
    const rows = await membersSheet.getRows<MemberRowData>();
    const members = rows.map((row) =>
      convertRowMemberToMember(row.toObject() as MemberRowData),
    );

    return members;
  }

  public async getEmployees() {
    const members = await this.getAll();
    const employees = members.filter((member) => member.status === "Employé");
    return employees;
  }

  public async getMemberByDiscordId(discordId: string) {
    const members = await this.getAll();
    const member = members.find((member) => member.discordId === discordId);
    return member;
  }
}
