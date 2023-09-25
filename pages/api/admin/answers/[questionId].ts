import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import textSchema from "@/validation/textSchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method, headers, query } = req;

  if (method === "POST") {
    const error = await validate(textSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const { authorization } = headers;

    const decoded = await decodeToken(authorization!);

    const question = await prisma.answer.create({
      data: {
        text: body.text,
        question: { connect: { id: query.questionId as string } },
        admin: { connect: { id: decoded!.id } },
      },
      include: {
        question: {
          include: {
            request: true,
          },
        },
      },
    });

    const notification = await prisma.notification.create({
      data: {
        message: "The medical report of your request has been uploaded successfully",
        user: { connect: { id: question.question.request.patientId } },
      },
    });

    return getEnhancedRes(res, 200, "Answer added successfully", question);
  }
}
