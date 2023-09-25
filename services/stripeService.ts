import http from "./http";

const admin = {};

const user = {
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

const stripeService = {
  admin,
  user,
};

export default stripeService;
