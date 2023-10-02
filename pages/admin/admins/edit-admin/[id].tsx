import Header from "@/components/ui/header/Header";
import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import userService from "@/services/userService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Service, User } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";
import Footer from "@/components/ui/footer/Footer";
import serviceService from "@/services/serviceService";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import AdminForm, { AdminFormValues } from "@/components/forms/admin-form/AdminForm";

export default function Profile({
  user,
  mainServices,
  appSettings,
}: {
  user: User;
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const onSubmit = async (values: AdminFormValues) => {
    const editUserRes = await userService.admin.editAdmin(values, token);

    showSuccessToast(editUserRes.data.message);
  };

  return (
    <DshboardTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <h1 className="mb-8">{t("Edit admin")}</h1>

      <AdminForm
        initialValues={{
          ...user,
          email: user.email || "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={onSubmit}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, query }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    userService.admin.getAdmin(query.id, token),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      user: result[1].data.data,
      appSettings: result[2].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
