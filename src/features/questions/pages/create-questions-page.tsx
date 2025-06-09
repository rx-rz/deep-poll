import { QuestionTypeTrigger } from "../container/question-type-trigger";
import { SurveyQuestions } from "../container/survey-questions";
import { QuestionsLayout } from "../question-creator-layout";

export const CreateQuestionsPage = () => {
  return (
    <QuestionsLayout>
      <div className="flex gap-10 h-screen relative">
        <div className="sticky top-8 h-fit">
          <QuestionTypeTrigger />
        </div>
        <SurveyQuestions />
      </div>
    </QuestionsLayout>
  );
};
