import Header from "@/components/ui/header/Header";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Invoice, Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "next-i18next";
import serviceService from "@/services/serviceService";
import Footer from "@/components/ui/footer/Footer";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import invoiceService from "@/services/invoiceService";
import Stripe from "stripe";
import dayjs from "dayjs";
import dateTimeFormat from "@/configs/dateTimeFormat";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Invoices({
  invoices,
  mainServices,
  appSettings,
}: {
  invoices: Invoice[];
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  return (
    <DshboardTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <h1 className="mb-8">{t("Invoices")}</h1>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("Amount")}</TableCell>
            <TableCell>{t("Invoice Number")}</TableCell>
            <TableCell>{t("Status")}</TableCell>
            <TableCell>{t("Created")}</TableCell>
            <TableCell className="text-color-1">{t("View")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map(({ id, stripeData }) => {
            const { amount_paid, status, number, created, hosted_invoice_url, description } =
              JSON.parse(stripeData as string) as Stripe.Response<Stripe.Invoice>;

            return (
              <TableRow key={id}>
                <TableCell>${amount_paid / 100}</TableCell>
                <TableCell>{number}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{dayjs.unix(created).format(dateTimeFormat)}</TableCell>
                <TableCell>
                  {hosted_invoice_url && (
                    <Link
                      href={hosted_invoice_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-color-1"
                    >
                      <VisibilityIcon />
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    invoiceService.user.getInvoices(token),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      invoices: result[1].data.data,
      appSettings: result[2].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
