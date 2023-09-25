import { generateAuthToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import loginSchema from "@/validation/loginSchema";
import * as bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method } = req;

  if (method === "POST") {
    const error = await validate(loginSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.emailOrPhone }, { phone: body.emailOrPhone }],
        AND: [{ deletedAt: null, isActive: true }],
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(body.password, user.password);

    if (!isValidPassword) {
      return getEnhancedRes(res, 400, "Invalid email or password");
    }

    if (isValidPassword) {
      const { password, ...userWithoutPass } = user;

      const token = await generateAuthToken(userWithoutPass);

      const result = {
        user: userWithoutPass,
        token: `bearer ${token}`,
      };

      return getEnhancedRes(res, 200, "Logged in successfully", result);
    }
  }
}
