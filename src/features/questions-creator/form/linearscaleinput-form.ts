// linearScaleQuestionOptionsSchema.ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const linearScaleQuestionOptionsSchema = z
  .object({
    min: z.coerce.number().int().default(0),
    max: z.coerce.number().int().default(100),
    labels: z.object({
      start: z.string().default(""),
      end: z.string().default(""),
    }),
  })
  .refine((data) => data.max > data.min, {
    message: "Maximum value must be greater than minimum value",
    path: ["max"],
  });

export type LinearScaleQuestionOptionsDto = z.infer<
  typeof linearScaleQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: LinearScaleQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<LinearScaleQuestionOptionsDto>
  >;
};

export const useLinearScaleQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<LinearScaleQuestionOptionsDto>({
    resolver: zodResolver(linearScaleQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: LinearScaleQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
