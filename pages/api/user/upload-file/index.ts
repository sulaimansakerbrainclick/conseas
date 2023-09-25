import getEnhancedRes from "@/utils/getEnhancedRes";
import saveFormDataFile from "@/utils/saveFormDataFile";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method } = req;

  if (method === "POST") {
    const filePath = await saveFormDataFile(req);

    return getEnhancedRes(res, 200, "File uploaded added successfully", filePath);
  }
}
