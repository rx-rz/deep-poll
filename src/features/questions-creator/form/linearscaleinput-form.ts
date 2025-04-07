// linearScaleQuestionOptionsSchema.ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";

const linearScaleOptions = defaultQuestionOptions.linear_scale;
export const linearScaleQuestionOptionsSchema = z
  .object({
    min: z.coerce
      .number({ message: "Value must be a number" })
      .min(0, { message: "Minimum value must be greater than or equal to 0" })
      .int({ message: "Value must be an integer" })
      .default(linearScaleOptions.min),
    max: z.coerce
      .number({ message: "Value must be a number" })
      .int({ message: "Value must be an integer" })
      .max(10, { message: "Maximum value must be less than or equal to 10" })
      .default(linearScaleOptions.max),
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
