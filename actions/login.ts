"use server";
import { z } from "zod";
import { formSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateToken } from "@/lib/token";
import { sendVerif } from "@/lib/mail";
export const login = async (data: z.infer<typeof formSchema>) => {
  const validateFields = formSchema.safeParse(data);
  if (!validateFields.success) {
    return { error: "Invalid data" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser?.password || !existingUser.email) {
    return { error: "Daftar dulu tai" };
  }

  if (!existingUser.emailVerified) {
    const dep = await generateToken(existingUser.email);

    const b = await sendVerif(dep.email, dep.token);
    return { success: "Sent token to your email" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email or password is incorrect" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
