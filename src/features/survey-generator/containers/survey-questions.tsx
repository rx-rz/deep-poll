import {
  Question,
  QuestionType,
  useQuestionStore,
} from "@/store/questions.store";
import { TextQuestionCard } from "./question-cards/text-question-card";
import { EmailQuestionCard } from "./question-cards/email-question-card";
import { NumberQuestionCard } from "./question-cards/number-question-card";

const renderQuestionComponent = <T extends QuestionType>(
  question: Question<T>
) => {
  const { questionType, questionId } = question;

  switch (questionType) {
    case "text": {
      return <TextQuestionCard questionId={questionId} key={questionId} />;
    }
    case "email": {
      return <EmailQuestionCard questionId={questionId} key={questionId} />;
    }
    case "number": {
      return <NumberQuestionCard questionId={questionId} key={questionId} />;
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
