import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerif = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/verify?token=${token}`;

  const a = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your email",
    html: `<p>Click <a href=${confirmLink}>here</a> </p>`,
  });
  return a;
};
export const sendPasswordReset = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  const a = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset",
    html: `<p>Click <a href=${confirmLink}>here</a> </p>`,
  });
  return a;
};
