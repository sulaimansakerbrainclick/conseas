import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import LoadingButton from "@mui/lab/LoadingButton";
import chartSchema from "@/validation/chartSchema";
import Interval from "@/enums/Interval";

export interface ChartFormValues {
  nameEn: string;
  nameAr: string;
  priceUSD: number;
  priceAED: number;
  interval: string;
  intervalCount: number;
  descriptionEn: string;
  descriptionAr: string;
}

const ChartForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (values: ChartFormValues, formikHelpers: FormikHelpers<ChartFormValues>) => void;
  initialValues: ChartFormValues;
  disabled?: boolean;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={chartSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5">
              <TextField
                name="nameEn"
                value={values.nameEn}
                onChange={(e) => setFieldValue("nameEn", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Name (En)")}*`}
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
                label={`${t("Name (Ar)")}*`}
                variant="outlined"
                error={touched.nameAr && !!errors.nameAr}
                helperText={touched.nameAr && errors.nameAr}
                size="small"
              />
            </div>

            <div className="flex gap-5">
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
              <TextField
                select
                name="interval"
                value={values.interval}
                onChange={(e) => setFieldValue("interval", e.target.value)}
                onBlur={handleBlur}
                variant="outlined"
                label={`${t("Appointment Interval")}*`}
                error={touched.interval && !!errors.interval}
                helperText={touched.interval && t(errors.interval || "")}
                size="small"
              >
                {Object.entries(Interval).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {t(key)}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                type="number"
                name="intervalCount"
                value={values.intervalCount}
                onChange={(e) => setFieldValue("intervalCount", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Interval Count")}*`}
                variant="outlined"
                error={touched.intervalCount && !!errors.intervalCount}
                helperText={touched.intervalCount && errors.intervalCount}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <TextField
                name="descriptionEn"
                value={values.descriptionEn}
                onChange={(e) => setFieldValue("descriptionEn", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Description (En)")}*`}
                variant="outlined"
                error={!!errors.descriptionEn && touched.descriptionEn}
                helperText={touched.descriptionEn && errors.descriptionEn}
                size="small"
                multiline
                maxRows={4}
              />

              <TextField
                name="descriptionAr"
                value={values.descriptionAr}
                onChange={(e) => setFieldValue("descriptionAr", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Description (Ar)")}*`}
                variant="outlined"
                error={!!errors.descriptionAr && touched.descriptionAr}
                helperText={touched.descriptionAr && errors.descriptionAr}
                size="small"
                multiline
                maxRows={4}
              />
            </div>

            <div className="flex gap-5"></div>

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

export default ChartForm;
