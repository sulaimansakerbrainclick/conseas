import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "DELETE") {
    // delete youself

    const deleteUser = await prisma.user.update({
      where: {
        id: query.id as string,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!deleteUser) {
      return getEnhancedRes(res, 404, "User not found");
    }

    return getEnhancedRes(res, 200, "User deleted successfully", deleteUser);
  }
}
