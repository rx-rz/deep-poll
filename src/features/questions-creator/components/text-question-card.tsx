import { QuestionOptionsMap, useQuestionStore } from "@/store/questions.store";
import { TextQuestionInput } from "./text-question-input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Text } from "lucide-react";
import { QuestionCreationCard } from "@/components/question-creation-card";
import { TextQuestionCardOptions } from "./text-question-card-options";

type Props = {
  questionId: string;
};

type LocalQuestionOptions = {
  minLength: number;
  maxLength: number;
  required: boolean;
};

export const TextQuestionCard = ({ questionId }: Props) => {
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find(
    (state) => state.questionId === questionId
  );
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["text"];
  const [questionText, setQuestionText] = useState(
    currentQuestion?.questionText ?? ""
  );
  const [localQuestionOptions, setLocalQuestionOptions] =
    useState<LocalQuestionOptions>({
      minLength: 1,
      maxLength: currentQuestionOptions?.maxLength ?? 255,
      required: currentQuestion?.required ?? false,
    });

  const debouncedQuestionText = useDebounce<string>(questionText, 900);
  const debouncedQuestionOptions = useDebounce<LocalQuestionOptions>(
    localQuestionOptions,
    900
  );
  useEffect(() => {
    updateQuestion(questionId, { questionText: debouncedQuestionText });
    updateQuestion(questionId, {
      options: {
        ...(currentQuestionOptions as QuestionOptionsMap["text"]),
        minLength: localQuestionOptions.minLength,
        maxLength: localQuestionOptions.maxLength,
      },
      required: localQuestionOptions.required,
    });
  }, [debouncedQuestionText, debouncedQuestionOptions]);

  return (
    <QuestionCreationCard
      icon={<Text size={18} strokeWidth={1.9} />}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionId={questionId}
      questionText={currentQuestion?.questionText ?? ""}
      questionType={"text"}
    >
      <TextQuestionInput
        questionText={questionText}
        setQuestionText={setQuestionText}
      />
      <TextQuestionCardOptions
        questionOptions={localQuestionOptions}
        setQuestionOptions={setLocalQuestionOptions}
      />
    </QuestionCreationCard>
  );
};
