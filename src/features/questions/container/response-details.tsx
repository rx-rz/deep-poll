import { generateQuestionSchemas } from "@/lib/generate-question-schema";
import { useGetResponse } from "../api/use-get-response";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAnswersUI } from "@/lib/get-answer-ui";

export const ResponseDetails = () => {
  const { response, questions, answers } = useGetResponse();
  console.log({ response, questions });

  const surveyAnswersSchema = generateQuestionSchemas(questions ?? []);

  const form = useForm<z.infer<typeof surveyAnswersSchema>>({
    resolver: zodResolver(surveyAnswersSchema),
    mode: "all",
  });

  return (
    <div>
      <p>Hello!</p>
      {questions &&
        questions.map((question) => (
          <div key={question.id} className="my-4  p-4 rounded-md">
            <div className="flex gap-1">
              <p className=" font-medium mb-4">{question.orderNumber}.</p>
              <p className="font-bold">{question.questionText}</p>
            </div>

            {getAnswersUI({ control: form.control, question })}
          </div>
        ))}
    </div>
  );
};
