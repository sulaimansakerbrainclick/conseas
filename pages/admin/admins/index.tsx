import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import showSuccessToast from "@/utils/showSuccessToast";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Header from "@/components/ui/header/Header";
import userService from "@/services/userService";
import { User } from "@prisma/client";
import AdminTable from "@/components/tables/AdminTable";

export default function ManageAdmins({ admins }: { admins: User[] }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const addAdmin = () => {
    router.push(`/admin/admins/add-admin/`);
  };

  const editAdmin = (id: string) => {
    router.push(`/admin/admins/edit-admin/${id}`);
  };

  const deleteAdmin = (id: string) => {
    userService.admin
      .deleteAdmin(id, token)
      .then((res) => {
        showSuccessToast(res.data.message);

        router.push(router.asPath);
      })
      .catch((e) => {});
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Admins")}</h1>

      <Link href={`/admin/admins/add-admin/`}>
        <Button variant="contained" onClick={addAdmin} className="mb-6.5">
          + {t("Add Admin")}
        </Button>
      </Link>

      <AdminTable admins={admins} editAdmin={editAdmin} deleteAdmin={deleteAdmin} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await userService.admin.getAllAdmins(token);
  const admins = res.data.data;

  return {
    props: {
      session: req.session,
      admins,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
