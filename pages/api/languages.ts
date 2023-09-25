import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const languages = await prisma.language.findMany();

    return getEnhancedRes(res, 200, "Languages retrieved successfully", languages);
  }
}
