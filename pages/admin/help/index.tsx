import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import pageService from "@/services/pageService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Page } from "@prisma/client";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";
import Header from "@/components/ui/header/Header";
import TranslatedTextForm, {
  TranslatedTextFormValues,
} from "@/components/forms/translated-text-form/TranslatedTextForm";
import PageId from "@/enums/PageId";

export default function Help({ page }: { page: Page }) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const handleSubmit = (
    values: TranslatedTextFormValues,
    { setSubmitting }: FormikHelpers<TranslatedTextFormValues>
  ) => {
    setSubmitting(true);

    pageService
      .updatePage(PageId.Help, values, token)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Help Page")}</h1>

      <TranslatedTextForm initialValues={page} onSubmit={handleSubmit} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const res = await pageService.getPage(PageId.Help);
  const page = res.data.data;

  return {
    props: {
      session: req.session,
      page,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
