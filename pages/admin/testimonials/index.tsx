import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Testimonial } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import showSuccessToast from "@/utils/showSuccessToast";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import testimonialService from "@/services/testimonialService";
import Header from "@/components/ui/header/Header";
import TestimonialTable from "@/components/tables/TestimonialTable";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const addTestimonial = () => {
    router.push(`/admin/testimonials/add-testimonial/`);
  };

  const editTestimonial = (id: string) => {
    router.push(`/admin/testimonials/edit-testimonial/${id}`);
  };

  const deleteTestimonial = (id: string) => {
    testimonialService
      .deleteTestimonial(id, token)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {});

    router.push(router.asPath);
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Testimonials")}</h1>

      <Link href={`/admin/testimonials/add-testimonial/`}>
        <Button variant="contained" onClick={addTestimonial} className="mb-6.5">
          + {t("Add Testimonial")}
        </Button>
      </Link>

      <TestimonialTable
        testimonials={testimonials}
        editTestimonial={editTestimonial}
        deleteTestimonial={deleteTestimonial}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await testimonialService.getAllTestimonials(token);
  const testimonials = res.data.data;

  return {
    props: {
      session: req.session,
      testimonials,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
