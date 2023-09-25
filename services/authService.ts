import http from "./http";

const login = async (data: any) => {
  return http.post("/auth", data);
};

const logout = () => {
  return http.post("/removeSession");
};

const authService = {
  login,
  logout,
};

export default authService;
