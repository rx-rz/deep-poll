import { Question } from "@/types/questions";
import { ReactNode } from "react";
import { TextInputQuestionCreator } from "./textinput-question-creator";
import { QuestionCreationCard } from "@/components/question-creation-card";
import { QuestionIcon } from "@/lib/question-editor-props";
import { EmailInputQuestionCreator } from "./emailinput-question-creator";
import { NumberInputQuestionCreator } from "./numberinput-question-creator";
import { MultipleChoiceInputQuestionCreator } from "./multiplechoiceinput-question-creator";
import { CheckboxInputQuestionCreator } from "./checkboxinput-question-creator";
import { DropdownInputQuestionCreator } from "./dropdowninput-question-creator";
import { LinearScaleInputQuestionCreator } from "./linearscaleinput-question-creator";
import { SliderInputQuestionCreator } from "./sliderinput-question-creator";
import { LikertInputQuestionCreator } from "./likertinput-question-creator";
import { DateInputQuestionCreator } from "./dateinput-question-creator";
import { TimeInputQuestionCreator } from "./timeinput-question-creator";
import { DateTimeInputQuestionCreator } from "./datetimeinput-question-creator";
import { FileUploadInputQuestionCreator } from "./fileuploadinput-question-creator";

type Props = {
  question: Question;
};
export const QuestionCreator = ({ question }: Props) => {
  let questionInputSettings: ReactNode;
  switch (question.questionType) {
    case "text":
      questionInputSettings = (
        <TextInputQuestionCreator question={question as Question<"text">} />
      );
      break;
    case "email":
      questionInputSettings = (
        <EmailInputQuestionCreator question={question as Question<"email">} />
      );
      break;
    case "number":
      questionInputSettings = (
        <NumberInputQuestionCreator question={question as Question<"number">} />
      );
      break;
    case "multiple_choice":
      questionInputSettings = (
        <MultipleChoiceInputQuestionCreator
          question={question as Question<"multiple_choice">}
        />
      );
      break;
    case "checkbox":
      questionInputSettings = (
        <CheckboxInputQuestionCreator
          question={question as Question<"checkbox">}
        />
      );
      break;
    case "dropdown":
      questionInputSettings = (
        <DropdownInputQuestionCreator
          question={question as Question<"dropdown">}
        />
      );
      break;
    case "linear_scale":
      questionInputSettings = (
        <LinearScaleInputQuestionCreator
          question={question as Question<"linear_scale">}
        />
      );
      break;
    case "slider":
      questionInputSettings = (
        <SliderInputQuestionCreator question={question as Question<"slider">} />
      );
      break;
    case "likert":
      questionInputSettings = (
        <LikertInputQuestionCreator question={question as Question<"likert">} />
      );
      break;
    case "date":
      questionInputSettings = (
        <DateInputQuestionCreator question={question as Question<"date">} />
      );
      break;
    case "time":
      questionInputSettings = (
        <TimeInputQuestionCreator question={question as Question<"time">} />
      );
      break;
    case "datetime":
      questionInputSettings = (
        <DateTimeInputQuestionCreator
          question={question as Question<"datetime">}
        />
      );
      break;
    case "file":
      questionInputSettings = (
        <FileUploadInputQuestionCreator
          question={question as Question<"file">}
        />
      );
      break;
  }

  return (
    <QuestionCreationCard
      icon={QuestionIcon[question.questionType]}
      orderNumber={question.orderNumber ?? 1}
      id={question.id}
      questionText={question.questionText ?? ""}
      questionType={question.questionType}
    >
      <div className="mt-8">{questionInputSettings}</div>
    </QuestionCreationCard>
  );
};
