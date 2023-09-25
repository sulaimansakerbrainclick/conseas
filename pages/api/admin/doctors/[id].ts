import prisma from "@/lib/prisma";
import deleteFile from "@/utils/deleteFile";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import doctorSchema from "@/validation/doctorSchema";
import { Doctor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface UpdateDoctor extends Omit<Doctor, "dateOfBirth" | "graduationDate"> {
  imageBase64?: string;
  dateOfBirth: string;
  graduationDate: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { body, method, query } = req;

  if (method === "GET") {
    const doctor = await prisma.doctor.findFirst({
      where: {
        id: query.id as string,
      },
    });

    if (!doctor) {
      return getEnhancedRes(res, 404, "Doctor not found");
    }

    return getEnhancedRes(res, 200, "Doctor retrieved successfully", doctor);
  }

  if (method === "PUT") {
    const body: UpdateDoctor = req.body;

    const error = await validate(doctorSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let doctor = await prisma.doctor.findFirst({
      where: {
        id: query.id as string,
      },
    });

    if (!doctor) {
      return getEnhancedRes(res, 404, "Doctor not found");
    }

    let foundDoctor = await prisma.doctor.findFirst({
      where: {
        phone: body.phone,
      },
    });

    if (doctor.id !== foundDoctor?.id) {
      return getEnhancedRes(res, 400, "The phone number is already registered");
    }

    if (body.email) {
      foundDoctor = await prisma.doctor.findFirst({
        where: {
          email: body.email,
        },
      });

      if (doctor.id !== foundDoctor?.id) {
        return getEnhancedRes(res, 400, "The email is already registered");
      }
    }

    // delete old image
    if (body.image && doctor.image && body.image !== doctor.image) {
      deleteFile(doctor.image);
    }

    doctor = await prisma.doctor.update({
      where: {
        id: query.id as string,
      },
      data: {
        firstNameEn: body.firstNameEn,
        lastNameEn: body.lastNameEn,
        firstNameAr: body.firstNameAr,
        lastNameAr: body.lastNameAr,
        email: body.email,
        phone: body.phone,
        gender: body.gender,
        location: body.location,
        specializationEn: body.specializationEn,
        specializationAr: body.specializationAr,
        yearsOfExperience: body.yearsOfExperience,
        graduationDate: body.graduationDate,
        workplaceEn: body.workplaceEn,
        workplaceAr: body.workplaceAr,
        city: body.city,
        country: body.country,
        dateOfBirth: body.dateOfBirth,
        image: body.image,
      },
    });

    return getEnhancedRes(res, 200, "Doctor updated successfully", doctor);
  }

  if (method === "DELETE") {
    const deleteDoctor = await prisma.doctor.delete({
      where: {
        id: query.id as string,
      },
    });

    if (!deleteDoctor) {
      return getEnhancedRes(res, 404, "Doctor not found");
    }

    return getEnhancedRes(res, 200, "Doctor deleted successfully", deleteDoctor);
  }
}
