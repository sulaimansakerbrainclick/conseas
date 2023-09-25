import UploadDoctorReportForm, {
  UploadMyMedicalReportFormValues,
} from "@/components/forms/upload-doctor-report-form/UploadDoctorReportForm";
import { FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";

const UploadDoctorReportStep = ({
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
    <div>
      <div className="font-bold text-3xl text-color-1 mb-13 text-center">
        {t("Let's take a look at your scans")}
      </div>

      <div className="mb-5">{t("Upload Your Medical Reports")}</div>

      <p className="mb-10">
        {t(
          "To allow your Conseas radiologist to get the most context on your case, uploading your doctor's report about your scan(s) is advised."
        )}
      </p>

      <UploadDoctorReportForm onNext={onNext} initialValues={initialValues} />
    </div>
  );
};

export default UploadDoctorReportStep;
