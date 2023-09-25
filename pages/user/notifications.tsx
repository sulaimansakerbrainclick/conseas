import Header from "@/components/ui/header/Header";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import userService from "@/services/userService";
import { Notification, Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DeleteIcon from "@mui/icons-material/Delete";

import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import dateFormat from "@/configs/dateFormat";
import { useTranslation } from "next-i18next";
import serviceService from "@/services/serviceService";
import Footer from "@/components/ui/footer/Footer";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";

export default function NotificationPage({
  notifications,
  mainServices,
  appSettings,
}: {
  notifications: Notification[];
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  return (
    <DshboardTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <h1 className="mb-8">{t("Notifications")}</h1>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("Message")}</TableCell>
            <TableCell>{t("Date")}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {notifications.map(({ id, message, createdAt }) => (
            <TableRow key={id}>
              <TableCell width="50%">{message}</TableCell>

              <TableCell>{dayjs(createdAt).format(dateFormat)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    userService.getNotifications(token),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      notifications: result[1].data.data,
      appSettings: result[2].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
