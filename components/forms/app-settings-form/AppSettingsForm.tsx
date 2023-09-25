import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import appSettingsSchema from "@/validation/appSettingsSchema";
import LoadingButton from "@mui/lab/LoadingButton";

export interface AppSettingFormValues {
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubTitleEn: string;
  heroSubTitleAr: string;

  shortDescritionEn: string;
  shortDescritionAr: string;

  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;

  addressEn: string;
  addressAr: string;

  callUs: string;
  email: string;
  whatsapp: string;
}

const AppSettingsForm = ({
  onSubmit,
  initialValues,
}: {
  initialValues: AppSettingFormValues;
  onSubmit: (
    values: AppSettingFormValues,
    formikHelpers: FormikHelpers<AppSettingFormValues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={appSettingsSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="heroTitleEn"
                value={values.heroTitleEn}
                onChange={(e) => setFieldValue("heroTitleEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Hero Title (En)*")}
                variant="outlined"
                error={touched.heroTitleEn && !!errors.heroTitleEn}
                helperText={touched.heroTitleEn && errors.heroTitleEn}
                size="small"
              />

              <TextField
                name="heroTitleAr"
                value={values.heroTitleAr}
                onChange={(e) => setFieldValue("heroTitleAr", e.target.value)}
                onBlur={handleBlur}
                variant="outlined"
                label={t("Hero Title (Ar)*")}
                error={touched.heroTitleAr && !!errors.heroTitleAr}
                helperText={touched.heroTitleAr && errors.heroTitleAr}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="heroSubTitleEn"
                value={values.heroSubTitleEn}
                onChange={(e) => setFieldValue("heroSubTitleEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Hero Sub Title (En)*")}
                variant="outlined"
                error={touched.heroSubTitleEn && !!errors.heroSubTitleEn}
                helperText={touched.heroSubTitleEn && errors.heroSubTitleEn}
                size="small"
              />

              <TextField
                name="heroSubTitleAr"
                value={values.heroSubTitleAr}
                onChange={(e) => setFieldValue("heroSubTitleAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Hero Sub Title (Ar)*")}
                variant="outlined"
                error={touched.heroSubTitleAr && !!errors.heroSubTitleAr}
                helperText={touched.heroSubTitleAr && errors.heroSubTitleAr}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="shortDescritionEn"
                value={values.shortDescritionEn}
                onChange={(e) => setFieldValue("shortDescritionEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Short Descrition (En)*")}
                variant="outlined"
                error={touched.shortDescritionEn && !!errors.shortDescritionEn}
                helperText={touched.shortDescritionEn && errors.shortDescritionEn}
                size="small"
              />

              <TextField
                name="shortDescritionAr"
                value={values.shortDescritionAr}
                onChange={(e) => setFieldValue("shortDescritionAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Short Descrition (Ar)*")}
                variant="outlined"
                error={touched.shortDescritionAr && !!errors.shortDescritionAr}
                helperText={touched.shortDescritionAr && errors.shortDescritionAr}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="facebookLink"
                value={values.facebookLink}
                onChange={(e) => setFieldValue("facebookLink", e.target.value)}
                onBlur={handleBlur}
                label={t("Facebook Link*")}
                variant="outlined"
                error={touched.facebookLink && !!errors.facebookLink}
                helperText={touched.facebookLink && errors.facebookLink}
                size="small"
              />

              <TextField
                name="twitterLink"
                value={values.twitterLink}
                onChange={(e) => setFieldValue("twitterLink", e.target.value)}
                onBlur={handleBlur}
                label={t("Twitter Link*")}
                variant="outlined"
                error={touched.twitterLink && !!errors.twitterLink}
                helperText={touched.twitterLink && errors.twitterLink}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="instagramLink"
                value={values.instagramLink}
                onChange={(e) => setFieldValue("instagramLink", e.target.value)}
                onBlur={handleBlur}
                label={t("Instagram Link*")}
                variant="outlined"
                error={touched.instagramLink && !!errors.instagramLink}
                helperText={touched.instagramLink && errors.instagramLink}
                size="small"
              />

              <TextField
                name="linkedinLink"
                value={values.linkedinLink}
                onChange={(e) => setFieldValue("linkedinLink", e.target.value)}
                onBlur={handleBlur}
                label={t("Linkedin Link*")}
                variant="outlined"
                error={touched.linkedinLink && !!errors.linkedinLink}
                helperText={touched.linkedinLink && errors.linkedinLink}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="addressEn"
                value={values.addressEn}
                onChange={(e) => setFieldValue("addressEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Address (En)*")}
                variant="outlined"
                error={touched.addressEn && !!errors.addressEn}
                helperText={touched.addressEn && errors.addressEn}
                size="small"
              />

              <TextField
                name="addressAr"
                value={values.addressAr}
                onChange={(e) => setFieldValue("addressAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Address (Ar)*")}
                variant="outlined"
                error={touched.addressAr && !!errors.addressAr}
                helperText={touched.addressAr && errors.addressAr}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="callUs"
                value={values.callUs}
                onChange={(e) => setFieldValue("callUs", e.target.value)}
                onBlur={handleBlur}
                label={t("Call Us*")}
                variant="outlined"
                error={touched.callUs && !!errors.callUs}
                helperText={touched.callUs && errors.callUs}
                size="small"
              />

              <TextField
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => setFieldValue("email", e.target.value)}
                onBlur={handleBlur}
                label={t("Email*")}
                variant="outlined"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                size="small"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
              <TextField
                name="whatsapp"
                value={values.whatsapp}
                onChange={(e) => setFieldValue("whatsapp", e.target.value)}
                onBlur={handleBlur}
                label={t("Whatsapp*")}
                variant="outlined"
                error={touched.whatsapp && !!errors.whatsapp}
                helperText={touched.whatsapp && errors.whatsapp}
                size="small"
                className="flex-1"
              />

              <div className="flex-1"></div>
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

export default AppSettingsForm;
