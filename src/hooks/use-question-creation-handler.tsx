import { QuestionOptionsMap, QuestionType } from "@/types/questions";
import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { useQuestionStore } from "@/store/questions.store";
import { defaultQuestionOptions } from "@/lib/default-question-options";

const initializeOptions = <T extends QuestionType>(
  type: T,
  currentOptions: Partial<QuestionOptionsMap[T]>
): QuestionOptionsMap[T] => {
  return {
    ...defaultQuestionOptions[type],
    ...currentOptions,
  } as QuestionOptionsMap[T];
};

export const useQuestionHandler = <T extends QuestionType>(
  questionId: string,
  questionType: T
) => {
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find((q) => q.questionId === questionId);
  const currentOptions = currentQuestion?.options as
    | Partial<QuestionOptionsMap[T]>
    | undefined;
  const [questionText, setQuestionText] = useState(
    currentQuestion?.questionText ?? ""
  );
  const [isRequired, setIsRequired] = useState(
    currentQuestion?.required ?? true
  );
  const [localOptions, setLocalOptions] = useState<QuestionOptionsMap[T]>(
    initializeOptions(questionType, currentOptions ?? {})
  );

  const debouncedQuestionText = useDebounce(questionText, 900);
  const debouncedQuestionRequired = useDebounce(isRequired, 900);
  const debouncedLocalOptions = useDebounce(localOptions, 900);

  useEffect(() => {
    updateQuestion(questionId, {
      questionText: debouncedQuestionText,
      options: debouncedLocalOptions,
      required: debouncedQuestionRequired,
    });
  }, [
    debouncedQuestionText,
    debouncedLocalOptions,
    debouncedQuestionRequired,
    questionId,
    updateQuestion,
  ]);

  return {
    currentQuestion,
    questionText,
    setQuestionText,
    questionIsRequired: isRequired,
    setQuestionIsRequired: setIsRequired,
    localOptions,
    setLocalOptions,
  };
};
