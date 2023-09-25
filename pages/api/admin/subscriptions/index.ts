import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const emailSubscriptions = await prisma.emailSubscription.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(
      res,
      200,
      "Email Subscriptions retrieved successfully",
      emailSubscriptions
    );
  }
}
