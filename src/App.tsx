import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { CreateSurveyQuestions } from "./features/questions-creator/pages/create-survey-questions";
import { AnswerSurvey } from "./features/question-generator/pages/answer-survey";
import { RegisterPage } from "./features/auth/pages/register";
import { LoginPage } from "./features/auth/pages/login";
import { Homepage } from "./features/home/pages/homepage";
import { Toaster } from "./components/ui/sonner";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
      <Switch>
        <Route path={"/survey/:surveyId"}>
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
        <Route path={"/"}>
          <Homepage />
        </Route>
        {/* <Route path={"/design"}>
          <DesignSystem />
        </Route> */}

      </Switch>
      <Toaster richColors visibleToasts={1}/>
      </>
    </QueryClientProvider>
  );
}

export default App;
