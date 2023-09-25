import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import { Chart, Service } from "@prisma/client";
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

export default function MyChartManagement({
  mainServices,
  appSettings,
  userCharts,
}: {
  mainServices: Service[];
  appSettings: AppSettingFormValues;
  userCharts: Chart[];
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const [chartToCheckout, setChartToCheckout] = useState<string | null>(null);

  const isRtl = useIsRtl();

  const handleSubscribeClick = (id: string) => {
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
          data={userCharts}
          onSubscribeClick={handleSubscribeClick}
          chartToCheckout={chartToCheckout}
        />
      </div>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, params }: any) {
  const result = await Promise.all([
    serviceService.common.getMainServices(),
    settingService.geSettings(),
    chartService.user.getAllCharts(),
  ]);

  return {
    props: {
      mainServices: result[0].data.data,
      appSettings: result[1].data.data,
      userCharts: result[2].data.data,
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
