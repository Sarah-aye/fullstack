import { NextAuthConfig } from "next-auth";
// import { signIn } from "next-auth/react";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isLoggedIn) {
        if (isOnDashboard) {
          return true;
        } else {
          return false;
        }
      } else if (isOnDashboard) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
