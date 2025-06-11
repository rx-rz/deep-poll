import { generateQuestionSchemas } from "@/lib/generate-question-schema";
import { useGetResponse } from "../api/use-get-response";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAnswersUI } from "@/lib/get-answer-ui";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";

export const ResponseDetails = () => {
  const { response, questions, answers } = useGetResponse();

  const surveyAnswersSchema = generateQuestionSchemas(questions ?? []);

  const form = useForm<z.infer<typeof surveyAnswersSchema>>({
    resolver: zodResolver(surveyAnswersSchema),
    mode: "all",
    disabled: true,
  });

  useEffect(() => {
    if (answers) {
      const defaultValues = answers.reduce((acc, answer) => {
        if (!answer.questionId) return acc;
        const value =
          answer.answerText ?? answer.answerNumber ?? answer.answerJson ?? null;
        if (value !== null) {
          acc[String(answer.questionId)] = value;
        }
        return acc;
      }, {} as Record<string, any>);
      form.reset(defaultValues);
    }
  }, [response]);
  console.log(form.getValues());
  return (
    <div>
      <p>Hello!</p>
      <Form {...form}>
        <form className="max-w-lg mx-auto">
          {questions &&
            questions.map((question, index) => (
              <div key={question.id} className="my-4  p-4 rounded-md">
                <div className="flex gap-1">
                  <p className=" font-medium mb-4">{index + 1}.</p>
                  <p className="font-bold">{question.questionText}</p>
                </div>

                {getAnswersUI({ control: form.control, question })}
              </div>
            ))}
        </form>
      </Form>
    </div>
  );
};
