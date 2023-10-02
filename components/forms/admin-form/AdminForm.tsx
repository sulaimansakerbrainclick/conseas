import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import PasswordInput from "@/components/reusable/password-input";
import adminSchema from "@/validation/adminSchema";

export interface AdminFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AdminForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: AdminFormValues;
  onSubmit: (values: AdminFormValues, formikHelpers: FormikHelpers<AdminFormValues>) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={adminSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="firstName"
                value={values.firstName}
                onChange={(e) => setFieldValue("firstName", e.target.value)}
                onBlur={handleBlur}
                label={`${t("First Name")}*`}
                variant="outlined"
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && t(errors.firstName || "")}
                size="small"
              />

              <TextField
                name="lastName"
                value={values.lastName}
                onChange={(e) => setFieldValue("lastName", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Last Name")}*`}
                variant="outlined"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && t(errors.lastName || "")}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="phone"
                value={values.phone}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Phone Number")}*`}
                variant="outlined"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
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

            <div className="flex flex-col lg:flex-row gap-5 mb-8">
              <PasswordInput
                name="password"
                value={values.password}
                onChange={(e: any) => setFieldValue("password", e.target.value)}
                onBlur={handleBlur}
                error={!!errors.password && touched.password}
                helperText={touched.password && t(errors.password || "")}
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
            </div>

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

export default AdminForm;
