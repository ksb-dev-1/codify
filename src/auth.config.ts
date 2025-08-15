import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// lib
import { prisma } from "@/lib/prisma";

export default {
  trustHost: true,
  providers: [Google, GitHub],
  pages: {
    signIn: "sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID in the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { id: true, name: true, email: true, image: true },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.name = dbUser.name;
          session.user.email = dbUser.email || "";
          session.user.image = dbUser.image; // always fresh from DB
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
