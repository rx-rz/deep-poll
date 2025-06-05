import { QuestionTypeTrigger } from "../container/question-type-trigger";
import { SurveyQuestions } from "../container/survey-questions";
import { QuestionsLayout } from "../question-creator-layout";

export const CreateQuestionsPage = () => {
  return (
    <QuestionsLayout>
      <QuestionTypeTrigger />
      <SurveyQuestions />
    </QuestionsLayout>
  );
};
