import { defaultQuestionOptions } from "@/lib/default-question-options";
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateQuestion } from "../api/use-create-question";
import { toast } from "sonner";
import { handleAPIErrors } from "@/lib/errors";

const dropdownOptions = defaultQuestionOptions.dropdown;

export const dropdownQuestionSchema = z
  .object({
    questionText: z.string().default("Lorem ipsum"),
    options: z.object({
      choices: z.array(z.string().min(1)).default(dropdownOptions.choices),
      allowSearch: z.boolean().default(dropdownOptions.allowSearch),
    }),
  })
  .refine((data) => data.options.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["options", "choices"],
  });

export type DropdownQuestionDto = z.infer<typeof dropdownQuestionSchema>;

export const useDropdownQuestionCreationForm = ({
  question,
}: {
  question: Question<"dropdown">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const { mutate } = useCreateQuestion();
  const form = useForm<DropdownQuestionDto>({
    resolver: zodResolver(dropdownQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: DropdownQuestionDto) => {
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
