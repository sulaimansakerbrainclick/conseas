import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

const admin = {
  getChart: (id: string, token: string) => {
    return http.get(`/admin/charts/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },

  addChart: (data: any, token: string) => {
    const newData = deleteEmptyFields(data);

    return http.post(`/admin/charts`, newData, {
      headers: {
        Authorization: token,
      },
    });
  },

  updateChart: (data: any, token: string) => {
    const newData = deleteEmptyFields(data);

    return http.put(`/admin/charts/${data.id}`, newData, {
      headers: {
        Authorization: token,
      },
    });
  },

  deleteChart: (id: string, token: string) => {
    return http.delete(`/admin/charts/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const user = {
  getAllCharts: () => {
    return http.get(`/charts`);
  },

  chartCheckout: (id: string, token: string) => {
    return http.post(`/user/chart-checkout/${id}`, null, {
      headers: {
        Authorization: token,
      },
    });
  },

  cancelChartSubscription: (id: string, token: string) => {
    return http.post(`/user/cancel-chart-subscription/${id}`, null, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const chartService = {
  admin,
  user,
};

export default chartService;
