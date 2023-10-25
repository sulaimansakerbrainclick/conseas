import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import requestIp from "request-ip";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "@/utils/sendEmail";
import { decodeToken } from "@/lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers } = req;

  if (method === "POST") {
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

    if (!user.email) {
      return getEnhancedRes(res, 400, "User doesn't have email");
    }

    if (user.isEmailVerified) {
      return getEnhancedRes(res, 400, "Email already verified");
    }

    const prevEmailToken = await prisma.emailToken.findFirst({
      where: {
        email: user.email,
      },
    });

    if (prevEmailToken) {
      const diffMinutes = dayjs().diff(prevEmailToken.createdAt, "minutes");

      const tokenExpireMinutes = Number(process.env.EMAIL_TOKEN_EXPIRE_TIME_IN_MINUTES);

      if (diffMinutes < tokenExpireMinutes) {
        return getEnhancedRes(res, 400, `Please try again after ${tokenExpireMinutes} minutes`);
      }

      await prisma.emailToken.delete({
        where: {
          email: user.email,
        },
      });
    }

    const clientIp = requestIp.getClientIp(req);

    const token = uuidv4();

    const emailToken = await prisma.emailToken.create({
      data: {
        ip: clientIp,
        email: user.email,
        token,
      },
    });

    await sendEmail({
      from: `<${process.env.EMAIL_SUPPORT_USERNAME}>`,
      to: user.email,
      subject: "Conseas account verify link",
      text: "Email verify link",
      html: `Email verify link: ${process.env.NEXT_PUBLIC_APP_URL}/user/email-verify/${emailToken.token}`,
      auth: {
        user: process.env.EMAIL_SUPPORT_USERNAME,
        pass: "sup#Con42",
      },
    });

    return getEnhancedRes(res, 200, "Verify email link sent successfully");
  }
}
