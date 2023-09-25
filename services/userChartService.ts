import http from "./http";

const admin = {};

const user = {
  getUserChart: (token: string) => {
    return http.get(`/user/chart`, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const userChartService = {
  admin,
  user,
};

export default userChartService;
