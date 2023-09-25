import AuthTemplate from "@/components/templates/auth";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { sessionOptions } from "@/lib/session";
import ResetPasswordForm, {
  ResetPasswordFormValues,
} from "@/components/forms/reset-password-form/ResetPasswordForm";
import serviceService from "@/services/serviceService";
import { Service } from "@prisma/client";
import userService from "@/services/userService";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import Router from "next/router";
import links from "@/data/links";
import Links from "@/enums/Links";

export default function ResetPassword({
  mainServices,
  resetToken,
}: {
  mainServices: (Service & { children: Service[] })[];
  resetToken: string;
}) {
  const { t } = useTranslation("common");

  const handleSubmit = (
    values: ResetPasswordFormValues,
    { setSubmitting }: FormikHelpers<ResetPasswordFormValues>
  ) => {
    setSubmitting(true);

    userService
      .resetPassword(values, resetToken)
      .then((res) => {
        showSuccessToast(res.data.message);
        Router.push(links[Links.Home].href);
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Head>
        <title>{t("CONSEAS | Register")}</title>
      </Head>

      <AuthTemplate
        title={t("Reset Password")}
        services={mainServices}
        form={
          <ResetPasswordForm
            onSubmit={handleSubmit}
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
          />
        }
      >
        {/* <hr className="border-stone-500 opacity-50" /> */}

        <div className="text-center text-black-2 font-light mt-8">
          {t("Don’t have an account?")}{" "}
          <Link href={links[Links.Login].href} className="font-medium text-color-1">
            {t("Log in")}
          </Link>
        </div>
      </AuthTemplate>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, params }: any) {
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
      resetToken: params.resetToken,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
