import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

const getAllDoctors = (token: string) => {
  return http.get(`/admin/doctors`, {
    headers: {
      Authorization: token,
    },
  });
};

const getHomeDoctors = (token: string) => {
  return http.get(`/doctors`, {
    headers: {
      Authorization: token,
    },
  });
};

const getDoctor = (id: string, token: string) => {
  return http.get(`/admin/doctors/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const addDoctor = (data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.post(`/admin/doctors`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

const updateDoctor = (data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.put(`/admin/doctors/${data.id}`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteDoctor = (id: string, token: string) => {
  return http.delete(`/admin/doctors/${id}`, {
    headers: {
      Authorization: token,
    },
  });
};

const doctorService = {
  getAllDoctors,
  addDoctor,
  deleteDoctor,
  getDoctor,
  updateDoctor,
  getHomeDoctors,
};

export default doctorService;
