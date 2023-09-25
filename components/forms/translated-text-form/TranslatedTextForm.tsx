import React from "react";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import translatedTextSchema from "@/validation/translatedTextSchema";
import dynamic from "next/dynamic";
import Loader from "@/components/reusable/loader";
import { FormControl, FormHelperText } from "@mui/material";

const DraftEditor = dynamic(() => import("@/components/reusable/draft-editor/DraftEditor"), {
  ssr: false,
  loading: () => <Loader />,
});

export interface TranslatedTextFormValues {
  textEn: string;
  textAr: string;
}

const TranslatedTextForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (
    values: TranslatedTextFormValues,
    formikHelpers: FormikHelpers<TranslatedTextFormValues>
  ) => void;
  initialValues: TranslatedTextFormValues;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={translatedTextSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FormControl required error={!!errors.textEn && touched.textEn}>
              <div className="mb-2">{t("Text")} (En)</div>

              <DraftEditor
                value={values.textEn}
                onChange={(text) => setFieldValue("textEn", text)}
              />

              {errors?.textEn && touched?.textEn && (
                <FormHelperText>{t(errors?.textEn)}</FormHelperText>
              )}
            </FormControl>

            <FormControl required error={!!errors.textAr && touched.textAr}>
              <div className="mb-2">{t("Text")} (Ar)</div>

              <DraftEditor
                value={values.textAr}
                onChange={(text) => setFieldValue("textAr", text)}
              />

              {errors?.textAr && touched?.textAr && (
                <FormHelperText>{t(errors?.textAr)}</FormHelperText>
              )}
            </FormControl>

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

export default TranslatedTextForm;
