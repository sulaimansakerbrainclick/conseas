import questionService from "@/services/questionService";
import { Answer, Question } from "@prisma/client";
import { useContext, useState } from "react";
import SessionContext from "../contexts/SessionContext";

const useQuestions = () => {
  const { token } = useContext(SessionContext)!;

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>();
  const [questions, setQuestions] = useState<(Question & { answers: Answer[] })[]>();

  const fetchQuestions = (id: string) => {
    setSelectedRequestId(null);

    questionService
      .getQuestions(id, token)
      .then((res) => {
        setQuestions(res.data.data);
        setSelectedRequestId(id);
      })
      .catch((e) => {});
  };

  return { selectedRequestId, questions, fetchQuestions };
};

export default useQuestions;
