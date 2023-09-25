import http from "./http";

const admin = {};

const user = {
  getPayments: (token: string) => {
    return http.get(`/user/payments`, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const paymentService = {
  admin,
  user,
};

export default paymentService;
