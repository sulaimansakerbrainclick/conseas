import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

const admin = {
  getAllServices: (token: string) => {
    return http.get(`/admin/services`, {
      headers: {
        Authorization: token,
      },
    });
  },

  getService: (id: string, token: string) => {
    return http.get(`/admin/services/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },

  addService: (data: any, token: string) => {
    const newData = deleteEmptyFields(data);

    return http.post(`/admin/services`, newData, {
      headers: {
        Authorization: token,
      },
    });
  },

  updateService: (data: any, token: string) => {
    const newData = deleteEmptyFields(data);

    return http.put(`/admin/services/${data.id}`, newData, {
      headers: {
        Authorization: token,
      },
    });
  },

  toggleServiceActivation: (id: string, token: string) => {
    return http.post(
      `/admin/services/toggle-activation/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },

  deleteService: (id: string, token: string) => {
    return http.delete(`/admin/services/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const common = {
  getServicesTree: () => {
    return http.get(`/services/services-tree`);
  },

  getMainServices: () => {
    return http.get(`/services/main-services`);
  },

  getSubServices: () => {
    return http.get(`/services/sub-services`);
  },

  getService: (id: string) => {
    return http.get(`/services/${id}`);
  },
};

const serviceService = {
  admin,
  common,
};

export default serviceService;
