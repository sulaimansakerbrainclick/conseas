import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import testimonialSchema from "@/validation/testimonialSchema";
import UploadImage from "@/components/reusable/upload-image/UploadImage";
import defaultProfileImage from "@/public/assets/images/default-profile-image.svg";
import LoadingButton from "@mui/lab/LoadingButton";

export interface TestimonialFormValues {
  imageFile?: File;
  image?: string | null;
  nameEn: string;
  nameAr: string;
  textEn: string;
  textAr: string;
}

const TestimonialForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (
    values: TestimonialFormValues,
    formikHelpers: FormikHelpers<TestimonialFormValues>
  ) => void;
  initialValues: TestimonialFormValues;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={testimonialSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <UploadImage
              label="Upload Picture"
              image={values.image}
              onChange={(imageFile) => {
                setFieldValue("imageFile", imageFile);
              }}
              error={touched.image && !!errors.image}
              helperText={touched.image && errors.image}
              defaultImage={defaultProfileImage}
            />

            <div className="font-medium text-sm">Basic info</div>

            <div className="flex gap-5">
              <TextField
                name="nameEn"
                value={values.nameEn}
                onChange={(e) => setFieldValue("nameEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Name (En)*")}
                variant="outlined"
                error={touched.nameEn && !!errors.nameEn}
                helperText={touched.nameEn && errors.nameEn}
                size="small"
              />

              <TextField
                name="nameAr"
                value={values.nameAr}
                onChange={(e) => setFieldValue("nameAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Last Name (Ar)*")}
                variant="outlined"
                error={touched.nameAr && !!errors.nameAr}
                helperText={touched.nameAr && errors.nameAr}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <TextField
                name="textEn"
                value={values.textEn}
                onChange={(e) => setFieldValue("textEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Text (En)*")}
                variant="outlined"
                error={touched.textEn && !!errors.textEn}
                helperText={touched.textEn && errors.textEn}
                size="small"
              />

              <TextField
                name="textAr"
                value={values.textAr}
                onChange={(e) => setFieldValue("textAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Text (Ar)*")}
                variant="outlined"
                error={touched.textAr && !!errors.textAr}
                helperText={touched.textAr && errors.textAr}
                size="small"
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

export default TestimonialForm;
