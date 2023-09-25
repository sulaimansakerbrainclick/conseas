import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import appSettingsSchema from "@/validation/appSettingsSchema";
import { NextApiRequest, NextApiResponse } from "next";

export interface UpdateSettings {
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubTitleEn: string;
  heroSubTitleAr: string;
  shortDescritionEn: string;
  shortDescritionAr: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
  addressEn: string;
  addressAr: string;
  callUs: string;
  email: string;
  whatsapp: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "PUT") {
    const body: UpdateSettings = req.body;

    const error = await validate(appSettingsSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    await Promise.all(
      Object.entries(body).map(
        async ([key, value]) =>
          await prisma.setting.update({
            where: {
              id: key,
            },
            data: {
              value,
            },
          })
      )
    );

    return getEnhancedRes(res, 200, "App settings updated successfully");
  }
}
