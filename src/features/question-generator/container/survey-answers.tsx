import { useAnswerStore } from "@/store/answer.store";
import { useQuestionStore } from "@/store/questions.store";
import { Question, QuestionOptionsMap, QuestionType } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import TextQuestion from "./text-question";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useSurveyOptionsStore } from "@/store/survey-options.store";
import EmailQuestion from "./email-question";

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
            message: `Answer cannot be more than ${maxAnswerLength} characters`,
          });
        }
        schema = question.required
          ? textSchema.nonempty({ message: "Required!" })
          : textSchema.optional();
        break;
      case "email":
        const {
          minEmailLength,
          maxEmailLength,
          allowedDomains,
          disallowedDomains,
        } = question.options as QuestionOptionsMap["email"];
        let emailSchema = z.string().email({ message: "Invalid email format" });
        if (minEmailLength) {
          emailSchema = emailSchema.min(minEmailLength, {
            message: `Email cannot be less than ${minEmailLength} characters`,
          });
        }
        if (maxEmailLength) {
          emailSchema = emailSchema.max(maxEmailLength, {
            message: `Email cannot be more than ${maxEmailLength} characters`,
          });
        }

        const validateEmailDomain = (email: string): boolean => {
          if (disallowedDomains) {
            const disallowedDomainList = disallowedDomains
              .split(",")
              .map((domain) => domain.trim());
            const domain = email.split("@")[1];
            return !disallowedDomainList.includes(domain);
          }
          if (allowedDomains) {
            const allowedDomainList = allowedDomains
              .split(",")
              .map((domain) => domain.trim());
            const domain = email.split("@")[1];
            return allowedDomainList.includes(domain);
          }
          return true;
        };

        schema = question.required
          ? emailSchema.nonempty({ message: "Required!" }).refine(
              (email) => {
                const val = validateEmailDomain(email);
                return val;
              },
              { message: "Domain issue" }
            )
          : emailSchema.optional().refine(
              (email) => {
                if (email) {
                  const val = validateEmailDomain(email);
                  return val;
                }
              },
              {
                message: "Domain issue",
              }
            );
        break;
      case "number":
        const { allowDecimal, min, max } =
          question.options as QuestionOptionsMap["number"];
        let numberSchema = allowDecimal ? z.number() : z.number().int();
        if (min !== undefined) {
          numberSchema = numberSchema.min(min, {
            message: `Number cannot be less than ${min}`,
          });
        }
        if (max !== undefined) {
          numberSchema = numberSchema.max(max, {
            message: `Number cannot be more than ${max}`,
          });
        }
        schema = question.required ? numberSchema : numberSchema.optional();
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
      const textOptions = question.options as QuestionOptionsMap["text"];
      answerComponent = (
        <TextQuestion
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
        <EmailQuestion
          control={control}
          key={question.questionId}
          options={emailOptions}
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
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-lg flex flex-col my-4 mx-auto"
      >
        <p className="text-2xl uppercase font-bold my-5">{survey.title}</p>
        <div className="p-4 border">
          {questions.map((question) =>
            renderAnswerComponent({ control: form.control, question })
          )}
        </div>
        <Button className="mt-4">Submit</Button>
      </form>
    </Form>
  );
};
