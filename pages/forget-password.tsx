import AuthTemplate from "@/components/templates/auth";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { sessionOptions } from "@/lib/session";
import { useState } from "react";
import EmailForgetPasswordForm, {
  EmailForgetPasswordFormValues,
} from "@/components/forms/email-forget-password-form/EmailForgetPasswordForm";
import { Button } from "@mui/material";
import serviceService from "@/services/serviceService";
import { Service } from "@prisma/client";
import userService from "@/services/userService";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";

export default function ForgetPassword({
  mainServices,
}: {
  mainServices: (Service & { children: Service[] })[];
}) {
  const { t } = useTranslation("common");

  const router = useRouter();

  const [type, setType] = useState("email");

  const handleEmailSubmit = (
    { email }: EmailForgetPasswordFormValues,
    { setSubmitting }: FormikHelpers<EmailForgetPasswordFormValues>
  ) => {
    setSubmitting(true);

    userService
      .sendResetEmail(email)
      .then((res) => {
        showSuccessToast(res.data.message);
        router.push("/");
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Head>
        <title>{t("CONSEAS | Forgot Password")}</title>
      </Head>

      <AuthTemplate
        title={t("Forgot Password?")}
        services={mainServices}
        form={
          type === "phone" ? null : (
            <EmailForgetPasswordForm
              initialValues={{
                email: "",
              }}
              onSubmit={handleEmailSubmit}
            />
          )
        }
      >
        {/* <hr className="border-stone-500 opacity-50" /> */}

        {/* <div className="text-center text-black-2 font-light mt-8">
          {t("Use another method")},{" "}
          <Button
            className="font-medium text-color-1 p-0 m-0"
            onClick={() => setType(type === "phone" ? "email" : "phone")}
          >
            {t(type === "phone" ? "Email" : "Phone Number")}
          </Button>
        </div> */}
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

  const result = await Promise.all([serviceService.common.getMainServices()]);

  return {
    props: {
      mainServices: result[0].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
