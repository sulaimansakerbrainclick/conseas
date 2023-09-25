const { v4: uuidv4 } = require("uuid");
import { Role } from "@prisma/client";
import prisma from "./prisma";
import * as bcrypt from "bcryptjs";
import settingsData from "../seed-data/settingsData";
import sectionsData from "../seed-data/sectionsData";
import servicesData from "../seed-data/servicesData";
import testimonials from "../seed-data/testimonialsData";
import chartsData from "../seed-data/chartsData";
import appointmentTypesData from "../seed-data/appointmentTypesData";
import pagesData from "../seed-data/pagesData";
import requestStatusData from "../seed-data/requestStatusData";
import SectionId from "../enums/SectionId";

async function main() {
  await prisma.user.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      firstName: "admin",
      lastName: "admin",
      phone: "000000000000",
      role: Role.Admin,
      email: "ceo@conseashealth.com",
      password: await bcrypt.hash("123456789", 10),
    },
  });

  await Promise.all(
    Object.entries(settingsData).map(
      async ([key, value]) =>
        await prisma.setting.upsert({
          where: { id: key },
          update: {},
          create: {
            id: key,
            value,
          },
        })
    )
  );

  await Promise.all(
    Object.entries(sectionsData).map(
      async ([key, value]) =>
        await prisma.section.upsert({
          where: { id: key },
          update: {},
          create: {
            id: key as SectionId,
            titleEn: value.titleEn,
            titleAr: value.titleAr,
            textEn: value.textEn,
            textAr: value.textAr,
            list: {
              createMany: { data: value.list },
            },
          },
        })
    )
  );

  await Promise.all(
    servicesData.map(async ({ children, ...data }) => {
      return await prisma.service.upsert({
        where: { id: uuidv4() },
        update: {},
        create: {
          ...data,
          children: {
            createMany: {
              data: children,
            },
          },
        },
      });
    })
  );

  await Promise.all(
    testimonials.map(async (data) => {
      return await prisma.testimonial.upsert({
        where: { id: uuidv4() },
        update: {},
        create: {
          ...data,
        },
      });
    })
  );

  await Promise.all(
    appointmentTypesData.map(async (item) => {
      return await prisma.appointmentType.upsert({
        where: { id: item.id },
        update: {},
        create: {
          ...item,
        },
      });
    })
  );

  await Promise.all(
    requestStatusData.map(async (item) => {
      return await prisma.requestStatus.upsert({
        where: { id: item.id },
        update: {},
        create: {
          ...item,
        },
      });
    })
  );

  await Promise.all(
    pagesData.map(async (item) => {
      return await prisma.page.upsert({
        where: { id: item.id },
        update: {},
        create: {
          ...item,
        },
      });
    })
  );

  await Promise.all(
    chartsData.map(async ({ ...data }) => {
      return await prisma.chart.upsert({
        where: { id: uuidv4() },
        update: {},
        create: {
          ...data,
        },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
