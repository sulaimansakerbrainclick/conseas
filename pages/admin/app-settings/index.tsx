import SessionContext from "@/components/contexts/SessionContext";
import AppSettingsForm, {
  AppSettingFormValues,
} from "@/components/forms/app-settings-form/AppSettingsForm";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import { sessionOptions } from "@/lib/session";
import settingService from "@/services/settingService";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";

export default function AppSettings({ appSettings }: { appSettings: AppSettingFormValues }) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const handleSubmit = (
    values: AppSettingFormValues,
    { setSubmitting }: FormikHelpers<AppSettingFormValues>
  ) => {
    setSubmitting(true);

    settingService
      .updateSettings(values, token)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("App settings")}</h1>

      <AppSettingsForm onSubmit={handleSubmit} initialValues={appSettings} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await settingService.geSettings();
  const appSettings = res.data.data;

  return {
    props: {
      session: req.session,
      appSettings,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
