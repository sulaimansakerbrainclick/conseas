import { ServiceFormValues } from "@/components/forms/service-form/ServiceForm";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import deleteFile from "@/utils/deleteFile";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import serviceSchema from "@/validation/serviceSchema";
import { Service } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "GET") {
    const service = await prisma.service.findFirst({
      where: {
        id: query.id as string,
        deletedAt: null,
      },
    });

    if (!service) {
      return getEnhancedRes(res, 404, "Service not found");
    }

    return getEnhancedRes(res, 200, "Service retrieved successfully", service);
  }

  if (method === "PUT") {
    debugger;

    const body: ServiceFormValues = req.body;

    const error = await validate(serviceSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let service = await prisma.service.findFirst({
      where: {
        id: query.id as string,
        deletedAt: null,
      },
    });

    if (!service) {
      return getEnhancedRes(res, 400, "Invalid service");
    }

    if (body.parentId === service.id) {
      return getEnhancedRes(res, 400, "Parent should not be the same");
    }

    let product;
    let price;

    if (service.stripeProductId) {
      product = await stripe.products.retrieve(service.stripeProductId);

      const oldPrice = product.default_price;

      price = await stripe.prices.create({
        product: service.stripeProductId,
        currency: "USD",
        unit_amount: body.priceUSD * 100,
        currency_options: {
          aed: {
            unit_amount: body.priceAED * 100,
          },
        },
        expand: ["currency_options"],
      });

      product = await stripe.products.update(service.stripeProductId, {
        name: body.nameEn,
        default_price: price.id,
      });

      await stripe.prices.update(oldPrice as string, {
        active: false,
      });
    }

    if (!service.stripeProductId) {
      product = await stripe.products.create({
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

      price = await stripe.prices.retrieve(product.default_price as string, {
        expand: ["currency_options"],
      });
    }

    // delete old image
    if (body.image && service.image && body.image !== service.image) {
      deleteFile(service.image);
    }

    // delete old whiteImage
    if (body.whiteImage && service.whiteImage && body.whiteImage !== service.whiteImage) {
      deleteFile(service.whiteImage);
    }

    service = await prisma.service.update({
      where: {
        id: query.id as string,
        deletedAt: null,
      },
      data: {
        nameEn: body.nameEn,
        nameAr: body.nameAr,
        parentId: body.parentId,
        shortDescriptionEn: body.shortDescriptionEn,
        shortDescriptionAr: body.shortDescriptionAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        image: body.image,
        whiteImage: body.whiteImage,
        stripeProductId: product!.id,
        stripePriceId: price!.id,
        stripePriceResponse: JSON.stringify(price),
        stripeProductResponse: JSON.stringify(product),
      },
    });

    return getEnhancedRes(res, 200, "Service updated successfully", service);
  }

  if (method === "DELETE") {
    const deletedService = await prisma.service.update({
      where: {
        id: query.id as string,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!deletedService) {
      return getEnhancedRes(res, 404, "Service not found");
    }

    return getEnhancedRes(res, 200, "Service deleted successfully", deletedService);
  }
}
