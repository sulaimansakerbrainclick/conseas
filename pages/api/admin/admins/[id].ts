import RoleId from "@/enums/RoleId";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "@/lib/jwt";
import validate from "@/utils/validate";
import deleteFile from "@/utils/deleteFile";
import * as bcrypt from "bcryptjs";
import adminSchema from "@/validation/adminSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query, headers, body } = req;

  const { authorization } = headers;
  const decoded = await decodeToken(authorization as string);

  if (decoded?.email !== "ceo@conseashealth.com") {
    return getEnhancedRes(res, 400, "Unauthorized");
  }

  if (method === "GET") {
    const user = await prisma.user.findFirst({
      where: {
        id: query.id as string,
        deletedAt: null,
        roleId: RoleId.Admin,
      },
    });

    if (!user) {
      return getEnhancedRes(res, 400, "Invalid user");
    }

    const { password, ...userWithoutPass } = user;

    const result = {
      ...userWithoutPass,
    };

    return getEnhancedRes(res, 200, "Admin retrieved successfully", result);
  }

  if (method === "PUT") {
    const error = await validate(adminSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const { authorization } = headers;
    const decoded = await decodeToken(authorization!);

    let user = await prisma.user.findFirst({
      where: {
        id: query!.id as string,
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
        id: query!.id as string,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
        image: body.image,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...userWithoutPass } = user;

    return getEnhancedRes(res, 200, "Admin updated successfully", userWithoutPass);
  }
}
