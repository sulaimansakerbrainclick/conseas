import { NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

const saveFormDataFile = (req: NextApiRequest): Promise<string> => {
  const options: formidable.Options = { multiples: false };

  options.uploadDir = path.join(process.cwd(), `/public/files`);

  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + "." + getFileExtension(path.originalFilename || "");
  };

  options.maxFileSize = 4 * 1024 * 1024; // 4mb

  const form = formidable(options);

  return new Promise(async (resolve, reject) => {
    try {
      await fs.readdir(path.join(process.cwd() + "/public", `/files`));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd() + "/public", `/files`));
    }

    form.parse(req, (err, fields, files: any) => {
      // image only validation
      // add size validation logic here

      // const validationError = validate();

      // if (validationError) {
      //   reject(validationError);
      // }

      if (err) {
        reject(err);
      }

      const file = files.file;

      const filePath = `/files/` + file.newFilename;

      resolve(filePath);
    });
  });
};

export default saveFormDataFile;
