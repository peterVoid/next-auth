import { db } from "./db";

export const getTwoFactorToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
export const getTwoFactorEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
};
