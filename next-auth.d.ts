import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
export type ExistingSession = {
  id: string;
  role: UserRole;
} & DefaultSession;

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
