import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { toast } from "sonner";
import { useCreateQuestion } from "../api/use-create-question";
import { handleAPIErrors } from "@/lib/errors";

const numberOptions = defaultQuestionOptions.number;

export const numberQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      placeholder: z
        .string()
        .default(numberOptions.placeholder ?? "")
        .optional(),
      allowDecimal: z.boolean().default(false),
      min: z.coerce
        .number({ message: "Must be a number" })
        .default(numberOptions.min),
      max: z.coerce.number().default(numberOptions.max),
    }),
  })
  .refine((data) => data.options.max >= data.options.min, {
    message: "Maximum value must be greater than or equal to minimum value",
    path: ["options", "max"],
  })
  .refine(
    (data) => {
      // With allowDecimal false, both min and max must be integers
      return !(
        data.options.allowDecimal === false &&
        (!Number.isInteger(data.options.min) ||
          !Number.isInteger(data.options.max))
      );
    },
    {
      message: "Values cannot be decimals when 'Allow Decimals' is disabled",
      path: ["options", "max"],
    }
  );

type NumberQuestionDto = z.infer<typeof numberQuestionSchema>;
export const useNumberQuestionCreationForm = ({
  question,
}: {
  question: Question<"number">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const { mutate } = useCreateQuestion();
  const form = useForm<NumberQuestionDto>({
    resolver: zodResolver(numberQuestionSchema),
    defaultValues: {
      options: question.options,
      questionText: question.questionText,
    },
  });

  const onSubmit = (values: NumberQuestionDto) => {
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
