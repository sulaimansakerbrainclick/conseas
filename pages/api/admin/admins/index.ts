import RoleId from "@/enums/RoleId";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import adminSchema from "@/validation/adminSchema";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";
import requestIp from "request-ip";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "@/utils/sendEmail";
import { decodeToken } from "@/lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, body, headers } = req;

  const { authorization } = headers;
  const decoded = await decodeToken(authorization as string);

  if (decoded?.email !== "ceo@conseashealth.com") {
    return getEnhancedRes(res, 400, "Unauthorized");
  }

  if (method === "GET") {
    const users = await prisma.user.findMany({
      where: {
        roleId: RoleId.Admin,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersWithoutPass = users.map(({ password, ...userWithoutPass }) => userWithoutPass);

    return getEnhancedRes(res, 200, "Users retrieved successfully", usersWithoutPass);
  }

  if (method === "POST") {
    const error = await validate(adminSchema, body);

    const clientIp = requestIp.getClientIp(req);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let user = await prisma.user.findFirst({
      where: {
        phone: body.phone,
      },
    });

    if (user) {
      return getEnhancedRes(res, 400, "The phone number is already registered");
    }

    user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return getEnhancedRes(res, 400, "The email is already registered");
    }

    user = await prisma.user.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        roleId: RoleId.Admin,
        image: body.image,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const phoneOtpFound = await prisma.phoneOtp.findFirst({
      where: {
        phone: body.phone,
      },
    });

    if (phoneOtpFound) {
      await prisma.phoneOtp.delete({
        where: {
          phone: body.phone,
        },
      });
    }

    // const otp = generateOtp();

    //send phone message

    await prisma.phoneOtp.create({
      data: {
        ip: clientIp,
        phone: body.phone,
        otp: "000000",
      },
    });

    const emailTokenFound = await prisma.emailToken.findFirst({
      where: {
        email: body.email,
      },
    });

    if (emailTokenFound) {
      await prisma.emailToken.delete({
        where: {
          email: body.email,
        },
      });
    }

    const token = uuidv4();

    const emailToken = await prisma.emailToken.create({
      data: {
        ip: clientIp,
        email: body.email,
        token,
      },
    });

    try {
      await sendEmail({
        from: `<${process.env.EMAIL_SUPPORT_USERNAME}>`,
        to: body.email,
        subject: "Conseas account verify link",
        text: "",
        html: `Email verify link: ${process.env.NEXT_PUBLIC_APP_URL}/user/email-verify/${emailToken.token}`,
        auth: {
          user: process.env.EMAIL_SUPPORT_USERNAME,
          pass: sup#Con42,
        },
      });
    } catch {}

    const { password, ...userWithoutPass } = user;

    const result = {
      ...userWithoutPass,
    };

    return getEnhancedRes(res, 200, "Admin added successfully", result);
  }
}
