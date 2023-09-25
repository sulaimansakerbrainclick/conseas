import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { User } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import userService from "@/services/userService";
import UserTable from "@/components/tables/UserTable";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

export default function Users({ users }: { users: User[] }) {
  const { t } = useTranslation("common");

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Users")}</h1>

      <UserTable users={users} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await userService.getAll(token);
  const users = res.data.data;

  return {
    props: {
      session: req.session,
      users,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
