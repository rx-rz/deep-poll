import { QuestionTypeSlider } from "../containers/question-type-slider";
import { QuestionTypeTrigger } from "../containers/question-type-trigger";
import { SurveyOptions } from "../containers/survey-options";

export const CreateSurvey = () => {
  return (
    <div>
      <div className="max-w-lg mx-auto">
        <SurveyOptions />
        <QuestionTypeTrigger />
      </div>
    </div>
  );
};
