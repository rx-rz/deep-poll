import {
  Question,
  QuestionOptionsMap,
  QuestionType,
  useQuestionStore,
} from "@/store/questions.store";
import { ShortText } from "./short_text";

const renderQuestionComponent = <T extends QuestionType>(
  question: Question<T>
) => {
  const { questionText, questionType, required, options } = question;

  switch (questionType) {
    case "text_short": {
      const typedOptions = options as QuestionOptionsMap["text_short"];
      return (
        <ShortText
          maxLength={typedOptions?.maxLength ?? 255}
          minLength={typedOptions.minLength ?? 1}
          placeholder={typedOptions.placeholder}
          required={required}
          questionText={questionText}
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
    <div>{questions.map((question) => renderQuestionComponent(question))}</div>
  );
};
