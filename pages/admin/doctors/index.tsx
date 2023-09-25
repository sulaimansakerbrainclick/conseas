import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Doctor } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import showSuccessToast from "@/utils/showSuccessToast";
import DoctorTable from "@/components/tables/DoctorTable";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import doctorService from "@/services/doctorService";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

export default function Doctors({ doctors }: { doctors: Doctor[] }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const addDoctor = () => {
    router.push(`/admin/doctors/add-doctor/`);
  };

  const editDoctor = (id: string) => {
    router.push(`/admin/doctors/edit-doctor/${id}`);
  };

  const deleteDoctor = (id: string) => {
    doctorService
      .deleteDoctor(id, token)
      .then((res) => {
        showSuccessToast(res.data.message);

        router.push(router.asPath);
      })
      .catch((e) => {});
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Doctors")}</h1>

      <Link href={`/admin/doctors/add-doctor/`}>
        <Button variant="contained" onClick={addDoctor} className="mb-6.5">
          + {t("Add Doctor")}
        </Button>
      </Link>

      <DoctorTable doctors={doctors} editDoctor={editDoctor} deleteDoctor={deleteDoctor} />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await doctorService.getAllDoctors(token);
  const doctors = res.data.data;

  return {
    props: {
      session: req.session,
      doctors,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
