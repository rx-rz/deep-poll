import {
  Question,
  QuestionType,
  useQuestionStore,
} from "@/store/questions.store";
import { TextQuestionCard } from "./text-question-card";
import { EmailQuestionCard } from "./email-question-card";

const renderQuestionComponent = <T extends QuestionType>(
  question: Question<T>
) => {
  const { questionType, questionId } = question;

  switch (questionType) {
    case "text": {
      return <TextQuestionCard questionId={questionId} />;
    }
    case "email": {
      return <EmailQuestionCard questionId={questionId} />;
    }

    default:
      return null;
  }
};

export const SurveyQuestions = () => {
  const { questions } = useQuestionStore();

  return (
    <div className="flex flex-col gap-4 mt-4">
      {questions.map((question) => renderQuestionComponent(question))}
    </div>
  );
};
