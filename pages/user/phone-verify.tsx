import AuthTemplate from "@/components/templates/auth";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { sessionOptions } from "@/lib/session";
import PhoneVerifyForm, {
  PhoneVerifyFormValues,
} from "@/components/forms/phone-verify-form/PhoneVerifyForm";
import serviceService from "@/services/serviceService";
import { Service } from "@prisma/client";
import userService from "@/services/userService";
import { useContext } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import { FormikHelpers } from "formik";
import showSuccessToast from "@/utils/showSuccessToast";

export default function PhoneVerify({
  mainServices,
}: {
  mainServices: (Service & { children: Service[] })[];
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const handleSubmit = (
    { otp }: PhoneVerifyFormValues,
    { setSubmitting }: FormikHelpers<PhoneVerifyFormValues>
  ) => {
    setSubmitting(true);

    userService.user
      .verifyPhone(otp, token)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Head>
        <title>{t("CONSEAS | Phone Verify")}</title>
      </Head>

      <AuthTemplate
        title={t("Phone Verify")}
        form={
          <PhoneVerifyForm
            onSubmit={handleSubmit}
            initialValues={{
              otp: "",
            }}
          />
        }
        services={mainServices}
      />
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const res = await serviceService.common.getMainServices();
  const mainServices = res.data.data;

  return {
    props: {
      session: req.session,
      mainServices,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
