import http from "./http";

const upload = (file: File, token: string) => {
  const formData = new FormData();
  formData.append("file", file);

  return http.post("/user/upload-file", formData, {
    headers: {
      Authorization: token,
    },
  });
};

const fileService = {
  upload,
};

export default fileService;
