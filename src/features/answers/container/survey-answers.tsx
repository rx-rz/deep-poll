import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useParams } from "wouter";
import { generateQuestionSchemas } from "@/lib/generate-question-schema";
import { useSurveyListStore } from "@/store/surveys.store";
import { useCreateResponse } from "../api/use-create-response";
import { useGetQuestions } from "@/features/questions/api/use-get-questions";
import { protectedRoutes } from "@/routes";
import { getAnswersUI } from "@/lib/get-answer-ui";
import { Asterisk } from "lucide-react";

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
        .slice(0, Object.keys(values).length)
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <p className="text-2xl uppercase font-bold my-5">{survey?.title}</p>
        <div className="">
          {location.includes("preview") && (
            <Link to={protectedRoutes.CREATE_SURVEY(surveyId ?? "")}>
              Questions
            </Link>
          )}
          {questions &&
            questions.map((question, index) => (
              <div key={question.id} className="my-4  p-4 rounded-md">
                <div className="flex gap-3 mb-4">
                  <p className="opacity-50 font-medium">{index + 1}.</p>
                  <div className="relative flex gap-1">
                    <p className="font-medium text-base">
                      {question.questionText}
                    </p>
                    <Asterisk className="text-red-500 mt-1" size={10} />
                  </div>
                </div>
                {getAnswersUI({ control: form.control, question })}
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
