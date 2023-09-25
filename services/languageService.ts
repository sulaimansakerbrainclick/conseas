import http from "./http";

const addLanguage = (data: any, token: string) => {
  return http.post(`/admin/languages`, data, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteLanguage = (id: string, token: string) => {
  return http.delete(`/admin/languages/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const getAll = (token: string) => {
  return http.get(`/languages`, {
    headers: {
      Authorization: token,
    },
  });
};

const languageService = {
  getAll,
  addLanguage,
  deleteLanguage,
};

export default languageService;
