import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "PUT") {
    // add authentication
    // add authorization
    //check if the user exists

    const updateUser = await prisma.user.update({
      where: {
        id: query.id as string,
        deletedAt: null,
      },
      data: {
        isActive: true,
      },
    });

    if (!updateUser) {
      return getEnhancedRes(res, 404, "User not found");
    }

    return getEnhancedRes(res, 200, "User unblocked successfully", updateUser);
  }
}
