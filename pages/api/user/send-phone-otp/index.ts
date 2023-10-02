import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";

import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { decodeToken } from "@/lib/jwt";
import requestIp from "request-ip";
import generateOtp from "@/utils/generateOtp";
import RoleId from "@/enums/RoleId";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers } = req;

  if (method === "POST") {
    const { authorization } = headers;

    const decoded = await decodeToken(authorization!);

    let user = await prisma.user.findFirst({
      where: {
        id: decoded!.id,
        roleId: RoleId.User,
        deletedAt: null,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    if (user.isPhoneVerified) {
      return getEnhancedRes(res, 400, "Phone number already verified");
    }

    const prevPhoneOtp = await prisma.phoneOtp.findFirst({
      where: {
        phone: user.phone,
      },
    });

    if (prevPhoneOtp) {
      const diffMinutes = dayjs().diff(prevPhoneOtp.createdAt, "minutes");

      const otpExpireMinutes = Number(process.env.PHONE_OTP_EXPIRE_TIME_IN_MINUTES);

      if (diffMinutes < otpExpireMinutes) {
        return getEnhancedRes(res, 400, `Please try again after ${otpExpireMinutes} minutes`);
      }

      await prisma.phoneOtp.delete({
        where: {
          phone: user.phone,
        },
      });
    }

    const clientIp = requestIp.getClientIp(req);

    const otp = generateOtp();

    //send message

    await prisma.phoneOtp.create({
      data: {
        ip: clientIp,
        phone: user.phone,
        otp: "000000",
      },
    });

    return getEnhancedRes(res, 200, "Otp sent successfully");
  }
}
