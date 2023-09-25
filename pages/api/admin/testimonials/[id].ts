import prisma from "@/lib/prisma";
import deleteFile from "@/utils/deleteFile";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import testimonialSchema from "@/validation/testimonialSchema";
import { Testimonial } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface UpdateTestimonial extends Omit<Testimonial, "dateOfBirth" | "graduationDate"> {
  imageBase64?: string;
  dateOfBirth: string;
  graduationDate: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method, query } = req;

  if (method === "GET") {
    const testimonial = await prisma.testimonial.findFirst({
      where: {
        id: query.id as string,
      },
    });

    if (!testimonial) {
      return getEnhancedRes(res, 404, "Testimonial not found");
    }

    return getEnhancedRes(res, 200, "Testimonial retrieved successfully", testimonial);
  }

  if (method === "PUT") {
    const body: UpdateTestimonial = req.body;

    const error = await validate(testimonialSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let testimonial = await prisma.testimonial.findFirst({
      where: {
        id: query.id as string,
      },
    });

    if (!testimonial) {
      return getEnhancedRes(res, 400, "Invalid testimonial");
    }

    // delete old image
    if (body.image && testimonial.image && body.image !== testimonial.image) {
      deleteFile(testimonial.image);
    }

    testimonial = await prisma.testimonial.update({
      where: {
        id: query.id as string,
      },
      data: {
        nameAr: body.nameAr,
        textAr: body.textAr,
        nameEn: body.nameEn,
        textEn: body.textEn,
        image: body.image,
      },
    });

    return getEnhancedRes(res, 200, "Testimonial updated successfully", testimonial);
  }

  if (method === "DELETE") {
    const deleteTestimonial = await prisma.testimonial.delete({
      where: {
        id: query.id as string,
      },
    });

    if (!deleteTestimonial) {
      return getEnhancedRes(res, 404, "Testimonial not found");
    }

    return getEnhancedRes(res, 200, "Testimonial deleted successfully", deleteTestimonial);
  }
}
