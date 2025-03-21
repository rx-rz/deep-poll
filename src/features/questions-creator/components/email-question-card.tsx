import { QuestionOptionsMap, useQuestionStore } from "@/store/questions.store";
import { QuestionInput } from "./question-input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Mail } from "lucide-react";
import { QuestionCreationCard } from "@/components/question-creation-card";
import { EmailQuestionCardOptions } from "./email-question-card-options";

type Props = {
  questionId: string;
};

type LocalQuestionOptions = {
  minLength: number;
  maxLength: number;
  required: boolean;
  placeholder: string;
  allowedDomains: string[];
  disallowedDomains: string[];
  allowDuplicates: boolean;
};

export const EmailQuestionCard = ({ questionId }: Props) => {
  const { questions, updateQuestion } = useQuestionStore();
  const currentQuestion = questions.find(
    (state) => state.questionId === questionId
  );
  const currentQuestionOptions =
    currentQuestion?.options as QuestionOptionsMap["email"];
  const [questionText, setQuestionText] = useState(
    currentQuestion?.questionText ?? ""
  );
  const [localQuestionOptions, setLocalQuestionOptions] =
    useState<LocalQuestionOptions>({
      minLength: 1,
      maxLength: currentQuestionOptions?.maxLength ?? 255,
      required: currentQuestion?.required ?? false,
      placeholder: currentQuestionOptions?.placeholder ?? "",
      allowedDomains: currentQuestionOptions?.allowedDomains ?? [],
      disallowedDomains: currentQuestionOptions?.disallowedDomains ?? [],
      allowDuplicates: currentQuestionOptions?.allowDuplicates ?? false,
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
        placeholder: localQuestionOptions.placeholder,
        allowedDomains: localQuestionOptions.allowedDomains,
        disallowedDomains: localQuestionOptions.disallowedDomains,
        allowDuplicates: localQuestionOptions.allowDuplicates,
      },
      required: localQuestionOptions.required,
    });
  }, [debouncedQuestionText, debouncedQuestionOptions]);

  return (
    <QuestionCreationCard
      icon={<Mail size={18} strokeWidth={1.9} />}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionId={questionId}
      questionText={currentQuestion?.questionText ?? ""}
      questionType={"email"}
    >
      <QuestionInput
        questionText={questionText}
        setQuestionText={setQuestionText}
      />
      <EmailQuestionCardOptions
        questionOptions={localQuestionOptions}
        setQuestionOptions={setLocalQuestionOptions}
      />
    </QuestionCreationCard>
  );
};
