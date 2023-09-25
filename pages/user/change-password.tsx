import SessionContext from "@/components/contexts/SessionContext";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import ChangePasswordForm, {
  ChangePasswordFormVavlues,
} from "@/components/forms/change-password-form/ChangePasswordForm";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import settingService from "@/services/settingService";
import userService from "@/services/userService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Service } from "@prisma/client";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";

export default function ChangePassword({
  mainServices,
  appSettings,
}: {
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const handleSubmit = (
    values: ChangePasswordFormVavlues,
    { setSubmitting }: FormikHelpers<ChangePasswordFormVavlues>
  ) => {
    setSubmitting(true);
    userService
      .changePassword(values, token)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <DshboardTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <h1 className="mb-8">{t("Change Password")}</h1>

      <ChangePasswordForm
        onSubmit={handleSubmit}
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
      />
    </DshboardTemplate>
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
