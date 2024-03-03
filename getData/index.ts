import { db } from "@/lib/db";

export const searchUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
