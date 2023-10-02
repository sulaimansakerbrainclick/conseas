import RequestStatusId from "@/enums/RequestStatusId";
import RoleId from "@/enums/RoleId";
import { decodeToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import sendEmail from "@/utils/sendEmail";
import validate from "@/utils/validate";
import ClinicalDetailsSchema from "@/validation/ClinicalDetailsSchema";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, headers, body } = req;

  if (method === "POST") {
    const error = await validate(ClinicalDetailsSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    const { authorization } = headers;

    const decoded = await decodeToken(authorization as string);
    if (!decoded) return getEnhancedRes(res, 498, "Invalid token");

    const request = await prisma.request.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        medicalInformation: body.medicalInformation,
        myMedicalReport: body.myMedicalReport,
        status: {
          connect: { id: RequestStatusId.Draft },
        },
        service: { connect: { id: body.serviceId as string } },
        patient: { connect: { id: decoded!.id as string } },
      },
    });

    const admins = await prisma.user.findMany({
      where: {
        roleId: RoleId.Admin,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // const requests = admins.map((admin) =>
    //   sendEmail({
    //     from: `<${process.env.EMAIL_SUPPORT_USERNAME}>`,
    //     to: admin.email as string,
    //     subject: `New service request`,
    //     text: ``,
    //     html: `${request.firstName} ${request.lastName} has sent you a new service request`,
    //     auth: {
    //       user: process.env.EMAIL_SUPPORT_USERNAME,
    //       pass: "jJdJWbY!uzZn",
    //     },
    //   })
    // );

    // try {
    //   await Promise.all(requests);
    // } catch {}

    return getEnhancedRes(res, 200, "Request added successfully", request);
  }
}
