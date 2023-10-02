import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

const admin = {
  getAllAdmins(token: string) {
    return http.get(`/admin/admins`, {
      headers: {
        Authorization: token,
      },
    });
  },

  getAdmin(id: any, token: string) {
    return http.get(`/admin/admins/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },

  addAdmin(data: any, token: string) {
    return http.post(`/admin/admins`, data, {
      headers: {
        Authorization: token,
      },
    });
  },

  editAdmin(data: any, token: string) {
    const newData = deleteEmptyFields(data);

    return http.put(`/admin/admins/${data.id}`, newData, {
      headers: {
        Authorization: token,
      },
    });
  },

  deleteAdmin(id: string, token: string) {
    return http.put(`/admin/admins/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },

  getAllUsers(token: string) {
    return http.get(`/admin/users`, {
      headers: {
        Authorization: token,
      },
    });
  },

  blockUser(id: string, isActive: boolean, token: string) {
    if (isActive) {
      return http.put(`/admin/users/block/${id}`, null, {
        headers: {
          Authorization: token,
        },
      });
    }

    return http.put(`/admin/users/unblock/${id}`, null, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const user = {
  editUser(data: any, token: string) {
    const newData = deleteEmptyFields(data);

    return http.put(`/user/${data.id}`, newData, {
      headers: {
        Authorization: token,
      },
    });
  },

  sendVerifyEmail(token: string) {
    return http.post(`/user/send-verify-email`, null, {
      headers: {
        Authorization: token,
      },
    });
  },

  verifyEmail(token: string, verifyToken: string) {
    return http.post(`/user/verify-email/${verifyToken}`, null, {
      headers: {
        Authorization: token,
      },
    });
  },

  changePassword(data: any, token: string) {
    return http.put(`/user/change-password`, data, {
      headers: {
        Authorization: token,
      },
    });
  },

  verifyPhone(otp: string, token: string) {
    return http.post(
      `/user/verify-phone`,
      { otp },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  },

  me(token: string) {
    return http.get(`/user/me`, {
      headers: {
        Authorization: token,
      },
    });
  },

  getNotifications(token: string) {
    return http.get(`/user/notifications`, {
      headers: {
        Authorization: token,
      },
    });
  },
};

const common = {
  register(data: any) {
    return http.post("/register", data);
  },

  sendResetEmail(email: string) {
    return http.post(`/send-reset-email`, { email });
  },

  resetPassword(data: any, resetToken: string) {
    return http.post(`/reset-password/${resetToken}`, data);
  },
};

const userService = {
  admin,
  user,
  common,
};

export default userService;
