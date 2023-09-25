import React from "react";
import { FormControlLabel, TextField, FormControl, FormLabel } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "next-i18next";
import { RadioGroup } from "@mui/material";
import { Radio } from "@mui/material";
import { FormHelperText } from "@mui/material";
import profileSchema from "@/validation/profileSchema";
import { Gender } from "@prisma/client";
import UploadImage from "@/components/reusable/upload-image/UploadImage";
import dayjs from "dayjs";
import defaultProfileImage from "@/public/assets/images/default-profile-image.svg";
import LoadingButton from "@mui/lab/LoadingButton";

export interface ProfileFormValues {
  imageFile?: File;
  image?: string | null;
  dateOfBirth: dayjs.Dayjs | null;
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender | "";
  phone: string;
  email: string;
}

const ProfileForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: ProfileFormValues;
  onSubmit: (values: ProfileFormValues, formikHelpers: FormikHelpers<ProfileFormValues>) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik
      validationSchema={profileSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <UploadImage
              label={t("Upload Picture")}
              image={values.image}
              onChange={(imageFile) => {
                setFieldValue("imageFile", imageFile);
              }}
              error={touched.image && !!errors.image}
              helperText={touched.image && t(errors.image || "")}
              defaultImage={defaultProfileImage}
            />

            <div className="font-medium text-sm">{t("Basic Information")}</div>

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

              <div className="flex-1 flex"></div>
            </div>

            <FormControl className="mb-4" error={!!errors.gender && touched.gender}>
              <div className="flex flex-row items-center gap-16">
                <FormLabel id="demo-radio-buttons-group-label">{t("Gender")}</FormLabel>

                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={values.gender}
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

            <div className="flex flex-col lg:flex-row gap-5 mb-8">
              <TextField
                name="phone"
                value={values.phone}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                onBlur={handleBlur}
                label={`${t("Phone Number")}*`}
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
                helperText={touched.email && t(errors.email || "")}
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

export default ProfileForm;
