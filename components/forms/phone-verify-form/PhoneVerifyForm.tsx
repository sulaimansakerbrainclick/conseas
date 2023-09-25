import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import phoneVerifySchema from "@/validation/phoneVerifySchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface PhoneVerifyFormValues {
  otp: string;
}

const PhoneVerifyForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: PhoneVerifyFormValues;
  onSubmit: (
    values: PhoneVerifyFormValues,
    formikHelpers: FormikHelpers<PhoneVerifyFormValues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={phoneVerifySchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              name="otp"
              value={values.otp}
              onChange={(e) => setFieldValue("otp", e.target.value)}
              onBlur={handleBlur}
              label={t("OTP*")}
              variant="outlined"
              error={touched.otp && !!errors.otp}
              helperText={touched.otp && t(errors.otp || "")}
              size="small"
            />

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              loading={isSubmitting}
            >
              {t("Confirm")}
            </LoadingButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default PhoneVerifyForm;
