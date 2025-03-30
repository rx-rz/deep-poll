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
        className="max-w-lg flex flex-col my-4 mx-auto"
      >
        <p className="text-2xl uppercase font-bold my-5">{survey.title}</p>
        <div className=" grid grid-cols-1 gap-6">
          <Link to="/">Questions</Link>
          {questions.map((question) => (
            <div
              className="border border-black px-8 py-5"
              key={question.questionId}
            >
              <p className="text-lg font-medium mb-4">{question.orderNumber}</p>
              <p className="font-bold text-xs">{question.questionId}</p>
              {renderAnswerComponent({ control: form.control, question })}
            </div>
          ))}
        </div>
        <Button className="mt-4">Submit</Button>
      </form>
    </Form>
  );
};
