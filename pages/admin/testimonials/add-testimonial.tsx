import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import Header from "@/components/ui/header/Header";
import TestimonialForm, {
  TestimonialFormValues,
} from "@/components/forms/testimonial-form/TestimonialForm";
import testimonialService from "@/services/testimonialService";
import fileService from "@/services/fileService";

const initialValues: TestimonialFormValues = {
  nameEn: "",
  nameAr: "",
  textEn: "",
  textAr: "",
};

export default function AddTestimonial() {
  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const handleSubmit = async (
    { imageFile, ...values }: TestimonialFormValues,
    { setSubmitting }: FormikHelpers<TestimonialFormValues>
  ) => {
    let image;

    if (imageFile) {
      const uploadRes = await fileService.upload(imageFile, token);
      image = uploadRes.data.data;
    }

    const addTestimonialRes = await testimonialService.addTestimonial({ ...values, image }, token);

    showSuccessToast(addTestimonialRes.data.message);
    router.push("/admin/testimonials");
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">Add Testimonial</h1>

      <TestimonialForm onSubmit={handleSubmit} initialValues={initialValues} />
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
