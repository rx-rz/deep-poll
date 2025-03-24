import { Route, Switch } from "wouter";
import "./App.css";
import { CreateSurveyQuestions } from "./features/questions-creator/pages/create-survey-questions";
import DesignSystem from "./features/questions-creator/pages/design-system";
import { AnswerSurvey } from "./features/question-generator/pages/answer-survey";

function App() {
  return (
    <>
      <Switch>
        <Route path={"/"}>
          <CreateSurveyQuestions />
        </Route>
        <Route path={"/answer"}>
          <AnswerSurvey />
        </Route>
        <Route path={"/design"}>
          <DesignSystem />
        </Route>
      </Switch>
    </>
  );
}

export default App;
