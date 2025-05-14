import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { useCreateQuestion } from "../api/use-create-question";
import { toast } from "sonner";
import { handleAPIErrors } from "@/lib/errors";

const likertQuestionOptions = defaultQuestionOptions.likert;

// new schema + form implementation
export const likertQuestionSchema = z.object({
  questionText: z.string().default("Lorem ipsum"),
  options: z.object({
    scale: z.coerce
      .number({ message: "Value must be a number" })
      .int()
      .max(7, { message: "Scale must be between 2 and 7" })
      .default(likertQuestionOptions.scale),
    labels: z
      .string()
      .array()
      .min(2)
      .refine((items) => items.length === new Set(items).size, {
        message: "Labels must be unique",
      }),
  }),
});

export type LikertQuestionDto = z.infer<typeof likertQuestionSchema>;

export const useLikertQuestionCreationForm = ({
  question,
}: {
  question: Question<"likert">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const { mutate } = useCreateQuestion();
  const form = useForm<LikertQuestionDto>({
    resolver: zodResolver(likertQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: LikertQuestionDto) => {
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
