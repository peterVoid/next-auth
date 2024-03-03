"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationByToken } from "@/data/verif";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const checkTokenUser = await getVerificationByToken(token);

  if (!checkTokenUser) {
    return { error: "Something went wrong" };
  }

  const hasExpired = new Date() > new Date(checkTokenUser.expires);

  if (hasExpired) {
    return { error: "Token expired" };
  }

  const getUser = await getUserByEmail(checkTokenUser.email);

  if (!getUser) {
    return { error: "Something went wrong" };
  }

  await db.user.update({
    where: { id: getUser.id },
    data: {
      emailVerified: new Date(),
      email: checkTokenUser.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: checkTokenUser.id },
  });

  return { success: "Email verified" };
};
