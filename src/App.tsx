import { Route, Switch } from "wouter";
import "./App.css";
import { CreateSurvey } from "./features/survey-generator/pages/create-survey";

function App() {
  return (
    <>
      <Switch>
        <Route path={"/"}>
          <CreateSurvey />
        </Route>
      </Switch>
    </>
  );
}

export default App;
