import http from "./http";

const getRequestStatusService = () => {
  return http.get(`/request-statuses`);
};

const requestStatusService = {
  getRequestStatusService,
};

export default requestStatusService;
