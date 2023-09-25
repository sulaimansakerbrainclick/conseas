import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers } = req;

  if (method === "GET") {
    const { authorization } = headers;

    const decoded = await decodeToken(authorization!);

    const notifications = await prisma.notification.findMany({
      where: {
        userId: decoded!.id as string,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Notifications retrieved successfully", notifications);
  }
}
