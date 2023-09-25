import LanguageForm, { LanguageFormValues } from "@/components/forms/language-form/LanguageForm";
import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import languageService from "@/services/languageService";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

const initialValues: LanguageFormValues = {
  key: "",
};

export default function AddLanguage() {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const handleSubmit = (
    values: LanguageFormValues,
    { setSubmitting }: FormikHelpers<LanguageFormValues>
  ) => {
    setSubmitting(true);

    languageService
      .addLanguage(values, token)
      .then((res) => {
        showSuccessToast(res.data.message);
        router.push("/admin/languages");
      })
      .catch((e) => {
        setSubmitting(false);
      });
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Add Language")}</h1>

      <LanguageForm onSubmit={handleSubmit} initialValues={initialValues} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  return {
    props: {
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
