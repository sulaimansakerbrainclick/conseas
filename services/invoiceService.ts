import http from "./http";

const admin = {};

const user = {
  getInvoices: (token: string) => {
    return http.get(`/user/invoices`, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const invoiceService = {
  admin,
  user,
};

export default invoiceService;
