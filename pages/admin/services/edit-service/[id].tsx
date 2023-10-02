import ServiceForm, { ServiceFormValues } from "@/components/forms/service-form/ServiceForm";
import SessionContext from "@/components/contexts/SessionContext";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import serviceService from "@/services/serviceService";
import showSuccessToast from "@/utils/showSuccessToast";
import { Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useContext } from "react";
import _ from "lodash";
import { FormikHelpers } from "formik";
import Header from "@/components/ui/header/Header";
import fileService from "@/services/fileService";
import Stripe from "stripe";

export default function EditService({
  service,
  mainServices,
}: {
  service: Service;
  mainServices: Service[];
}) {
  const { token } = useContext(SessionContext)!;

  const router = useRouter();

  const price = JSON.parse(service.stripePriceResponse as string) as Stripe.Response<Stripe.Price>;

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

    const addServiceRes = await serviceService.admin.updateService(data, token);
    showSuccessToast(addServiceRes.data.message);
    router.push("/admin/services");
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">Edit Service</h1>

      <ServiceForm
        mainServices={mainServices}
        onSubmit={handleSubmit}
        initialValues={{
          ...service,
          priceUSD: price?.unit_amount || 0,
          priceAED: price?.currency_options?.aed?.unit_amount || 0,
          parentId: service.parentId || "",
        }}
      />
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, query }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    serviceService.admin.getService(query.id, token),
  ]);

  return {
    props: {
      mainServices: result[0].data.data,
      service: result[1].data.data,
      session: req.session,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
