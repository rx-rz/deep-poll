import { useQuestionStore } from "@/store/questions.store";
import { QuestionTypeTrigger } from "../container/question-type-trigger";
import { SurveyOptions } from "../container/survey-options";
import { SurveyQuestions } from "../container/survey-questions";

export const CreateSurveyQuestions = () => {
  const { questions } = useQuestionStore();
  return (
    <div className="w-full border">
      <div className="absolute max-w-sm break-words text-sm font-medium">{JSON.stringify(questions)}</div>
      <div className="max-w-lg mx-auto">
        <SurveyOptions />
        <SurveyQuestions />
        <QuestionTypeTrigger />
      </div>
    </div>
  );
};
