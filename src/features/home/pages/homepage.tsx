import { CreateSurveyButton } from "../components/create-survey-button";
import { SurveyList } from "../containers/survey-list";

export const Homepage = () => {
  return (
    <main>
      <div className="mx-auto max-w-6xl mt-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Surveys</h1>

        <ul className="gap-8 grid grid-cols-2 mt-4">
          <CreateSurveyButton />
          <SurveyList />
        </ul>
      </div>
  </main>
  );
};
