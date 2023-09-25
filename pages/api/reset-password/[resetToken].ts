import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";
import validate from "@/utils/validate";
import resetPasswordSchema from "@/validation/resetPasswordSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query, body } = req;

  if (method === "POST") {
    const error = await validate(resetPasswordSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const forgetPasswordToken = await prisma.forgetPasswordToken.findFirst({
      where: {
        token: query.resetToken as string,
      },
    });

    if (!forgetPasswordToken) {
      return getEnhancedRes(res, 400, "There is no forgot password token associated with any user");
    }

    let user = await prisma.user.findFirst({
      where: {
        id: forgetPasswordToken.userId,
        deletedAt: null,
      },
    });

    if (!user) {
      return getEnhancedRes(
        res,
        400,
        "There is no user associated with this forgot password token"
      );
    }

    user = await prisma.user.update({
      where: {
        id: forgetPasswordToken.userId,
      },
      data: {
        password: body?.newPassword && (await bcrypt.hash(body.newPassword, 10)),
      },
    });

    await prisma.forgetPasswordToken.delete({
      where: {
        id: forgetPasswordToken.id,
      },
    });

    return getEnhancedRes(res, 200, "The password has been reset successfully");
  }
}
