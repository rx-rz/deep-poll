import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const likertQuestionOptionsSchema = z.object({
  scale: z.coerce
    .number({ message: "Value must be a number" })
    .int()
    .min(2)
    .default(5),
  labels: z
    .string()
    .array()
    .min(2)
    .refine((items) => items.length === new Set(items).size, {
      message: "Labels must be unique",
    }),
  statement: z.string().default(""),
});

export type LikertQuestionOptionsDto = z.infer<
  typeof likertQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: LikertQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LikertQuestionOptionsDto>
  >;
};

export const useLikertQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<LikertQuestionOptionsDto>({
    resolver: zodResolver(likertQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: LikertQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
