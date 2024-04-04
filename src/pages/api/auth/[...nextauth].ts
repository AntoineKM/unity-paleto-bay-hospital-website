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
});
