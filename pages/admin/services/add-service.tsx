import ServiceForm, { ServiceFormValues } from "@/components/forms/service-form/ServiceForm";
import Header from "@/components/ui/header/Header";
import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Service } from "@prisma/client";
import { FormikHelpers } from "formik";
import { withIronSessionSsr } from "iron-session/next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import fileService from "@/services/fileService";

const initialValues: ServiceFormValues = {
  parentId: "",
  nameEn: "",
  nameAr: "",
  descriptionEn: "",
  descriptionAr: "",
  priceUSD: 0,
  priceAED: 0,
  image: "",
  shortDescriptionEn: "",
  shortDescriptionAr: "",
};

export default function AddService({ mainServices }: { mainServices: Service[] }) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const handleSubmit = async (
    { imageFile, whiteImageFile, ...values }: ServiceFormValues,
    { setSubmitting }: FormikHelpers<ServiceFormValues>
  ) => {
    let image;

    if (imageFile) {
      const uploadRes = await fileService.upload(imageFile, token);

      image = uploadRes.data.data;
    }

    let whiteImage;

    if (whiteImageFile) {
      const uploadRes = await fileService.upload(whiteImageFile, token);

      whiteImage = uploadRes.data.data;
    }

    const data = { ...values, image, whiteImage };

    const addServiceRes = await serviceService.admin.addService(data, token);
    showSuccessToast(addServiceRes.data.message);
    router.push("/admin/services");
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Add Service")}</h1>

      <ServiceForm
        mainServices={mainServices}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const res = await serviceService.common.getMainServices();
  const mainServices = res.data.data;

  return {
    props: {
      mainServices,
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
