import UploadButton from "@/components/reusable/upload-button/UploadButton";
import { LoadingButton } from "@mui/lab";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { Button, FormControl, FormGroup } from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";

export interface UploadMyMedicalReportFormValues {
  myMedicalReportFile?: File;
  myMedicalReportUrl?: string;
  haveMyMedicalReport: boolean;
}

const UploadDoctorReportForm = ({
  initialValues,
  onNext,
}: {
  initialValues: UploadMyMedicalReportFormValues;
  onNext: (
    values: UploadMyMedicalReportFormValues,
    formikHelpers?: FormikHelpers<UploadMyMedicalReportFormValues>
  ) => void;
}) => {
  const { t } = useTranslation("common");

  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={onNext}>
      {({ values, errors, touched, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row mb-10.5 gap-5 lg:gap-10">
              <UploadButton
                onChange={(file: File) => setFieldValue("myMedicalReportFile", file)}
                disabled={!values.haveMyMedicalReport}
              >
                {t("Upload Your Medical Reports")}
              </UploadButton>

              {/* <Button type="button">{t("How to get the link")}</Button> */}
            </div>

            <FormControl
              required
              error={!!errors.haveMyMedicalReport && touched.haveMyMedicalReport}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={!!values.myMedicalReportFile || !!values.myMedicalReportUrl}
                      checked={!values.haveMyMedicalReport}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue("haveMyMedicalReport", !e.target.checked)
                      }
                    />
                  }
                  label={t("I do not have a doctor's report")}
                />
              </FormGroup>

              {errors?.haveMyMedicalReport && touched?.haveMyMedicalReport && (
                <FormHelperText>{t(errors?.haveMyMedicalReport)}</FormHelperText>
              )}
            </FormControl>

            <div className="flex gap-4">
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!values.myMedicalReportFile && values.haveMyMedicalReport}
              >
                {t("Next")}
              </LoadingButton>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default UploadDoctorReportForm;
