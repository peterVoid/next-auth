import NextAuth from "next-auth";
import { ExistingSession } from "@/next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { searchUser } from "./getData";

declare module "next-auth" {
  interface Session {
    user: ExistingSession;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }): Promise<any> {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
      return user;
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await searchUser(token.sub);

      if (!existingUser) return token;
      token.role = existingUser?.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
