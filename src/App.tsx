import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { CreateSurveyQuestions } from "./features/questions-creator/pages/create-survey-questions";
import DesignSystem from "./features/questions-creator/pages/design-system";
import { AnswerSurvey } from "./features/question-generator/pages/answer-survey";
import { RegisterPage } from "./features/auth/pages/register";
import { LoginPage } from "./features/auth/pages/login";
import { Homepage } from "./features/home/pages/homepage";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path={"/"}>
          <CreateSurveyQuestions />
        </Route>
        <Route path={"/register"}>
          <RegisterPage />
        </Route>
        <Route path={"/login"}>
          <LoginPage />
        </Route>
        <Route path={"/answer"}>
          <AnswerSurvey />
        </Route>
        <Route path={"/home"}>
          <Homepage />
        </Route>
        <Route path={"/design"}>
          <DesignSystem />
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
