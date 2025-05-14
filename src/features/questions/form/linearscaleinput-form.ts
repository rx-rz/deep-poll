import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { toast } from "sonner";
import { useCreateQuestion } from "../api/use-create-question";
import { handleAPIErrors } from "@/lib/errors";

const linearScaleOptions = defaultQuestionOptions.linear_scale;

export const linearScaleQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      min: z.coerce
        .number({ message: "Value must be a number" })
        .min(0, { message: "Minimum value must be greater than or equal to 0" })
        .int({ message: "Value must be an integer" })
        .default(linearScaleOptions.min),
      max: z.coerce
        .number({ message: "Value must be a number" })
        .int({ message: "Value must be an integer" })
        .max(10, { message: "Maximum value must be less than or equal to 10" })
        .default(linearScaleOptions.max),
      labels: z.object({
        start: z.string().default(""),
        end: z.string().default(""),
      }),
    }),
  })
  .refine((data) => data.options.max > data.options.min, {
    message: "Maximum value must be greater than minimum value",
    path: ["options", "max"],
  });

export type LinearScaleQuestionDto = z.infer<typeof linearScaleQuestionSchema>;

export const useLinearScaleQuestionCreationForm = ({
  question,

}: {
  question: Question<"linear_scale">;

}) => {

  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const {mutate} = useCreateQuestion()
  const form = useForm<LinearScaleQuestionDto>({
    resolver: zodResolver(linearScaleQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: LinearScaleQuestionDto) => {
    const loadingToast = toast.loading("Saving changes");
    mutate(
      {
        ...question,
        options: values.options,
        questionText: values.questionText,
      },
      {
        onSuccess: () => {
          toast.success("Survey updated successfully");
          updateQuestion(question.id, {
            questionText: values.questionText,
            options: values.options,
          });
        },
        onError: (error) => {
          handleAPIErrors(error);
        },
        onSettled: () => {
          toast.dismiss(loadingToast);
        },
      }
    );
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
