// form/numberinput-form.ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const numberQuestionOptionsSchema = z
  .object({
    placeholder: z.string().optional(),
    allowDecimal: z.boolean().default(false),
    min: z.number().int().default(0),
    max: z.number().int().default(Infinity),
  })
  .refine((data) => data.max >= data.min, {
    message: "Maximum value must be greater than or equal to minimum value",
    path: ["max"],
  });

export type NumberQuestionOptionsDto = z.infer<
  typeof numberQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: NumberQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<NumberQuestionOptionsDto>
  >;
};

export const useNumberQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<NumberQuestionOptionsDto>({
    resolver: zodResolver(numberQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: NumberQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
