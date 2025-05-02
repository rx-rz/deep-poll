import { CreateSurveyBButton } from "../components/create-survey-button";
import { SurveyList } from "../containers/survey-list";

export const Homepage = () => {
  return (
    <div>
      <CreateSurveyBButton />
      <SurveyList />
    </div>
  );
};
