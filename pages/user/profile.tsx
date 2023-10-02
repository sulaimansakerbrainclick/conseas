import ProfileForm, { ProfileFormValues } from "@/components/forms/profile-form/ProfileForm";
import Header from "@/components/ui/header/Header";
import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import links from "@/links/links";
import Links from "@/enums/Links";
import { sessionOptions } from "@/lib/session";
import sessionService from "@/services/sessionService";
import userService from "@/services/userService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Role, Service, User } from "@prisma/client";
import dayjs from "dayjs";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import Footer from "@/components/ui/footer/Footer";
import serviceService from "@/services/serviceService";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import fileService from "@/services/fileService";
import RoleId from "@/enums/RoleId";

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

  const router = useRouter();

  const onSubmit = async ({ imageFile, ...values }: ProfileFormValues) => {
    let image;

    if (imageFile) {
      const uploadRes = await fileService.upload(imageFile, token);

      image = uploadRes.data.data;
    }

    const newValues = {
      ...values,
      image,
      dateOfBirth: dayjs(values.dateOfBirth).toISOString(),
    };

    const editUserRes = await userService.user.editUser(newValues, token);

    const user = editUserRes.data.data;

    await sessionService.saveSession({ user, token });

    if (user.roleId === RoleId.Admin) {
      router.push(links[Links.AdminProfile].href);
    } else {
      router.push(links[Links.UserProfile].href);
    }

    showSuccessToast(editUserRes.data.message);
  };

  return (
    <DshboardTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <h1 className="mb-8">{t("My Profile")}</h1>

      <ProfileForm
        initialValues={{
          ...user,
          email: user.email || "",
          gender: user.gender || "",
          dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        }}
        onSubmit={onSubmit}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    userService.user.me(token),
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
