import { useQuestionStore } from "@/store/questions.store";
import { Question, QuestionOptionsMap } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { TextAnswer } from "./text-answer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useSurveyOptionsStore } from "@/store/survey-options.store";
import { EmailAnswer } from "./email-answer";
import { Link } from "wouter";
import { NumberAnswer } from "./number-answer";
import { generateQuestionSchemas } from "@/lib/generate-question-schema";
import { MultipleChoiceAnswer } from "./multiple-choice-answer";
import { CheckboxAnswer } from "./checkbox-answer";
import { DropdownAnswer } from "./dropdown-answer";
import { LinearScaleAnswer } from "./linear-scale-answer";
import { SliderAnswer } from "./slider-answer";
import { LikertAnswer } from "./likert-answer";
import { FileAnswer } from "./file-answer";
import { DateAnswer } from "./date-answer";
import { DateTimeAnswer } from "./datetime-answer";
import { TimeAnswer } from "./time-answer";
import { RatingAnswer } from "./rating-answer";
import { Separator } from "@/components/ui/separator";

const renderAnswerComponent = ({
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
          key={question.questionId}
          options={textOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={emailOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={numberOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={multipleChoiceOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={checkboxOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={dropdownOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={linearScaleOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={sliderOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={likertOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={fileOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={dateOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={dateTimeOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={timeOptions}
          questionId={question.questionId}
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
          key={question.questionId}
          options={ratingOptions}
          questionId={question.questionId}
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
export const SurveyAnswers = () => {
  const questions = useQuestionStore((state) => state.questions);
  const survey = useSurveyOptionsStore((state) => state.options);
  const surveyAnswersSchema = generateQuestionSchemas(questions);

  const form = useForm<z.infer<typeof surveyAnswersSchema>>({
    resolver: zodResolver(surveyAnswersSchema),
    mode: "all",
  });

  const onSubmit = (values: Record<string, any>) => {
    console.log(values);
    console.log("here!");
    console.log({
      errors: form.formState.errors,
      form: form.formState.dirtyFields,
    });
  };

  console.log({ form: form.formState.errors });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg w-[95%] flex flex-col my-4 mx-auto"
      >
        <p className="text-2xl uppercase font-bold my-5">{survey.title}</p>
        <div className="">
          <Link to="/">Questions</Link>
          {questions.map((question) => (
            <div key={question.questionId} className="my-4 border-2 p-4 rounded-md">
              <div className="flex gap-1">
                <p className=" font-medium mb-4">{question.orderNumber}.</p>
                <p className="font-bold">{question.questionText}</p>
              </div>

              {renderAnswerComponent({ control: form.control, question })}
            </div>
          ))}
        </div>
        <Button className="mt-4">Submit</Button>
      </form>
    </Form>
  );
};
