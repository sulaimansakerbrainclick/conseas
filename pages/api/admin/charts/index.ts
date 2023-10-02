import { ChartFormValues } from "@/components/forms/chart-form/ChartForm";
import Interval from "@/enums/Interval";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import chartSchema from "@/validation/chartSchema";
import { NextApiRequest, NextApiResponse } from "next";

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
    const body: ChartFormValues = req.body;

    const error = await validate(chartSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const product = await stripe.products.create({
      name: body.nameEn,
      default_price_data: {
        recurring: {
          interval: body.interval as Interval,
          interval_count: body.intervalCount,
        },
        currency: "USD",
        unit_amount: body.priceUSD * 100,
        currency_options: {
          aed: {
            unit_amount: body.priceAED * 100,
          },
        },
      },
    });

    const price = await stripe.prices.retrieve(product.default_price as string, {
      expand: ["currency_options"],
    });

    const chart = await prisma.chart.create({
      data: {
        nameEn: body.nameEn,
        nameAr: body.nameAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        stripeProductId: product.id,
        stripeProductResponse: JSON.stringify(product),
        prices: {
          createMany: {
            data: [
              {
                isDefault: true,
                stripePriceId: price.id,
                stripePriceResponse: JSON.stringify(price),
              },
            ],
          },
        },
      },
      include: {
        prices: true,
      },
    });

    return getEnhancedRes(res, 200, "Chart added successfully", chart);
  }
}
