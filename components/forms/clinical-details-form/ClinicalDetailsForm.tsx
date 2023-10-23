import React from "react";
import { FormControlLabel, TextField, FormControl, FormLabel } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "next-i18next";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { FormHelperText } from "@mui/material";
import ClinicalDetailsSchema from "@/validation/ClinicalDetailsSchema";
import { Gender } from "@prisma/client";
import dayjs from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { UploadMyMedicalReportFormValues } from "../upload-doctor-report-form/UploadDoctorReportForm";

export interface ClinicalDetailsFormValues extends UploadMyMedicalReportFormValues {
  dateOfBirth?: string;
  firstName: string;
  lastName: string;
  gender?: Gender;
  phone: string;
  email: string;
  medicalInformation: string;
}

const ClinicalDetailsForm = ({
  initialValues,
  onNext,
  onPrevious,
}: {
  initialValues: ClinicalDetailsFormValues;
  onNext: (values: ClinicalDetailsFormValues, formikHelpers: FormikHelpers<any>) => void;
  onPrevious(): void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={ClinicalDetailsSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onNext}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        setFieldTouched,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="font-medium text-sm">{t("Client Information")}</div>

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
              <div className="flex-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={`${t("Date of Birth")}*`}
                    defaultValue={values.dateOfBirth && dayjs(values.dateOfBirth)}
                    slotProps={{
                      textField: {
                        size: "small",
                        onBlur: handleBlur,
                        error: !!errors.dateOfBirth,
                        helperText: t(errors.dateOfBirth || ""),
                      },
                    }}
                    onChange={(newValue: any) =>
                      setFieldValue("dateOfBirth", dayjs(newValue).toISOString())
                    }
                  />
                </LocalizationProvider>
              </div>

              <div className="flex-1 flex"></div>
            </div>

            <FormControl className="mb-4" error={!!errors.gender && touched.gender}>
              <div className="flex flex-row items-center gap-16">
                <FormLabel id="demo-radio-buttons-group-label">{t("Gender")}</FormLabel>

                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  defaultValue={values.gender}
                  onChange={(e) => setFieldValue("gender", e.target.value)}
                >
                  <FormControlLabel
                    className="p-0 m-0"
                    value={Gender.Femelle}
                    control={<Radio />}
                    label={t("Female")}
                  />
                  <FormControlLabel
                    className="p-0 m-0"
                    value={Gender.Male}
                    control={<Radio />}
                    label={t("Male")}
                  />
                </RadioGroup>
              </div>

              {errors?.gender && touched?.gender && (
                <FormHelperText>{errors?.gender}</FormHelperText>
              )}
            </FormControl>

            <div className="font-medium text-sm">{t("Contact information")}</div>

            <div className="flex flex-col lg:flex-row gap-5 mb-4">
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

            <div className="font-medium text-sm">{t("More Information")}</div>

            <div className="flex flex-col lg:flex-row gap-5 mb-8">
              <TextField
                name="medicalInformation"
                value={values.medicalInformation}
                onChange={(e) => setFieldValue("medicalInformation", e.target.value)}
                onBlur={handleBlur}
                label={t("Medical information")}
                variant="outlined"
                error={touched.medicalInformation && !!errors.medicalInformation}
                helperText={touched.medicalInformation && t(errors.medicalInformation || "")}
                size="small"
                multiline
                maxRows={4}
              />
            </div>

            <div className="flex gap-4">
              <LoadingButton type="button" variant="contained" onClick={onPrevious}>
                {t("Previous")}
              </LoadingButton>

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {t("Next")}
              </LoadingButton>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default ClinicalDetailsForm;
