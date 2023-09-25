import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import PasswordInput from "@/components/reusable/password-input";
import changePasswordSchema from "@/validation/changePasswordSchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface ChangePasswordFormVavlues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm = ({
  onSubmit,
  initialValues,
}: {
  initialValues: ChangePasswordFormVavlues;
  onSubmit: (
    values: ChangePasswordFormVavlues,
    formikHelpers: FormikHelpers<ChangePasswordFormVavlues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      enableReinitialize
      validationSchema={changePasswordSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <PasswordInput
              name="currentPassword"
              value={values.currentPassword}
              onChange={(e: any) => setFieldValue("currentPassword", e.target.value)}
              onBlur={handleBlur}
              error={!!errors.currentPassword && touched.currentPassword}
              helperText={touched.currentPassword && t(errors.currentPassword || "")}
              size="small"
              label={t("Current password")}
            />

            <PasswordInput
              name="newPassword"
              value={values.newPassword}
              onChange={(e: any) => setFieldValue("newPassword", e.target.value)}
              onBlur={handleBlur}
              error={!!errors.newPassword && touched.newPassword}
              helperText={touched.newPassword && t(errors.newPassword || "")}
              size="small"
              label={t("New password")}
            />

            <PasswordInput
              isConfirm
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={(e: any) => setFieldValue("confirmPassword", e.target.value)}
              onBlur={handleBlur}
              error={!!errors.confirmPassword && touched.confirmPassword}
              helperText={touched.confirmPassword && t(errors.confirmPassword || "")}
              size="small"
              label={t("Confirm password")}
            />

            <div>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {t("Save")}
              </LoadingButton>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ChangePasswordForm;
