import AuthTemplate from "@/components/templates/auth";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { sessionOptions } from "@/lib/session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import authService from "@/services/authService";
import serviceService from "@/services/serviceService";
import { Service } from "@prisma/client";
import Loader from "@/components/reusable/loader";

export default function LoginExpired({
  mainServices,
}: {
  mainServices: (Service & { children: Service[] })[];
}) {
  const router = useRouter();

  const { t } = useTranslation("common");

  useEffect(() => {
    setTimeout(() => {
      authService.logout().then(() => {
        router.push("/login");
      });
    }, 5000);
  }, [router]);

  return (
    <>
      <Head>
        <title>{t("CONSEAS | Login")}</title>
      </Head>

      <AuthTemplate title={t("Login has expired")} services={mainServices}>
        <div className="flex items-center gap-2">
          <div>{t("Redirecting to the login page")}</div> <Loader />
        </div>
      </AuthTemplate>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const res = await serviceService.common.getMainServices();
  const mainServices = res.data.data;

  return {
    props: {
      mainServices,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
