import React from "react";
import { TextField, MenuItem, FormControl, FormHelperText } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import { Service } from "@prisma/client";
import serviceSchema from "@/validation/serviceSchema";
import UploadImage from "@/components/reusable/upload-image/UploadImage";
import defaultProfileImage from "@/public/assets/images/default-profile-image.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import dynamic from "next/dynamic";
import Loader from "@/components/reusable/loader";

const Editor = dynamic(() => import("@/components/reusable/editor/Editor"), {
  ssr: false,
  loading: () => <Loader />,
});

export interface ServiceFormValues {
  imageFile?: File;
  image?: string | null;
  whiteImageFile?: File;
  whiteImage?: string | null;
  nameEn: string;
  nameAr: string;
  priceUSD: number;
  priceAED: number;
  parentId: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  descriptionEn: string;
  descriptionAr: string;
}

const ServiceForm = ({
  mainServices,
  onSubmit,
  initialValues,
}: {
  mainServices?: Service[];
  onSubmit: (values: ServiceFormValues, formikHelpers: FormikHelpers<ServiceFormValues>) => void;
  initialValues: ServiceFormValues;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={serviceSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5 mb-2">
              <div className="flex-1">
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
              </div>

              <div className="flex-1">
                <UploadImage
                  label="Upload White Picture"
                  image={values.whiteImage}
                  onChange={(imageFile) => {
                    setFieldValue("whiteImageFile", imageFile);
                  }}
                  error={touched.whiteImage && !!errors.whiteImage}
                  helperText={touched.whiteImage && errors.whiteImage}
                  defaultImage={defaultProfileImage}
                  imageClassName={values.whiteImage ? "bg-color-1" : ""}
                />
              </div>
            </div>

            <div className="flex gap-5">
              {mainServices && mainServices.length !== 0 && (
                <TextField
                  select
                  name="parentId"
                  value={values.parentId}
                  onChange={(e) => setFieldValue("parentId", e.target.value)}
                  onBlur={handleBlur}
                  variant="outlined"
                  label={t("Parent Service")}
                  error={touched.parentId && !!errors.parentId}
                  helperText={touched.parentId && errors.parentId}
                  size="small"
                >
                  {mainServices.map(({ id, nameEn }, index: number) => (
                    <MenuItem key={id} value={id}>
                      {nameEn}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <TextField
                name="nameEn"
                value={values.nameEn}
                onChange={(e) => setFieldValue("nameEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Service name (En)*")}
                variant="outlined"
                error={touched.nameEn && !!errors.nameEn}
                helperText={touched.nameEn && errors.nameEn}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <TextField
                name="nameAr"
                value={values.nameAr}
                onChange={(e) => setFieldValue("nameAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Service name (Ar)*")}
                variant="outlined"
                error={touched.nameAr && !!errors.nameAr}
                helperText={touched.nameAr && errors.nameAr}
                size="small"
              />

              <TextField
                name="shortDescriptionEn"
                value={values.shortDescriptionEn}
                onChange={(e) => setFieldValue("shortDescriptionEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Short Description (En)")}
                variant="outlined"
                error={touched.shortDescriptionEn && !!errors.shortDescriptionEn}
                helperText={touched.shortDescriptionEn && errors.shortDescriptionEn}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <TextField
                name="shortDescriptionAr"
                value={values.shortDescriptionAr}
                onChange={(e) => setFieldValue("shortDescriptionAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Short Description (Ar)")}
                variant="outlined"
                error={touched.shortDescriptionAr && !!errors.shortDescriptionAr}
                helperText={touched.shortDescriptionAr && errors.shortDescriptionAr}
                size="small"
              />

              <TextField
                type="number"
                name="priceUSD"
                label={`${t("Price (USD)")}*`}
                value={values.priceUSD}
                onChange={(e) => setFieldValue("priceUSD", e.target.value)}
                onBlur={handleBlur}
                variant="outlined"
                error={touched.priceUSD && !!errors.priceUSD}
                helperText={touched.priceUSD && errors.priceUSD}
                size="small"
              />

              <TextField
                type="number"
                name="priceAED"
                label={`${t("Price (AED)")}*`}
                value={values.priceAED}
                onChange={(e) => setFieldValue("priceAED", e.target.value)}
                onBlur={handleBlur}
                variant="outlined"
                error={touched.priceAED && !!errors.priceAED}
                helperText={touched.priceAED && errors.priceAED}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <FormControl required error={!!errors.descriptionEn && touched.descriptionEn}>
                <div className="mb-2">{`${t("Description (En)")}*`}</div>

                <Editor
                  value={values.descriptionEn}
                  onChange={(text) => setFieldValue("descriptionEn", text)}
                />

                {errors?.descriptionEn && touched?.descriptionEn && (
                  <FormHelperText>{t(errors?.descriptionEn)}</FormHelperText>
                )}
              </FormControl>

              <FormControl required error={!!errors.descriptionAr && touched.descriptionAr}>
                <div className="mb-2">{`${t("Description (Ar)")}*`}</div>

                <Editor
                  value={values.descriptionAr}
                  onChange={(text) => setFieldValue("descriptionAr", text)}
                />

                {errors?.descriptionAr && touched?.descriptionAr && (
                  <FormHelperText>{t(errors?.descriptionAr)}</FormHelperText>
                )}
              </FormControl>
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

export default ServiceForm;
