import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

// admin
const updateSection = (id: string, data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.put(`/admin/sections/${id}`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

// public
const getSections = () => {
  return http.get(`/sections`);
};

const sectionService = {
  updateSection,
  getSections,
};

export default sectionService;
