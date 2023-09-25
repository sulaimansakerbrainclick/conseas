import prisma from "@/lib/prisma";
import getEnhancedRes from "@/utils/getEnhancedRes";
import validate from "@/utils/validate";
import appSectionSchema from "@/validation/appSectionSchema";
import { NextApiRequest, NextApiResponse } from "next";

interface ListItem {
  id: string;
  titleEn?: string | null;
  titleAr?: string | null;
  textEn?: string | null;
  textAr?: string | null;
  image?: string | null;
  imageBase64?: string;
}

export interface UpdateSection {
  id: string;
  titleEn: string;
  titleAr: string;
  textEn: string;
  textAr: string;
  list: ListItem[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, query } = req;

  if (method === "PUT") {
    const body: UpdateSection = req.body;

    const { list, ...bodyWithoutList } = body;

    const error = await validate(appSectionSchema, body);

    if (error) {
      return getEnhancedRes(res, 400, error);
    }

    let section = await prisma.section.findFirst({
      where: {
        id: query.id as string,
      },
      include: {
        list: true,
      },
    });

    if (!section) {
      return getEnhancedRes(res, 400, "Invalid section");
    }

    const newListItems: ListItem[] = [];
    const updatedListItems: ListItem[] = [];
    const deletedListItems: ListItem[] = [];

    list.forEach((item) => {
      const index = section?.list.findIndex((i) => i.id === item.id);

      if (index === -1) {
        newListItems.push(item);
      }
    });

    section.list.forEach((item) => {
      const index = list.findIndex((i) => i.id === item.id);

      if (index === -1) {
        deletedListItems.push(item);
      } else {
        updatedListItems.push(item);
      }
    });

    section = await prisma.section.update({
      where: {
        id: query.id as string,
      },
      data: {
        ...bodyWithoutList,
        list: {
          deleteMany: {
            id: { in: [...deletedListItems, ...updatedListItems].map((item) => item.id) },
          },
          createMany: {
            data: list.map(({ id, ...item }) => ({
              ...item,
            })),
          },
        },
      },
      include: {
        list: true,
      },
    });

    return getEnhancedRes(res, 200, "App settings updated successfully");
  }
}
