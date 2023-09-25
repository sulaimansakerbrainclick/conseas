import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import languageSchema from "@/validation/languageSchema";

export interface LanguageFormValues {
  key: string;
}

const LanguageForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (values: LanguageFormValues, formikHelpers: FormikHelpers<LanguageFormValues>) => void;
  initialValues: LanguageFormValues;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={languageSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              name="key"
              value={values.key}
              onChange={(e) => setFieldValue("key", e.target.value)}
              onBlur={handleBlur}
              label={t("Key*")}
              variant="outlined"
              error={touched.key && !!errors.key}
              helperText={touched.key && errors.key}
              size="small"
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

export default LanguageForm;
