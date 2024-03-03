import { db } from "@/lib/db";

export const getVerificationByEmail = async (email: string) => {
  try {
    const res = await db.verificationToken.findFirst({
      where: { email },
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const getVerificationByToken = async (token: any) => {
  try {
    const res = await db.verificationToken.findUnique({
      where: { token },
    });
    return res;
  } catch (error) {
    return null;
  }
};
