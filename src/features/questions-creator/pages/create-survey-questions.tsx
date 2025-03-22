// import { useQuestionStore } from "@/store/questions.store";
import { QuestionTypeTrigger } from "../container/question-type-trigger";
import { SurveyOptions } from "../container/survey-options";
import { SurveyQuestions } from "../container/survey-questions";

export const CreateSurveyQuestions = () => {
  // const { questions } = useQuestionStore();
  return (
    <div className="w-full border">
      {/* <div className="absolute max-w-sm break-words text-sm font-medium">{JSON.stringify(questions)}</div> */}
      <SurveyOptions />
      <div className="max-w-lg mx-auto w-[96%] mb-16">
        <SurveyQuestions />
        <QuestionTypeTrigger />
      </div>
    </div>
  );
};
