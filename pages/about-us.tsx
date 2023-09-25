import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import ContactUsForm, {
  ContactUsFormValues,
} from "@/components/forms/contact-us-form/ContactUsForm";
import whyChooseImage from "@/public/assets/images/why-choose.png";
import { Section, SectionItem, Service, Testimonial, Page } from "@prisma/client";
import { FormikHelpers } from "formik";
import contactUsService from "@/services/contactUsService";
import showSuccessToast from "@/utils/showSuccessToast";
import { useTranslation } from "next-i18next";
import serviceService from "@/services/serviceService";
import Testimonials from "@/components/ui/testimonials/Testimonials";
import sectionService from "@/services/sectionService";
import WhyChoose from "@/components/ui/why-choose/WhyChoose";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import testimonialService from "@/services/testimonialService";
import useIsRtl from "@/components/hooks/useIsRtl";
import pageService from "@/services/pageService";
import PageId from "@/enums/PageId";
import SectionId from "@/enums/SectionId";

export default function AboutUs({
  sections,
  mainServices,
  appSettings,
  testimonials,
  page,
}: {
  sections: (Section & { list: SectionItem[] })[];
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
  testimonials: Testimonial[];
  page: Page;
}) {
  const { t } = useTranslation("common");

  const isRtl = useIsRtl();

  const welcomeSection = sections.find((section) => section.id === SectionId.Welcome)!;
  const whyChooseSection = sections.find((section) => section.id === SectionId.WhyChoose)!;
  const testimonialsSection = sections.find((section) => section.id === SectionId.Testimonials)!;

  const onSubmit = (
    values: ContactUsFormValues,
    { setSubmitting }: FormikHelpers<ContactUsFormValues>
  ) => {
    setSubmitting(true);

    contactUsService
      .addContactUs(values)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  const { list } = welcomeSection;

  console.log("test", "page", page);
  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <div className="container pt-30 lg:pt-50 mb-30">
        <div dangerouslySetInnerHTML={{ __html: isRtl ? page.textAr : page.textEn }} />
      </div>

      <div className="container mb-30">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-7.5">
          {list.map(({ id, image, textAr, textEn, titleAr, titleEn }, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {image && <Image src={image} alt="" className="mb-5" width={75} height={75} />}

              <div className="font-medium mb-2.5 font-base">{isRtl ? titleAr : titleEn}</div>

              <p className="text-stone-500 text-sm">{isRtl ? textAr : textEn}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-lg:pb-30">
        <div className="container lg:absolute top-12 2xl:top-20 3xl:top-[20%] z-10">
          <WhyChoose data={whyChooseSection} />
        </div>

        <Image
          src={whyChooseImage}
          alt=""
          className="hidden lg:block w-full h-auto rtl:[transform:scaleX(-1)]"
          unoptimized
        />

        <div className="bg-slate-50 absolute bottom-0 h-full lg:h-[50%] w-full -z-[1]"></div>
      </div>
      <div className="relative mb-30">
        <div className="container">
          <Testimonials data={testimonialsSection} testimonials={testimonials} />
        </div>

        <div className="bg-slate-50 absolute top-0 bottom-20 w-full -z-[1]"></div>
      </div>
      <div className="container mb-30">
        <h2>{t("Contact Us")}</h2>

        <ContactUsForm
          onSubmit={onSubmit}
          initialValues={{ name: "", email: "", subject: "", phone: "", message: "" }}
        />
      </div>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    sectionService.getSections(),
    settingService.geSettings(),
    testimonialService.getHomeTestimonials(),
    pageService.getPage(PageId.AboutUs),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      sections: result[1].data.data,
      appSettings: result[2].data.data,
      testimonials: result[3].data.data,
      page: result[4].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
