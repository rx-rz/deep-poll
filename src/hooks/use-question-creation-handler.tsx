import {
  QuestionOptionsMap,
  QuestionType,
  useQuestionStore,
} from "@/store/questions.store";
import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";

const defaultOptionsMap: {
  [key in QuestionType]: Partial<QuestionOptionsMap[key]>;
} = {
  text: { placeholder: "", minAnswerLength: 1, maxAnswerLength: 255 },
  email: {
    placeholder: "",
    minEmailLength: 1,
    maxEmailLength: 255,
    allowedDomains: "",
    disallowedDomains: "",
    allowDuplicates: false,
  },
  number: { placeholder: "", allowDecimal: false, min: 0, max: 100 },
  phone: { placeholder: "" },
  multiple_choice: { choices: [], allowOther: false },
  checkbox: { choices: [], minSelections: 1, maxSelections: 5 },
  dropdown: { choices: [] },
  rating: { min: 1, max: 5, labels: [] },
  likert: { scale: 5, labels: [] },
  linear_scale: { min: 0, max: 100, labels: { start: "", end: "" } },
  date: { format: "yyyy-MM-dd", minDate: "", maxDate: "" },
  time: { format: "HH:mm", minTime: "", maxTime: "" },
  datetime: { format: "yyyy-MM-dd HH:mm", minDatetime: "", maxDatetime: "" },
  file: {
    acceptedFormats: [],
    maxSizeMB: 1,
    maxFiles: 1,
    allowMultiple: false,
  },
  slider: {
    min: 0,
    max: 100,
    step: 1,
    labels: { start: "", end: "" },
    defaultValue: 0,
  },
};

const initializeOptions = <T extends QuestionType>(
  type: T,
  currentOptions: Partial<QuestionOptionsMap[T]>
): QuestionOptionsMap[T] => {
  return {
    ...defaultOptionsMap[type],
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
