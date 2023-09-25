import PageId from "@/enums/PageId";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export interface UpdatePage {
  textEn: string;
  textAr: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "GET") {
    const Page = await prisma.page.findFirst({
      where: {
        id: query.id as PageId,
      },
    });

    if (!Page) {
      return getEnhancedRes(res, 404, "App Setting not found");
    }

    return getEnhancedRes(res, 200, "App Setting retrieved successfully", Page);
  }
}
