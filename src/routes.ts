export const routes = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const protectedRoutes = {
  CREATE_SURVEY: (surveyId: string) => `/survey/${surveyId}/create`,
  VIEW_SURVEY_RESPONSES: (surveyId: string) => `/survey/${surveyId}/responses`,
  VIEW_SURVEY_RESPONSE_DETAILS: (surveyId: string, responseId: string) =>
    `/survey/${surveyId}/responses/${responseId}`,
  HOME: "/",
  PREVIEW_SURVEY: (surveyId: string) => `/survey/${surveyId}/preview`,
  ANSWER_SURVEY: (surveyId: string) => `/survey/${surveyId}`,
};
