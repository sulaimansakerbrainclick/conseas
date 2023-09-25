import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import PasswordInput from "@/components/reusable/password-input";
import resetPasswordSchema from "@/validation/resetPasswordSchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: ResetPasswordFormValues;
  onSubmit: (
    values: ResetPasswordFormValues,
    formikHelpers: FormikHelpers<ResetPasswordFormValues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={resetPasswordSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <PasswordInput
              value={values.newPassword}
              onChange={(e: any) => setFieldValue("newPassword", e.target.value)}
              onBlur={handleBlur}
              error={!!errors.newPassword && touched.newPassword}
              helperText={touched.newPassword && t(errors.newPassword || "")}
              size="small"
            />

            <PasswordInput
              isConfirm
              value={values.confirmPassword}
              onChange={(e: any) => setFieldValue("confirmPassword", e.target.value)}
              onBlur={handleBlur}
              error={!!errors.confirmPassword && touched.confirmPassword}
              helperText={touched.confirmPassword && t(errors.confirmPassword || "")}
              size="small"
            />

            <div>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {t("Submit")}
              </LoadingButton>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ResetPasswordForm;
