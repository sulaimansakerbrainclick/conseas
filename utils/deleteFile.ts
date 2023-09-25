const fs = require("fs");

const deleteFile = (filePath: string) => {
  fs.unlink("public" + filePath, (err: any) => {
    if (err) {
    }
  });
};

export default deleteFile;
