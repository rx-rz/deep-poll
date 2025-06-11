import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {  useLocation, useParams } from "wouter";
import { generateQuestionSchemas } from "@/lib/generate-question-schema";
import { useSurveyListStore } from "@/store/surveys.store";
import { useCreateResponse } from "../api/use-create-response";
import { useGetQuestions } from "@/features/questions/api/use-get-questions";
import { getAnswersUI } from "@/lib/get-answer-ui";
import { Asterisk } from "lucide-react";
import { QuestionDetailsGenerator } from "@/components/question-details-generator";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

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
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const scrollHandler = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;

      const windowHeight = scrollHeight - clientHeight;
      const percent = (scrollTop / windowHeight) * 100;
      setProgress(percent);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

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
    <div className=" mx-auto md:w-full">
      <div className="sticky bg-white z-10 top-0">
        <Progress value={progress} />
      </div>
      <div className=" bg-primary">
        <div className="max-w-[90%] md:max-w-lg mx-auto pt-12 pb-12 text-white">
          <p className="text-2xl mb-2 uppercase font-bold ">{survey?.title}</p>
          <p className="font-medium opacity-80">{survey?.description ?? ""}</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[95%]  md:max-w-lg  mx-auto mt-8"
        >
          <div className="">
            {questions &&
              questions.map((question, index) => (
                <div
                  key={question.id}
                  className="my-4    pb-4 border-dotted px-4 rounded-md"
                >
                  <div className="mb-4">
                    <div className="flex gap-3 ">
                      <p className="opacity-50 font-medium text-primary">
                        {index + 1}.
                      </p>
                      <div>
                        <div className="relative flex gap-1">
                          <p className="font-medium text-base">
                            {question.questionText}
                          </p>
                          <Asterisk className="text-red-500 mt-1" size={10} />
                        </div>
                        <QuestionDetailsGenerator question={question} />
                      </div>
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
    </div>
  );
};
