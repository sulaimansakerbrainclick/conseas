import RequestStatusId from "@/enums/RequestStatusId";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const requests = await prisma.request.findMany({
      where: {
        deletedAt: null,
        status: {
          id: {
            not: RequestStatusId.Draft,
          },
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "requests retrieved successfully", requests);
  }
}
