// import { useQuestionStore } from "@/store/questions.store";
import { QuestionTypeTrigger } from "../container/question-type-trigger";
import { SurveyOptions } from "../container/survey-options";
import { SurveyQuestions } from "../container/survey-questions";

export const CreateSurveyQuestions = () => {
  // const { questions } = useQuestionStore();
  return (
    <div className="w-full border">
      <SurveyOptions />
      <div className="max-w-lg mx-auto w-[96%] mb-16">
        <SurveyQuestions />
        <QuestionTypeTrigger />
      </div>
    </div>
  );
};
