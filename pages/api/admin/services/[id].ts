import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import deleteFile from "@/utils/deleteFile";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import serviceSchema from "@/validation/serviceSchema";
import { Service } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface EditService extends Service {
  imageBase64?: string;
}

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
    const body: EditService = req.body;

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

    if (body.price !== service.price && service.stripeProductId && service.stripePriceId) {
      let product = await stripe.products.retrieve(service.stripeProductId);

      const oldPrice = product.default_price;

      let newPrice = await stripe.prices.create({
        product: service.stripeProductId,
        currency: "USD",
        unit_amount: body.price * 100,
      });

      product = await stripe.products.update(service.stripeProductId, {
        name: body.nameEn,
        description: body.descriptionEn,
        default_price: newPrice.id,
      });

      await stripe.prices.update(oldPrice as string, {
        active: false,
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
        nameAr: body.nameEn,
        price: body.price,
        parentId: body.parentId,
        shortDescriptionEn: body.shortDescriptionEn,
        shortDescriptionAr: body.shortDescriptionAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        image: body.image,
        whiteImage: body.whiteImage,
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
