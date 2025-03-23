import { useQuestionHandler } from "@/hooks/use-question-creation-handler";
import { QuestionOptionsMap, QuestionType } from "@/store/questions.store";
import { QuestionInput } from "../components/question-input";
import { TextQuestionOptions } from "./text-question-options";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Switch } from "@/components/ui/switch";
import { QuestionCreationCard } from "@/components/question-creation-card";
import { QuestionIcon } from "@/lib/question-editor-props";
import { EmailQuestionOptions } from "./email-question-options";
import { NumberQuestionOptions } from "./number-question-options";
import { MultipleChoiceQuestionOptions } from "./multiple-choice-question-options";
import { CheckboxQuestionOptions } from "./checkbox-question-options";
import { DropdownQuestionOptions } from "./dropdown-question-options";
import { LikertQuestionOptions } from "./likert-question-options";
import { RatingQuestionOptions } from "./rating-question-options";
import { LinearScaleQuestionOptions } from "./linear-scale-question-options";
import { DateQuestionOptions } from "./date-question-options";
import { TimeQuestionOptions } from "./time-question-options";
import { DateTimeQuestionOptions } from "./datetime-question-options";
import { SliderQuestionOptions } from "./slider-question-options";
import { FileUploadQuestionOptions } from "./file-upload-question-options";

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
          questionOptions={
            localOptions as QuestionOptionsMap["multiple_choice"]
          }
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["multiple_choice"]>
            >
          }
        />
      );
      break;
    case "checkbox":
      optionSettings = (
        <CheckboxQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["checkbox"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["checkbox"]>
            >
          }
        />
      );
      break;
    case "dropdown":
      optionSettings = (
        <DropdownQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["dropdown"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["dropdown"]>
            >
          }
        />
      );
      break;
    case "likert":
      optionSettings = (
        <LikertQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["likert"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["likert"]>
            >
          }
        />
      );
      break;
    case "rating":
      optionSettings = (
        <RatingQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["rating"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["rating"]>
            >
          }
        />
      );
      break;
    case "linear_scale":
      optionSettings = (
        <LinearScaleQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["linear_scale"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["linear_scale"]>
            >
          }
        />
      );
      break;
    case "date":
      optionSettings = (
        <DateQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["date"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["date"]>
            >
          }
        />
      );
      break;
    case "time":
      optionSettings = (
        <TimeQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["time"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["time"]>
            >
          }
        />
      );
      break;
    case "datetime":
      optionSettings = (
        <DateTimeQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["datetime"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["datetime"]>
            >
          }
        />
      );
      break;
    case "slider":
      optionSettings = (
        <SliderQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["slider"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["slider"]>
            >
          }
        />
      );
      break;
    case "file":
      optionSettings = (
        <FileUploadQuestionOptions
          questionOptions={localOptions as QuestionOptionsMap["file"]}
          setQuestionOptions={
            setLocalOptions as Dispatch<
              SetStateAction<QuestionOptionsMap["file"]>
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
      <div className="md:ml-6 ml-5">
        <QuestionInput
          questionText={questionText}
          setQuestionText={setQuestionText}
        />
        {optionSettings}
        <div className="flex gap-2 mt-5">
          <Switch
            className="w-8 h-4 hover:cursor-pointer"
            checked={questionIsRequired}
            onCheckedChange={(checked) => setQuestionIsRequired(checked)}
          />
          <p className="font-medium text-xs">Required</p>
        </div>
      </div>
    </QuestionCreationCard>
  );
};
