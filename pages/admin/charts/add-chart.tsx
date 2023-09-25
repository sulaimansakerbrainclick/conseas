import Header from "@/components/ui/header/Header";
import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import chartService from "@/services/chartService";
import ChartForm, { ChartFormValues } from "@/components/forms/chart-form/ChartForm";

const initialValues: ChartFormValues = {
  nameEn: "",
  nameAr: "",
  price: 0,
  interval: "",
  intervalCount: 0,
  descriptionEn: "",
  descriptionAr: "",
};

export default function AddChart() {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const handleSubmit = (
    values: ChartFormValues,
    { setSubmitting }: FormikHelpers<ChartFormValues>
  ) => {
    setSubmitting(true);

    chartService.admin
      .addChart(values, token)
      .then((res) => {
        showSuccessToast(res.data.message);
        router.push("/admin/charts");
      })
      .catch((e) => {
        setSubmitting(false);
      });
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Add Chart")}</h1>

      <ChartForm onSubmit={handleSubmit} initialValues={initialValues} />
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
