import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import emailSubscriptionSchema from "@/validation/emailSubscriptionSchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, body } = req;

  if (method === "POST") {
    const error = await validate(emailSubscriptionSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let emailSubscription = await prisma.emailSubscription.findFirst({
      where: {
        email: body.email,
      },
    });

    if (emailSubscription) {
      return getEnhancedRes(res, 400, "The email is already subscribed");
    }

    emailSubscription = await prisma.emailSubscription.create({
      data: {
        email: body.email,
      },
    });

    return getEnhancedRes(res, 200, "Subscribed successfully", emailSubscription);
  }
}
