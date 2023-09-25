import http from "./http";

const addContactUs = (data: any) => {
  return http.post("/contact-us", data);
};

const contactUsService = {
  addContactUs,
};

export default contactUsService;
