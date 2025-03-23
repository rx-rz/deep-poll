import { Route, Switch } from "wouter";
import "./App.css";
import { CreateSurveyQuestions } from "./features/questions-creator/pages/create-survey-questions";
import DesignSystem from "./features/questions-creator/pages/design-system";

function App() {
  return (
    <>
      <Switch>
        <Route path={"/"}>
          <CreateSurveyQuestions />
        </Route>
        <Route path={"/design"}>
          <DesignSystem />
        </Route>
      </Switch>
    </>
  );
}

export default App;
