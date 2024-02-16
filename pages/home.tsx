import BestNation from "@/components/ui/best-nation/BestNation";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import Hero from "@/components/ui/hero/Hero";
import Imaging from "@/components/ui/imaging/Imaging";
import Welcome from "@/components/ui/welcome/Welcome";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import { Section, SectionItem, Service, Testimonial, AppointmentType } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import whyChooseSvg from "@/public/assets/images/my-choose.svg";
import BookService from "@/components/ui/book-service/BookService";
import backgroundImage from "@/public/assets/images/home2.png";
import sectionService from "@/services/sectionService";
import WhyChoose from "@/components/ui/why-choose/WhyChoose";
import ReasonsFor from "@/components/ui/reasons-for/ReasonsFor";
import Testimonials from "@/components/ui/testimonials/Testimonials";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import testimonialService from "@/services/testimonialService";
import appointmentTypeService from "@/services/appointmentTypeService";
import SectionId from "@/enums/SectionId";
import WhatsAppButton from "@/components/reusable/WhatsAppButton/WhatsAppButton";

export default function Home({
  sections,
  mainServices,
  appSettings,
  testimonials,
  appointmentTypes,
}: {
  sections: (Section & { list: SectionItem[] })[];
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
  testimonials: Testimonial[];
  appointmentTypes: AppointmentType[];
}) {
  const welcomeSection = sections.find((section) => section.id === SectionId.Welcome)!;
  const imagingSection = sections.find((section) => section.id === SectionId.Imaging)!;
  const whyChooseSection = sections.find((section) => section.id === SectionId.WhyChoose)!;
  const reasonsSection = sections.find((section) => section.id === SectionId.Reasons)!;
  const testimonialsSection = sections.find((section) => section.id === SectionId.Testimonials)!;
  const bestInNationSection = sections.find((section) => section.id === SectionId.BestInNation)!;

  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      hero={<Hero appSettings={appSettings} services={mainServices} />}
      footer={<Footer appSettings={appSettings} services={mainServices} />}
    >
      <div className="container mb-30">
        <Welcome data={welcomeSection} />
      </div>

      <div className="container mb-30">
        <Imaging data={imagingSection} />
      </div>

      <div className="container mb-30">
        <BookService appointmentTypes={appointmentTypes} />
      </div>

      <div className="container mb-13">
        <div className="mb-2 lg:mb-13">
          <WhyChoose data={whyChooseSection} />
        </div>

        <div className="flex justify-center">
          <Image src={whyChooseSvg} alt="" className="w-full h-auto" />
        </div>
      </div>

      <div className="container mb-20">
        <ReasonsFor data={reasonsSection} />
      </div>

      <div className="relative mb-30">
        <div className="container">
          <Testimonials data={testimonialsSection} testimonials={testimonials} />
        </div>

        <Image
          src={backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="-z-[1] object-cover pb-15"
          unoptimized
        />
      </div>

      <div className="container mb-30">
        <BestNation data={bestInNationSection} />
      </div>
      <WhatsAppButton/>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const result = await Promise.all([
    serviceService.common.getMainServices(),
    sectionService.getSections(),
    settingService.geSettings(),
    testimonialService.getHomeTestimonials(),
    appointmentTypeService.getAllAppointmentTypes(),
  ]);

  return {
    props: {
      mainServices: result[0].data.data,
      sections: result[1].data.data,
      appSettings: result[2].data.data,
      testimonials: result[3].data.data,
      appointmentTypes: result[4].data.data,
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
