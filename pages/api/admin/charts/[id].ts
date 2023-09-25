import Interval from "@/enums/Interval";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export interface UpdateChart {
  nameEn: string;
  nameAr: string;
  price: number;
  interval: Interval;
  intervalCount: number;
  descriptionEn: string;
  descriptionAr: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method, query } = req;

  if (method === "GET") {
    const chart = await prisma.chart.findFirst({
      where: {
        id: query.id as string,
        deletedAt: null,
      },
    });

    if (!chart) {
      return getEnhancedRes(res, 404, "Chart not found");
    }

    return getEnhancedRes(res, 200, "Chart retrieved successfully", chart);
  }

  // if (method === "PUT") {
  //   const body: UpdateChart = req.body;

  //   const error = await validate(chartSchema, body);

  //   if (error) {
  //     return getEnhancedRes(res, 400, error);
  //   }

  //   let chart = await prisma.chart.findFirst({
  //     where: {
  //       id: query.id as string,
  //     },
  //   });

  //   if (!chart) {
  //     return getEnhancedRes(res, 404, "Chart not found");
  //   }

  //   let product = await stripe.products.retrieve(chart.stripeProductId);

  //   const oldPrice = product.default_price;

  //   let newPrice = await stripe.prices.create({
  //     product: chart.stripeProductId,
  //     recurring: {
  //       interval: body.interval,
  //       interval_count: body.intervalCount,
  //     },
  //     currency: "USD",
  //     unit_amount: body.price * 100,
  //   });

  //   product = await stripe.products.update(chart.stripeProductId, {
  //     name: body.nameEn,
  //     description: body.descriptionEn,
  //     default_price: newPrice.id,
  //   });

  //   await stripe.prices.update(oldPrice as string, {
  //     active: false,
  //   });

  //   chart = await prisma.chart.update({
  //     where: {
  //       id: query.id as string,
  //       deletedAt: null,
  //     },
  //     data: {
  //       nameEn: body.nameEn,
  //       nameAr: body.nameAr,
  //       price: body.price,
  //       stripePriceId: newPrice.id,
  //       interval: body.interval,
  //       intervalCount: body.intervalCount,
  //       descriptionEn: body.descriptionEn,
  //       descriptionAr: body.descriptionAr,
  //     },
  //   });

  //   return getEnhancedRes(res, 200, "Chart updated successfully", chart);
  // }

  if (method === "DELETE") {
    const chart = await prisma.chart.findFirst({
      where: {
        id: query.id as string,
      },
    });

    if (!chart) {
      return getEnhancedRes(res, 404, "Chart not found");
    }

    if (chart.stripeProductId) {
      await stripe.products.update(chart.stripeProductId, {
        active: false,
      });
    }

    const deleteChart = await prisma.chart.update({
      where: {
        id: query.id as string,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return getEnhancedRes(res, 200, "Chart deleted successfully", deleteChart);
  }
}
