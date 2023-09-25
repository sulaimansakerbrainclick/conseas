import ClinicalDetailsForm, {
  ClinicalDetailsFormValues,
} from "@/components/forms/clinical-details-form/ClinicalDetailsForm";
import { FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";

const ClinicalDetailsStep = ({
  initialValues,
  onNext,
  onPrevious,
}: {
  initialValues: ClinicalDetailsFormValues;
  onNext: (
    values: ClinicalDetailsFormValues,
    formikHelpers: FormikHelpers<ClinicalDetailsFormValues>
  ) => void;
  onPrevious(): void;
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="font-bold text-3xl text-color-1 mb-13 text-center">
        {t("Your Clinical Details")}
      </div>

      <ClinicalDetailsForm onPrevious={onPrevious} onNext={onNext} initialValues={initialValues} />
    </>
  );
};

export default ClinicalDetailsStep;
