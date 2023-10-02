import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/lib/jwt";
import validate from "@/utils/validate";
import phoneVerifySchema from "@/validation/phoneVerifySchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, body } = req;

  if (method === "POST") {
    const error = await validate(phoneVerifySchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const { authorization } = headers;
    const decoded = await decodeToken(authorization!);

    let user = await prisma.user.findFirst({
      where: {
        id: decoded!.id,
        deletedAt: null,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    if (user.isPhoneVerified) {
      return getEnhancedRes(res, 400, "Phone number already verified");
    }

    const phoneOtp = await prisma.phoneOtp.findFirst({
      where: {
        phone: user.phone,
        otp: body.otp,
      },
    });

    if (!phoneOtp) {
      return getEnhancedRes(res, 400, "There is no otp associated with this phone number");
    }

    user = await prisma.user.update({
      where: {
        id: decoded!.id,
      },
      data: {
        isPhoneVerified: true,
      },
    });

    await prisma.phoneOtp.delete({
      where: {
        phone: user.phone,
      },
    });

    return getEnhancedRes(res, 200, "Phone number verified successfully");
  }
}
