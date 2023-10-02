import { ServiceFormValues } from "@/components/forms/service-form/ServiceForm";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import serviceSchema from "@/validation/serviceSchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  const body: ServiceFormValues = req.body;

  if (method === "GET") {
    const services = await prisma.service.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        parent: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Services retrieved successfully", services);
  }

  if (method === "POST") {
    const error = await validate(serviceSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const product = await stripe.products.create({
      name: body.nameEn,
      default_price_data: {
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

    const service = await prisma.service.create({
      data: {
        nameEn: body.nameEn,
        nameAr: body.nameEn,
        parentId: body.parentId,
        shortDescriptionEn: body.shortDescriptionEn,
        shortDescriptionAr: body.shortDescriptionAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        image: body.image,
        whiteImage: body.whiteImage,
        stripeProductId: product.id,
        stripePriceId: price.id,
        stripePriceResponse: JSON.stringify(price),
        stripeProductResponse: JSON.stringify(product),
      },
    });

    return getEnhancedRes(res, 200, "Service added successfully", service);
  }
}
