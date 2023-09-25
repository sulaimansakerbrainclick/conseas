import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Request, RequestStatus, Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MessageIcon from "@mui/icons-material/Message";
import Table from "@mui/material/Table";
import { TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import dateFormat from "@/configs/dateFormat";
import requestService from "@/services/requestService";
import { useContext } from "react";
import ChatForm, { ChatFormValues } from "@/components/forms/chat-form/ChatForm";
import questionService from "@/services/questionService";
import SessionContext from "@/components/contexts/SessionContext";
import showSuccessToast from "@/utils/showSuccessToast";
import useQuestions from "@/components/hooks/useQuestions";
import { useTranslation } from "next-i18next";
import UploadButton from "@/components/reusable/upload-button/UploadButton";
import { FormikHelpers } from "formik";
import serviceService from "@/services/serviceService";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import settingService from "@/services/settingService";
import { AppSettingFormValues } from "@/components/forms/app-settings-form/AppSettingsForm";
import useIsRtl from "@/components/hooks/useIsRtl";

export default function MyCases({
  requests,
  mainServices,
  appSettings,
}: {
  requests: (Request & { requestStatus: RequestStatus })[];
  mainServices: (Service & { children: Service[] })[];
  appSettings: AppSettingFormValues;
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const { selectedRequestId, questions, fetchQuestions } = useQuestions();

  const isRtl = useIsRtl();

  const addQuestion = (
    values: ChatFormValues,
    { setSubmitting }: FormikHelpers<ChatFormValues>
  ) => {
    setSubmitting(true);

    if (selectedRequestId) {
      questionService
        .addQuestion(values.text, selectedRequestId, token)
        .then((res) => {
          showSuccessToast(res.data.message);

          fetchQuestions(selectedRequestId);
        })
        .catch((e) => {})
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <DshboardTemplate
      header={<Header services={mainServices} />}
      footer={<Footer services={mainServices} appSettings={appSettings} />}
    >
      <h1 className="mb-8">{t("My Cases")}</h1>

      <Table size="small" className="mb-2.5">
        <TableHead>
          <TableRow>
            <TableCell className="hidden lg:table-cell">{t("First Name")}</TableCell>
            <TableCell className="hidden lg:table-cell">{t("Last Name")}</TableCell>
            <TableCell>{t("Date")}</TableCell>
            <TableCell>{t("Status")}</TableCell>
            <TableCell>
              <div className="text-color-1">{t("Medical Report")}</div>
            </TableCell>
            <TableCell>
              <div className="text-color-1">{t("Message")}</div>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {requests.map(({ id, firstName, lastName, requestStatus, createdAt, medicalReport }) => {
            return (
              <TableRow key={id}>
                <TableCell className="hidden lg:table-cell">{firstName}</TableCell>
                <TableCell className="hidden lg:table-cell">{lastName}</TableCell>
                <TableCell>{dayjs(createdAt).format(dateFormat)}</TableCell>
                <TableCell>{isRtl ? requestStatus.nameAr : requestStatus.nameEn}</TableCell>
                <TableCell>
                  {medicalReport ? (
                    <UploadButton fileUrl={medicalReport}>
                      {t("Upload medical report")}
                    </UploadButton>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => fetchQuestions(id)}>
                    <MessageIcon />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {questions?.map(({ id, text, answers }) => (
        <div key={id} className="mb-2.5">
          <TextField
            value={text}
            variant="outlined"
            size="small"
            multiline
            disabled
            maxRows={4}
            sx={{
              textarea: {
                "-webkit-text-fill-color": "var(--black) !important",
              },
            }}
          />

          {answers.length !== 0 &&
            answers.map((answer) => (
              <TextField
                key={id}
                value={answer.text}
                variant="outlined"
                size="small"
                multiline
                disabled
                maxRows={4}
                className="mt-2.5"
                sx={{
                  textarea: {
                    "-webkit-text-fill-color": "var(--black) !important",
                  },
                }}
              />
            ))}
        </div>
      ))}

      {selectedRequestId && (
        <ChatForm
          label={t("Ask questions regarding anything in the report")}
          onSubmit={addQuestion}
          initialValues={{
            text: "",
          }}
        />
      )}
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    serviceService.common.getMainServices(),
    requestService.user.getRequests(token),
    settingService.geSettings(),
  ]);

  return {
    props: {
      session: req.session,
      mainServices: result[0].data.data,
      requests: result[1].data.data,
      appSettings: result[2].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
