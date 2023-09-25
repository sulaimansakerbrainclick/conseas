import http from "./http";

const saveSession = (session: any) => {
  return http.post("/saveSession", session);
};

const removeSession = () => {
  return http.post("/removeSession");
};

const sessionService = {
  saveSession,
  removeSession,
};

export default sessionService;
