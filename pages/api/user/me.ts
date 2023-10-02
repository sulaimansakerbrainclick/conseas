import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers } = req;

  if (method === "GET") {
    const { authorization } = headers;
    if (!authorization) return getEnhancedRes(res, 401, "Access denied. No token provided");

    const decoded = await decodeToken(authorization as string);
    if (!decoded) return getEnhancedRes(res, 498, "Invalid token");

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id as string,
        deletedAt: null,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    const { password, ...userWithoutPass } = user;

    const result = {
      ...userWithoutPass,
    };

    return getEnhancedRes(res, 200, "User retrieved successfully", result);
  }
}
