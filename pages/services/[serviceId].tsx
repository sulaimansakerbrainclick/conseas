import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import { Section, SectionItem, Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useIsRtl from "@/components/hooks/useIsRtl";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import BestNation from "@/components/ui/best-nation/BestNation";
import Imaging from "@/components/ui/imaging/Imaging";
import backgroundImage from "@/public/assets/images/home1.png";
import ReasonsFor from "@/components/ui/reasons-for/ReasonsFor";
import sectionService from "@/services/sectionService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import settingService from "@/services/settingService";
import ServiceCard from "@/components/ui/service-card/ServiceCard";
import SectionId from "@/enums/SectionId";

export default function Home({
  mainServices,
  service,
  sections,
  appSettings,
}: {
  mainServices: Service[];
  service: Service & { children: Service[] };
  sections: (Section & { list: SectionItem[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  const { image, nameAr, nameEn, descriptionAr, descriptionEn, children } = service;

  const isRtl = useIsRtl();

  const imagingSection = sections.find((section) => section.id === SectionId.Imaging)!;
  const reasonsSection = sections.find((section) => section.id === SectionId.Reasons)!;
  const bestInNationSection = sections.find((section) => section.id === SectionId.BestInNation)!;

  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <div className="pt-30 lg:pt-50 relative shadow-2xl">
        <div className="container mb-30">
          <div className="mb-20">
            {image && (
              <Image className="w-15 h-15 mb-4" src={image} alt="" width={60} height={60} />
            )}

            <div>
              <span className="text-neutral-400 mb-2 text-lg font-bold">{t("Service")}</span>
            </div>

            <h2 className="uppercase font-semibold text-3xl mb-8">{isRtl ? nameAr : nameEn}</h2>

            <p>{isRtl ? descriptionAr : descriptionEn}</p>
          </div>

          <div className="flex flex-wrap">
            {children.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        <div className="container mb-30">
          <BestNation data={bestInNationSection} />
        </div>

        <div className="container mb-30 pb-30">
          <Imaging data={imagingSection} />
        </div>

        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          unoptimized
          className="-z-[2] object-cover h-full"
        />
      </div>

      <div className="container mb-30">
        <ReasonsFor data={reasonsSection} />
      </div>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, params }: any) {
  const result = await Promise.all([
    serviceService.common.getMainServices(),
    serviceService.common.getService(params.serviceId),
    sectionService.getSections(),
    settingService.geSettings(),
  ]);

  return {
    props: {
      mainServices: result[0].data.data,
      service: result[1].data.data,
      sections: result[2].data.data,
      appSettings: result[3].data.data,
      session: req.session,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
