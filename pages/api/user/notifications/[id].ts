import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query, headers } = req;

  if (method === "DELETE") {
    const { authorization } = headers;
    if (!authorization) return getEnhancedRes(res, 401, "Access denied. No token provided");

    const decoded = await decodeToken(authorization as string);
    if (!decoded) return getEnhancedRes(res, 400, "Invalid token");

    const isMine = await prisma.notification.findFirst({
      where: {
        id: query.id as string,
        userId: decoded.id as string as string,
      },
    });

    if (!isMine) {
      return getEnhancedRes(res, 401, "Access denied");
    }

    const deleteNotification = await prisma.notification.delete({
      where: {
        id: query.id as string,
      },
    });

    if (!deleteNotification) {
      return getEnhancedRes(res, 404, "Notification not found");
    }

    return getEnhancedRes(res, 200, "Notification deleted successfully", deleteNotification);
  }
}
