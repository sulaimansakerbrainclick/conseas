import DoctorForm, { DoctorFormValues } from "@/components/forms/doctor-form/DoctorForm";
import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import doctorService from "@/services/doctorService";
import showSuccessToast from "@/utils/showSuccessToast";
import dayjs from "dayjs";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import Header from "@/components/ui/header/Header";
import fileService from "@/services/fileService";

const initialValues: DoctorFormValues = {
  email: "",
  phone: "",
  gender: "",
  firstNameEn: "",
  lastNameEn: "",
  firstNameAr: "",
  lastNameAr: "",
  image: "",
  location: "",
  dateOfBirth: null,
  graduationDate: null,
  specializationEn: "",
  specializationAr: "",
  yearsOfExperience: 0,
  workplaceEn: "",
  workplaceAr: "",
  country: "",
  city: "",
};

export default function AddDoctor() {
  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const handleSubmit = async (
    { imageFile, ...values }: DoctorFormValues,
    { setSubmitting }: FormikHelpers<DoctorFormValues>
  ) => {
    let image;

    if (imageFile) {
      const uploadRes = await fileService.upload(imageFile, token);
      image = uploadRes.data.data;
    }

    const newValues = {
      ...values,
      image,
      dateOfBirth: dayjs(values.dateOfBirth).toISOString(),
      graduationDate: values.graduationDate ? dayjs(values.graduationDate).toISOString() : null,
    };

    const addDoctorRes = await doctorService.addDoctor(newValues, token);

    showSuccessToast(addDoctorRes.data.message);
    router.push("/admin/doctors");
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">Add Doctor</h1>

      <DoctorForm onSubmit={handleSubmit} initialValues={initialValues} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  return {
    props: {
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
