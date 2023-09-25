import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "DELETE") {
    const deletedLanguage = await prisma.language.delete({
      where: {
        key: query.key as string,
      },
    });

    if (!deletedLanguage) {
      return getEnhancedRes(res, 404, "Language not found");
    }

    return getEnhancedRes(res, 200, "Language deleted successfully", deletedLanguage);
  }
}
