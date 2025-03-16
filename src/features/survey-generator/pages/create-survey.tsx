import { QuestionTypeSlider } from "../containers/question-type-slider";
import { SurveyOptions } from "../containers/survey-options";

export const CreateSurvey = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto">
        <SurveyOptions />
        <div className="absolute rounded-full h-8 w-8 left-1/2 bottom-6 -translate-x-1/2">
          <QuestionTypeSlider />
        </div>
      </div>
    </div>
  );
};
