import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import textSchema from "@/validation/textSchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface ChatFormValues {
  text: string;
}

const ChatForm = ({
  label,
  onSubmit,
  initialValues,
}: {
  label: string;
  initialValues: ChatFormValues;
  onSubmit: (values: ChatFormValues, formikHelpers: FormikHelpers<ChatFormValues>) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={textSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              name="text"
              value={values.text}
              onChange={(e) => setFieldValue("text", e.target.value)}
              onBlur={handleBlur}
              label={label}
              variant="outlined"
              error={touched.text && !!errors.text}
              helperText={touched.text && t(errors.text || "")}
              size="small"
              multiline
              rows={4}
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

export default ChatForm;
