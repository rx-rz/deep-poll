import { useQuestionStore } from "@/store/questions.store";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const fileUploadQuestionSchema = z.object({
  questionText: z.string().default("Upload a file"),
  options: z.object({
    acceptedFormats: z
      .string()
      .transform((val) =>
        val
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      )
      .pipe(
        z.string().array().min(1, "At least one accepted format is required")
      ),
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
  const addApiQueuedQuestion = useQuestionStore(
    (state) => state.addApiQueuedQuestion
  );
  const form = useForm<FileUploadQuestionDto>({
    resolver: zodResolver(fileUploadQuestionSchema),
    defaultValues: {
      questionText: question.questionText,
      options: question.options,
    },
  });

  const onSubmit = (values: FileUploadQuestionDto) => {
    updateQuestion(question.id, { ...question, ...values });
    addApiQueuedQuestion(question.id, { ...question, ...values });
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
