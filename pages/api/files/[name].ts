import { join } from "path";
const fs = require("fs");
const mime = require("mime");

// Tell Next.js to pass in Node.js HTTP
export const config = {
  api: { externalResolver: true },
};

const handler = (req: any, res: any) => {
  // Get the file name from the URL parameter
  const { name } = req.query;

  try {
    // Construct the path to the file in the public/files directory
    const filePath = join(process.cwd(), "public/files", name);

    // Create a read stream from the file
    if (fs.existsSync(filePath)) {
      // Determine the file's content type
      const contentType = mime.getType(filePath);
      if (contentType) {
        // Set the content type in the response header
        res.setHeader("Content-Type", contentType);
      }

      // Read the file and stream it as a response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.statusCode = 404;
      res.end("File not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  }
};
export default handler;
