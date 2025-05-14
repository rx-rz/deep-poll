// fileUploadOptionsSchema.ts
import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateQuestion } from "../api/use-create-question";
import { toast } from "sonner";
import { handleAPIErrors } from "@/lib/errors";

// new schema + form implementation
export const fileUploadQuestionSchema = z.object({
  questionText: z.string().default("Upload a file"),
  options: z.object({
    acceptedFormats: z
      .string()
      .array()
      .min(1, "At least one accepted format is required"),
    maxSizeMB: z.coerce
      .number()
      .positive("Max size must be positive")
      .default(5),
    maxFiles: z.coerce
      .number()
      .positive("Max files must be positive")
      .int("Max files must be an integer")
      .default(1),
    allowMultiple: z.boolean().default(false),
  }),
});

export type FileUploadQuestionDto = z.infer<typeof fileUploadQuestionSchema>;

export const useFileUploadQuestionCreationForm = ({
  question,
}: {
  question: Question<"file">;
}) => {
  const updateQuestion = useQuestionStore((state) => state.updateQuestion);
  const { mutate } = useCreateQuestion();
  const form = useForm<FileUploadQuestionDto>({
    resolver: zodResolver(fileUploadQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: FileUploadQuestionDto) => {
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
