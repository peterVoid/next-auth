import { db } from "@/lib/db";

export const getTwoFactorTokenConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
  } catch (error) {
    return null;
  }
};
