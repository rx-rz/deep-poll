// form/numberinput-form.ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";

const numberOptions = defaultQuestionOptions.number;
export const numberQuestionOptionsSchema = z
  .object({
    placeholder: z.string().optional(),
    allowDecimal: z.boolean().default(false),
    min: z.coerce.number().default(numberOptions.min),
    max: z.coerce.number().default(numberOptions.max),
  })
  .refine((data) => data.max >= data.min, {
    message: "Maximum value must be greater than or equal to minimum value",
    path: ["max"],
  })
  .refine(
    (data) =>
      data.allowDecimal === false &&
      (Number.isInteger(data.max) === false ||
        Number.isInteger(data.min) === false),
    {
      message: "Values cannot be decimals",
      path: ["min", "max"],
    }
  );

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
    mode: "onBlur",
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
