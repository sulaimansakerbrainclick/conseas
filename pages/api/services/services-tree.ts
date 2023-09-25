import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const services = await prisma.service.findMany({
      where: {
        parentId: null,
        deletedAt: null,
        isActive: true,
      },
      include: {
        children: {
          where: {
            deletedAt: null,
            isActive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Services Tree retrieved successfully", services);
  }
}
