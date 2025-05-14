import { QuestionTypeTrigger } from "../container/question-type-trigger";
import { SurveyQuestions } from "../container/survey-questions";
import { QuestionCreatorLayout } from "../question-creator-layout";

export const CreateQuestionsPage = () => {
  return (
    <QuestionCreatorLayout>
      <SurveyQuestions />
      <QuestionTypeTrigger />
    </QuestionCreatorLayout>
  );
};
