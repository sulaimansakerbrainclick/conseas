import http from "./http";

const addQuestion = (text: any, requestId: string, token: string) => {
  return http.post(
    `/user/questions/${requestId}`,
    { text },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const getQuestions = (requestId: string, token: string) => {
  return http.get(`/user/questions/${requestId}`, {
    headers: {
      Authorization: token,
    },
  });
};

const addAnswer = (text: any, questionId: string, token: string) => {
  return http.post(
    `/admin/answers/${questionId}`,
    { text },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

const questionService = {
  addQuestion,
  getQuestions,
  addAnswer,
};

export default questionService;
