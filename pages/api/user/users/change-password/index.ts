import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcryptjs";
import { decodeToken } from "@/lib/jwt";
import validate from "@/utils/validate";
import changePasswordSchema from "@/validation/changePasswordSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  const { method, headers, body } = req;

  if (method === "PUT") {
    const error = await validate(changePasswordSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const { authorization } = headers;
    const decoded = await decodeToken(authorization!);

    let user = await prisma.user.findFirst({
      where: {
        id: decoded!.id as string,
        deletedAt: null,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    const isValidPassword = await bcrypt.compare(body.currentPassword, user.password);

    if (!isValidPassword) {
      return getEnhancedRes(res, 400, "Invalid current password");
    }

    user = await prisma.user.update({
      where: {
        id: decoded!.id as string,
      },
      data: {
        password: await bcrypt.hash(body.newPassword, 10),
      },
    });

    return getEnhancedRes(res, 200, "Password updated successfully");
  }
}
