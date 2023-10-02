import AuthTemplate from "@/components/templates/auth";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import { Service } from "@prisma/client";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import userService from "@/services/userService";
import SessionContext from "@/components/contexts/SessionContext";
import showSuccessToast from "@/utils/showSuccessToast";

export default function PhoneVerify({
  verifyToken,
  mainServices,
}: {
  verifyToken: string;
  mainServices: (Service & { children: Service[] })[];
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      userService.user.verifyEmail(token, verifyToken).then((res) => {
        showSuccessToast(res.data.message);
        router.push("/");
      });
    }, 5000);
  }, [router, token, verifyToken]);

  return (
    <>
      <Head>
        <title>{t("CONSEAS | Phone Verify")}</title>
      </Head>

      <AuthTemplate title={t("Email verify")} services={mainServices}>
        <div className="flex items-center gap-2">
          <div> {t("Verifying email")}</div> <CircularProgress size="20px" />
        </div>
      </AuthTemplate>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, params }: any) {
  const res = await serviceService.common.getMainServices();
  const mainServices = res.data.data;

  return {
    props: {
      session: req.session,
      verifyToken: params.verifyToken,
      mainServices,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
