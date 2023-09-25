import React from "react";
import { TextField } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import { MenuItem } from "@mui/material";
import { AppointmentType } from "@prisma/client";
import LoadingButton from "@mui/lab/LoadingButton";
import submitConsultSchema from "@/validation/submitConsultSchema";
import useIsRtl from "@/components/hooks/useIsRtl";

export interface SubmitConsultFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appointmentTypeId: string;
  notes: string;
}

const SubmitConsultForm = ({
  onSubmit,
  initialValues,
  appointmentTypes,
}: {
  initialValues: SubmitConsultFormValues;
  appointmentTypes: AppointmentType[];
  onSubmit: (
    values: SubmitConsultFormValues,
    formikHelpers: FormikHelpers<SubmitConsultFormValues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  return (
    <Formik
      validationSchema={submitConsultSchema}
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex gap-5">
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

            <TextField
              name="email"
              id="email"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              onBlur={handleBlur}
              label={t("Email")}
              variant="outlined"
              error={!!errors.email && touched.email}
              helperText={touched.email && t(errors.email || "")}
              size="small"
            />

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
              select
              name="type"
              value={values.appointmentTypeId}
              onChange={(e) => setFieldValue("appointmentTypeId", e.target.value)}
              onBlur={handleBlur}
              variant="outlined"
              label={t("Appointment Type")}
              error={touched.appointmentTypeId && !!errors.appointmentTypeId}
              helperText={touched.appointmentTypeId && t(errors.appointmentTypeId || "")}
              size="small"
            >
              {appointmentTypes.map(({ id, nameEn, nameAr }) => (
                <MenuItem key={id} value={id}>
                  {isRtl ? nameAr : nameEn}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="notes"
              value={values.notes}
              onChange={(e) => setFieldValue("notes", e.target.value)}
              onBlur={handleBlur}
              label={t("Extra Notes")}
              variant="outlined"
              error={touched.notes && !!errors.notes}
              helperText={touched.notes && t(errors.notes || "")}
              size="small"
              multiline
              rows={2}
            />

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {t("Submit")}
            </LoadingButton>
          </form>
        );
      }}
    </Formik>
  );
};

export default SubmitConsultForm;
