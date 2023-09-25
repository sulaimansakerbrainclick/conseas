import prisma from "@/lib/prisma";
import generateOtp from "@/utils/generateOtp";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import registerSchema from "@/validation/registerSchema";
import {  Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "@/utils/sendEmail";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method } = req;

  const clientIp = requestIp.getClientIp(req);

  if (method === "POST") {
    const error = await validate(registerSchema, body);

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
        role: Role.Patient,
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

    if (body.email) {
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
          from: `<${process.env.EMAIL_INFO_USERNAME}>`,
          to: body.email,
          subject: "Conseas account verify link",
          text: "",
          html: `Email verify link: ${process.env.NEXT_PUBLIC_APP_URL}/user/email-verify/${emailToken.token}`,
          auth: {
            user: process.env.EMAIL_INFO_USERNAME,
            pass: "$_Y)bI]i!kRQ",
          },
        });
      } catch {}
    }

    const { password, ...userWithoutPass } = user;

    const result = {
      ...userWithoutPass,
    };

    return getEnhancedRes(res, 200, "Registered successfully", result);
  }
}
