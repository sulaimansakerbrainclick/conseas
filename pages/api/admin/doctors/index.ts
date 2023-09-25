import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import doctorSchema from "@/validation/doctorSchema";
import { Doctor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface AddDoctor extends Omit<Doctor, "dateOfBirth" | "graduationDate"> {
  imageBase64?: string;
  dateOfBirth: string;
  graduationDate: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "GET") {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return getEnhancedRes(res, 200, "Doctors retrieved successfully", doctors);
  }

  if (method === "POST") {
    const body: AddDoctor = req.body;

    const error = await validate(doctorSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let doctor = await prisma.doctor.findFirst({
      where: {
        phone: body.phone,
      },
    });

    if (doctor) {
      return getEnhancedRes(res, 400, "The phone number is already registered");
    }

    if (body.email) {
      doctor = await prisma.doctor.findFirst({
        where: {
          email: body.email,
        },
      });

      if (doctor) {
        return getEnhancedRes(res, 400, "The email is already registered");
      }
    }

    doctor = await prisma.doctor.create({
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

    return getEnhancedRes(res, 200, "Doctor added successfully", doctor);
  }
}
