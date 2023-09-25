import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Page, Service } from "@prisma/client";
import { useTranslation } from "next-i18next";
import serviceService from "@/services/serviceService";
import pageService from "@/services/pageService";
import useIsRtl from "@/components/hooks/useIsRtl";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import PageId from "@/enums/PageId";

export default function TermsAndConditions({
  mainServices,
  page,
  appSettings,
}: {
  mainServices?: (Service & { children: Service[] })[];
  page: Page;
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <div className="pt-30 lg:pt-50 mb-16 container">
        <div dangerouslySetInnerHTML={{ __html: isRtl ? page.textAr : page.textEn }} />
      </div>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const result = await Promise.all([
    serviceService.common.getMainServices(),
    pageService.getPage(PageId.TermsAndConditions),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      page: result[1].data.data,
      appSettings: result[2].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
