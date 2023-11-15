import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import sendEmail from "@/utils/sendEmail";
import validate from "@/utils/validate";
import emailSchema from "@/validation/emailSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, body } = req;

  if (method === "POST") {
    const error = await validate(emailSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let user = await prisma.user.findFirst({
      where: {
        email: body.email,
        deletedAt: null,
        isActive: true,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    const prevForgetPasswordToken = await prisma.forgetPasswordToken.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (prevForgetPasswordToken) {
      const diffMinutes = dayjs().diff(prevForgetPasswordToken.createdAt, "minutes");

      const tokenExpireMinutes = Number(process.env.EMAIL_TOKEN_EXPIRE_TIME_IN_MINUTES);

      if (diffMinutes < tokenExpireMinutes) {
        return getEnhancedRes(res, 400, `Please try again after ${tokenExpireMinutes} minutes`);
      }

      await prisma.forgetPasswordToken.delete({
        where: {
          userId: user.id,
        },
      });
    }

    const token = uuidv4();

    const clientIp = requestIp.getClientIp(req);

    const forgetPasswordToken = await prisma.forgetPasswordToken.create({
      data: {
        ip: clientIp,
        userId: user.id,
        token,
      },
    });

    const html = `Reset password link: ${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${forgetPasswordToken.token}`;

    await sendEmail({
      from: `<${process.env.EMAIL_SUPPORT_USERNAME}>`,
      to: body.email,
      subject: "Conseas account reset link",
      text: "",
      html,
      auth: {
        user: process.env.EMAIL_SUPPORT_USERNAME,
        pass: "sup#Con42",
      },
    });

    return getEnhancedRes(res, 200, "Reset password email sent successfully");
  }
}
