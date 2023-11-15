import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, query } = req;

  if (method === "POST") {
    const { authorization } = headers;

    const decoded = await decodeToken(authorization!);

    let user = await prisma.user.findFirst({
      where: {
        id: decoded!.id,
        isActive: true,
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
      return getEnhancedRes(res, 400, "Email is already verified");
    }

    const emailToken = await prisma.emailToken.findFirst({
      where: {
        email: user.email,
        token: query.verifyToken as string,
      },
    });

    if (!emailToken) {
      return getEnhancedRes(res, 400, "There is no token associated with this email");
    }

    user = await prisma.user.update({
      where: {
        id: decoded!.id,
      },
      data: {
        isEmailVerified: true,
      },
    });

    await prisma.emailToken.delete({
      where: {
        email: emailToken.email,
      },
    });

    return getEnhancedRes(res, 200, "Email verified successfully");
  }
}
