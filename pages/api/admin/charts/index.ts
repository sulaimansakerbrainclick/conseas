import Interval from "@/enums/Interval";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import chartSchema from "@/validation/chartSchema";
import { NextApiRequest, NextApiResponse } from "next";

export interface CreateChart {
  nameEn: string;
  nameAr: string;
  price: number;
  descriptionEn: string;
  descriptionAr: string;
  interval: Interval;
  intervalCount: number;
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

  if (method === "POST") {
    const body: CreateChart = req.body;

    const error = await validate(chartSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const chart = await prisma.chart.create({
      data: {
        nameEn: body.nameEn,
        nameAr: body.nameAr,
        price: body.price,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        interval: body.interval,
        intervalCount: body.intervalCount,
      },
    });

    return getEnhancedRes(res, 200, "Chart added successfully", chart);
  }
}
