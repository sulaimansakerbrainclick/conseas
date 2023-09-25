import prisma from "@/lib/prisma";
import settingsData from "@/seed-data/settingsData";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const appSettings = await prisma.setting.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    let values: any = {};

    Object.keys(settingsData).forEach((key) => {
      const index = appSettings.findIndex((setting) => setting.id === key);

      if (index >= 0) {
        values[key] = appSettings[index].value;
      } else {
        values[key] = "";
      }
    });

    return getEnhancedRes(res, 200, "App settings retrieved successfully", values);
  }
}
