import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Chart, ChartPrice } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import showSuccessToast from "@/utils/showSuccessToast";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Header from "@/components/ui/header/Header";
import ChartTable from "@/components/tables/ChartTable";
import chartService from "@/services/chartService";

export default function Charts({ charts }: { charts: (Chart & { prices: ChartPrice[] })[] }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const deleteChart = (id: string) => {
    chartService.admin
      .deleteChart(id, token)
      .then((res) => {
        showSuccessToast(res.data.message);

        router.push(router.asPath);
      })
      .catch((e) => {});
  };

  const addChart = () => {
    router.push(`/admin/charts/add-chart/`);
  };

  const editChart = (id: string) => {
    router.push(`/admin/charts/edit-chart/${id}`);
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Charts")}</h1>

      <Link href={`/admin/charts/add-chart/`}>
        <Button variant="contained" onClick={addChart} className="mb-6.5">
          + {t("Add Chart")}
        </Button>
      </Link>

      <ChartTable charts={charts} deleteChart={deleteChart} editChart={editChart} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const res = await chartService.user.getAllCharts();
  const charts = res.data.data;

  return {
    props: {
      session: req.session,
      charts,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
