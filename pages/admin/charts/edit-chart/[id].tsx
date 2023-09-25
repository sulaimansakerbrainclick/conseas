import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import showSuccessToast from "@/utils/showSuccessToast";
import { Chart } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import _ from "lodash";
import { FormikHelpers } from "formik";
import Header from "@/components/ui/header/Header";
import chartService from "@/services/chartService";
import { useTranslation } from "next-i18next";
import ChartForm, { ChartFormValues } from "@/components/forms/chart-form/ChartForm";

export default function EditChart({ userChart }: { userChart: Chart }) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const handleSubmit = (
    values: ChartFormValues,
    { setSubmitting }: FormikHelpers<ChartFormValues>
  ) => {
    setSubmitting(true);

    chartService.admin
      .updateChart(values, token)
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
      <h1 className="mb-8">{t("Edit Chart")}</h1>

      {userChart && (
        <ChartForm
          onSubmit={handleSubmit}
          initialValues={{
            ...userChart,
          }}
        />
      )}
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, query }: any) {
  const { token } = req.session;

  const result = await Promise.all([chartService.admin.getChart(query.id, token)]);

  return {
    props: {
      userChart: result[0].data.data,
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
