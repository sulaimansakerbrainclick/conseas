import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import chartSchema from "@/validation/chartSchema";
import { NextApiRequest, NextApiResponse } from "next";

export interface CreateChart {
  titleEn: string;
  titleAr: string;
  price: number;
  days: number;
  descriptionEn: string;
  descriptionAr: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const charts = await prisma.chart.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Charts retrieved successfully", charts);
  }
}
