import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import serviceService from "@/services/serviceService";
import { useRouter } from "next/router";
import { useContext } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import showSuccessToast from "@/utils/showSuccessToast";
import ServiceTable from "@/components/tables/ServiceTable";
import { Button } from "@mui/material";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";

export default function Services({ services }: { services: (Service & { parent: Service })[] }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const toggleServiceActivation = (id: string) => {
    serviceService.admin
      .toggleServiceActivation(id, token)
      .then((res) => {
        showSuccessToast(res.data.message);

        router.push(router.asPath);
      })
      .catch((e) => {});
  };

  const deleteService = (id: string) => {
    serviceService.admin
      .deleteService(id, token)
      .then((res) => {
        showSuccessToast(res.data.message);

        router.push(router.asPath);
      })
      .catch((e) => {});
  };

  const addService = () => {
    router.push(`/admin/services/add-service/`);
  };

  const editService = (id: string) => {
    router.push(`/admin/services/edit-service/${id}`);
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Services")}</h1>

      <Link href={`/admin/services/add-service/`}>
        <Button variant="contained" onClick={addService} className="mb-6.5">
          + Add Service
        </Button>
      </Link>

      <ServiceTable
        services={services}
        toggleServiceActivation={toggleServiceActivation}
        deleteService={deleteService}
        editService={editService}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const res = await serviceService.admin.getAllServices(token);
  const services = res.data.data;

  return {
    props: {
      session: req.session,
      services,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
