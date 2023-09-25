import { User } from "@prisma/client";
import { LoginFormValues } from "../forms/login-form/LoginForm";
import { FormikHelpers } from "formik";
import authService from "@/services/authService";
import sessionService from "@/services/sessionService";

const useLogin = (callback: (user: User) => void) => {
  const handleSubmit = (
    { emailOrPhone, password }: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setSubmitting(true);

    authService
      .login({ emailOrPhone, password })
      .then((res) => {
        sessionService
          .saveSession(res.data.data)
          .then(() => {
            callback(res.data.data.user);
          })
          .catch((e) => {
            setSubmitting(false);
          });
      })
      .catch((e) => {
        setSubmitting(false);
      });
  };

  return { handleSubmit };
};

export default useLogin;
