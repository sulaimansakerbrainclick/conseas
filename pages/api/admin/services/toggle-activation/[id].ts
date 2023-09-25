import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "POST") {
    let service = await prisma.service.findFirst({
      where: {
        id: query.id as string,
        deletedAt: null,
      },
    });

    if (!service) {
      return getEnhancedRes(res, 400, "Invalid service");
    }

    service = await prisma.service.update({
      where: {
        id: query.id as string,
      },
      data: {
        isActive: !service.isActive,
      },
    });

    return getEnhancedRes(res, 200, "Service updated successfully", service);
  }
}
