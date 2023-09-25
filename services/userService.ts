import http from "./http";
import deleteEmptyFields from "@/utils/deleteEmptyFields";

const register = (data: any) => {
  return http.post("/register", data);
};

const sendResetEmail = (email: string) => {
  return http.post(`/send-reset-email`, { email });
};

const resetPassword = (data: any, resetToken: string) => {
  return http.post(`/reset-password/${resetToken}`, data);
};

const sendVerifyEmail = (token: string) => {
  return http.post(`/user/users/send-verify-email`, null, {
    headers: {
      Authorization: token,
    },
  });
};

const getAll = (token: string) => {
  return http.get(`/admin/users`, {
    headers: {
      Authorization: token,
    },
  });
};

const editUser = (data: any, token: string) => {
  const newData = deleteEmptyFields(data);

  return http.put(`/user/users/${data.id}`, newData, {
    headers: {
      Authorization: token,
    },
  });
};

const verifyEmail = (token: string, verifyToken: string) => {
  return http.post(`/user/users/verify-email/${verifyToken}`, null, {
    headers: {
      Authorization: token,
    },
  });
};

const blockUser = (id: string, isActive: boolean, token: string) => {
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
};

const changePassword = (data: any, token: string) => {
  return http.put(`/user/users/change-password`, data, {
    headers: {
      Authorization: token,
    },
  });
};

const verifyPhone = (otp: string, token: string) => {
  return http.post(
    `/user/users/verify-phone`,
    { otp },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const me = (token: string) => {
  return http.get(`/user/users/me`, {
    headers: {
      Authorization: token,
    },
  });
};

const getNotifications = (token: string) => {
  return http.get(`/user/notifications`, {
    headers: {
      Authorization: token,
    },
  });
};

const userService = {
  getAll,
  register,
  editUser,
  verifyPhone,
  me,
  getNotifications,
  changePassword,
  blockUser,
  verifyEmail,
  sendVerifyEmail,
  sendResetEmail,
  resetPassword,
};

export default userService;
