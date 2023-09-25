import Header from "@/components/ui/header/Header";
import DshboardTemplate from "@/components/templates/dshboard-template/DshboardTemplate";
import { sessionOptions } from "@/lib/session";
import { Question, Request, RequestStatus, Service } from "@prisma/client";
import { withIronSessionSsr } from "iron-session/next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useState } from "react";
import SessionContext from "@/components/contexts/SessionContext";
import { useTranslation } from "next-i18next";
import requestService from "@/services/requestService";
import RequestTable from "@/components/tables/RequestTable";
import useQuestions from "@/components/hooks/useQuestions";
import questionService from "@/services/questionService";
import showSuccessToast from "@/utils/showSuccessToast";
import { TextField } from "@mui/material";
import ChatForm, { ChatFormValues } from "@/components/forms/chat-form/ChatForm";
import { FormikHelpers } from "formik";
import ReplyIcon from "@mui/icons-material/Reply";
import IconButton from "@mui/material/IconButton";
import requestStatusService from "@/services/requestStatusService";

export default function Requests({
  requests,
  requestStatuses,
}: {
  requests: (Request & { service: Service; questions: Question[] })[];
  requestStatuses: RequestStatus[];
}) {
  const { t } = useTranslation("common");

  const { token } = useContext(SessionContext)!;

  const { selectedRequestId, questions, fetchQuestions } = useQuestions();
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const addAnswer = (values: ChatFormValues, { setSubmitting }: FormikHelpers<ChatFormValues>) => {
    if (selectedRequestId && selectedQuestionId && questions) {
      setSubmitting(true);

      questionService
        .addAnswer(values.text, selectedQuestionId, token)
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

  const handleQuestionsClick = (id: string) => {
    fetchQuestions(id);
    setSelectedQuestionId(null);
  };

  return (
    <DshboardTemplate header={<Header />}>
      <h1 className="mb-8">{t("Requests")}</h1>

      {requests && (
        <div className="mb-4">
          <RequestTable
            requestStatuses={requestStatuses}
            requests={requests}
            onQuestionsClick={handleQuestionsClick}
          />
        </div>
      )}

      {questions &&
        questions.map(({ id, text, answers }) => (
          <div key={id} className="mb-2.5">
            <div className="flex items-center mb-4">
              <div>{text}</div>

              <IconButton onClick={() => setSelectedQuestionId(id)}>
                <ReplyIcon />
              </IconButton>
            </div>

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
                  className="mb-3"
                  sx={{
                    textarea: {
                      "-webkit-text-fill-color": "var(--black) !important",
                    },
                  }}
                />
              ))}

            {selectedRequestId && selectedQuestionId && selectedQuestionId === id && (
              <ChatForm
                onSubmit={addAnswer}
                label={t("Replay")}
                initialValues={{
                  text: "",
                }}
              />
            )}
          </div>
        ))}
    </DshboardTemplate>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ locale, req }: any) {
  const { token } = req.session;

  const result = await Promise.all([
    requestService.getAllRequests(token),
    requestStatusService.getRequestStatusService(),
  ]);

  return {
    props: {
      session: req.session,
      requests: result[0].data.data,
      requestStatuses: result[1].data.data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}, sessionOptions);
