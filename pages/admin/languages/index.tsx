import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Language } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import LanguageTable from "@/components/tables/LanguageTable";
import languageService from "@/services/languageService";
import showSuccessToast from "@/utils/showSuccessToast";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

export default function Languages({
  languages,
}: {
  languages: (Language & { parent: Language })[];
}) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const addLanguage = () => {
    router.push(`/admin/languages/add-language/`);
  };

  const deleteLanguage = (name: string) => {
    languageService
      .deleteLanguage(name, token)
      .then((res) => {
        showSuccessToast(res.data.message);
      })
      .catch((e) => {});

    router.push(router.asPath);
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Languages")}</h1>

      <Link href={`/admin/languages/add-language/`}>
        <Button variant="contained" onClick={addLanguage} className="mb-6.5">
          + {t("Add Language")}
        </Button>
      </Link>

      {languages && <LanguageTable languages={languages} deleteLanguage={deleteLanguage} />}
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await languageService.getAll(token);
  const languages = res.data.data;

  return {
    props: {
      session: req.session,
      languages,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
