import SubmitConsultForm, {
  SubmitConsultFormValues,
} from "@/components/forms/submit-consult-form/SubmitConsultForm";
import Image from "next/image";
import bookServiceImage from "@/public/assets/images/book-service.svg";
import { useTranslation } from "next-i18next";
import appointmentService from "@/services/appointmentService";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import { AppointmentType } from "@prisma/client";

const BookService = ({ appointmentTypes }: { appointmentTypes: AppointmentType[] }) => {
  const { t } = useTranslation("common");

  const handleSubmit = (
    values: SubmitConsultFormValues,
    { setSubmitting, resetForm }: FormikHelpers<SubmitConsultFormValues>
  ) => {
    setSubmitting(true);

    appointmentService
      .addAppointment(values)
      .then((res) => {
        showSuccessToast(res.data.message);
        resetForm();
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex" id="make-appointment">
      <div className="flex-2">
        <h2 className="text-4xl uppercase mb-8">{t("Book a Service")}</h2>

        <div>
          <div className="mb-4.5 font-medium text-xl">{t("Enter Details")}</div>

          <SubmitConsultForm
            appointmentTypes={appointmentTypes}
            onSubmit={handleSubmit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              appointmentTypeId: "",
              notes: "",
            }}
          />
        </div>
      </div>

      <div className="hidden lg:flex flex-3">
        <Image src={bookServiceImage} alt="" className="w-full" sizes="100vw" />
      </div>
    </div>
  );
};

export default BookService;
