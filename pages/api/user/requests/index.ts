import RequestStatusId from "@/enums/RequestStatusId";
import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers } = req;

  const { authorization } = headers;

  const decoded = await decodeToken(authorization as string);

  if (method === "GET") {
    const requests = await prisma.request.findMany({
      where: {
        patientId: decoded!.id as string,
        deletedAt: null,
        requestStatus: {
          id: {
            not: RequestStatusId.Draft,
          },
        },
      },
      include: {
        requestStatus: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "requests retrieved successfully", requests);
  }
}
