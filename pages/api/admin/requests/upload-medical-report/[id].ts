import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method, query } = req;

  if (method === "PUT") {
    // add validation
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
        medicalReport: body.medicalReport,
      },
    });

    const notification = await prisma.notification.create({
      data: {
        message: "The medical report of your request has been uploaded successfully",
        user: { connect: { id: request.patientId } },
      },
    });

    return getEnhancedRes(res, 200, "Request medical report updated successfully", request);
  }
}
