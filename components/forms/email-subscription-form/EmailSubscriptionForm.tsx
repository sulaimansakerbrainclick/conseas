import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import emailSubscriptionSchema from "@/validation/emailSubscriptionSchema";

export interface EmailSubscriptionFormValues {
  email: string;
}

const EmailSubscriptionForm = ({
  onSubmit,
  initialValues,
}: {
  initialValues: EmailSubscriptionFormValues;
  onSubmit: (
    values: EmailSubscriptionFormValues,
    formikHelpers: FormikHelpers<EmailSubscriptionFormValues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={emailSubscriptionSchema}
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
              label={t("Email")}
              variant="outlined"
              error={!!errors.email && touched.email}
              helperText={touched.email && t(errors.email || "")}
              size="small"
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default EmailSubscriptionForm;
