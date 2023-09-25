import { ServiceFormValues } from "@/components/forms/service-form/ServiceForm";
import prisma from "@/lib/prisma";
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

    const service = await prisma.service.create({
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

    return getEnhancedRes(res, 200, "Service added successfully", service);
  }
}
