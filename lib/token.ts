import crypto from "crypto";
import { getVerificationByEmail } from "@/data/verif";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { getPasswordResetByEmail } from "@/data/password-reset-token";
import { getTwoFactorEmail } from "./two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiress = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getTwoFactorEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expiress,
    },
  });

  return twoFactorToken;
};

export const generatePasswordByToken = async (email: string) => {
  const token = uuidv4();
  const expiress = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  const perif = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiress,
    },
  });
  return perif;
};

export const generateToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingVeriv = await getVerificationByEmail(email);
  if (existingVeriv) {
    await db.verificationToken.delete({
      where: { id: existingVeriv.id },
    });
  }

  const perif = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return perif;
};
