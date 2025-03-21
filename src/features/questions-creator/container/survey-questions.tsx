import {
  Question,
  QuestionType,
  useQuestionStore,
} from "@/store/questions.store";
import { TextQuestionCard } from "@/features/questions-creator/components/text-question-card";

const renderQuestionComponent = <T extends QuestionType>(
  question: Question<T>
) => {
  const { questionType, questionId } = question;

  switch (questionType) {
    case "text": {
      return <TextQuestionCard questionId={questionId} key={questionId} />;
    }
    default:
      return null;
  }
};

export const SurveyQuestions = () => {
  const { questions } = useQuestionStore();

  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {questions.map((question) => renderQuestionComponent(question))}
    </div>
  );
};
