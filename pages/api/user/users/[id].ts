import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/lib/jwt";
import validate from "@/utils/validate";
import profileSchema from "@/validation/profileSchema";
import deleteFile from "@/utils/deleteFile";

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  const { method, headers, query, body } = req;

  if (method === "PUT") {
    const error = await validate(profileSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const { authorization } = headers;
    const decoded = await decodeToken(authorization!);

    if (query.id !== decoded!.id) {
      return getEnhancedRes(res, 401, "Access denied");
    }

    let user = await prisma.user.findFirst({
      where: {
        id: decoded!.id as string,
        deletedAt: null,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    let foundUser = await prisma.user.findFirst({
      where: {
        phone: body.phone,
      },
    });

    if (foundUser && user.id !== foundUser.id) {
      return getEnhancedRes(res, 400, "The phone number is already registered");
    }

    if (body.email) {
      foundUser = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });

      if (foundUser && user.id !== foundUser.id) {
        return getEnhancedRes(res, 400, "The email is already registered");
      }
    }

    // delete old image
    if (body.image && user.image && body.image !== user.image) {
      deleteFile(user.image);
    }

    user = await prisma.user.update({
      where: {
        id: decoded!.id as string,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
        image: body.image,
      },
    });

    const { password, ...userWithoutPass } = user;

    return getEnhancedRes(res, 200, "User updated successfully", userWithoutPass);
  }
}
