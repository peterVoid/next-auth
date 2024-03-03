"use server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateToken } from "@/lib/token";
import { sendVerif } from "@/lib/mail";
export const register = async (data: z.infer<typeof RegisterSchema>) => {
  const fieldsData = RegisterSchema.safeParse(data);
  if (!fieldsData.success) {
    return { error: "Invalid data" };
  }
  const { email, password, name } = fieldsData.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return { error: "Email already exists" };
  }
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = await generateToken(email);

  const b = await sendVerif(token.email, token.token);

  return { success: "Email sent to your email" };
};
