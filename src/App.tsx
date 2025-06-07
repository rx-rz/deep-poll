import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { CreateQuestionsPage } from "./features/questions/pages/create-questions-page";
import { AnswerSurveyPage } from "./features/answers/pages/answer-survey-page";
import { RegisterPage } from "./features/auth/pages/register";
import { LoginPage } from "./features/auth/pages/login";
import { Homepage } from "./features/home/pages/homepage";
import { Toaster } from "./components/ui/sonner";
import { SurveyResponsesPage } from "./features/questions/pages/survey-responses-page";
import { ResponseDetailsPage } from "./features/questions/pages/response-details-page";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Switch>
          <Route path={"/survey/:surveyId/create"}>
            <CreateQuestionsPage />
          </Route>
          <Route path={"/register"}>
            <RegisterPage />
          </Route>
          <Route path={"/login"}>
            <LoginPage />
          </Route>
          <Route path={"/survey/:surveyId"}>
            <AnswerSurveyPage />
          </Route>
          <Route path={"/survey/:surveyId/preview"}>
            <AnswerSurveyPage />
          </Route>
          <Route path={"/survey/:surveyId/responses"}>
            <SurveyResponsesPage />
          </Route>
          <Route path={"/survey/:surveyId/responses/:responseId"}>
            <ResponseDetailsPage />
          </Route>
          <Route path={"/"}>
            <Homepage />
          </Route>
          {/* <Route path={"/design"}>
          <DesignSystem />
        </Route> */}
        </Switch>
        <Toaster visibleToasts={1} />
      </>
    </QueryClientProvider>
  );
}

export default App;
