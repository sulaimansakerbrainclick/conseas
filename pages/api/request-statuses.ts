import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const requestStatuses = await prisma.requestStatus.findMany();

    return getEnhancedRes(res, 200, "Appointment Types retrieved successfully", requestStatuses);
  }
}
