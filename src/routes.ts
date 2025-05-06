export const routes = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const protectedRoutes = {
  SURVEY: (surveyId: string) => `/survey/${surveyId}/create`,
  HOME: "/",
  PREVIEW: (surveyId: string) => `/survey/${surveyId}/preview`
};
