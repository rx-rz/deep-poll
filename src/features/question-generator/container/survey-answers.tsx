import { Question, QuestionOptionsMap } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { TextAnswer } from "./text-answer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { EmailAnswer } from "./email-answer";
import { Link, useLocation, useParams } from "wouter";
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
import { useGetQuestions } from "@/features/questions-creator/api/use-get-questions";
import { protectedRoutes } from "@/routes";
import { useSurveyListStore } from "@/store/surveys.store";
import { useCreateResponse } from "../api/use-create-response";

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
export const SurveyAnswers = () => {
  const [location] = useLocation();
  const { surveyId } = useParams();
  const survey = useSurveyListStore((state) =>
    state.fetchSurveyById(surveyId!)
  );
  const { submitResponse } = useCreateResponse();

  const { questions } = useGetQuestions();
  const surveyAnswersSchema = generateQuestionSchemas(questions ?? []);

  const form = useForm<z.infer<typeof surveyAnswersSchema>>({
    resolver: zodResolver(surveyAnswersSchema),
    mode: "all",
  });

  const onSubmit = (values: Record<string, any>) => {
    const userData = JSON.parse(localStorage.getItem("deep-poll-user") || "{}");
    const dto = {
      response: {
        accountId: userData.account_id ?? "",
      },
      answers: Object.keys(values)
        .slice(0, 11)
        .map((key) => {
          const value = values[key];
          return {
            questionId: key,
            answerText: typeof value === "string" ? value : null,
            answerNumber: typeof value === "number" ? value : null,
            answerJson:
              typeof value !== "string" && typeof value !== "number"
                ? value
                : null,
          };
        }),
    };
    submitResponse(dto);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg w-[95%] flex flex-col my-4 mx-auto"
      >
        <p className="text-2xl uppercase font-bold my-5">{survey?.title}</p>
        <div className="">
          <Link to={protectedRoutes.CREATE_SURVEY(surveyId ?? "")}>
            Questions
          </Link>
          {questions &&
            questions.map((question) => (
              <div key={question.id} className="my-4  p-4 rounded-md">
                <div className="flex gap-1">
                  <p className=" font-medium mb-4">{question.orderNumber}.</p>
                  <p className="font-bold">{question.questionText}</p>
                </div>

                {renderAnswerComponent({ control: form.control, question })}
              </div>
            ))}
        </div>
        {location.includes("preview") ? (
          <></>
        ) : (
          <Button className="mt-4">Submit</Button>
        )}
      </form>
    </Form>
  );
};
