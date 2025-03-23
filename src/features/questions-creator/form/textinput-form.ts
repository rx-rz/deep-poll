import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const textQuestionOptionsSchema = z
  .object({
    placeholder: z.string().nonempty("Placeholder cannot be empty"),
    minAnswerLength: z
      .number()
      .int()
      .positive("Minimum length must be positive")
      .default(1),
    maxAnswerLength: z
      .number()
      .int()
      .positive("Maximum length must be positive")
      .default(255),
  })
  .refine((data) => data.maxAnswerLength >= data.minAnswerLength, {
    message:
      "Maximum answer length must be greater than or equal to minimum answer length",
    path: ["maxAnswerLength"],
  })
  .refine((data) => data.minAnswerLength <= data.maxAnswerLength, {
    message:
      "Minimum answer length must be less than or equal to maximum answer length",
    path: ["minAnswerLength"],
  });

export type TextQuestionOptionsDto = z.infer<typeof textQuestionOptionsSchema>;

type FormValidatorProps = {
  questionOptions: TextQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<TextQuestionOptionsDto>
  >;
};

export const useTextQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<TextQuestionOptionsDto>({
    resolver: zodResolver(textQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: TextQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
