import { CreateSurveyButton } from "../components/create-survey-button";
import { SurveyList } from "../containers/survey-list";

export const Homepage = () => {
  return (
    <main>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Surveys</h1>
        <CreateSurveyButton />
        <SurveyList />
      </div>
    </main>
  );
};
