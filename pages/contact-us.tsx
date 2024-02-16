import ContactUsForm, {
  ContactUsFormValues,
} from "@/components/forms/contact-us-form/ContactUsForm";
import LocationMap from "@/components/ui/location-map/LocationMap";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import AppTemplate from "@/components/templates/app/AppTemplate";
import { sessionOptions } from "@/lib/session";
import contactUsService from "@/services/contactUsService";
import serviceService from "@/services/serviceService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Service } from "@prisma/client";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import WhatsAppButton from "@/components/reusable/WhatsAppButton/WhatsAppButton";

export default function Home({
  mainServices,
  appSettings,
}: {
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

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

  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <div className="container pt-30 lg:pt-50 mb-16 lg:mb-30">
        <h1 className="mb-8">{t("Contact Us")}</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-15">
          <div className="flex-1">
            <ContactUsForm
              onSubmit={onSubmit}
              initialValues={{ name: "", email: "", subject: "", phone: "", message: "" }}
            />
          </div>
        </div>
      </div>
      <WhatsAppButton/>
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
