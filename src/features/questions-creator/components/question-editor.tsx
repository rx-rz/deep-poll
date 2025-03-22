import { useQuestionHandler } from "@/hooks/use-question-creation-handler";
import { QuestionOptionsMap, QuestionType } from "@/store/questions.store";
import { QuestionInput } from "./question-input";
import { TextQuestionOptions } from "./text-question-options";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Switch } from "@/components/ui/switch";
import { QuestionCreationCard } from "@/components/question-creation-card";
import { QuestionIcon } from "@/lib/question-editor-props";
import { EmailQuestionOptions } from "./email-question-options";
import { NumberQuestionOptions } from "./number-question-options";
import { MultipleChoiceQuestionOptions } from "./multiple-choice-question-options";

type Props = {
  questionId: string;
  questionType: QuestionType;
};

export const QuestionEditor = ({ questionId, questionType }: Props) => {
  const {
    questionText,
    setQuestionText,
    questionIsRequired,
    setQuestionIsRequired,
    localOptions,
    setLocalOptions,
    currentQuestion,
  } = useQuestionHandler(questionId, questionType);

  let optionSettings: ReactNode;
  switch (questionType) {
    case "text":
      optionSettings = (
        <TextQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["text"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["text"]>
            >
          }
        />
      );
      break;
    case "email":
      optionSettings = (
        <EmailQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["email"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["email"]>
            >
          }
        />
      );
      break;
    case "number":
      optionSettings = (
        <NumberQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["number"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["number"]>
            >
          }
        />
      );
      break;
    case "multiple_choice":
      optionSettings = (
        <MultipleChoiceQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["multiple_choice"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["multiple_choice"]>
            >
          }
        />
      );
      break;
    default:
      optionSettings = null;
  }

  return (
    <QuestionCreationCard
      icon={QuestionIcon[questionType]}
      orderNumber={currentQuestion?.orderNumber ?? 1}
      questionId={questionId}
      questionText={currentQuestion?.questionText ?? ""}
      questionType={questionType}
    >
      <QuestionInput
        questionText={questionText}
        setQuestionText={setQuestionText}
      />
      {optionSettings}
      <div className="flex flex-col justify-between gap-2 mt-5">
        <p className="font-medium text-xs">Required</p>
        <Switch
          className="w-8 h-4 hover:cursor-pointer"
          checked={questionIsRequired}
          onCheckedChange={(checked) => setQuestionIsRequired(checked)}
        />
      </div>
    </QuestionCreationCard>
  );
};
