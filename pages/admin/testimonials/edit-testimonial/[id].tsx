import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import showSuccessToast from "@/utils/showSuccessToast";
import { Testimonial } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import _ from "lodash";
import TestimonialForm, {
  TestimonialFormValues,
} from "@/components/forms/testimonial-form/TestimonialForm";
import { FormikHelpers } from "formik";
import Header from "@/components/ui/header/Header";
import testimonialService from "@/services/testimonialService";
import fileService from "@/services/fileService";

export default function EditTestimonial({ testimonial }: { testimonial: Testimonial }) {
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

    const addTestimonialRes = await testimonialService.updateTestimonial(
      { ...values, image },
      token
    );

    showSuccessToast(addTestimonialRes.data.message);
    router.push("/admin/testimonials");
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">Edit Testimonial</h1>

      <TestimonialForm
        onSubmit={handleSubmit}
        initialValues={{
          ...testimonial,
        }}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, query }: any) {
  const { token } = req.session;

  const res = await testimonialService.getTestimonial(query.id, token);
  const testimonial = res.data.data;

  return {
    props: {
      testimonial,
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
