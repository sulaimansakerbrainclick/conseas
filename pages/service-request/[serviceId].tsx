import Header from "@/components/ui/header/Header";
import { sessionOptions } from "@/lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useRef, useState } from "react";
import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AppTemplate from "@/components/templates/app/AppTemplate";
import SessionContext from "@/components/contexts/SessionContext";
import LoginStep from "@/components/ui/login-step/LoginStep";
import UploadDoctorReportStep from "@/components/ui/upload-doctor-report-step/UploadDoctorReportStep";
import ClinicalDetailsStep from "@/components/ui/clinical-details-step/ClinicalDetailsStep";
import requestService from "@/services/requestService";
import showSuccessToast from "@/utils/showSuccessToast";
import ThankYouStep from "@/components/ui/thank-you-step/ThankYouStep";
import classNames from "classnames";
import { ClinicalDetailsFormValues } from "@/components/forms/clinical-details-form/ClinicalDetailsForm";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import Footer from "@/components/ui/footer/Footer";
import { useTranslation } from "next-i18next";
import serviceService from "@/services/serviceService";
import { Service } from "@prisma/client";
import fileService from "@/services/fileService";

enum Steps {
  LOGIN = 0,
  UPLOAD = 1,
  CLINICAL = 2,
  PAY = 3,
  DONE = 4,
}

const authStep = {
  id: Steps.LOGIN,
  label: "Log in / Sign Up",
};

const initSteps = [
  {
    id: Steps.UPLOAD,
    label: "Upload Your Medical Reports",
  },
  {
    id: Steps.CLINICAL,
    label: "Clinical Details",
  },
  {
    id: Steps.PAY,
    label: "Pay",
  },
  {
    id: Steps.DONE,
    label: "Done",
  },
];

const getSteps = (isUserAuthenticated: boolean) => {
  if (isUserAuthenticated) {
    return initSteps;
  }

  return [authStep, ...initSteps];
};

export default function ServiceRequest({
  mainServices,
  serviceId,
  appSettings,
}: {
  serviceId: string;
  appSettings: AppSettingFormValues;
  mainServices: Service[];
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext) || {};

  const steps = useRef(getSteps(!!token));

  const [activeStep, setActiveStep] = useState(0);

  const [values, setValues] = useState<ClinicalDetailsFormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    medicalInformation: "",
    haveMyMedicalReport: true,
  });

  const saveDraftRequest = async ({
    myMedicalReportFile,
    ...values
  }: ClinicalDetailsFormValues) => {
    if (token) {
      let myMedicalReport;

      if (myMedicalReportFile) {
        const uploadRes = await fileService.upload(myMedicalReportFile, token);

        myMedicalReport = uploadRes.data.data;
      }

      const addDraftRequestRes = await requestService.user.addDraftRequest(
        { serviceId, ...values, myMedicalReport },
        token
      );

      showSuccessToast(addDraftRequestRes.data.message);

      const requestCheckout = await requestService.user.requestCheckout(
        addDraftRequestRes.data.data.id,
        token
      );

      window.location.href = requestCheckout.data.data;
    }
  };

  return (
    <AppTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <div className="container pt-30 lg:pt-50 mb-16">
        <Stepper
          activeStep={activeStep}
          className="mb-18 max-lg:flex-col max-lg:gap-2 max-lg:items-start"
        >
          {steps.current.map(({ id, label }, index) => {
            return (
              <Step key={id}>
                <StepLabel>{t(label)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className="flex justify-center">
          <div
            className={classNames("p-9 lg:px-14 shadow-lg bg-white", {
              "lg:w-1/2": steps.current[activeStep].id === Steps.LOGIN,
              "w-full": steps.current[activeStep].id !== Steps.LOGIN,
            })}
          >
            {steps.current[activeStep].id === Steps.LOGIN && (
              <LoginStep onNext={() => setActiveStep((step) => step + 1)} />
            )}

            {steps.current[activeStep].id === Steps.UPLOAD && (
              <UploadDoctorReportStep
                initialValues={values}
                onNext={(values) => {
                  setValues((oldValues) => ({ ...oldValues, ...values }));
                  setActiveStep((step) => step + 1);
                }}
              />
            )}

            {steps.current[activeStep].id === Steps.CLINICAL && (
              <ClinicalDetailsStep
                initialValues={values}
                onNext={saveDraftRequest}
                onPrevious={() => {
                  setActiveStep((step) => step - 1);
                }}
              />
            )}

            {steps.current[activeStep].id === Steps.DONE && <ThankYouStep />}
          </div>
        </div>
      </div>
    </AppTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req, query }: any) {
  const result = await Promise.all([
    serviceService.common.getMainServices(),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      serviceId: query.serviceId,
      mainServices: result[0].data.data,
      appSettings: result[1].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
