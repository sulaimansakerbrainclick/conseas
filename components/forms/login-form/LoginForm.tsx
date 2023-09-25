import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import PasswordInput from "@/components/reusable/password-input";
import { useTranslation } from "next-i18next";
import loginSchema from "@/validation/loginSchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface LoginFormValues {
  emailOrPhone: string;
  password: string;
}

const LoginForm = ({
  onSubmit,
  initialValues,
}: {
  initialValues: LoginFormValues;
  onSubmit: (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik validationSchema={loginSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              name="emailOrPhone"
              value={values.emailOrPhone}
              onChange={(e) => setFieldValue("emailOrPhone", e.target.value)}
              onBlur={handleBlur}
              label={t("Email or Phone")}
              variant="outlined"
              error={touched.emailOrPhone && !!errors.emailOrPhone}
              helperText={touched.emailOrPhone && t(errors.emailOrPhone || "")}
              size="small"
            />

            <PasswordInput
              value={values.password}
              onChange={(e: any) => setFieldValue("password", e.target.value)}
              onBlur={handleBlur}
              error={!!errors.password && touched.password}
              helperText={touched.password && t(errors.password || "")}
              size="small"
            />

            <Link href="/forget-password" className="hover:text-red-600 text-xs ">
              {t("Forgot Password?")}
            </Link>

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={isSubmitting}
            >
              {t("Submit")}
            </LoadingButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
