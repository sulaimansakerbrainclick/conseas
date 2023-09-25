import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method, query } = req;

  if (method === "PUT") {
    const requestStatus = await prisma.requestStatus.findFirst({
      where: {
        id: body.requestStatusId,
      },
    });

    if (!requestStatus) {
      return getEnhancedRes(res, 400, "No Request Status found");
    }

    let request = await prisma.request.findFirst({
      where: {
        id: query.id as string,
        deletedAt: null,
      },
    });

    if (!request) {
      return getEnhancedRes(res, 400, "Invalid request");
    }

    request = await prisma.request.update({
      where: {
        id: query.id as string,
      },
      data: {
        requestStatus: {
          connect: { id: body.requestStatusId as string },
        },
      },
    });

    const notification = await prisma.notification.create({
      data: {
        message: "The status of your request has been updated successfully",
        user: { connect: { id: request.patientId } },
      },
    });

    return getEnhancedRes(res, 200, "Request status updated successfully", request);
  }
}
