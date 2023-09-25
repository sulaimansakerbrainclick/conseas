import http from "./http";

const getAllRequests = (token: string) => {
  return http.get(`/admin/requests`, {
    headers: {
      Authorization: token,
    },
  });
};

const uploadMedicalReport = (id: string, data: any, token: string) => {
  return http.put(`/admin/requests/upload-medical-report/${id}`, data, {
    headers: {
      Authorization: token,
    },
  });
};

const changeRequestStatus = (id: string, requestStatusId: string, token: string) => {
  return http.put(
    `/admin/requests/change-status/${id}`,
    { requestStatusId },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const user = {
  getRequests: (token: string) => {
    return http.get(`/user/requests`, {
      headers: {
        Authorization: token,
      },
    });
  },

  addDraftRequest: (data: any, token: string) => {
    return http.post(`/user/requests/add-draft/${data.serviceId}`, data, {
      headers: {
        Authorization: token,
      },
    });
  },

  requestCheckout: (id: string, token: string) => {
    return http.post(`/user/request-checkout/${id}`, null, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const requestService = {
  getAllRequests,
  changeRequestStatus,
  uploadMedicalReport,
  user,
};

export default requestService;
