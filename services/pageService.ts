import PageId from "@/enums/PageId";
import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

const getAllPages = (token: string) => {
  return http.get(`/admin/pages`, {
    headers: {
      Authorization: token,
    },
  });
};

const getPage = (id: PageId) => {
  return http.get(`/pages/${id}`);
};

const updatePage = (id: PageId, data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.put(`/admin/pages/${id}`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

const pageService = {
  getAllPages,
  getPage,
  updatePage,
};

export default pageService;
