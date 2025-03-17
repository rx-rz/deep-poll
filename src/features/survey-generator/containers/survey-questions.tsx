import {
  Question,
  QuestionOptionsMap,
  QuestionType,
  useQuestionStore,
} from "@/store/questions.store";
import { TextInput } from "./text-input";

const renderQuestionComponent = <T extends QuestionType>(
  question: Question<T>
) => {
  const { questionText, questionType, required, questionId, orderNumber, options } =
    question;

  switch (questionType) {
    case "text": {
      const typedOptions = options as QuestionOptionsMap["text"];
      return (
        <TextInput
          maxLength={typedOptions?.maxLength ?? 255}
          minLength={typedOptions.minLength ?? 1}
          placeholder={typedOptions.placeholder}
          required={required}
          questionText={questionText}
          questionId={questionId}
          orderNumber={orderNumber}
        />
      );
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
