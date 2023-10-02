import RoleId from "@/enums/RoleId";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const users = await prisma.user.findMany({
      where: {
        roleId: RoleId.User,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersWithoutPass = users.map(({ password, ...userWithoutPass }) => userWithoutPass);

    return getEnhancedRes(res, 200, "Users retrieved successfully", usersWithoutPass);
  }
}
