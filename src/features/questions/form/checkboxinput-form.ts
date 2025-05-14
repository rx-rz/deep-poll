import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { toast } from "sonner";
import { useCreateQuestion } from "../api/use-create-question";
import { handleAPIErrors } from "@/lib/errors";

const checkboxOptions = defaultQuestionOptions.checkbox;

export const checkboxQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      choices: z.array(z.string().min(1)).default(checkboxOptions.choices),
      minSelections: z.coerce
        .number()
        .min(0, "Minimum selections must be at least 0")
        .default(checkboxOptions.minSelections),
      maxSelections: z.coerce
        .number()
        .min(1, "Maximum selections must be at least 1")
        .default(checkboxOptions.maxSelections),
      randomizeOrder: z.boolean().default(false),
    }),
  })
  .refine((data) => data.options.maxSelections >= data.options.minSelections, {
    message:
      "Maximum selections must be greater than or equal to minimum selections",
    path: ["options", "maxSelections"],
  })
  .refine((data) => data.options.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["options", "choices"],
  });

export type CheckboxQuestionDto = z.infer<typeof checkboxQuestionSchema>;

export const useCheckboxQuestionCreationForm = ({
  question,
}: {
  question: Question<"checkbox">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const { mutate } = useCreateQuestion();
  const form = useForm<CheckboxQuestionDto>({
    resolver: zodResolver(checkboxQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: CheckboxQuestionDto) => {
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
