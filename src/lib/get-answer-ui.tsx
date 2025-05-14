import { Question, QuestionOptionsMap } from "@/types/questions";
import { Control } from "react-hook-form";
import { ReactNode } from "react";
import { EmailAnswer } from "@/components/email-answer";
import { NumberAnswer } from "@/components/number-answer";
import { MultipleChoiceAnswer } from "@/components/multiple-choice-answer";
import { CheckboxAnswer } from "@/components/checkbox-answer";
import { DropdownAnswer } from "@/components/dropdown-answer";
import { LinearScaleAnswer } from "@/components/linear-scale-answer";
import { SliderAnswer } from "@/components/slider-answer";
import { LikertAnswer } from "@/components/likert-answer";
import { FileAnswer } from "@/components/file-answer";
import { DateAnswer } from "@/components/date-answer";
import { DateTimeAnswer } from "@/components/datetime-answer";
import { TimeAnswer } from "@/components/time-answer";
import { RatingAnswer } from "@/components/rating-answer";
import { TextAnswer } from "@/components/text-answer";

export const getAnswersUI = ({
  question,
  control,
}: {
  question: Question;
  control: Control<any>;
}) => {
  let answerComponent: ReactNode;

  switch (question.questionType) {
    case "text":
      const textOptions = question.options as QuestionOptionsMap["text"];
      answerComponent = (
        <TextAnswer
          control={control}
          key={question.id}
          options={textOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "email":
      const emailOptions = question.options as QuestionOptionsMap["email"];
      answerComponent = (
        <EmailAnswer
          control={control}
          key={question.id}
          options={emailOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "number":
      const numberOptions = question.options as QuestionOptionsMap["number"];
      answerComponent = (
        <NumberAnswer
          control={control}
          key={question.id}
          options={numberOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "multiple_choice":
      const multipleChoiceOptions =
        question.options as QuestionOptionsMap["multiple_choice"];
      answerComponent = (
        <MultipleChoiceAnswer
          control={control}
          key={question.id}
          options={multipleChoiceOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "checkbox":
      const checkboxOptions =
        question.options as QuestionOptionsMap["checkbox"];
      answerComponent = (
        <CheckboxAnswer
          control={control}
          key={question.id}
          options={checkboxOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "dropdown":
      const dropdownOptions =
        question.options as QuestionOptionsMap["dropdown"];
      answerComponent = (
        <DropdownAnswer
          control={control}
          key={question.id}
          options={dropdownOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "linear_scale":
      const linearScaleOptions =
        question.options as QuestionOptionsMap["linear_scale"];
      answerComponent = (
        <LinearScaleAnswer
          control={control}
          key={question.id}
          options={linearScaleOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "slider":
      const sliderOptions = question.options as QuestionOptionsMap["slider"];
      answerComponent = (
        <SliderAnswer
          control={control}
          key={question.id}
          options={sliderOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "likert":
      const likertOptions = question.options as QuestionOptionsMap["likert"];
      answerComponent = (
        <LikertAnswer
          control={control}
          key={question.id}
          options={likertOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "file":
      const fileOptions = question.options as QuestionOptionsMap["file"];
      answerComponent = (
        <FileAnswer
          control={control}
          key={question.id}
          options={fileOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "date":
      const dateOptions = question.options as QuestionOptionsMap["date"];
      answerComponent = (
        <DateAnswer
          control={control}
          key={question.id}
          options={dateOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "datetime":
      const dateTimeOptions =
        question.options as QuestionOptionsMap["datetime"];
      answerComponent = (
        <DateTimeAnswer
          control={control}
          key={question.id}
          options={dateTimeOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "time":
      const timeOptions = question.options as QuestionOptionsMap["time"];
      answerComponent = (
        <TimeAnswer
          control={control}
          key={question.id}
          options={timeOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    case "rating":
      const ratingOptions = question.options as QuestionOptionsMap["rating"];
      answerComponent = (
        <RatingAnswer
          control={control}
          key={question.id}
          options={ratingOptions}
          id={question.id}
          questionText={question.questionText ?? ""}
          required={question.required}
        />
      );
      break;
    default:
      answerComponent = null;
  }
  return answerComponent;
};
