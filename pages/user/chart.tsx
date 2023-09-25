import Header from "@/components/ui/header/Header";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Chart, Service, UserChart } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Table from "@mui/material/Table";
import { Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "next-i18next";
import serviceService from "@/services/serviceService";
import Footer from "@/components/ui/footer/Footer";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import dayjs from "dayjs";
import dateTimeFormat from "@/configs/dateTimeFormat";
import userChartService from "@/services/userChartService";
import CancelIcon from "@mui/icons-material/Cancel";
import { useContext, useState } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import Loader from "@/components/reusable/loader";
import chartService from "@/services/chartService";

export default function Subscription({
  userCharts,
  mainServices,
  appSettings,
}: {
  userCharts: (UserChart & { chart: Chart })[];
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const [subscriptionToCancel, setSubscriptionToCancel] = useState<string | null>(null);

  const handleEditClick = (stripeSubscriptionId: string) => {
    setSubscriptionToCancel(stripeSubscriptionId);

    chartService.user
      .cancelChartSubscription(stripeSubscriptionId, token)
      .then((res) => {
        window.location.href = res.data.data;
      })
      .catch((e) => {})
      .finally(() => {
        setSubscriptionToCancel(null);
      });
  };

  return (
    <DshboardTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <h1 className="mb-8">{t("My Chart")}</h1>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("Name")}</TableCell>
            <TableCell>{t("Status")}</TableCell>
            <TableCell>{t("Created")}</TableCell>
            <TableCell>{t("Current Period Start")}</TableCell>
            <TableCell>{t("Current Period End")}</TableCell>
            <TableCell>
              <div className="text-color-1">{t("Cancel")}</div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userCharts.map(
            ({
              id,
              chart,
              status,
              createdAt,
              currentPeriodStart,
              currentPeriodEnd,
              stripeSubscriptionId,
            }) => (
              <TableRow key={id}>
                <TableCell>{chart.nameEn}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{dayjs(createdAt).format(dateTimeFormat)}</TableCell>
                <TableCell>{dayjs(currentPeriodStart).format(dateTimeFormat)}</TableCell>
                <TableCell>{dayjs(currentPeriodEnd).format(dateTimeFormat)}</TableCell>

                <TableCell>
                  {status !== "canceled" && (
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={!!subscriptionToCancel}
                      onClick={() => handleEditClick(stripeSubscriptionId)}
                    >
                      {stripeSubscriptionId === subscriptionToCancel && <Loader />}

                      {stripeSubscriptionId !== subscriptionToCancel && <CancelIcon />}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    userChartService.user.getUserChart(token),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      userCharts: result[1].data.data,
      appSettings: result[2].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
