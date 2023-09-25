import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, body } = req;

  if (method === "POST") {
    // add validation
    const language = await prisma.language.create({
      data: {
        key: body.key as string,
      },
    });

    return getEnhancedRes(res, 200, "Language added successfully", language);
  }
}
