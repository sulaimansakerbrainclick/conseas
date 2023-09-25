import PageId from "@/enums/PageId";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import translatedTextSchema from "@/validation/translatedTextSchema";
import { NextApiRequest, NextApiResponse } from "next";

export interface UpdatePage {
  textEn: string;
  textAr: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "PUT") {
    const body: UpdatePage = req.body;

    const error = await validate(translatedTextSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let page = await prisma.page.findFirst({
      where: {
        id: query.id as PageId,
      },
    });

    if (!page) {
      return getEnhancedRes(res, 400, "Invalid app setting");
    }

    page = await prisma.page.update({
      where: {
        id: query.id as PageId,
      },
      data: {
        textEn: body.textEn,
        textAr: body.textAr,
      },
    });

    return getEnhancedRes(res, 200, "Page updated successfully", page);
  }
}
