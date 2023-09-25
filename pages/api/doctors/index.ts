import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method } = req;

  if (method === "GET") {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Doctors retrieved successfully", doctors);
  }
}
