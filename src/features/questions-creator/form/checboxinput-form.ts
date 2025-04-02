import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { defaultQuestionOptions } from "@/lib/default-question-options";

const checkboxOptions = defaultQuestionOptions.checkbox;
export const checkboxQuestionOptionsSchema = z
  .object({
    choices: z.array(z.string().min(1)).default(checkboxOptions.choices),
    minSelections: z.coerce
      .number()
      .min(0, "Minimum selections must be at least 0")
      .default(checkboxOptions.minSelections),
    maxSelections: z.coerce
      .number()
      .min(1, "Maximum selections must be at least 1")
      .default(checkboxOptions.maxSelections),
    randomizeOrder: z.boolean().default(false),
  })
  .refine((data) => data.maxSelections >= data.minSelections, {
    message:
      "Maximum selections must be greater than or equal to minimum selections",
    path: ["maxSelections"],
  })
  .refine((data) => data.choices.length > 0, {
    message: "Choices must have at least one option",
    path: ["choices"],
  });

export type CheckboxQuestionOptionsDto = z.infer<
  typeof checkboxQuestionOptionsSchema
>;

type FormValidatorProps = {
  questionOptions: CheckboxQuestionOptionsDto;
  setQuestionOptions: React.Dispatch<
    React.SetStateAction<CheckboxQuestionOptionsDto>
  >;
};

export const useCheckboxQuestionOptionsForm = ({
  questionOptions,
  setQuestionOptions,
}: FormValidatorProps) => {
  const form = useForm<CheckboxQuestionOptionsDto>({
    resolver: zodResolver(checkboxQuestionOptionsSchema),
    defaultValues: questionOptions,
    mode: "onChange",
  });

  const onSubmit = (values: CheckboxQuestionOptionsDto) => {
    setQuestionOptions(values);
    form.reset(values);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
