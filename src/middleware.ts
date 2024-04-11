import { NextRequest } from "next/server";
import NextAuth, { Session } from "next-auth";

import authConfig from "../auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isAuthRoute = ["/auth"].includes(nextUrl.pathname);

    if (isApiAuthRoute) return;

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return;
    }

    if (!isLoggedIn) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }
  },
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
