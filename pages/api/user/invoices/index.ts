import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers } = req;

  if (method === "GET") {
    const { authorization } = headers;

    const decoded = await decodeToken(authorization!);
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

    if (!user.stripeCustomerId) {
      return getEnhancedRes(res, 200, "Invoices retrieved successfully", []);
    }

    const invoices = await prisma.invoice.findMany({
      where: {
        userId: decoded!.id as string,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Invoices retrieved successfully", invoices);
  }
}
