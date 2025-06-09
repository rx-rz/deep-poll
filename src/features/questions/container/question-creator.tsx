import { Question } from "@/types/questions";
import { ReactNode } from "react";
import { TextInputQuestionCreator } from "../components/textinput-question-creator";
import { QuestionCreationCard } from "@/components/question-creation-card";
import { QuestionIcon } from "@/lib/question-editor-props";
import { EmailInputQuestionCreator } from "../components/emailinput-question-creator";
import { NumberInputQuestionCreator } from "../components/numberinput-question-creator";
import { MultipleChoiceInputQuestionCreator } from "../components/multiplechoiceinput-question-creator";
import { CheckboxInputQuestionCreator } from "../components/checkboxinput-question-creator";
import { DropdownInputQuestionCreator } from "../components/dropdowninput-question-creator";
import { LinearScaleInputQuestionCreator } from "../components/linearscaleinput-question-creator";
import { SliderInputQuestionCreator } from "../components/sliderinput-question-creator";
import { LikertInputQuestionCreator } from "../components/likertinput-question-creator";
import { DateInputQuestionCreator } from "../components/dateinput-question-creator";
import { TimeInputQuestionCreator } from "../components/timeinput-question-creator";
import { DateTimeInputQuestionCreator } from "../components/datetimeinput-question-creator";
import { FileUploadInputQuestionCreator } from "../components/fileuploadinput-question-creator";

type Props = {
  question: Question;
  index: number;
};

export const QuestionCreator = ({ question, index }: Props) => {
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
      question={{ ...question, orderNumber: index + 1}}
    >
      <div className="mt-8 animate-in">{questionInputSettings}</div>
    </QuestionCreationCard>
  );
};
