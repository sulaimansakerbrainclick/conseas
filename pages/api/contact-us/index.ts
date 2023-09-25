import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import contactUsScheme from "@/validation/contactUsSchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method } = req;

  if (method === "POST") {
    const error = await validate(contactUsScheme, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const contactUs = await prisma.contactUs.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        subject: body.subject,
        message: body.message,
      },
    });

    return getEnhancedRes(res, 200, "Message sent successfully", contactUs);
  }
}
