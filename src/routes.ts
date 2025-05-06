export const routes = {
  LOGIN: "/login",
  REGISTER: "/register",
};

export const protectedRoutes = {
  SURVEY: (surveyId: string) => `/survey/${surveyId}`,
  HOME: "/",
  
};
