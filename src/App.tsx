import { Route, Switch } from "wouter";
import "./App.css";
import { CreateSurveyQuestions } from "./features/questions-creator/pages/create-survey-questions";

function App() {
  return (
    <>
      <Switch>
        <Route path={"/"}>
          <CreateSurveyQuestions />
        </Route>
      </Switch>
    </>
  );
}

export default App;
