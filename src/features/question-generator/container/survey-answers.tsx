import { useAnswerStore } from "@/store/answer.store";
import { useQuestionStore } from "@/store/questions.store";
import { Question, QuestionOptionsMap, QuestionType } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import TextQuestion from "./text-question";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const generateQuestionSchemas = (questions: Question[]): z.ZodObject<any> => {
  const schemaShape: Record<string, z.ZodSchema> = {};
  questions.forEach((question) => {
    let schema: z.ZodSchema = z.any();
    switch (question.questionType) {
      case "text":
        const { minAnswerLength, maxAnswerLength } =
          question.options as QuestionOptionsMap["text"];
        let textSchema = z.string();
        if (minAnswerLength) {
          textSchema = textSchema.min(minAnswerLength, {
            message: `Answer cannot be less than ${minAnswerLength} characters`,
          });
        }
        if (maxAnswerLength) {
          textSchema = textSchema.max(maxAnswerLength, {
            message: `Answer cannot be less than ${maxAnswerLength} characters`,
          });
        }
        schema = question.required
          ? textSchema.nonempty({ message: "Required!" })
          : textSchema.optional();
        break;
      default:
        schemaShape[question.questionId] = z.any();
        break;
    }
    schemaShape[question.questionId] = schema;
  });
  return z.object(schemaShape);
};

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
      const options = question.options as QuestionOptionsMap["text"];
      answerComponent = (
        <TextQuestion
          control={control}
          key={question.questionId}
          options={options}
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
  const getAnswer = useAnswerStore((state) => state.getAnswer);

  const surveyAnswersSchema = generateQuestionSchemas(questions);

  const form = useForm<z.infer<typeof surveyAnswersSchema>>({
    resolver: zodResolver(surveyAnswersSchema),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        {questions.map((question) =>
          renderAnswerComponent({ control: form.control, question })
        )}
        <Button>Submit</Button>
      </form>
    </Form>
  );
};
