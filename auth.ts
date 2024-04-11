import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

import { MemberController } from "./src/controllers/member";
import { Member } from "./src/types/members";

import authConfig from "@/auth.config";

interface IUser extends Omit<Member, "daysInCompany"> {}

declare module "next-auth" {
  interface Session {
    user: IUser & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT extends IUser {}
}

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        session.user.discordId = token.discordId;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.phoneNumber = token.phoneNumber;
        session.user.rib = token.rib;
        session.user.grade = token.grade;
        session.user.socialSecurityNumber = token.socialSecurityNumber;
        session.user.status = token.status;
      }

      return session;
    },

    async jwt({ token, profile }) {
      if (!token.sub) return token;
      if (!profile) return token;

      if (!profile.id) return token;
      token.discordId = profile.id;

      const memberController = new MemberController();
      const member = await memberController.getMemberByDiscordId(profile.id);
      if (!member) return token;

      token = { ...token, ...member };
      return token;
    },
  },
  ...authConfig,
});
