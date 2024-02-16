import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import { Chart, ChartPrice, Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import image from "@/public/assets/icons/chart-review.svg";
import heroImage from "@/public/assets/images/home1.png";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import useIsRtl from "@/components/hooks/useIsRtl";
import chartService from "@/services/chartService";
import ChartCardList from "@/components/ui/chart-card-list/ChartCardList";
import { useContext, useState } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import getCountryCode from "@/utils/getCountryCode";
import Router from "next/router";
import Links from "@/enums/Links";
import links from "@/links/links";
import requestIp from "request-ip";
import WhatsAppButton from "@/components/reusable/WhatsAppButton/WhatsAppButton";

export default function MyChartManagement({
  mainServices,
  appSettings,
  charts,
  countryCode,
}: {
  mainServices: Service[];
  appSettings: AppSettingFormValues;
  charts: (Chart & { prices: ChartPrice[] })[];
  countryCode: string | null;
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const [chartToCheckout, setChartToCheckout] = useState<string | null>(null);

  const isRtl = useIsRtl();

  const handleSubscribeClick = (id: string) => {
    if (!token) {
      Router.push(links[Links.Login].href);
      return;
    }

    setChartToCheckout(id);

    chartService.user
      .chartCheckout(id, token)
      .then((res) => {
        window.location.href = res.data.data;
      })
      .catch((e) => {})
      .finally(() => {
        setChartToCheckout(null);
      });
  };

  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <Image
        src={heroImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        unoptimized
        className="-z-[1] object-cover pb-80"
      />

      <div className="pt-30 lg:pt-50 mb-30 container">
        <div className="mb-30">
          {image && <Image className="w-15 h-15 mb-4" src={image} alt="" width={60} height={60} />}

          <div>
            <span className="text-neutral-400 mb-2 text-lg font-bold">{t("Service")}</span>
          </div>

          <h2 className="uppercase font-semibold text-3xl mb-8">{t("Chart Review")}</h2>

          {!isRtl && (
            <p>
              Get ready to experience a whole new level of safety, peace of mind and accessibility
              with our comprehensive medical platform. With your subscription, you get access to a
              wide range of care management and coordination, along with answers to your burning
              health and healthcare questions.
            </p>
          )}

          {isRtl && (
            <p>
              استعد لتجربة مستوى جديد كُلّياً من السلامة، والاطمئنان والوصولية من خلال منصتنا الطبية
              الشاملة. من خلال اشتراكك، ستحصل على وصول إلى مجموعة واسعة من إدارة الرعاية والتنسيق،
              بالإضافة إلى إجابات على أسئلة صحتك والرعاية الصحية الملّحة التي تشغل بالك.
            </p>
          )}
        </div>

        <ChartCardList
          data={charts}
          onSubscribeClick={handleSubscribeClick}
          chartToCheckout={chartToCheckout}
          countryCode={countryCode}
        />
      </div>
      <WhatsAppButton/>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, params }: any) {
  const ip = requestIp.getClientIp(req);

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    settingService.geSettings(),
    chartService.user.getAllCharts(),
    // getCountryCode(ip),
  ]);

  return {
    props: {
      mainServices: result[0].data.data,
      appSettings: result[1].data.data,
      charts: result[2].data.data,
      // countryCode: result[3],
      session: req.session,
      ip: ip || "no ip",
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
