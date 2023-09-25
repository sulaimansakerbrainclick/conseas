import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import submitConsultSchema from "@/validation/submitConsultSchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method } = req;

  if (method === "POST") {
    const error = await validate(submitConsultSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const appointmentType = await prisma.appointmentType.findFirst({
      where: {
        id: body.appointmentTypeId,
      },
    });

    if (!appointmentType) {
      return getEnhancedRes(res, 400, "No appointment type found");
    }

    const appointment = await prisma.appointment.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        appointmentType: {
          connect: { id: body.appointmentTypeId as string },
        },
        notes: body.notes,
        userId: body?.userId,
      },
    });

    return getEnhancedRes(res, 200, "Appointment sent successfully", appointment);
  }
}
