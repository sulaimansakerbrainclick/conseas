import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Service } from "@prisma/client";
import { useTranslation } from "next-i18next";
import serviceService from "@/services/serviceService";
import useIsRtl from "@/components/hooks/useIsRtl";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import icon from "@/public/assets/icons/something-went-wrong.svg";
import Image from "next/image";
import links from "@/data/links";
import Links from "@/enums/Links";
import Link from "next/link";
import { Button } from "@mui/material";

export default function PrivacyAndPolicy({
  mainServices,
  appSettings,
}: {
  mainServices?: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <div className="h-screen flex flex-col justify-center items-center mt-10 2xl:mt-0">
        <div className="mb-4">
          <Image src={icon} alt="" />
        </div>

        <h1 className="text-color-1 text-3xl font-bold mb-4 capitalize">
          <span>{t("Oh no!")}</span>
        </h1>

        <div className="font-medium text-lg mb-6 capitalize">
          {t("Subscription has been canceled")}
        </div>

        {/* <p className="text-lg w-120 text-center text-zinc-500 mb-6">
          {t("we aren’t able to process your payment. please try again.")}
        </p> */}

        <Link href={links[Links.MyChartManagement].href}>
          <Button variant="contained">{links[Links.MyChartManagement].label}</Button>
        </Link>
      </div>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const result = await Promise.all([
    serviceService.common.getMainServices(),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      appSettings: result[1].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
