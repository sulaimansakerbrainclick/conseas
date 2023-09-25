const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const path = require("path");
const mime = require("mime");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const fs = require("fs");

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else if (pathname.startsWith("/files/")) {
        // Serve files from the public/files folder
        const filePath = path.join(__dirname, "public", "files", pathname.replace("/files/", ""));

        // Check if the file exists
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
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
