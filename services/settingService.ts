import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

//admin
const updateSettings = (data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.put(`/admin/settings`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

//public
const geSettings = () => {
  return http.get(`/settings`);
};

const settingService = {
  updateSettings,
  geSettings,
};

export default settingService;
