import RegisterForm, { RegisterFormValues } from "@/components/forms/register-form/RegisterForm";
import AuthTemplate from "@/components/templates/auth";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import { Role, Service } from "@prisma/client";
import userService from "@/services/userService";
import showSuccessToast from "@/utils/showSuccessToast";
import authService from "@/services/authService";
import sessionService from "@/services/sessionService";
import { useRouter } from "next/router";
import links from "@/data/links";
import Links from "@/enums/Links";
import { FormikHelpers } from "formik";

export default function Register({
  mainServices,
}: {
  mainServices: (Service & { children: Service[] })[];
}) {
  const { t } = useTranslation("common");

  const router = useRouter();

  const onSubmit = (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    setSubmitting(true);

    userService
      .register(values)
      .then((res) => {
        showSuccessToast(res.data.message);

        authService
          .login({ emailOrPhone: values.phone, password: values.password })
          .then((res) => {
            sessionService
              .saveSession(res.data.data)
              .then(() => {
                if (res.data.data.user.role === Role.Admin) {
                  router.push(links[Links.AdminDashboards].href);
                } else {
                  router.push(links[Links.Home].href);
                }
              })
              .catch((e) => {
                setSubmitting(false);
              });
          })
          .catch((e) => {
            setSubmitting(false);
          });
      })
      .catch((e) => {
        setSubmitting(false);
      });
  };

  return (
    <>
      <Head>
        <title>{t("CONSEAS | Register")}</title>
      </Head>

      <AuthTemplate
        title={t("Register")}
        services={mainServices}
        form={
          <RegisterForm
            onSubmit={onSubmit}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
              isTermsAccepted: false,
            }}
          />
        }
      >
        {/* <hr className="border-stone-500 opacity-50 mt-8" /> */}

        <div className="text-center text-black-2 font-light mt-8">
          {t("Don’t have an account?")}{" "}
          <Link href="/login" className="font-medium text-color-1">
            {t("Log in")}
          </Link>
        </div>
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
