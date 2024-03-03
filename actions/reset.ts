"use server";
import { ResetPassword } from "@/schemas";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { generatePasswordByToken } from "@/lib/token";
import { sendPasswordReset } from "@/lib/mail";
export const Reset = async (data: z.infer<typeof ResetPassword>) => {
  const validateFields = ResetPassword.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid Email" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(data.email);

  if (!existingUser) {
    return { error: "Email Not Found!" };
  }

  const token = await generatePasswordByToken(email);
  await sendPasswordReset(token.email, token.token);

  return { success: "Email has been sent" };
};
