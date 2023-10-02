import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import showSuccessToast from "@/utils/showSuccessToast";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import Header from "@/components/ui/header/Header";
import AdminForm, { AdminFormValues } from "@/components/forms/admin-form/AdminForm";
import userService from "@/services/userService";

const initialValues: AdminFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AddAdmin() {
  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const handleSubmit = async (
    values: AdminFormValues,
    { setSubmitting }: FormikHelpers<AdminFormValues>
  ) => {
    const addAdminRes = await userService.admin.addAdmin(values, token);

    showSuccessToast(addAdminRes.data.message);
    router.push("/admin/admins");
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">Add Admin</h1>

      <AdminForm onSubmit={handleSubmit} initialValues={initialValues} />
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
