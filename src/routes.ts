export const routes = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const protectedRoutes = {
  CREATE_SURVEY: (surveyId: string) => `/survey/${surveyId}/create`,
  HOME: "/",
  PREVIEW_SURVEY: (surveyId: string) => `/survey/${surveyId}/preview`,
  ANSWER_SURVEY: (surveyId: string) => `/survey/${surveyId}`,
};
