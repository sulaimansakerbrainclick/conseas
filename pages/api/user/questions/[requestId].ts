import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import textSchema from "@/validation/textSchema";
import { Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, query, body } = req;

  const { authorization } = headers;

  const decoded = await decodeToken(authorization!);

  if (method === "GET") {
    let questions;

    if (decoded?.role === Role.Admin) {
      questions = await prisma.question.findMany({
        where: {
          requestId: query.requestId as string,
        },
        include: {
          answers: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    if (decoded?.role === Role.Patient) {
      questions = await prisma.question.findMany({
        where: {
          requestId: query.requestId as string,
          patientId: decoded!.id,
        },
        include: {
          answers: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return getEnhancedRes(res, 200, "requests retrieved successfully", questions);
  }

  if (method === "POST") {
    const error = await validate(textSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const { authorization } = headers;

    const decoded = await decodeToken(authorization as string);
    if (!decoded) return getEnhancedRes(res, 498, "Invalid token");

    const questions = await prisma.question.create({
      data: {
        text: body.text,
        request: { connect: { id: query.requestId as string } },
        patient: { connect: { id: decoded!.id } },
      },
    });

    return getEnhancedRes(res, 200, "Question added successfully", questions);
  }
}
