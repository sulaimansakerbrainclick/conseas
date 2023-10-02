import LoginForm from "@/components/forms/login-form/LoginForm";
import AuthTemplate from "@/components/templates/auth";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { sessionOptions } from "@/lib/session";
import DonthaveAccount from "@/components/ui/dont-have-account/DontHaveAccount";
import { useRouter } from "next/router";
import serviceService from "@/services/serviceService";
import { Role, Service } from "@prisma/client";
import links from "@/links/links";
import Links from "@/enums/Links";
import useLogin from "@/components/hooks/useLogin";
import RoleId from "@/enums/RoleId";

export default function Login({
  mainServices,
}: {
  mainServices: (Service & { children: Service[] })[];
}) {
  const router = useRouter();

  const { t } = useTranslation("common");

  const { handleSubmit } = useLogin((user) => {
    if (user.roleId === RoleId.Admin) {
      router.push(links[Links.AdminProfile].href);
    } else {
      router.push(links[Links.Home].href);
    }
  });

  return (
    <>
      <Head>
        <title>{t("CONSEAS | Login")}</title>
      </Head>

      <AuthTemplate
        title={t("Login")}
        services={mainServices}
        form={
          <LoginForm
            onSubmit={handleSubmit}
            initialValues={{
              emailOrPhone: "",
              password: "",
            }}
          />
        }
      >
        <DonthaveAccount className="mt-8" />
      </AuthTemplate>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const token: string = req.session.token;

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await serviceService.common.getMainServices();
  const mainServices = res.data.data;

  return {
    props: {
      mainServices,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
