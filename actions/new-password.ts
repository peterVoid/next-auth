"use server";
import bcrypt from "bcryptjs";
import { getPasswordResetByToken } from "@/data/password-reset-token";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  const fields = NewPasswordSchema.safeParse(data);
  if (!fields.success) {
    return { error: "Error" };
  }
  const { password } = fields.data;

  const existingToken = await getPasswordResetByToken(token);

  if (!existingToken) {
    return { error: "Token not valid" };
  }

  const tokenHasExpired = new Date() > new Date(existingToken.expiress);
  if (tokenHasExpired) {
    return { error: "Token has expired" };
  }

  const newPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { email: existingToken.email },
    data: {
      password: newPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Password updated!" };
};
