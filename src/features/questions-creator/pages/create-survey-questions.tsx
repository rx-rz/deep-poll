import { QuestionTypeTrigger } from "../container/question-type-trigger";
import { SurveyOptions } from "../container/survey-options";
import { SurveyQuestions } from "../container/survey-questions";

export const CreateSurveyQuestions = () => {
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
