import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import emailSchema from "@/validation/emailSchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface EmailForgetPasswordFormValues {
  email: string;
}

const EmailForgetPasswordForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (
    values: EmailForgetPasswordFormValues,
    formikHelpers: FormikHelpers<EmailForgetPasswordFormValues>
  ) => void;
  initialValues: EmailForgetPasswordFormValues;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={emailSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              id="email"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              onBlur={handleBlur}
              label={`${t("Email")}*`}
              variant="outlined"
              error={!!errors.email && touched.email}
              helperText={touched.email && t(errors.email || "")}
              size="small"
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={isSubmitting}
            >
              {t("Send reset link")}
            </LoadingButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default EmailForgetPasswordForm;
