// fileUploadOptionsSchema.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const fileUploadOptionsSchema = z.object({
  acceptedFormats: z
    .string()
    .array()
    .min(1, "At least one accepted format is required"),
  maxSizeMB: z.coerce.number().positive("Max size must be positive").default(5),
  maxFiles: z.coerce
    .number()
    .positive("Max files must be positive")
    .int("Max files must be an integer")
    .default(1),
  allowMultiple: z.boolean().default(false),
});

export type FileUploadOptionsDto = z.infer<typeof fileUploadOptionsSchema>;

type FormValidatorProps = {
  questionOptions: FileUploadOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<FileUploadOptionsDto>
  >;
};

export const useFileUploadOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<FileUploadOptionsDto>({
    resolver: zodResolver(fileUploadOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: FileUploadOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
