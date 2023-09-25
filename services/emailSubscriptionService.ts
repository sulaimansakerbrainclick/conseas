import http from "./http";

const addSubscription = (email: string) => {
  return http.post(`/email-subscription`, { email });
};

const emailSubscriptionService = {
  addSubscription,
};

export default emailSubscriptionService;
