import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "GET") {
    const service = await prisma.service.findFirst({
      where: {
        id: query.id as string,
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
    });

    if (!service) {
      return getEnhancedRes(res, 404, "Service not found");
    }

    return getEnhancedRes(res, 200, "Service retrieved successfully", service);
  }
}
