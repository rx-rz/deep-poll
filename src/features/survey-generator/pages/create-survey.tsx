import { QuestionTypeTrigger } from "../containers/question-type-trigger";
import { SurveyOptions } from "../containers/survey-options";
import { SurveyQuestions } from "../containers/survey-questions";

export const CreateSurvey = () => {
  return (
    <div>
      <div className="max-w-lg mx-auto">
        <SurveyOptions />
        <SurveyQuestions />
        <QuestionTypeTrigger />
      </div>
    </div>
  );
};
