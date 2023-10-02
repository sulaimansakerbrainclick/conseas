import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import PasswordInput from "@/components/reusable/password-input";
import { useTranslation } from "next-i18next";
import registerSchema from "@/validation/registerSchema";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import links from "@/links/links";
import Links from "@/enums/Links";

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  isTermsAccepted: boolean;
}
const RegisterForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: RegisterFormValues;
  onSubmit: (values: RegisterFormValues, formikHelpers: FormikHelpers<RegisterFormValues>) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={registerSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5">
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

            <div className="flex gap-5">
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
            </div>

            <div className="flex flex-col lg:flex-row gap-5 lg:gap-5">
              <PasswordInput
                value={values.password}
                onChange={(e: any) => setFieldValue("password", e.target.value)}
                onBlur={handleBlur}
                error={!!errors.password && touched.password}
                helperText={touched.password && t(errors.password || "")}
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
            </div>

            <FormControl required error={!!errors.isTermsAccepted && touched.isTermsAccepted}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={values.isTermsAccepted}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("isTermsAccepted", e.target.checked)
                      }
                    />
                  }
                  label={
                    <>
                      {t("I accept")}{" "}
                      <Link
                        href={links[Links.TermsAndConditions].href}
                        className="font-medium text-color-1"
                        target="_blank"
                        rel="noopener"
                      >
                        {t("the terms and conditions")}
                      </Link>
                      *
                    </>
                  }
                />
              </FormGroup>

              {errors?.isTermsAccepted && touched?.isTermsAccepted && (
                <FormHelperText>{errors?.isTermsAccepted}</FormHelperText>
              )}
            </FormControl>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {t("Submit")}
            </LoadingButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
