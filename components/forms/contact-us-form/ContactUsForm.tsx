import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import contactUsScheme from "@/validation/contactUsSchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface ContactUsFormValues {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}

const ContactUsForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: ContactUsFormValues;
  onSubmit: (
    values: ContactUsFormValues,
    formikHelpers: FormikHelpers<ContactUsFormValues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={contactUsScheme}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5">
              <TextField
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Name")}*`}
                variant="outlined"
                error={touched.name && !!errors.name}
                helperText={touched.name && t(errors.name || "")}
                size="small"
              />

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
            </div>

            <div className="flex gap-5">
              <TextField
                name="phone"
                value={values.phone}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Phone Number")}*`}
                variant="outlined"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && t(errors.phone || "")}
                size="small"
              />

              <TextField
                name="subject"
                value={values.subject}
                onChange={(e) => setFieldValue("subject", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Subject")}*`}
                variant="outlined"
                error={touched.subject && !!errors.subject}
                helperText={touched.subject && t(errors.subject || "")}
                size="small"
              />
            </div>

            <div className="mb-8">
              <TextField
                name="message"
                value={values.message}
                onChange={(e) => setFieldValue("message", e.target.value)}
                onBlur={handleBlur}
                label={t("Message")}
                variant="outlined"
                error={touched.message && !!errors.message}
                helperText={touched.message && t(errors.message || "")}
                size="small"
                multiline
                rows={4}
              />
            </div>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {t("Submit")}
            </LoadingButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default ContactUsForm;
