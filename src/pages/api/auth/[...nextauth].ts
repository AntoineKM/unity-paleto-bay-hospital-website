import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "../../../../env.mjs";

const scopes = ["identify", "email"];

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: scopes.join(" ") } },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, account, profile }) {
  //     if (account) {
  //       token.accessToken = account.access_token;
  //       token.id = (profile as DiscordProfile).id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     session.accessToken = token.accessToken;
  //     session.user = { ...session.user, discordId: token.id };
  //     return session;
  //   },
  // },
});
