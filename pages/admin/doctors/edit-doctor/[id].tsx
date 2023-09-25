import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import showSuccessToast from "@/utils/showSuccessToast";
import { Doctor } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import _ from "lodash";
import DoctorForm, { DoctorFormValues } from "@/components/forms/doctor-form/DoctorForm";
import dayjs from "dayjs";
import { FormikHelpers } from "formik";
import Header from "@/components/ui/header/Header";
import fileService from "@/services/fileService";
import doctorService from "@/services/doctorService";

export default function EditDoctor({ doctor }: { doctor: Doctor }) {
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

    const addDoctorRes = await doctorService.updateDoctor(newValues, token);

    showSuccessToast(addDoctorRes.data.message);
    router.push("/admin/doctors");
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">Edit Doctor</h1>

      <DoctorForm
        onSubmit={handleSubmit}
        initialValues={{
          ...doctor,
          email: doctor.email || "",
          location: doctor.location || "",
          workplaceEn: doctor.workplaceEn || "",
          workplaceAr: doctor.workplaceAr || "",
          country: doctor.country || "",
          city: doctor.city || "",
          yearsOfExperience: doctor.yearsOfExperience || 0,
          dateOfBirth: doctor.dateOfBirth ? dayjs(doctor.dateOfBirth) : null,
          graduationDate: doctor.graduationDate ? dayjs(doctor.graduationDate) : null,
        }}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, query }: any) {
  const { token } = req.session;

  const res = await doctorService.getDoctor(query.id, token);
  const doctor = res.data.data;

  return {
    props: {
      doctor,
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
