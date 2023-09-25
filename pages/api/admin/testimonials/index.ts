import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import testimonialSchema from "@/validation/testimonialSchema";
import { Testimonial } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface AddTestimonial extends Omit<Testimonial, "dateOfBirth" | "graduationDate"> {
  imageBase64?: string;
  dateOfBirth: string;
  graduationDate: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Testimonials retrieved successfully", testimonials);
  }

  if (method === "POST") {
    const body: AddTestimonial = req.body;

    const error = await validate(testimonialSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        nameAr: body.nameAr,
        textAr: body.textAr,
        nameEn: body.nameEn,
        textEn: body.textEn,
        image: body.image,
      },
    });

    return getEnhancedRes(res, 200, "Testimonial added successfully", testimonial);
  }
}
