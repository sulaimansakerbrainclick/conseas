import React from "react";
import { FormControlLabel, TextField, FormControl, FormLabel } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "next-i18next";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { FormHelperText } from "@mui/material";
import doctorSchema from "@/validation/doctorSchema";
import { Gender } from "@prisma/client";
import UploadImage from "@/components/reusable/upload-image/UploadImage";
import dayjs from "dayjs";
import defaultProfileImage from "@/public/assets/images/default-profile-image.svg";
import LoadingButton from "@mui/lab/LoadingButton";

export interface DoctorFormValues {
  imageFile?: File;
  image?: string | null;
  dateOfBirth: dayjs.Dayjs | null;
  graduationDate: dayjs.Dayjs | null;
  email: string;
  phone: string;
  gender: Gender | "";
  firstNameEn: string;
  lastNameEn: string;
  firstNameAr: string;
  lastNameAr: string;
  location: string;
  specializationEn: string;
  specializationAr: string;
  yearsOfExperience: number;
  workplaceEn: string;
  workplaceAr: string;
  country: string;
  city: string;
}

const DoctorForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (values: DoctorFormValues, formikHelpers: FormikHelpers<DoctorFormValues>) => void;
  initialValues: DoctorFormValues;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={doctorSchema}
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
                name="firstNameEn"
                value={values.firstNameEn}
                onChange={(e) => setFieldValue("firstNameEn", e.target.value)}
                onBlur={handleBlur}
                label={t("First Name (En)*")}
                variant="outlined"
                error={touched.firstNameEn && !!errors.firstNameEn}
                helperText={touched.firstNameEn && errors.firstNameEn}
                size="small"
              />

              <TextField
                name="lastNameEn"
                value={values.lastNameEn}
                onChange={(e) => setFieldValue("lastNameEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Last Name (En)*")}
                variant="outlined"
                error={touched.lastNameEn && !!errors.lastNameEn}
                helperText={touched.lastNameEn && errors.lastNameEn}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <TextField
                name="firstNameAr"
                value={values.firstNameAr}
                onChange={(e) => setFieldValue("firstNameAr", e.target.value)}
                onBlur={handleBlur}
                label={t("First Name (Ar)*")}
                variant="outlined"
                error={touched.firstNameAr && !!errors.firstNameAr}
                helperText={touched.firstNameAr && errors.firstNameAr}
                size="small"
              />

              <TextField
                name="lastNameAr"
                value={values.lastNameAr}
                onChange={(e) => setFieldValue("lastNameAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Last Name (Ar)*")}
                variant="outlined"
                error={touched.lastNameAr && !!errors.lastNameAr}
                helperText={touched.lastNameAr && errors.lastNameAr}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <div className="flex-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth*"
                    defaultValue={values.dateOfBirth}
                    slotProps={{
                      textField: {
                        size: "small",
                        onBlur: handleBlur,
                        error: !!errors.dateOfBirth,
                        helperText: errors.dateOfBirth as string,
                      },
                    }}
                    onChange={(newValue: any) => setFieldValue("dateOfBirth", newValue)}
                  />
                </LocalizationProvider>
              </div>

              <div className="flex-1 flex">
                <TextField
                  name="location"
                  value={values.location}
                  onChange={(e) => setFieldValue("location", e.target.value)}
                  onBlur={handleBlur}
                  label={t("location")}
                  variant="outlined"
                  error={touched.location && !!errors.location}
                  helperText={touched.location && errors.location}
                  size="small"
                />
              </div>
            </div>

            <FormControl className="mb-4" error={!!errors.gender && touched.gender}>
              <div className="flex flex-row items-center gap-16">
                <FormLabel id="demo-gender-label">Gender</FormLabel>

                <RadioGroup
                  row
                  aria-labelledby="demo-gender-label"
                  name="gender"
                  value={values.gender}
                  onChange={(e) => setFieldValue("gender", e.target.value)}
                >
                  <FormControlLabel
                    className="p-0 m-0"
                    value={Gender.Femelle}
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    className="p-0 m-0"
                    value={Gender.Male}
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </div>

              {errors?.gender && touched?.gender && (
                <FormHelperText>{errors?.gender}</FormHelperText>
              )}
            </FormControl>

            <div className="font-medium text-sm">Contact information</div>

            <div className="flex gap-5 mb-8">
              <TextField
                name="phone"
                value={values.phone}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                onBlur={handleBlur}
                label={t("Phone Number*")}
                variant="outlined"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
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
                helperText={touched.email && errors.email}
                size="small"
              />
            </div>

            <div className="font-medium text-sm">Specialization</div>

            <div className="flex gap-5">
              <TextField
                name="specializationEn"
                value={values.specializationEn}
                onChange={(e) => setFieldValue("specializationEn", e.target.value)}
                onBlur={handleBlur}
                label={t("SpecializationEn")}
                variant="outlined"
                error={touched.specializationEn && !!errors.specializationEn}
                helperText={touched.specializationEn && errors.specializationEn}
                size="small"
              />

              <TextField
                name="specializationAr"
                value={values.specializationAr}
                onChange={(e) => setFieldValue("specializationAr", e.target.value)}
                onBlur={handleBlur}
                label={t("SpecializationAr")}
                variant="outlined"
                error={touched.specializationAr && !!errors.specializationAr}
                helperText={touched.specializationAr && errors.specializationAr}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Graduation Date"
                  defaultValue={values.graduationDate}
                  slotProps={{
                    textField: {
                      size: "small",
                      onBlur: handleBlur,
                      error: !!errors.graduationDate,
                      helperText: errors.graduationDate as string,
                    },
                  }}
                  onChange={(newValue: any) => setFieldValue("graduationDate", newValue)}
                />
              </LocalizationProvider>

              <TextField
                name="workplaceEn"
                value={values.workplaceEn}
                onChange={(e) => setFieldValue("workplaceEn", e.target.value)}
                onBlur={handleBlur}
                label={t("Workplace (En)")}
                variant="outlined"
                error={touched.workplaceEn && !!errors.workplaceEn}
                helperText={touched.workplaceEn && errors.workplaceEn}
                size="small"
              />
            </div>

            <div className="flex gap-5">
              <TextField
                name="workplaceAr"
                value={values.workplaceAr}
                onChange={(e) => setFieldValue("workplaceAr", e.target.value)}
                onBlur={handleBlur}
                label={t("Workplace (Ar)")}
                variant="outlined"
                error={touched.workplaceAr && !!errors.workplaceAr}
                helperText={touched.workplaceAr && errors.workplaceAr}
                size="small"
              />

              <TextField
                name="country"
                id="country"
                value={values.country}
                onChange={(e) => setFieldValue("country", e.target.value)}
                onBlur={handleBlur}
                label={t("Country")}
                variant="outlined"
                error={!!errors.country && touched.country}
                helperText={touched.country && errors.country}
                size="small"
              />
            </div>

            <div className="flex gap-5 mb-8">
              <TextField
                name="city"
                value={values.city}
                onChange={(e) => setFieldValue("city", e.target.value)}
                onBlur={handleBlur}
                label={t("City")}
                variant="outlined"
                error={touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                size="small"
              />

              <TextField
                type="number"
                name="yearsOfExperience"
                id="yearsOfExperience"
                value={values.yearsOfExperience}
                onChange={(e) =>
                  setFieldValue("yearsOfExperience", e.target.value ? e.target.value : null)
                }
                onBlur={handleBlur}
                label={t("Years Of Experience")}
                variant="outlined"
                error={!!errors.yearsOfExperience && touched.yearsOfExperience}
                helperText={touched.yearsOfExperience && errors.yearsOfExperience}
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

export default DoctorForm;
